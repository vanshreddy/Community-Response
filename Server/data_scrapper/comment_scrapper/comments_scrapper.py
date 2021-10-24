from googleapiclient.discovery import build
import pymongo
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys
import os


API_KEY = 'API KEY GOES HERE'
MAX_RESULTS = 50

def get_api(no_comments,youtube,youtube_id, next_page = ''):
    if not next_page:
        results = youtube.commentThreads().list(
            part="snippet",
            videoId=youtube_id,
            textFormat="plainText",
            maxResults=no_comments
        )
        # print('1st iteration')
    else:
        results = youtube.commentThreads().list(
            part="snippet",
            videoId=youtube_id,
            textFormat="plainText",
            maxResults=no_comments,
            pageToken=next_page
        )
        # print('2nd iteration')

    return results




def database_inserter(u_id,sentiment_data,analyzer,db,data):

    no = 0;
    col = db[u_id]
    for item in data:
        item_data = item['snippet']['topLevelComment']['snippet']
        authour = item_data['authorDisplayName']
        text = item_data['textDisplay']
        scores = analyzer.polarity_scores(text)
        score = scores['compound']
        type = ''
        if score >= 0.05:
            sentiment_data['Positive'] += 1
            type += 'Positive'
        elif score <= 0.05:
            sentiment_data['Negative'] += 1
            type += 'Negative'
        else:
            sentiment_data['Neutral'] += 1
            type += 'Neutral'

        d = {
            "Author": authour,
            "text": text,
            "score": score,
            'type': type
        }
        col.insert_one(d)
        no+=1

    print('no:',no)



def comments_prcoessor(u_id,no_comments,client,youtube,youtube_id):

    analyzer = SentimentIntensityAnalyzer()
    sentiment_data = {
        "Positive": 0,
        "Negative" : 0,
        "Neutral":0
    }
    i = 0
    get_comments = 50

    next = 'yt'
    while i <= no_comments and next != '':
       result = get_api(get_comments,youtube,youtube_id).execute() if i == 0 else get_api(get_comments,youtube,youtube_id,next).execute()
       db = client["Youtube_comments_Scrapper"]
       i += result['pageInfo']['totalResults']
       get_comments = 50 if i%50 == 0 else no_comments-i
       if(i == no_comments):
           database_inserter(u_id, sentiment_data, analyzer, db, result['items'])
           break
       database_inserter(u_id,sentiment_data,analyzer,db,result['items'])
       print('i:',i)
       next = result['nextPageToken'] if 'nextPageToken' in result else ''
       if next == '':
           print('Stopped due to next')





    # print("i", i)
    print(sentiment_data)




if __name__ == "__main__" :
    u_id = sys.argv[1]
    no_comments = sys.argv[2]
    Video_id = sys.argv[3]

    # u_id = 'chikini'
    # no_comments = '100';
    # Video_id = "SFYGXKHLBQY"


    youtube = build('youtube', 'v3', developerKey=API_KEY)
    client = pymongo.MongoClient(
        "mongodb+srv://cute:UmtUEYhZg3AL4F0I@youtubedata.xz5us.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    comments_prcoessor(u_id,int(no_comments),client,youtube,Video_id)
    youtube.close()
    client.close()


    print("Success From python Baaby", sys.argv)






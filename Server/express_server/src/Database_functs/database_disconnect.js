const mongoose = require('mongoose');
const youtube = require('../models/youtube_vid');


async function database_disconnect(socket_id,col_name){
    let tally = {
        Positive:0,
        Neutral : 0,
        Negative: 0,
    }
    console.log(col_name)

    try{
    const uri = "MONGO DB DATABASE HERE";

    mongoose.connect(uri,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    })

    console.log()

    const col = await mongoose.connection.collection(socket_id).find() //.lean()
    await col.forEach( (doc) => {
            if(doc.type === 'Positive'){
                tally.Positive ++;
            }
            if(doc.type === 'Negative'){
                tally.Negative ++;
            } 
        
        }
    )
    
    const input_data = await new youtube({
        Unique_id:socket_id,
        Positive_Comments :tally.Positive,
        Negative_Comments : tally.Negative,
        Neutral_Comments :tally.Neutral,
    })
    await input_data.save();
    await mongoose.connection.dropCollection(socket_id)


    return tally;

}



    catch(err){
        console.log("Error")
        console.error(err)

    }


}



    
   
    



module.exports = database_disconnect

const {spawn} = require("child_process")
const path = require('path');



function runScript(uid,comments,videoId){
    return spawn(path.join("../../Server/data_scrapper/Scripts/python.exe"), ["-u",
      path.join("../../Server/data_scrapper/comment_scrapper","comments_scrapper.py"),uid,comments,
      videoId
    ]);
  }




module.exports = runScript
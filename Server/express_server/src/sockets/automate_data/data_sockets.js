const express = require('express');
const router = new express.Router();
const path = require('path');
const dataEntry = require('../../Database_functs/database_entry')
const database_disconnect = require('../../Database_functs/database_disconnect')

router.get('/disconnect', (req,res,next) => {
    console.log('Hello from disconnect');
    next()
})


router.get('/test_sockets/:vid', (req,res,next) => {
    video_id = req.params.vid
    var io = req.app.get('socketio')
    console.log("Inside Run");
    
     
    
    io.on('connection', socket => {
        console.log("Server side connection", socket.id);
        
        socket.on('Print_message', (msg) => {
            console.log("From client: ",msg)

        })
   
        socket.on('Populate' , () => {
        const subprocess = dataEntry(socket.id,100,video_id);
        subprocess.stdout.on('data', (data) => { //Error hadnling
            console.log(`${data}`);

        })
        subprocess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        })
        })


         socket.on('CleanupDatabase', () => {
            database_disconnect(socket.id,video_id).then(data => {
                console.log(data);
            });
         })


    })

    res.sendFile(path.join(__dirname,'../../client_side/Sockets.html'))
    console.log('Completed')
})

module.exports = router
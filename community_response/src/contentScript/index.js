import ReactDOM from 'react-dom';
//import topbar from './UI/TopBar'
import React from 'react';
import App from './App';
import create_DOMelement from './Utilities/create_dom'
import getURLParameter from './Utilities/getURLParamter';
import { ChakraProvider } from "@chakra-ui/react"
import socketClient from 'socket.io-client'

const SERVER = "http://127.0.0.1:3002/test_sockets/nUNMikuMsLY";

var stopVideo = function ( element ) {
	var iframe = element.querySelector( 'iframe');
	var video = element.querySelector( 'video' );
	if ( iframe ) {
		var iframeSrc = iframe.src;
		iframe.src = iframeSrc;
	}
	if ( video ) {
		video.pause();
	}
};


 
const Process = () => {
  const video_id = getURLParameter('v');
  if(video_id == null){
    return;
  }

  create_DOMelement();
  stopVideo(document);

  var socket = socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
        socket.emmit('Print_message', socket.id)

 });

  

  
  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>
      <App url={video_id}/>
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('community_response')
  );
}


document.addEventListener('yt-navigate-start', Process);
if (document.body) Process(); 
else document.addEventListener('DOMContentLoaded', Process);


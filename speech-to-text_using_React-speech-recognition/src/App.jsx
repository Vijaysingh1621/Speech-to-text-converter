import "regenerator-runtime/runtime";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./App.css"

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  

  return (
    <div className="container">
      <p style={{fontSize:"25px", fontFamily:"poppins",fontWeight:600}}>Speech to text converter</p>
      <p className="heading"> Microphone: {listening ? 'on' : 'off'}</p>
      <div className="mic_icon" >
       {/* <button id="speech" class="btn">
    <div class="pulse-ring"></div>
    <i class="fa fa-microphone" aria-hidden="true"></i></button>*/}


      </div>
      <div className="buttons">
      <button class="button-77 start" role="button" onClick={SpeechRecognition.startListening}>Start</button>
      <button class="button-77 stop" role="button" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button class="button-77 clear" role="button" onClick={resetTranscript}>Reset</button>
      </div>
      <p className="text">{transcript}</p>
      
    </div>
  );
};
export default Dictaphone;
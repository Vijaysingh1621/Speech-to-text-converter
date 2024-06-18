import React, { useState, useEffect } from 'react';
import "./index.css"

const Index = () => {
  
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
  
    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
      if (!SpeechRecognition) {
        alert("Your browser does not support the Web Speech API.");
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onstart = () => {
        console.log("Listening started...");
      };
  
      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        
        setInterimTranscript(interim);
        setTranscript(final);
      };
  
      recognition.onend = () => {
        console.log("Listening stopped.");
      };
  
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
  
      return () => {
        recognition.stop();
      };
    }, [isListening]);
 
    const clearInput=()=>{
        setInterimTranscript("")
        setTranscript("")
    }


  return (
    <div className="container">
      <h2 style={{fontSize:"30px"}}>Speech to Text Converter</h2>
      <h3>Microphone:{isListening?"ON":"off"}</h3>
      <div className="buttons">
      <button onClick={() => setIsListening(true)}>Start</button>
      <button onClick={() => setIsListening(false)}>Stop</button>
      <button onClick={()=>clearInput()}>Clear</button>
      </div>
      <div className="text">
      <p><strong>Interval:</strong> {interimTranscript}</p>
      <p><strong>Final:</strong> {transcript}</p>
      </div>
    </div>
  );
}



  

export default Index

import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution:{width:640, height:480}, scale:0.8
    });
    setInterval(()=>{
      detect(net)
    }, 100)
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current!== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState ===4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      console.log(face);
    }
  }

  runFacemesh();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}/>
        <canvas ref={canvasRef}/>
      </header>
    </div>
  )
}

export default App

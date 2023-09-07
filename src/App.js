import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import "./App.css";
import ProgressBar from "@ramonak/react-progress-bar";
import ReviewComponent from "./Components/ReviewComponent";
import { useTimer } from "use-timer";
import { VscDebugStart } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";

function App() {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedVideoChunks, setRecordedVideoChunks] = useState([]);
  const [recordedAudioChunks, setRecordedAudioChunks] = useState([]);
  const videoMediaRecorderRef = useRef(null);
  const audioMediaRecorderRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [text, setText] = useState(null);
  const { time, start, pause, reset } = useTimer({
    initialTime: 120,
    timerType: "DECREMENTAL",
  });
  const [minuteDisplay, setMinuteDisplay] = useState(2);
  const [secTensDisplay, setSecTensDisplay] = useState(0);
  const [secOnesDisplay, setSecOnesDisplay] = useState(0);

  useEffect(() => {
    if (time <= 0) {
      pause();
    }
    const minutes = Math.floor(time / 60);
    setMinuteDisplay(minutes);
    const seconds = Math.ceil(time % 60);
    if (seconds < 10) {
      setSecTensDisplay(0);
    } else {
      setSecTensDisplay(Math.floor(seconds / 10));
    }
    setSecOnesDisplay(Math.ceil(seconds % 10));
  }, [time, pause]);

  return (
    <div class="w-screen h-screen flex justify-start items-center flex lato flex-col bg-zinc-900 p-10px">
      <div class="w-full h-[120px] bg-black rounded-md overflow-hidden text-white">
        <ProgressBar
          completed={time}
          isLabelVisible={false}
          bgColor="#fff"
          baseBgColor="black"
          maxCompleted={120}
          borderRadius="0px"
          height="10px"
        />
        <div
          class="w-full bg-black flex justify-between items-center pl-20px pr-10px"
          style={{ height: "calc(100% - 10px)" }}
        >
          <div class="kanit text-[2rem] font-bold">
            Why do you want to work at Google?
          </div>
          <div class="flex justify-center items-center kanit gap-10px bg-zinc-900 pt-5px pb-5px pl-10px pr-10px rounded-md">
            <div class="flex gap-5px justify-center items-center">
              <div class="w-[40px] h-[50px] bg-black rounded-md flex justify-center items-center text-[2rem]">
                {minuteDisplay}
              </div>
              <div class="text-[40px] text-white flex justify-center items-center pb-10px">
                :
              </div>
              <div class="flex gap-5px">
                <div class="w-[40px] h-[50px] bg-black rounded-md flex justify-center items-center text-[2rem]">
                  {secTensDisplay}
                </div>
                <div class="w-[40px] h-[50px] bg-black rounded-md flex justify-center items-center text-[2rem]">
                  {secOnesDisplay}
                </div>
              </div>
            </div>
            <div className="text-[1.2rem] kanit font-bold "> Left</div>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex">
        <div class="w-5/6 h-full flex justify-center items-center pt-10px pr-5px">
          <div class="w-full h-full bg-black rounded-md flex justify-center items-center p-10px">
            <Webcam
              mirrored={true}
              audio={true}
              ref={webcamRef}
              muted={true}
              class="border-black border-2 border-solid"
              videoConstraints={{
                width: { min: 200, max: 200 },
                height: { min: 450, max: 450 },
                aspectRatio: "1.77",
              }}
            />
          </div>
        </div>
        <div class="w-1/6 h-full flex justify-center items-start pt-10px pl-5px">
          <div class="w-full h-content bg-black rounded-md flex justify-start items-center p-10px flex-col gap-10px">
            <div
              class="text-white bg-zinc-900 w-full p-10px rounded-lg text-[1.3rem] flex justify-start items-center gap-10px cursor-pointer select-none kanit"
              onClick={start}
            >
              <VscDebugStart />
              Start Recording
            </div>
            <div class="text-white bg-zinc-900 w-full p-10px rounded-lg text-[1.3rem] flex justify-start items-center gap-10px cursor-pointer select-none kanit">
              <RxCross1 />
              Cancel Attempt
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={start}>Start</button> */}
    </div>
    // <ReviewComponent />
  );
}

export default App;

//  <div class="flex flex-col gap-10">
//    {!url && (
//      <Webcam
//        mirrored={true}
//        audio={true}
//        ref={webcamRef}
//        muted={true}
//        class="border-black border-2 border-solid"
//        videoConstraints={{
//          width: { min: 800, max: 800 },
//          height: { min: 450, max: 450 },
//          aspectRatio: "1.77",
//        }}
//      />
//    )}
//    {url && (
//      <video controls src={url} class="border-black border-2 border-solid" />
//    )}
//    <div class="w-full flex justify-center gap-10">
//      {capturing ? (
//        <button
//          class="bg-black text-white p-2 rounded-md"
//          onClick={handleStopCaptureClick}
//        >
//          Stop Capture
//        </button>
//      ) : (
//        <button
//          class="bg-black text-white p-2 rounded-md"
//          onClick={handleStartCaptureClick}
//        >
//          Start Capture
//        </button>
//      )}
//      {recordedVideoChunks.length > 0 && (
//        <button
//          class="bg-black text-white p-2 rounded-md"
//          onClick={handleDownload}
//        >
//          Download
//        </button>
//      )}
//    </div>
//    <div
//      class="rounded-md text-white"
//      style={{
//        width: "100%",
//        height: "100px",
//        backgroundColor: "black",
//        padding: "10px",
//        maxWidth: "644px",
//        overflow: "scroll",
//      }}
//    >
//      {text}
//    </div>
//  </div>;

// const handleStartCaptureClick = useCallback(() => {
//   setRecordedAudioChunks([]);
//   setRecordedVideoChunks([]);
//   setUrl(null);
//   setCapturing(true);
//   const stream = webcamRef.current.stream;
//   const audioTrack = stream.getAudioTracks()[0];

//   videoMediaRecorderRef.current = new MediaRecorder(
//     webcamRef.current.stream,
//     {
//       mimeType: "video/webm",
//     }
//   );
//   videoMediaRecorderRef.current.addEventListener(
//     "dataavailable",
//     ({ data }) => {
//       if (data.size > 0) {
//         setRecordedVideoChunks((prev) => prev.concat(data));
//       }
//     }
//   );
//   videoMediaRecorderRef.current.start();
//   audioMediaRecorderRef.current = new MediaRecorder(
//     new MediaStream([audioTrack]),
//     {
//       mimeType: "audio/webm",
//     }
//   );
//   audioMediaRecorderRef.current.addEventListener(
//     "dataavailable",
//     ({ data }) => {
//       if (data.size > 0) {
//         setRecordedAudioChunks((prev) => prev.concat(data));
//       }
//     }
//   );
//   audioMediaRecorderRef.current.start();
// }, [webcamRef, setRecordedVideoChunks, setRecordedAudioChunks]);

// const handleStopCaptureClick = useCallback(() => {
//   videoMediaRecorderRef.current.stop();
//   audioMediaRecorderRef.current.stop();
//   setCapturing(false);
// }, [videoMediaRecorderRef, audioMediaRecorderRef, setCapturing]);

// const handleDownload = useCallback(async () => {
//   if (recordedVideoChunks.length) {
//     const videoBlob = new Blob(recordedVideoChunks, {
//       type: "video/webm",
//     });

//     const temp_url = URL.createObjectURL(videoBlob);
//     setUrl(temp_url);
//   }
//   if (recordedAudioChunks.length) {
//     const audioBlob = new Blob(recordedAudioChunks, {
//       type: "audio/webm",
//     });

//     let formData = new FormData();
//     formData.append("audio-file", audioBlob);

//     await fetch("http://localhost:3001/whisper", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res.text);
//         setText(res.text);
//       });
//   }
// }, [recordedAudioChunks, recordedVideoChunks]);

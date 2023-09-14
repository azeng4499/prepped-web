import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import ProgressBar from "@ramonak/react-progress-bar";
import { useTimer } from "use-timer";
import { VscDebugStart } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setVideoUrl, setTranscription } from "../Store/Actions";
import { GiFinishLine } from "react-icons/gi";

const RecordComponent = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const webcamDivRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedVideoChunks, setRecordedVideoChunks] = useState([]);
  const [recordedAudioChunks, setRecordedAudioChunks] = useState([]);
  const videoMediaRecorderRef = useRef(null);
  const audioMediaRecorderRef = useRef(null);
  const { time, start, pause } = useTimer({
    initialTime: 120,
    timerType: "DECREMENTAL",
  });
  const [minuteDisplay, setMinuteDisplay] = useState(2);
  const [secTensDisplay, setSecTensDisplay] = useState(0);
  const [secOnesDisplay, setSecOnesDisplay] = useState(0);
  const [webcamDivDim, setWebcamDivDim] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    if (webcamDivRef.current) {
      setWebcamDivDim({
        width: webcamDivRef.current.clientWidth,
        height: webcamDivRef.current.clientHeight,
      });
      console.log(
        webcamDivRef.current.clientWidth,
        webcamDivRef.current.clientHeight
      );
    }
  }, [webcamDivRef]);

  const handleBackend = async () => {
    if (recordedVideoChunks.length) {
      const videoBlob = new Blob(recordedVideoChunks, {
        type: "video/webm",
      });
      const temp_url = URL.createObjectURL(videoBlob);
      dispatch(setVideoUrl(temp_url));
    }

    if (recordedAudioChunks.length) {
      const audioBlob = new Blob(recordedAudioChunks, {
        type: "audio/webm",
      });

      let formData = new FormData();
      formData.append("audio-file", audioBlob);

      await fetch("http://localhost:4000/whisper", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          dispatch(setTranscription(res.transcription));
        });
    }
  };

  useEffect(() => {
    handleBackend();
  }, [recordedVideoChunks]);

  const handleStartCaptureClick = useCallback(() => {
    start();
    setRecordedAudioChunks([]);
    setRecordedVideoChunks([]);
    setCapturing(true);
    const stream = webcamRef.current.stream;
    const audioTrack = stream.getAudioTracks()[0];

    videoMediaRecorderRef.current = new MediaRecorder(
      webcamRef.current.stream,
      {
        mimeType: "video/webm",
      }
    );
    videoMediaRecorderRef.current.addEventListener(
      "dataavailable",
      ({ data }) => {
        if (data.size > 0) {
          setRecordedVideoChunks((prev) => prev.concat(data));
        }
      }
    );
    videoMediaRecorderRef.current.start();
    audioMediaRecorderRef.current = new MediaRecorder(
      new MediaStream([audioTrack]),
      {
        mimeType: "audio/webm",
      }
    );
    audioMediaRecorderRef.current.addEventListener(
      "dataavailable",
      ({ data }) => {
        if (data.size > 0) {
          setRecordedAudioChunks((prev) => prev.concat(data));
        }
      }
    );
    audioMediaRecorderRef.current.start();
  }, [webcamRef, setRecordedVideoChunks, setRecordedAudioChunks]);

  const handleStopCaptureClick = useCallback(() => {
    videoMediaRecorderRef.current.stop();
    audioMediaRecorderRef.current.stop();
    setCapturing(false);
    pause();
  }, [videoMediaRecorderRef, audioMediaRecorderRef, setCapturing]);

  return (
    <div class="w-screen h-screen flex justify-start items-center flex lato flex-col bg-zinc-900 p-10px">
      <div class="w-full h-[120px] bg-black rounded-md overflow-hidden text-white min-h-[120px]">
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
          <div class="merriweather text-[2rem]">
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
      <div class="w-full flex" style={{ height: "calc(100vh - 140px)" }}>
        <div class="w-5/6 h-full flex justify-center items-center pt-10px pr-5px">
          <div
            class="w-full h-full bg-black rounded-md flex justify-center items-center p-10px overflow-hidden"
            ref={webcamDivRef}
          >
            <Webcam
              mirrored={true}
              audio={true}
              ref={webcamRef}
              muted={true}
              videoConstraints={{
                width: webcamDivDim.width - 20,
                height: webcamDivDim.height - 20,
                facingMode: "user",
                frameRate: 30,
              }}
              class="border-black border-2 border-solid"
            />
          </div>
        </div>
        <div class="w-1/6 h-full flex justify-center items-start pt-10px pl-5px">
          <div class="w-full h-content bg-black rounded-md flex justify-start items-center p-10px flex-col gap-10px">
            {capturing ? (
              <div
                class="text-white bg-purple-500 w-full p-10px rounded-lg text-[1.3rem] flex justify-start items-center gap-15px cursor-pointer select-none kanit"
                onClick={handleStopCaptureClick}
              >
                <GiFinishLine />
                Finish
              </div>
            ) : (
              <div
                class="text-white bg-zinc-900 w-full p-10px rounded-lg text-[1.3rem] flex justify-start items-center gap-15px cursor-pointer select-none kanit"
                onClick={handleStartCaptureClick}
              >
                <VscDebugStart />
                Start Recording
              </div>
            )}
            <div class="text-white bg-zinc-900 w-full p-10px rounded-lg text-[1.3rem] flex justify-start items-center gap-15px cursor-pointer select-none kanit">
              <RxCross1 />
              Cancel Attempt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordComponent;

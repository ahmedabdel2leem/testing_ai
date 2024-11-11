import React, { useState, useRef, useEffect } from "react";
import { changeAcess } from "../../../store/camerAcess/CamerAcsess";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { sendCapturedImage } from "../../../store/sendImage/sendImageSlice";

const VideoCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const { camerIsAcsessable } = useAppSelector((state) => state.cameraAcsess);
  const [stream, Setstream] = useState<any>();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.oncanplay = () => setIsVideoReady(true);
        }
        Setstream(stream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setIsVideoReady(false);
        stopRecording();
      }
    };

    if (camerIsAcsessable) {
      startWebcam();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [camerIsAcsessable]);

  const captureImage = () => {
    if (
      isVideoReady &&
      canvasRef.current &&
      videoRef.current &&
      camerIsAcsessable
    ) {
      const context = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      context?.drawImage(
        video,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      return canvasRef.current.toDataURL("image/png");
    }
    return null;
  };

  const startRecording = () => {
    setIsRecording(true);
    const id = setInterval(() => {
      const capturedImage = captureImage();
      if (capturedImage && token) {
        dispatch(sendCapturedImage({ base64String: capturedImage, token }));
      }
    }, 10000); // Capture every 10 seconds
    setIntervalId(id);
  };

  const stopRecording = () => {
    if (stream) {
      const tracks = stream.getTracks(); // Get all tracks (audio/video)
      tracks.forEach((track: any) => track.stop()); // Stop each track
      Setstream(null); // Optional: S
    }

    videoRef.current = null;
    captureImage();
    dispatch(changeAcess(false));
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (isVideoReady && !isRecording) {
      startRecording();
    } else if (!camerIsAcsessable) {
      stopRecording();
    }
  }, [isVideoReady, camerIsAcsessable, isRecording]);

  return (
    <div className='overflow-hidden'>
      <video
        className='absolute inset-0 invisible'
        ref={videoRef}
        width='1'
        height='1'
        autoPlay
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default VideoCapture;

export const setVideoUrl = (url) => {
  return {
    type: "SET_VIDEO_URL",
    payload: url,
  };
};

export const setTranscription = (transcription) => {
  return {
    type: "SET_TRANSCRIPTION",
    payload: transcription,
  };
};

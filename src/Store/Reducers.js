const defaultState = {
  url: null,
  transcription: null,
};

const Reducers = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "SET_VIDEO_URL":
      return setVideoUrl(state, action);
    case "SET_TRANSCRIPTION":
      return setTranscription(state, action);
    default:
      return { ...state };
  }
};

const setVideoUrl = (state, action) => {
  return {
    ...state,
    url: action.payload,
  };
};

const setTranscription = (state, action) => {
  return {
    ...state,
    transcription: action.payload,
  };
};

export default Reducers;

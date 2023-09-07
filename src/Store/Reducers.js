const defaultState = {
  url: null,
};

const Reducers = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "SET_VIDEO_URL":
      return setVideoUrl(state, action);
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

export default Reducers;
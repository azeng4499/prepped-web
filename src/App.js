import React from "react";
import "./App.css";
import ReviewComponent from "./Components/ReviewComponent";
import RecordComponent from "./Components/RecordComponent";
import HomeComponent from "./Components/HomeComponent";
import { useSelector } from "react-redux";

function App() {
  // const url = useSelector((state) => state.url);
  // return url ? <ReviewComponent /> : <RecordComponent />;
  return <HomeComponent />;
}

export default App;

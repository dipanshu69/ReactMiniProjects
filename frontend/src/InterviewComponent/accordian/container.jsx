import React, { useState } from "react";
import "./container.css";

const Container = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { question, answer } = item;

  return (
    <div className="infoContainer">
      <div className="subInfo">
        <h4>{question}</h4>
        <button onClick={() => setShowAnswer(!showAnswer)}>+</button>
      </div>
      {showAnswer ? <p>{answer}</p> : null}
    </div>
  );
};

export default Container;

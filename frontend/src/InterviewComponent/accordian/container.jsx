import React, { useEffect, useState } from "react";
import "./container.css";

const Container = ({
  item,
  id,
  setSelected,
  selected,
  multiSelect,
  setMultiSelect,
  enableMultiSelect,
}) => {
  const { question, answer } = item;

  const handleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelection = (id) => {
    const newArray = [...multiSelect];
    const findIndexOfCurrentId = newArray.indexOf(id);
    if (findIndexOfCurrentId === -1) newArray.push(id);
    else newArray.splice(findIndexOfCurrentId, 1);
    setMultiSelect(newArray);
  };



  return (
    <div
      className="infoContainer"
      onClick={
        enableMultiSelect
          ? () => handleMultiSelection(id)
          : () => handleSelection(id)
      }
    >
      <div className="subInfo">
        <h4>{question}</h4>
        <span>+</span>
      </div>
      {enableMultiSelect
        ? multiSelect.indexOf(id) !== -1 && <p>{answer}</p>
        : selected === id && <p>{answer}</p>}
    </div>
  );
};

export default Container;

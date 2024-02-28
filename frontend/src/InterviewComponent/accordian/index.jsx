import { useState } from "react";
import data from "./data";
import "./style.css";
import Container from "./container";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [word, setWord] = useState("Enable");
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);

  const handleClick = () => {
    word === "Enable" ? setWord("Disabled") : setWord("Enable");
    setEnableMultiSelect(!enableMultiSelect);
  };

  return (
    <div className="wrapper">
      <div className="accordian">
        {data && data.length > 0 ? (
          <div>
            <button onClick={handleClick}>{`${word} Multi Selection`}</button>
            {data.map((item, index) => {
              return (
                <Container
                  item={item}
                  key={item.id}
                  id={item.id}
                  setSelected={setSelected}
                  selected={selected}
                  multiSelect={multiSelect}
                  setMultiSelect={setMultiSelect}
                  enableMultiSelect={enableMultiSelect}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;

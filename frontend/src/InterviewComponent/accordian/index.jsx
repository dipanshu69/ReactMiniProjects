import { useState } from "react";
import data from "./data";
import "./style.css";
import Container from "./container";

const Accordion = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="wrapper">
      <div className="accordian">
        {data && data.length > 0 ? (
          <div>
            <button>Enable Multi Selection</button>
            {data.map((item, index) => {
              return <Container item={item} key={item.id} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;

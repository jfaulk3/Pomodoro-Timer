import React from "react";
import TimeSet from "./TimeSet";

function TimeContainer({ time, changeTime }) {
  return (
    <div className="row justify-content-around">
      <TimeSet
        type={"Focus"}
        time={time}
        changeTime={changeTime}
        max={3600}
        min={300}
        skipVal={300}
      />
      <TimeSet
        type={"Break"}
        time={time}
        changeTime={changeTime}
        max={900}
        min={60}
        skipVal={60}
      />
    </div>
  );
}

export default TimeContainer;

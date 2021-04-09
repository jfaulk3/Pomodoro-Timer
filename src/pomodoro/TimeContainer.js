import React from "react";
import TimeSet from "./TimeSet";

function TimeContainer({ time, changeTime }) {
  return (
    <div className="row justify-content-around">
      <TimeSet
        type={"Focus"}
        time={time.focus}
        changeTime={changeTime}
        max={60}
        min={5}
        skipVal={5}
      />
      <TimeSet
        type={"Break"}
        time={time.break}
        changeTime={changeTime}
        max={15}
        min={1}
        skipVal={1}
      />
    </div>
  );
}

export default TimeContainer;

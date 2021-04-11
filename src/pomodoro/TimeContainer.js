import React from "react";
import TimeSet from "./TimeSet";

function TimeContainer({ time, changeTime }) {
  return (
    <div className="row justify-content-around">
      <TimeSet
        type={"Focus"}
        time={time}
        changeTime={changeTime}
        maxTimeAllowed={3600}
        minTimeAllowed={300}
        adjustDuration={300}
      />
      <TimeSet
        type={"Break"}
        time={time}
        changeTime={changeTime}
        maxTimeAllowed={900}
        minTimeAllowed={60}
        adjustDuration={60}
      />
    </div>
  );
}

export default TimeContainer;

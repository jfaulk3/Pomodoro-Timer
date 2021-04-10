import React from "react";
import { minutesToDuration } from "../utils/duration/index";

function TimeSet({ type, time, changeTime, max, min, skipVal }) {
  const mode = type === "Focus" ? "timeFocus" : "timeBreak";
  const displayTime = minutesToDuration(time[mode] / 60);
  const handleClick = (value) => {
    changeTime(mode, Math.min(Math.max(time[mode] + value, min), max));
  };

  return (
    <div className="col-4">
      <div className="input-group input-group-lg mb-2">
        <span
          className="input-group-text"
          data-testid={`duration-${type.toLowerCase()}`}
        >
          {/* TODO: Update this text to display the current focus session duration */}
          {type} Duration: {displayTime}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`decrease-${type.toLowerCase()}`}
            onClick={() => {
              handleClick(skipVal * -1);
            }}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={`increase-${type.toLowerCase()}`}
            onClick={() => {
              handleClick(skipVal);
            }}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeSet;

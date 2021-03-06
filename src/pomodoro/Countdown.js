import React from "react";
import { secondsToDuration } from "../utils/duration/index";

function Countdown({ time, timeRemaining }) {
  if (!time.hasBegun) return null;
  const mode = time.isFocus ? "timeFocus" : "timeBreak";
  const message = time.isFocus ? "Focusing" : "On Break";
  const displayTime = secondsToDuration(time[mode]);
  const timeLeft = secondsToDuration(timeRemaining);
  const progress = 100 - (timeRemaining / time[mode]) * 100;
  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {message} for {displayTime} minutes
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {timeLeft} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${progress}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;

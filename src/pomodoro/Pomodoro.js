import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import TimeContainer from "./TimeContainer";
import Countdown from "./Countdown";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const initialState = {
    //Default times in seconds
    timeFocus: 1500,
    timeBreak: 300,
    isFocus: true,
    hasBegun: false,
  };

  const [time, setTime] = useState({ ...initialState });
  const [timeRemaining, setTimeRemaining] = useState(0);
  const changeTime = (type, value, test = false) => {
    setTime({ ...time, [type]: value });
  };
  const changeTimeRemaining = (value) => setTimeRemaining(value);

  const stopTimer = () => {
    setTime(initialState);
    setIsTimerRunning(false);
  };

  const runCountdown = () => {
    if (timeRemaining === 0) {
      const value = time.isFocus ? time.timeBreak : time.timeFocus;
      changeTime("isFocus", !time.isFocus);
      changeTimeRemaining(value);
      console.log(value, timeRemaining);
    } else {
      changeTimeRemaining(timeRemaining - 1);
    }
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      runCountdown();
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!time.hasBegun) {
      changeTimeRemaining(time.timeFocus);
    }
    changeTime("hasBegun", true);
    setIsTimerRunning((prevState) => !prevState);
  }
  return (
    <div className="pomodoro">
      <TimeContainer time={time} changeTime={changeTime} />
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopTimer}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Countdown time={time} timeRemaining={timeRemaining} />
    </div>
  );
}

export default Pomodoro;

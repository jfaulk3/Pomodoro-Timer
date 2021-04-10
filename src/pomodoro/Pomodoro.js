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
    timeRemaining: 0,
    hasBegun: false,
  };

  const [time, setTime] = useState({ ...initialState });
  const changeTime = (type, value) => {
    console.log(type, value);
    setTime({
      ...time,
      [type]: value,
    });
  };

  const beginTimer = () => {
    if (!time.hasBegun) {
      changeTime("timeRemaining", time.timeFocus);
    }
    changeTime("hasBegun", true);
  };

  const stopTimer = () => {
    setTime(initialState);
    setIsTimerRunning(false);
  };

  const checkZero = () => {
    if (time.timeRemaining === 0) {
      const value = time.isFocus ? time.timeBreak : time.timeFocus;
      setTime({
        ...time,
        isFocus: !time.isFocus,
        timeRemaining: value,
      });
    }
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      checkZero();
      changeTime(time.timeRemaining, time.timeRemaining - 1);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    beginTimer();
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
      <Countdown time={time} />
    </div>
  );
}

export default Pomodoro;

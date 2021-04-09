import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import TimeContainer from "./TimeContainer";
import Countdown from "./Countdown";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const initialState = {
    //Default times in minutes
    focus: 25,
    break: 5,
    isFocus: true,
    counter: 0,
  };

  const [time, setTime] = useState({ ...initialState });
  const [hasBegun, setHasBegun] = useState(false);
  const changeTime = (type, value) => {
    setTime({
      ...time,
      [type]: value,
    });
  };

  const begun = () => {
    if (!hasBegun) {
      changeTime("counter", time.focus * 60);
    }
    setHasBegun(true);
  };

  const stopTimer = () => {
    setTime(initialState);
    setIsTimerRunning(false);
    setHasBegun(false);
  };
  const checkZero = () => {
    if (time.counter === 0) {
      const value = time.isFocus ? time.break : time.focus;
      setTime({
        ...time,
        isFocus: !time.isFocus,
        counter: value,
      });
    }
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      checkZero();
      time.counter--;
    },
    isTimerRunning ? 1000 : null
  );
  function playPause() {
    begun();
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
      <Countdown time={time} hasBegun={hasBegun} />
    </div>
  );
}

export default Pomodoro;

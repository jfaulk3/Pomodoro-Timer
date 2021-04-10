import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import TimeContainer from "./TimeContainer";
import Countdown from "./Countdown";
import PlayStop from "./PlayStop";

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
  const changeTime = (type, value) => {
    setTime({ ...time, [type]: value });
  };
  const changeTimeRemaining = (value) => setTimeRemaining(value);

  const stopTimer = () => {
    setTime(initialState);
    setTimeRemaining(0);
    setIsTimerRunning(false);
  };

  const runCountdown = () => {
    if (timeRemaining === 0) {
      playAudio();
      const value = time.isFocus ? time.timeBreak : time.timeFocus;
      changeTime("isFocus", !time.isFocus);
      changeTimeRemaining(value);
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

  const playAudio = () => {
    const alarm = new Audio("/public/alarm/goes-without-saying-608.mp3");
    alarm.play();
  };

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
      <PlayStop
        stopTimer={stopTimer}
        isTimerRunning={isTimerRunning}
        playPause={playPause}
      />
      <Countdown time={time} timeRemaining={timeRemaining} />
    </div>
  );
}

export default Pomodoro;

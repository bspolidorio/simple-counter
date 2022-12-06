import { useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

const App = () => {
  const [tasks, setTasks] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval>>();

  const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  const hours = ("0" + Math.floor(time / 3600000)).slice(-2);

  const reset = () => {
    setTasks(0);
    setTime(0);
  };

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return;
    }
    clearInterval(interval.current);
    interval.current = undefined;

    return () => clearInterval(interval.current);
  }, [running]);

  return (
    <div className="container">
      <div className="timer-body">
        <div className="timer-screen">
          <BsFillTrashFill onClick={reset} color="white" cursor="pointer" />
          <div className="timer-time">
            {hours} : {minutes} : {seconds}
          </div>
        </div>
        <div className="timer-button-row">
          {running === false && time === 0 && (
            <button className="play button" onClick={() => setRunning(true)}>
              Start
            </button>
          )}
          {running === true && (
            <button className="pause button" onClick={() => setRunning(false)}>
              Pause
            </button>
          )}
          {running === false && time > 0 && (
            <button className="play button" onClick={() => setRunning(true)}>
              Resume
            </button>
          )}
        </div>
        <div className="timer-button-row">
          <div
            className="button"
            onClick={() => setTasks((oldValue) => oldValue + 1)}
          >
            Task
          </div>
          <div className="counter">{tasks}</div>
        </div>
      </div>
    </div>
  );
};

export default App;

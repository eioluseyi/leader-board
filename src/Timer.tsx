import { useProTime } from "@toluade/protime-react-component";
import * as React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "./hooks";

const Timer = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = React.useState(false);

  const startValue = import.meta.env.VITE_TIME_START;
  const endValue = import.meta.env.VITE_TIME_END;

  const startDate = React.useMemo(
    () => (startValue ? new Date(startValue) : new Date()),
    []
  );
  const endDate = React.useMemo(
    () => (endValue ? new Date(endValue) : new Date()),
    []
  );

  const { hours, minutes, seconds } = useProTime(startDate, endDate, true);

  const isStarted = new Date().getTime() - startDate.getTime() >= -1000;
  const isEnded = new Date().getTime() - endDate.getTime() >= -1000;

  React.useEffect(() => {
    if (!endValue) return;
    if (!isStarted) return;
    if (!isEnded) return;

    setShowConfetti(true);
  }, [isStarted, isEnded]);

  return (
    <>
      <div className="font-bold text-3xl text-center text-white tabular-nums">
        {showConfetti ? (
          <Confetti
            width={width}
            height={height}
            wind={0.01}
            gravity={0.05}
            confettiSource={{ x: 10, y: 40, w: 150, h: 0 }}
          />
        ) : null}
        {showConfetti ? (
          <span>Time Up!</span>
        ) : (
          <>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </>
        )}
      </div>
    </>
  );
};

export default Timer;

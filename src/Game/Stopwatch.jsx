import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

const Stopwatch = forwardRef(({ gameStart, gameOver, setFinalTime }, ref) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameStart) {
      setTime(0);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [gameStart]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalRef.current);
      setFinalTime(time);
    }
  }, [gameOver, time, setFinalTime]);

  useImperativeHandle(ref, () => ({
    resetTime: () => setTime(0),
  }));

  return <p>{time > 0 && `Time: ${time} s`}</p>;
});

Stopwatch.displayName = "Stopwatch";

export default Stopwatch;

Stopwatch.propTypes = {
  gameStart: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  setFinalTime: PropTypes.func.isRequired,
};

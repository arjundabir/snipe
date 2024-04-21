import React, { useState, useEffect } from 'react';

function Timer() {
  // State to keep track of the timer count
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up an interval that triggers every 1000 milliseconds (1 second)
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);  // Increment the seconds state
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    // Pad the numbers to two digits with leading zeros
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secondsLeft).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  // Format seconds as MM:ss
  const formattedTime = formatTime(seconds);

  return (
    <div>
      <p>{formattedTime}</p> {/* Display formatted time */}
    </div>
  );
}

export default Timer;

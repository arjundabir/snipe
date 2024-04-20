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

  return (
    <div>
      <h1>Timer</h1>
      <p>{seconds} seconds have elapsed since component mounted.</p>
    </div>
  );
}

export default Timer;
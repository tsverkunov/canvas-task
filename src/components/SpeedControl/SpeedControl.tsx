import React from "react";

interface SpeedControlProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

function SpeedControl({speed, setSpeed}: SpeedControlProps) {

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value));
  };

  return (
    <div>
      <h3>Скорость Мага: {speed}</h3>
      <input
        type="range"
        min="1"
        max="5"
        value={speed}
        onChange={handleSpeedChange}
      />
    </div>
  );
}

export default SpeedControl;

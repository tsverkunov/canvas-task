import React from "react";

interface SpellIntensiveProps {
  frequency: number;
  setFrequency: (frequency: number) => void;
}

function SpellFrequency({frequency, setFrequency}: SpellIntensiveProps) {

  // Функция-обработчик для изменения скорости
  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(Number(event.target.value));
  };

  return (
    <div>
      <h3>Частота заклинаний: {frequency}</h3>
      <input
        type="range"
        min="1"
        max="5"
        value={frequency}
        onChange={handleSpeedChange}
      />
    </div>
  );
}

export default SpellFrequency;

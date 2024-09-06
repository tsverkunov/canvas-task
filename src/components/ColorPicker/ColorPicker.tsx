import React, {useRef} from "react";
import styles from './ColorPicker.module.css';
import clsx from "clsx";

interface ColorPickerProps {
  title: string;
  visibleMenu: boolean;
  color: string;
  setColor: (color: string) => void;
}

function ColorPicker({title, visibleMenu, color, setColor}: ColorPickerProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
    if (selectRef.current) {
      selectRef.current.size = 1;
    }
  }

  const openSelect = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.size = 5;
    }
  }
  return (
    <div className={clsx(styles.menu, visibleMenu && styles.menuVisible)}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        <div className={styles.example} style={{backgroundColor: color}} onClick={openSelect}></div>
        <select
          value={color}
          onChange={handleColorChange}
          ref={selectRef}
          onBlur={() => {
            if (selectRef.current) {
              selectRef.current.size = 1
            }
          }}>
          <option value="red">Красный</option>
          <option value="green">Зеленый</option>
          <option value="blue">Синий</option>
          <option value="yellow">Желтый</option>
          <option value="purple">Фиолетовый</option>
        </select>
      </div>
    </div>
  );
}

export default ColorPicker;

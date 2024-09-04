import {useRef, useEffect, Dispatch, SetStateAction} from 'react';

interface CanvasComponentProps {
  speedRed: number;
  speedGreen: number;
  spellFrequencyGreen: number;
  spellFrequencyRed: number;
  colorSpellGreen: string;
  colorSpellRed: string;
  showMenuGreen: () => void;
  showMenuRed: () => void;
  setRedCount: Dispatch<SetStateAction<number>>;
  setGreenCount: Dispatch<SetStateAction<number>>;
}

const CanvasComponent = ({
                           speedRed,
                           speedGreen,
                           spellFrequencyGreen,
                           spellFrequencyRed,
                           setRedCount,
                           setGreenCount,
                           colorSpellRed,
                           colorSpellGreen,
                           showMenuGreen,
                           showMenuRed
                         }: CanvasComponentProps) => {
  const widthCanvas = 900;
  const heightCanvas = 700;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleRadius = 50;
  const borderWidth = 2;
  const spellRadius = 20;
  const circlePadding = circleRadius + borderWidth;
  const greenPositionRef = useRef(circlePadding);
  const greenDirectionRef = useRef(1);
  const redPositionRef = useRef(circlePadding);
  const redDirectionRef = useRef(1);
  const greenSpellPositionXRef = useRef(circlePadding * 2);
  const greenSpellPositionYRef = useRef(greenPositionRef.current);
  const redSpellPositionXRef = useRef(widthCanvas - circlePadding * 2);
  const redSpellPositionYRef = useRef(redPositionRef.current);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let mouseX = 0;
    let mouseY = 0;

    const checkCollisions = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;

      // Проверка пересечения с зеленым магом
      const greenCircleX = circlePadding;
      const greenCircleY = greenPositionRef.current;
      const greenDistance = Math.sqrt(
        (mouseX - greenCircleX) ** 2 + (mouseY - greenCircleY) ** 2
      );

      // Проверка пересечения с красным магом
      const redCircleX = canvas.width - circlePadding;
      const redCircleY = redPositionRef.current;
      const redDistance = Math.sqrt(
        (mouseX - redCircleX) ** 2 + (mouseY - redCircleY) ** 2
      );
      return {
        greenDistance,
        redDistance
      }
    }
    const handleMouseMove = (event: MouseEvent) => {
      const {greenDistance, redDistance} = checkCollisions(event);

      // Меняем направление мага при контакте с курсором
      if (greenDistance <= circleRadius) {
        greenDirectionRef.current = -greenDirectionRef.current;
      }
      if (redDistance <= circleRadius) {
        redDirectionRef.current = -redDirectionRef.current;
      }
    };

    const handleClick = (event: MouseEvent) => {
      const {greenDistance, redDistance} = checkCollisions(event);

      if (greenDistance <= circleRadius) {
        showMenuGreen();
      }
      if (redDistance <= circleRadius) {
        showMenuRed();
      }
    };

    let animationFrameId: number;

    const draw = () => {
      context.strokeStyle = 'black';
      context.lineWidth = borderWidth;

      // Очистка канваса
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, canvas.width, canvas.height);

      // Зеленый маг
      context.fillStyle = 'green';
      context.beginPath();
      context.arc(circlePadding, greenPositionRef.current, circleRadius, 0, 2 * Math.PI);
      context.fill();
      // Красный маг
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(canvas.width - circlePadding, redPositionRef.current, circleRadius, 0, 2 * Math.PI);
      context.fill();

      // Заклинание зеленого мага
      context.fillStyle = colorSpellGreen;
      context.beginPath();
      context.arc(greenSpellPositionXRef.current, greenSpellPositionYRef.current, spellRadius, 0, 2 * Math.PI);
      context.fill();
      // Заклинание красного мага
      context.fillStyle = colorSpellRed;
      context.beginPath();
      context.arc(redSpellPositionXRef.current, redSpellPositionYRef.current, spellRadius, 0, 2 * Math.PI);
      context.fill();

      const startNewSpell = (color: string) => {
        switch (color) {
          case 'green':
            greenSpellPositionXRef.current = circlePadding * 2;
            greenSpellPositionYRef.current = greenPositionRef.current;
            break;
          case 'red':
            redSpellPositionXRef.current = canvas.width - circlePadding * 2;
            redSpellPositionYRef.current = redPositionRef.current;
            break;
        }
      }
      // Обновление позиции зеленого мага
      const newGreenPosition = greenPositionRef.current + greenDirectionRef.current * speedGreen;
      if (newGreenPosition <= circlePadding || newGreenPosition >= canvas.height - circlePadding) {
        greenDirectionRef.current = -greenDirectionRef.current;
      }
      greenPositionRef.current = newGreenPosition;
      // Обновление позиции красного мага
      const newRedPosition = redPositionRef.current + redDirectionRef.current * speedRed;
      if (newRedPosition <= circlePadding || newRedPosition >= canvas.height - circlePadding) {
        redDirectionRef.current = -redDirectionRef.current;
      }
      redPositionRef.current = newRedPosition;

      // Обновление позиции заклинания зеленого мага
      const newGreenSpellPosition = greenSpellPositionXRef.current + spellFrequencyGreen;
      if (newGreenSpellPosition >= canvas.width) {
        startNewSpell('green');
      } else {
        greenSpellPositionXRef.current = newGreenSpellPosition;
      }

      // Обновление позиции заклинания красного мага
      const newRedSpellPosition = redSpellPositionXRef.current - spellFrequencyRed;
      if (newRedSpellPosition <= 0) {
        startNewSpell('red');
      } else {
        redSpellPositionXRef.current = newRedSpellPosition;
      }

      // Поподание зеленого мага
      const greenSpellX = greenSpellPositionXRef.current;
      const greenSpellY = greenSpellPositionYRef.current;
      const pointRedX = canvas.width - circlePadding;
      const pointRedY = redPositionRef.current;

      const distance = Math.sqrt((pointRedX - greenSpellX) ** 2 + (pointRedY - greenSpellY) ** 2);
      if (distance <= (spellRadius + circleRadius)) {
        setGreenCount(greenCount => greenCount + 1);
        startNewSpell('green');
      }

      // Поподание красного мага
      const redSpellX = redSpellPositionXRef.current;
      const redSpellY = redSpellPositionYRef.current;
      const pointGreenX = circlePadding;
      const pointGreenY = greenPositionRef.current;

      const distance2 = Math.sqrt((pointGreenX - redSpellX) ** 2 + (pointGreenY - redSpellY) ** 2);
      if (distance2 <= (spellRadius + circleRadius)) {
        setRedCount(redCount => redCount + 1);
        startNewSpell('red');
      }

      // Запрашиваем следующий кадр
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    // Добавляем обработчик события мыши
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Очищаем анимацию при размонтировании компонента
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [circlePadding, speedRed, speedGreen, colorSpellRed, colorSpellGreen, showMenuGreen, showMenuRed]); // Перерисовка при изменении скорости

  return <canvas ref={canvasRef} width={widthCanvas} height={heightCanvas}/>;
};

export default CanvasComponent;

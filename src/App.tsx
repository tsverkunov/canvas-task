import {useState} from 'react'
import './App.css'
import CanvasComponent from "./components/CanvasComponent/CanvasComponent.tsx";
import Score from "./components/Score/Score.tsx";
import ColorPicker from "./components/ColorPicker/ColorPicker.tsx";
import SpeedControl from "./components/SpeedControl/SpeedControl.tsx";
import SpellFrequency from "./components/SpellFrequency/SpellFrequency.tsx";

function App() {
  const [speedRed, setSpeedRed] = useState(1);
  const [speedGreen, setSpeedGreen] = useState(1);
  const [spellFrequencyGreen, setSpellFrequencyGreen] = useState(1);
  const [spellFrequencyRed, setSpellFrequencyRed] = useState(1);
  const [redCount, setRedCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [visibleMenuGreen, setVisibleMenuGreen] = useState(false);
  const [visibleMenuRed, setVisibleMenuRed] = useState(false);
  const [colorSpellGreen, setColorSpellGreen] = useState('green');
  const [colorSpellRed, setColorSpellRed] = useState('red');

  const handleShowGreenMenu = () => {
      setVisibleMenuGreen(!visibleMenuGreen);
  }
  const handleShowRedMenu = () => {
      setVisibleMenuRed(!visibleMenuRed);
  }

  return (
    <>
      <h1>hogwarts</h1>
      <Score
        redCount={redCount}
        greenCount={greenCount}
      />
      <main className="wrapper">
        <section className="container">
          <div className="group">
            <SpeedControl speed={speedGreen} setSpeed={setSpeedGreen}/>
            <SpellFrequency frequency={spellFrequencyGreen} setFrequency={setSpellFrequencyGreen}/>
          </div>
          <ColorPicker
            title={'Цвет заклинания зеленого Мага:'}
            visibleMenu={visibleMenuGreen}
            color={colorSpellGreen}
            setColor={setColorSpellGreen}
          />
        </section>
        <CanvasComponent
          speedRed={speedRed}
          speedGreen={speedGreen}
          spellFrequencyGreen={spellFrequencyGreen}
          spellFrequencyRed={spellFrequencyRed}
          setRedCount={setRedCount}
          setGreenCount={setGreenCount}
          colorSpellGreen={colorSpellGreen}
          colorSpellRed={colorSpellRed}
          showMenuGreen={handleShowGreenMenu}
          showMenuRed={handleShowRedMenu}
        />
        <section className="container">
          <div className="group">
            <SpeedControl speed={speedRed} setSpeed={setSpeedRed}/>
            <SpellFrequency frequency={spellFrequencyRed} setFrequency={setSpellFrequencyRed}/>
          </div>
          <ColorPicker
            title={'Цвет заклинания красного Мага:'}
            visibleMenu={visibleMenuRed}
            color={colorSpellRed}
            setColor={setColorSpellRed}/>
        </section>
      </main>
    </>
  )
}

export default App

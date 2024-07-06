import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

const importAll = (r) => {

  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
 
  return images;

}

const ImageSwap = (number) => {

  const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className={`${styles.app_image_swap}`}>
      <img className={styles.screen} src={images[`m${number.number}.png`]} alt="" draggable="false" /> 
    </div>
  )

}

function App() {

  const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(9);
  const [number2, setNumber2] = useState(1);
  const [number3, setNumber3] = useState(1);
  const [number4, setNumber4] = useState(1);
  const [button, setButton] = useState(11);

  const swap = () => { number <= 41 ? setNumber(number + 1) : setNumber(0) }

  const mouseDown = () => { setButton(12); swap() }
  const mouseUp = () => setButton(11)
  const mouseDown2 = () => { setNumber2(2); }
  const mouseUp2 = () => { setNumber2(1); }
  const mouseDown3 = () => { setNumber3(2); }
  const mouseUp3 = () => { setNumber3(1); }
  const mouseDown4 = () => { setNumber4(2); }
  const mouseUp4 = () => { setNumber4(1); }

  const onClick = () => { number1 === 9 ? setNumber1(10) : setNumber1(9); }

  const copyRU = ' 2016  МеханиКл. Все права защищены.';
  const copyEN = ' 2016  MechanicEl. All rights reserved.';  
  
  const [languageAnimation, setLanguageAnimation] = useState({ animation: '' }); 
  
  const cB = () => { 
    setLanguageAnimation({
      animation: styles.an
    });  
    setTimeout(() => {
      setLanguageAnimation({
        animation: ''
      })
    }, 1000);
  }

  const savedState =  JSON.parse(localStorage.getItem('state'));

  const [state, setState] = useState({
    lang: savedState ? savedState.lang : 'En',
    fp: savedState ? savedState.fp : 'ДИАФИЛЬМ',
    mechani: savedState ? savedState.mechani : 'Механи',
    cel: savedState ? savedState.cel : 'Кл',
    copy: savedState ? savedState.copy : copyRU
  });

  if (state) { localStorage.setItem('state', JSON.stringify(state)); };
 
  const changeL = `${styles.app_language} ` === `${styles.app_language} ${languageAnimation.animation}`;

  const cL = () => {
    if (changeL) {
      cB();
      'Ру' === state.lang ? setState({ 
        lang: 'En', 
        fp: 'ДИАФИЛЬМ', 
        mechani: 'Механи', 
        cel: 'Кл', 
        copy: copyRU }) : setState({ 
          lang: 'Ру', 
          fp: 'FILMSTRIP', 
          mechani: 'Mechani', 
          cel: 'cEl', 
          copy: copyEN });
    }
  }

  useEffect(() => { if (number1 === 10) {
    const interval = setInterval(() => { 
      if (number >= 42) { setNumber(0); } else 
        setNumber(number => number + 1);
    }, 100);
    return () => clearInterval(interval);
  } else return }, [number1, number]);

  return (
    <Router>
      <>
      <AppHeader 
        languageAnimation={languageAnimation} 
        state={state} 
        mouseDown={mouseDown} 
        mouseUp={mouseUp} 
        images={images}
        button={button}
        onClick={onClick}
        number1={number1}
        cL={cL}
        mouseDown3={mouseDown3}
        mouseUp3={mouseUp3}
        number3={number3}
        mouseDown2={mouseDown2}
        mouseUp2={mouseUp2}
        number2={number2} />
      <div className={`${styles.app_body}`} >
        <ImageSwap number={number} />
        <div className={`${styles.mechanicel} ${languageAnimation.animation}`}>
          <h1>
            <img className={`${styles.about} ${languageAnimation.animation}`} onMouseDown={mouseDown4} onMouseUp={mouseUp4} src={images[`icon${number4}.svg`]} alt="logo" draggable="false" />
            <span className={`${styles.mechani} ${languageAnimation.animation}`}>{state.mechani}</span>
            <span className={`${styles.cel} ${languageAnimation.animation}`}>{state.cel}</span>
          </h1>
        </div>
      </div>
      <div><p><span className={`${styles.copy} ${languageAnimation.animation}`}>{state.copy}</span></p></div>
      </>
    </Router>
  );

}

export default App;
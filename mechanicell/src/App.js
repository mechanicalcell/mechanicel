import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import styles from './app.module.css';

const importAll = (r) => {

  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
 
  return images;

}

const ImageSwap = (number) => {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className={`${styles.app_image_swap}`}>
      <img className={styles.screen} src={images[`m${number.number}.png`]} alt="" draggable="false" /> 
    </div>
  )

}

function App() {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

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

  localStorage.setItem('state', JSON.stringify(state));
    
  useEffect(() => { if (number1 === 10) {
    const interval = setInterval(() => { 
      if (number >= 42) { setNumber(0); } else 
        setNumber(number => number + 1);
    }, 100);
    return () => clearInterval(interval);
  } else return }, [number1, number]);

  return (
    <Router><>
    <div className={`${styles.app}`} >
      <header className={`${styles.app_header}`} >
        <div className={`${styles.app_box}`} >
        <span className={`${styles.fp} ${languageAnimation.animation}`} >{state.fp}</span> 
        <div className={`${styles.app_btn12}`} >
          <div className={`${styles.app_button1}`} onMouseDown={mouseDown} onMouseUp={mouseUp} >
            <img src={images[`b${button}.png`]} alt="" draggable="false" /> 
          </div> 
          <div className={`${styles.app_button2}`} onClick={onClick} >
            <img src={images[`b${number1}.png`]} alt="" draggable="false" /> 
          </div> 
        </div>
        </div>
        <div className={`${styles.app_language} ${languageAnimation.animation}`} onClick={cL} >
          <span>{state.lang}</span> 
        </div> 
        <div className={`${styles.app_archive}`} onMouseDown={mouseDown3} onMouseUp={mouseUp3} >
          <img src={images[`x${number3}.png`]} alt="" draggable="false" />
        </div> 
        <Link to='/' className={`${styles.navigation_link}`}>
        <div className={`${styles.app_mask_box}`} onMouseDown={mouseDown2} onMouseUp={mouseUp2}>
        <img src={images[`a${number2}.png`]} alt=" " draggable="false" />
        </div>
        </Link>
      </header>   
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
    </div>
    </>
    </Router>
  );

}

export default App;
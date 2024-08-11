import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppFooter from '../app-footer/app-footer';
import { ArchivePage } from '../../pages/archive-page';
import { LoginPage } from '../../pages/login-page';

const importAll = (r) => {
  let images = {}
  r.keys().forEach((key) => (images[key.replace('./', '')] = r(key)));
  return images
}

const Home = ({ images, numberPicture, languageAnimation, state, styles, mouseDown, mouseUp, onClick, rotarySwitch, toggleSwitch }) => {
  return (
    <>
      <div className={`${styles.rotary_switch}`} onMouseDown={mouseDown} onMouseUp={mouseUp} >
        <img src={images[`r${rotarySwitch}.png`]} alt={`rotary switch ${rotarySwitch}`} draggable="false" /> 
      </div> 
      <div className={`${styles.toggle_switch}`} onClick={onClick} >
        <img src={images[`t${toggleSwitch}.png`]} alt={`toggle switch ${toggleSwitch}`} draggable="false" /> 
      </div> 
      <img src={images[`m${numberPicture}.png`]} alt={`filmstrip ${numberPicture}`} draggable="false" /> 
      <h2 className={`${styles.h2} ${languageAnimation.animation}`}>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
          <rect fill="none" stroke="#9f9f9f" height="13" width="13" x="0.5" y="0.5" viewBox="0 0 14 14" />
        </svg>
        {state.h2}
      </h2>
    </>
  )
}

function Main(props) {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}

function App() {
  const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

  const [numberPicture, setNumberPicture] = useState(0);

  const [rotarySwitch, setRotarySwitch] = useState(1);
  const [toggleSwitch, setToggleSwitch] = useState(1);
  
  const swap = () => { numberPicture <= 41 ? setNumberPicture(numberPicture + 1) : setNumberPicture(0) }

  const mouseDown = () => { setRotarySwitch(2); swap() }
  const mouseUp = () => setRotarySwitch(1)

  const onClick = () => { toggleSwitch === 1 ? setToggleSwitch(2) : setToggleSwitch(1); }

  const [style, addStyle] = useState({ home: '', archive: '', user: '' })
  const [languageAnimation, setLanguageAnimation] = useState({ animation: '' }) 

  const setAnimation = () => { 
    setLanguageAnimation({
      animation: styles.animation
    });  
    setTimeout(() => {
      setLanguageAnimation({
        animation: ''
      })
    }, 1000);
  }

  const changeLanguage = (pathname) => {
    if (pathname === '/') {
      setAnimation();
      'Ру' === state.language ? setState({ 
        language: 'En', 
        mechani: 'Механи', 
        cel: 'кл', 
        copy: ' 2016  Механикл. Все права защищены.',
        h2: ' Механическая клетка' }) : setState({ 
          language: 'Ру', 
          mechani: 'Mechani', 
          cel: 'cel', 
          copy: ' 2016  Mechanicel. All rights reserved.',
          h2: ' Mechanical cell' });
    }
  } 
  
  const savedState =  JSON.parse(localStorage.getItem('state'));

  const [state, setState] = useState({
    language: savedState ? savedState.language : 'En',
    mechani: savedState ? savedState.mechani : 'Механи',
    cel: savedState ? savedState.cel : 'кл',
    copy: savedState ? savedState.copy : ' 2016  Механикл. Все права защищены.',
    h2: savedState ? savedState.h2 : ' Механическая клетка'
  });

  if (state) { localStorage.setItem('state', JSON.stringify(state)); };

  useEffect(() => { if (toggleSwitch === 2) {
    const interval = setInterval(() => { 
      if (numberPicture >= 42) { setNumberPicture(0); } else 
      setNumberPicture(numberPicture => numberPicture + 1);
    }, 100);
    return () => clearInterval(interval);
  } else return }, [toggleSwitch, numberPicture]);

  return (
    <>
      <Router>
        <AppHeader languageAnimation={languageAnimation} state={state} images={images} style={style} addStyle={addStyle} changeLanguage={changeLanguage} />
        <Routes>
          <Route path="/" exact={true} element={<Main><Home images={images} numberPicture={numberPicture} languageAnimation={languageAnimation} state={state} styles={styles} mouseDown={mouseDown} mouseUp={mouseUp} onClick={onClick} rotarySwitch={rotarySwitch} toggleSwitch={toggleSwitch} /></Main>} />
          <Route path="/archive" exact={true} element={<Main><ArchivePage /></Main>} />
          <Route path="/login" exact={true} element={<Main><LoginPage /></Main>} />
        </Routes>
        <AppFooter languageAnimation={languageAnimation} state={state} />
      </Router>
    </>
  );
}

export default App;
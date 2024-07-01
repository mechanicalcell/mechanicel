import React from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';

function importAll(r) {

  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;

}

const ImageSwap = (number) => {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className='App-image-swap'>
      <img src={images[`m${number.number}.png`]} draggable="false" /> 
    </div>
  )

}

function App() {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  const [number, setNumber] = React.useState(0);
  const [number1, setNumber1] = React.useState(9);
  const [number2, setNumber2] = React.useState(1);
  const [button, setButton] = React.useState(11);
  const swap = () => { number <= 41 ? setNumber(number + 1) : setNumber(0) }
  const mouseDown = () => { setButton(12); swap() }
  const mouseUp = () => setButton(11)
  const mouseDown2 = () => { setNumber2(2);  }
  const mouseUp2 = () => setNumber2(1)
  const onClick = () => { number1 == 9 ? setNumber1(10) : setNumber1(9); }

  const copyRU = ' 2016 МеханиКл. Все права защищены.';
  const copyEN = ' 2016 MechanicEl. All rights reserved.';  

  const savedState =  JSON.parse(localStorage.getItem('state'));

  const [state, setState] = useState({
    l: savedState ? savedState.l : 'En',
    d: savedState ? savedState.d : 'ДИАФИЛЬМ',
    m: savedState ? savedState.m : 'Механи',
    c: savedState ? savedState.c : 'Кл',
    copy: savedState ? savedState.copy : copyRU
  });
  
  const cL = () => {
    'Ру' === state.l ? setState({ l: 'En', d: 'ДИАФИЛЬМ', m: 'Механи', c: 'Кл', copy:    copyRU }) : setState({ l: 'Ру', d: 'FILMSTRIP', m: 'Mechani', c: 'cEl', copy: copyEN })
  }

  localStorage.setItem('state', JSON.stringify(state));

    
  useEffect(() => { if (number1 == 10) {
    const interval = setInterval(() => { 
      if (number >= 42) { setNumber(0); } else 
        setNumber(number => number + 1);
    }, 100);
    return () => clearInterval(interval);
  } else return }, [number1, number]);

  return (
    <Router><>
    <div className="App">
      <header className="App-header">
        <div className="App-box">
        <span id="filmstrip" className="fp">{state.d}</span> 
        <div className="App-btn12">
          <div className="App-button1" onMouseDown={mouseDown} onMouseUp={mouseUp}>
            <img src={images[`b${button}.png`]} draggable="false" /> 
          </div> 
          <div className="App-button2" onClick={onClick} >
            <img src={images[`b${number1}.png`]} draggable="false" /> 
          </div> 
        </div>
        </div>

        <div className="App-language"  onClick={cL} >
          <span id="cL">{state.l}</span> 
        </div> 
       
        <Link to='/' className="navigation_link">
        <div className="App-mask-box" onMouseDown={mouseDown2} onMouseUp={mouseUp2}>
        
        <img src={images[`a${number2}.png`]} draggable="false" />
        
        </div>
        </Link>
      </header>   
      <div className="App-body" >
        <ImageSwap number={number} />
        <div className="Mechanicel">
          <p style={{padding: 0, margin: 0}}><img src={images[`mm${number2}.png`]} draggable="false" /></p>
          <h1><span id="h1m1">{state.m}</span><span id="cEl" className="cEl">{state.c}</span></h1>
        </div>
      </div>


      <div><p style={{textAlign: "center", fontFamily: "'Open Sans', sans-serif"}}><span id="copy" style={{fontSize: "13px", color: "#5e5e5e", cursor: "default"}}>{state.copy}</span></p></div>

    </div>
    </>
    </Router>
  );

}

export default App;

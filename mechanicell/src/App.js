import React from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';

function importAll(r) {

  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;

}

const ImageSwap = (number) => {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className='App-image-swap'>
      <img src={images[`m${number.number}.png`]} /> 
    </div>
  )

}

function App() {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  const [number, setNumber] = React.useState(0);
  const [number1, setNumber1] = React.useState(9);
  const [button, setButton] = React.useState(11);
  const swap = () => { number <= 41 ? setNumber(number + 1) : setNumber(0) }
  const mouseDown = () => { setButton(12); swap() }
  const mouseUp = () => setButton(11)
  const onClick = () => { number1 == 9 ? setNumber1(10) : setNumber1(9);                }

  useEffect(() => { if (number1 == 10) {
    const interval = setInterval(() => { 
      if (number >= 42) { setNumber(0); } else 
        setNumber(number => number + 1);
    }, 100);
    return () => clearInterval(interval);
  } else return }, [number1, number]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-box">
        <img src={images[`FP.png`]} />
         
        <div className="App-btn12">
          <div className="App-button1" onMouseDown={mouseDown} onMouseUp={mouseUp}>
            <img src={images[`b${button}.png`]} /> 
          </div> 
          <div className="App-button2" onClick={onClick} >
            <img src={images[`b${number1}.png`]} /> 
          </div> 
        </div>
        </div>
        <div className="App-mask-box">
        <img src={images[`a1.png`]} />
        </div>
      </header>   
      <div className="App-body">
        <ImageSwap number={number} />
        <img src={images[`mm.png`]} />
      </div>
    </div>
  );

}

export default App;

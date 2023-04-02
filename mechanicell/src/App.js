import React from 'react';
import './App.css';

function importAll(r) {

  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;

}

const ImageSwap = (number) => {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className='ImageSwap'>
      <img src={images[`m${number.number}.png`]} /> 
    </div>
  )

}

function App() {

  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  const [number, setNumber] = React.useState(0);
  const [button, setButton] = React.useState(11);
  const swap = () => { number <= 41 ? setNumber(number + 1) : setNumber(0) }
  const mouseDown = () => { setButton(12); swap() }
  const mouseUp = () => setButton(11)
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-button" onMouseDown={mouseDown} onMouseUp={mouseUp}>
          <img src={images[`b${button}.png`]} /> 
        </div> 
      </header>   
      <div className="App-body">
        <ImageSwap number={number} />
      </div>
    </div>
  );

}

export default App;

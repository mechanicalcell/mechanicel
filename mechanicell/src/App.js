import React from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

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
  const [number2, setNumber2] = React.useState(1);
  const [button, setButton] = React.useState(11);
  const swap = () => { number <= 41 ? setNumber(number + 1) : setNumber(0) }
  const mouseDown = () => { setButton(12); swap() }
  const mouseUp = () => setButton(11)
  const mouseDown2 = () => { setNumber2(2);  }
  const mouseUp2 = () => setNumber2(1)
  const onClick = () => { number1 == 9 ? setNumber1(10) : setNumber1(9);                }

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
        <Link to='/' className="navigation_link">
        <div className="App-mask-box" onMouseDown={mouseDown2} onMouseUp={mouseUp2}>
        
        <img src={images[`a${number2}.png`]} />
        
        </div>
        </Link>
      </header>   
      <div className="App-body" >
        <ImageSwap number={number} />
        <img src={images[`mm${number2}.png`]} />
      </div>




    
        <nav className="content">
          <div className="navigation_box">
            <nav>
            <NavLink to='/' 
                     className="navigation_link"
                     activeClassName="navigation_link"
                     style={{ textDecoration: 'none' }}>  
                     
              <p className="text_container"><span style={{fontSize: "13px", color: "#8c755e"}}>Home</span></p>
            </NavLink>
            </nav>
            <nav>
            <Link to='/about' className="navigation_link" style={{ textDecoration: 'none' }}>  
              <p className="text_container"><span style={{fontSize: "13px", color: "#8c755e"}}>About</span></p>
            </Link>
            </nav>
            <nav>
            <Link to='/contact' className="navigation_link" style={{ textDecoration: 'none' }}>  
              <p className="text_container"><span style={{fontSize: "13px", color: "#8c755e"}}>Contact</span></p>
            </Link>
            </nav>
          </div>
        </nav> 


       






      <div><p style={{textAlign: "center", fontFamily: "'Open Sans', sans-serif"}}><span style={{fontSize: "13px", color: "#8c755e"}}>&copy; &nbsp;2016 MechanicEl. &nbsp;All rights reserved.</span></p></div>

    </div>
    </>
    </Router>
  );

}

export default App;

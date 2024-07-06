import styles from './app-header.module.css';
import { Link } from 'react-router-dom';

export default function AppHeader({ languageAnimation,
                                    state,
                                    mouseDown,
                                    mouseUp,
                                    images,
                                    button,
                                    onClick,
                                    number1,
                                    cL,
                                    mouseDown3,
                                    mouseUp3,
                                    number3,
                                    mouseDown2,
                                    mouseUp2,
                                    number2 }) {

  return (
    <>
      <header className={`${styles.app_header}`} >
        <div className={`${styles.panel}`}>
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
          <div className={`${styles.app_box_right}`}>
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
          </div>
        </div>
      </header>   
    </>
  )
}
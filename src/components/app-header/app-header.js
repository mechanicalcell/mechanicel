import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export default function AppHeader({ languageAnimation, state, images, style, addStyle, changeLanguage }) {
  const { pathname } = useLocation(); 
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.panel}>
          <div className={styles.stopper}></div>
          <NavLink to='/' className={({ isActive }) => isActive ? `${styles.mechanicel} ${languageAnimation.animation} ${style.home} active` : `${styles.mechanicel} ${style.home}`} onMouseOver={() => addStyle({ home: styles.element_background_color, archive: '', user: '' })} onMouseOut={() => addStyle({ home: '', archive: '', user: '' })} onMouseDown={() => addStyle({ home: styles.element_background_color, archive: '', user: '' })} onMouseUp={() => addStyle({ home: '', archive: '', user: '' })} onTouchStart={() => addStyle({ home: styles.element_background_color, archive: '', user: '' })} onTouchEnd={() => addStyle({ home: '', archive: '', user: '' })} onClick={() => changeLanguage(pathname)}>  
            {({ isActive }) => <>{state.mechani}<span className={isActive ? styles.cel : ''}>{state.cel}</span></>}
          </NavLink>
          <NavLink to='/archive' className={`${styles.archive} ${style.archive}`} onMouseOver={() => addStyle({ home: '', archive: styles.element_background_color, user: '' })} onMouseOut={() => addStyle({ home: '', archive: '', user: '' })} onMouseDown={() => addStyle({ home: '', archive: styles.element_background_color, user: '' })} onMouseUp={() => addStyle({ home: '', archive: '', user: '' })} onTouchStart={() => addStyle({ home: '', archive: styles.element_background_color, user: '' })} onTouchEnd={() => addStyle({ home: '', archive: '', user: '' })}>
            {({ isActive }) => <><img src={images[`a${isActive ? 2 : 1}.png`]} alt={`archive ${isActive ? 2 : 1}`} draggable="false" /></>}
          </NavLink> 
          <div className={styles.stopper}></div>
        </nav>
      </header>   
    </>
  )
}
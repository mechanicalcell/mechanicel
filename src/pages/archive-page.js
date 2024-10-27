import styles from './archive-page.module.css';
import { NavLink } from 'react-router-dom';

export function ArchivePage({ images, style, addStyle }) {
  return (
    <div className={styles.container}>
      archive
      <NavLink to='/login' className={`${styles.user} ${style.user}`} onMouseOver={() => addStyle({ home: '', archive: '', user: styles.element_background_color })} onMouseOut={() => addStyle({ home: '', archive: '', user: '' })} onMouseDown={() => addStyle({ home: '', archive: '', user: styles.element_background_color })} onMouseUp={() => addStyle({ home: '', archive: '', user: '' })} onTouchStart={() => addStyle({ home: '', archive: '', user: styles.element_background_color })} onTouchEnd={() => addStyle({ home: '', archive: '', user: '' })}>
            {({ isActive }) => <><img src={images[`u${isActive ? 2 : 1}.png`]} alt={`user ${isActive ? 2 : 1}`} draggable="false" /></>}
      </NavLink>
    </div>
  );
} 
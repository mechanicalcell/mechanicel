import styles from './app-footer.module.css';

export default function AppFooter({ languageAnimation, state }) {
  return (
    <>
      <footer className={styles.footer}>
        <span className={`${styles.copy} ${languageAnimation.animation}`}>{state.copy}</span>
      </footer>   
    </>
  )
}
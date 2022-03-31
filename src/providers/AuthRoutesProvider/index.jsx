import styles from './styles.module.scss';

export function AuthRoutesProvider({ children, pageName }) {
  return (
    <div className={styles.authUIWrapper}>
      <div className={styles.illustrationWrapper}>
        <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.illustration}/>
      </div>
      <div className={styles.content}> 
        <img src='/images/logo_dark.svg' alt='Logo Grati' />
        <h1>{pageName}</h1>
        <form>
          {children}
        </form>
      </div>
    </div>
  )
}
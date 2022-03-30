import styles from './styles.module.scss';

export function AuthRoutesProvider({ children, pageName, submitFunction }) {
  return (
    <div className={styles.authUIWrapper}>
      <div className={styles.illustrationWrapper}>
        <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.illustration}/>
      </div>
      <div className={styles.content}> 
        <img src='/images/logo_dark.svg' alt='Logo Grati' />
        <h1>{pageName}</h1>
        <form onSubmit={submitFunction}>
          {children}
        </form>
      </div>
    </div>
  )
}
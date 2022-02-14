import Head from 'next/head';
import styles from './login.module.scss';

export default function Login() {
  return (
    <>
      <Head>
          <title>Grati | Login</title>
      </Head>
      <div className={styles.ImgFundo}>
        <img src="/images/imgFundoLogin.jpg" alt="imagemDeFundo"/>
      </div>
      <div className={styles.containerLogin}>
        <img src="/images/Logo1.png" alt="logoGrati" />
        <h1>Login</h1>

        <div className={styles.inputs}>

          <div className={styles.containerInput}>
            <div className={styles.imgUser}>
               <img src="/images/user.png" alt="pessoa" />
            </div>
            <input id='user' type="text" placeholder='Usuário'/>
          </div>

        <div className={styles.containerInput}>
        <div className={styles.imgPassword}>
        <img src="/images/password.png" alt="cadeado" />
        </div>
        <input id='password' type="text" placeholder='Senha'/>
        </div>
        </div>

        <div className={styles.esqueciminhaSenha}>
        <button className={styles.button1}>Autenticar</button>
        <a href="#">Esqueci minha senha</a>
        </div>
        <h2>Não possui conta?</h2>
        <button className={styles.button2}>Cadastra-se</button>
      </div>
    </>
  )
}
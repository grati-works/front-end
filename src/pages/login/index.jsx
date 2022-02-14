import Head from 'next/head';
import styles from './login.module.scss';

export default function Login() {
  return (
    <>
      <Head>
          <title>Grati | Login</title>
      </Head>
      <div className={styles.divImgFundo}>
        <img src="/images/imgFundoLogin.jpg" alt="imagemDeFundo" className={styles.imgFundo}/>
      </div>
      <div className={styles.containerLogin}>
        <img src="/images/Logo1.png" alt="logoGrati" />
        <h1>Login</h1>

        <div className={styles.inputs}>
        <img src="/images/user.png" alt="pessoa" />
        <input id='user' type="text" placeholder='Usuário'/>
        <img src="/images/password.png" alt="cadeado" />
        <input id='password' type="text" placeholder='Senha'/>
        </div>
        
        <button>Autenticar</button>
        <a href="">Esqueci minha senha</a>
        <h2>Não possui conta?</h2>
        <button>Cadastra-se</button>
      </div>
    </>
  )
}
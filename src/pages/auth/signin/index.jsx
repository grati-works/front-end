import Head from 'next/head';
import styles from './login.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock } from 'react-iconly';
import { Button } from '../../../components/Button';

export default function Login() {
  return (
    <div className={styles.containerLogin}>
      <Head>
          <title>Grati | Login</title>
      </Head>
      <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.ImgFundo}/>
      <div className={styles.conteudo}>
        <img src="/images/logo_dark.svg" alt="Logo Grati" />
        <h1>Login</h1>
        <div className={styles.inputs}>
          <Input Icon={User} placeholder="Usuário" required />
          <Input Icon={Lock} placeholder="Senha" required password />
        </div>
        <Button>Autenticar</Button>
        <a href="#">Esqueci minha senha</a>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>não possui uma conta?</span>
          <div className={styles.divider}></div>
        </div>
        <Button className={styles.secondaryButton}>Cadastrar-se</Button>
      </div>
    </div>
  )
}
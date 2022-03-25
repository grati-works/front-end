import Head from 'next/head';
import styles from './recuperSenha.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock } from 'react-iconly';
import { Button } from '../../../components/Button';

export default function RecoverPassword() {
  return (
    <div className={styles.containerLogin}>
      <Head>
          <title>Grati | Recuperação de Senha</title>
          <meta name="description" content="Realizar login" />
          <meta property="og:title" content="Login" />
          <meta property="og:url" content="https://grati.works/auth/signin" />
          <meta property="og:type" content="website" />
      </Head>
      <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.ImgFundo}/>
      <div className={styles.conteudo}>
        <img src="/images/logo_dark.svg" alt="Logo Grati" />
        <h1>Recuperar Senha</h1>
        <div className={styles.inputs}>
          <Input Icon={Lock} placeholder="E-mail" />
          
        </div> <Button>Autenticar</Button>
      </div>
    </div>
  )
}
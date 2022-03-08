import Head from 'next/head';
import styles from './autenticarConta.module.scss';
import { Input } from '../../../components/Input';
import { Lock } from 'react-iconly';
import { Button } from '../../../components/Button';
import { Checkbox } from '@nextui-org/react';

export default function accountActivation() {
    return (
        <div className={styles.containerLogin}>
        <Head>
            <title>Grati | Ativação de conta</title>
            <meta name="description" content="Autenticação de conta" />
            <meta property="og:title" content="Autenticação" />
            <meta property="og:description" content="Ativação de conta" />
            <meta property="og:url" content="https://grati.works/auth/accountActivation" />
            <meta property="og:type" content="website" />
        </Head>
        <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.ImgFundo}/>
        <div className={styles.conteudo}>
          <img src="/images/logo_dark.svg" alt="Logo Grati" />
          <h1>Ativação de conta</h1>
          <div className={styles.inputs}>
            <Input Icon={Lock} placeholder="Senha" required password />
            <Input Icon={Lock} placeholder="Confirmação de senha" required password />
          </div>
          <Checkbox size="sm" className={styles.checkbox}>
            Li e aceito a <a href="#">politica de privacidade e proteção</a> de dados e os <a href="#">termos de uso</a>.
          </Checkbox>
          <Button>Autenticar</Button>
        </div>
      </div>
    )
  }
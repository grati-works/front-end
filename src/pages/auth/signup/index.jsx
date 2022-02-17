import Head from 'next/head';
import styles from './login.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock, Message, Discovery } from 'react-iconly';
import { Button } from '../../../components/Button';
import { Checkbox } from '@nextui-org/react';

export default function SignUp() {
  return (
    <div className={styles.containerLogin}>
      <Head>
          <title>Grati | Cadastro</title>
      </Head>
      <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.ImgFundo}/>
      <div className={styles.conteudo}>
        <img src="/images/logo_dark.svg" alt="Logo Grati" />
        <h1>Cadastro</h1>
        <div className={styles.inputs}>
          <Input Icon={Message} placeholder="Email" required />
          <Input Icon={Discovery} placeholder="Nome" required />
          <Input Icon={User} placeholder="Usuário" required />
          <Input Icon={Lock} placeholder="Senha" required password />
        </div>
        <Button>Cadastrar</Button>
        <Checkbox size="sm" className={styles.checkbox}>
          Li e aceito a <a href="#">politica de privacidade e proteção</a> de dados e os <a href="#">termos de uso</a>.
        </Checkbox>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>já possui uma conta?</span>
          <div className={styles.divider}></div>
        </div>
        <Button className={styles.secondaryButton}>Fazer login</Button>
      </div>
    </div>
  )
}
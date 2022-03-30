import { useState } from 'react';
import Head from 'next/head';
import styles from './recoverPassword.module.scss';
import { Input } from '../../../components/Input';
import { User } from 'react-iconly';
import { Button } from '../../../components/Button';
import { AuthRoutesProvider } from '../../../providers/AuthRoutesProvider';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Grati | Recuperação de senha</title>
        <meta name='description' content='Recuperar a senha da sua conta' />
        <meta property='og:title' content='Recuperar Senha' />
        <meta property='og:description' content='Recuperar senha' />
        <meta property='og:url' content='https://grati.works/auth/recover_password' />
        <meta property='og:type' content='website' />
      </Head>
      <AuthRoutesProvider pageName='Recuperação de senha'>
        <div className={styles.inputs}>
          <Input
            Icon={User}
            placeholder='E-mail'
            required
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
            error={errors.email}
            color={errors.email ? 'error' : 'primary'}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
        </div>
        <Button isLoading={isSubmitting} className={styles.button}>
          Recuperar senha
        </Button>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>se lembra de sua senha?</span>
          <div className={styles.divider}></div>
        </div>
        <Button className={`${styles.button} ${styles.secondaryButton}`}>
          Fazer login
        </Button>
      </AuthRoutesProvider>
    </div>
  );
}

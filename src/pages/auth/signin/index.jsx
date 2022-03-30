import { useState } from 'react';
import Head from 'next/head';
import styles from './signin.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock } from 'react-iconly';
import { Button } from '../../../components/Button';
import Link from 'next/link';
import { AuthRoutesProvider } from '../../../providers/AuthRoutesProvider';

import { validateEmail, validatePassword } from '../../../utils/validator';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { signIn } = useAuth();
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError !== true || passwordError !== true) {
      setErrors({ ...emailError, ...passwordError });
      console.log({ emailError, passwordError });
      return;
    }

    setIsSubmitting(true);

    try {
      const signedWithSuccess = await signIn(email, password);

      if (signedWithSuccess === true) {
        push('/home');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Grati | Login</title>
        <meta name='description' content='Realizar login' />
        <meta property='og:title' content='Login' />
        <meta property='og:description' content='Realizar login' />
        <meta property='og:url' content='https://grati.works/auth/signin' />
        <meta property='og:type' content='website' />
      </Head>
      <AuthRoutesProvider pageName='Login' submitFunction={handleSubmit}>
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
          <Input
            Icon={Lock}
            placeholder='Senha'
            required
            password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({});
            }}
            error={errors.password}
            color={errors.password ? 'error' : 'primary'}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
        </div>
        <Button isLoading={isSubmitting} className={styles.button}>
          Autenticar
        </Button>
        <Link href='/auth/recoverPassword'>Esqueci minha senha</Link>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>não possui uma conta?</span>
          <div className={styles.divider}></div>
        </div>
        <Button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => push('/auth/signup')}
        >
          Cadastrar-se
        </Button>
      </AuthRoutesProvider>
    </div>
  );
}

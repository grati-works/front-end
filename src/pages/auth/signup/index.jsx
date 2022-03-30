import Head from 'next/head';
import styles from './signup.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock, Message, Discovery } from 'react-iconly';
import { Button } from '../../../components/Button';
import { Checkbox } from '@nextui-org/react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { AuthRoutesProvider } from '../../../providers/AuthRoutesProvider';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUp() {
  const { signUp } = useAuth();
  const { push } = useRouter();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
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
      const signupedWithSuccess = await signUp(name, username, email, password);

      if (signupedWithSuccess === true) {
        push('/auth/signin');
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
        <title>Grati | Cadastro</title>
        <meta name='description' content='Realizar cadastro' />
        <meta property='og:title' content='Cadastro' />
        <meta property='og:description' content='Realizar cadastro' />
        <meta property='og:url' content='https://grati.works/auth/signup' />
        <meta property='og:type' content='website' />
      </Head>
      <AuthRoutesProvider pageName='Cadastro'>
        <div className={styles.inputs}>
          <Input
            Icon={Message}
            placeholder='Email'
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
          />
          <Input
            Icon={Discovery}
            placeholder='Nome'
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({});
            }}
          />
          <Input
            Icon={User}
            placeholder='Usuário'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({});
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
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
        </div>
        <Checkbox size='sm' className={styles.checkbox}>
          Li e aceito a <Link href='#'>politica de privacidade e proteção</Link> de dados e os <Link href='#'>termos de uso</Link>.
        </Checkbox>
        <Button onClick={signUp} className={styles.button}>
          Cadastrar
        </Button>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>já possui uma conta?</span>
          <div className={styles.divider}></div>
        </div>
        <Button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleSubmit} isLoading={isSubmitting}>
          Fazer login
        </Button>
      </AuthRoutesProvider>
    </div>
  );
}

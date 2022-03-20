import { useState } from 'react';
import Head from 'next/head';
import styles from './login.module.scss';
import { Input } from '../../../components/Input';
import { User, Lock } from 'react-iconly';
import { Button } from '../../../components/Button';
import Link from 'next/link';

import { validateEmail, validatePassword } from '../../../utils/validator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { signIn } = useAuth();
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [ísSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if(emailError !== true || passwordError !== true ) {
      setErrors({ ...emailError, ...passwordError });
      console.log({ emailError, passwordError })
      return;
    }

    setIsSubmitting(true)

    try {
      const signedWithSuccess = await signIn(email, password);

      if(signedWithSuccess === true) {
        push('/home');
      }

    } catch(error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.containerLogin}>
      <Head>
          <title>Grati | Login</title>
          <meta name="description" content="Realizar login" />
          <meta property="og:title" content="Login" />
          <meta property="og:description" content="Realizar login" />
          <meta property="og:url" content="https://grati.works/auth/signin" />
          <meta property="og:type" content="website" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHove />
      <img src="/images/auth_background.png" alt="Ilustração de autenticação" className={styles.ImgFundo}/>
      <div className={styles.conteudo}>
        <img src="/images/logo_dark.svg" alt="Logo Grati" />
        <h1>Login</h1>
        <div className={styles.inputs}>
          <Input
            Icon={User}
            placeholder="E-mail"
            required
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErrors({});}}
            error={errors.email}
            color={errors.email ? 'error' : 'primary'}
            onKeyPress={(e) => { if(e.key === 'Enter') handleSubmit() }}

          />
          <Input
            Icon={Lock}
            placeholder="Senha"
            required
            password
            value={password}
            onChange={(e) => {setPassword(e.target.value); setErrors({});}}
            error={errors.password}
            color={errors.password ? 'error' : 'primary'}
            onKeyPress={(e) => { if(e.key === 'Enter') handleSubmit() }}
          />
        </div>
        <Button
          onClick={handleSubmit}
          isLoading={ísSubmitting}
        >Autenticar</Button>
        <Link href="/auth/recoverPassword">Esqueci minha senha</Link>
        <div className={styles.registerSection}>
          <div className={styles.divider}></div>
          <span>não possui uma conta?</span>
          <div className={styles.divider}></div>
        </div>
        <Button className={styles.secondaryButton}><Link href="/auth/register">Cadastrar-se</Link></Button>
      </div>
    </div>
  )
}
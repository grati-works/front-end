import Head from 'next/head';
import styles from './styles.module.scss';
// import { Input } from '../../../components/Input';
// import { Button } from '../../../components/Button';

export default function Payment() {
  return (
    <div className={styles.containerBuy}>
      <Head>
          <title>Grati | Pagamento</title>
          <meta name="description" content="Realizar Pagamento" />
          <meta property="og:title" content="Pagar" />
          <meta property="og:description" content="Realizar Pagamento" />
          <meta property="og:url" content="https://grati.works/auth/signin" />
          <meta property="og:type" content="website" />
      </Head>
      <div className={styles.plan}>
        &larr;
        <img src="/images/logo.svg" alt="" />
          <div className={styles.value}>
              <h1>Plano Grati <span>mensal</span></h1>
              <h2>R$ 29,90</h2>
          </div>
      </div>
    </div>
  )
}
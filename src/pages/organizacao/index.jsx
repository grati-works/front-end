import Head from 'next/head';

import styles from './organizacao.module.scss';

export default function Organizacao() {
  return (
    <>
      <Head>
          <title>Grati | Organização</title>
      </Head>
      <div className={styles.cardOrganization}>
        <img src="https://jandira.sp.senai.br/Img/logo-senai2.png" alt="imgSenai" />
          <h1>Senai</h1>
      </div>
    </>
  )
}
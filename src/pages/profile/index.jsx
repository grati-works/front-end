import Head from 'next/head';

import styles from './profile.module.scss';

export default function Profile() {
  return (
    <>
      <Head>
          <title>Grati | Perfil</title>
      </Head>

      <div className={styles.containerNavBar}>
        <img className={styles.imgFundo} src="/images/imgFundoProfile.png" alt="imagemDeFundo" />
        <div className={styles.imgPerfil}>
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="imgPerfil" />
        </div>
        <dir className={styles.userName}>
          <h1>Túlio Nogueira</h1>
          <h2>Product Owner</h2>
        </dir>
        <div className={styles.imgIcons}>
          <div><img src="/images/imgGitHub.png" alt="imgGitHub"/>Github</div>
          <div><img src="/images/imgLinkedin.png" alt="imgLinkedin"/>Linkedin</div>
          <div><img src="/images/imgDribbble.png" alt="imgDribbble"/>Dribbble</div>
        </div>
      </div>

      <div className={styles.conteudoBox}>
        <div className={styles.lateralEsquerda}>

        </div>
        <div className={styles.lateralDireita}>
          
        </div>
      </div>
    </>
  )
}
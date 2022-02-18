import Head from 'next/head';

import styles from './profile.module.scss';

export default function Profile() {
  return (
    <>
      <Head>
          <title>Grati | Perfil</title>
      </Head>

      <div className={styles.containerNavBar}>
        <div className={styles.ImgIcons}>
          <nav><img src="/images/imgGitHub.png" alt="imgGitHub"/>Github</nav>
          <nav><img src="/images/imgLinkedin.png" alt="imgLinkedin"/>Linkedin</nav>
          <nav><img src="/images/imgDribbble.png" alt="imgDribbble"/>Dribbble</nav>

        </div>
        <div className={styles.imgPerfil}>
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="imgPerfil" />
        </div>
      </div>
    </>
  )
}
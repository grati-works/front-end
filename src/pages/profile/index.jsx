import Head from 'next/head';

import styles from './profile.module.scss';
import { Avatar } from '@nextui-org/react';

export default function Profile() {
  return (
    <>
      <Head>
          <title>Grati | Perfil</title>
      </Head>

      <div className={styles.profileWrapper}>
        <div className={styles.containerNavBar}>
          <img className={styles.imgFundo} src="/images/imgFundoProfile.png" alt="imagemDeFundo" />
          <div className={styles.headerContent}>
            <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className={styles.imgPerfil} />
            <dir className={styles.userName}>
              <h1>Túlio Nogueira</h1>
              <h2>Product Owner</h2>
            </dir>
            <div className={styles.imgIcons}>
              <button><img src="/images/imgGitHub.png" alt="imgGitHub"/>Github</button>
              <button><img src="/images/imgLinkedin.png" alt="imgLinkedin"/>Linkedin</button>
              <button><img src="/images/imgDribbble.png" alt="imgDribbble"/>Dribbble</button>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.personalInfo}>
            <div className={styles.aboutPerson}>
              <h1>Sobre mim</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Ultrices nulla nunc tortor magna posuere. 
                Amet, faucibus sed malesuada vitae malesuada. 
                Amet eros, ultrices ut viverra enim est diam pellentesque. 
                Sapien sodales tempus viverra risus a elit placerat euismod risus. 
                Ipsum mattis volutpat massa tortor lacinia.</p>
            </div>
            <div className={styles.skills}>
              <div className={styles.expPropria}>
                Tenho experiência
                <h1></h1>
              </div>
            </div>

          </div>
          <div className={styles.messageList}>
            
          </div>
        </div>
      </div>
    </>
  )
}
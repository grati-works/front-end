import Head from 'next/head';
import styles from './landingPage.module.scss';

export default function Home() {
  return (
    <>
      <Head>
          <title>Grati | Página inicial</title>
      </Head>
      <>
        <img src="/images/circle.png" alt="circle1" className={styles.circle1} />
        <img src="/images/circle.png" alt="circle2" className={styles.circle2} />
        <img src="/images/circle.png" alt="circle3" className={styles.circle3} />

        <div className={styles.text}>
          <h1>Adote <span>feedbacks</span> em sua organização</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</p>
          <div className={styles.adquireButtons}>
            <a href=""><img src="/images/app_store.png" alt="appStore" /></a>
            <a href=""><img src="/images/google_play.png" alt="googlePlay" /></a>
          </div>
        <img src="/images/mockups.png" alt="Aplicativos mobile" /> 
        </div>
      </>
    </>
  )
}
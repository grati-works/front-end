import Head from 'next/head';
import styles from './landingPage.module.scss';

export default function Home() {
  return (
    <>
      <Head>
          <title>Grati | Página inicial</title>
      </Head>
      <>
      <div className={styles.circle1}>
        <img src="/images/circle.png" alt="circle1" />
      </div>
        <div className={styles.text}>
        <h1>Adote <span>feedbacks</span> em sua organização</h1>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</h3>
            <img className={styles.imgAppStore} src="/images/appStore.png" alt="appStore" />
            <img className={styles.imgGooglePlay} src="/images/googlePlay.png" alt="googlePlay" />
            <img className={styles.imgMockups} src="/images/mockups.png" alt="mockups" />
        </div>
        <div className={styles.circle2}>
        <img src="/images/circle.png" alt="circle2" />
      </div>
      </>
    </>
  )
}
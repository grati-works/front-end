import Head from 'next/head';
import styles from './landingPage.module.scss';

export default function Home() {
  return (
    <>
      <Head>
          <title>Grati</title>
          <meta name="description" content="Adote feedbacks em sua organização!" />
          <meta property="og:title" content="Grati" />
          <meta property="og:description" content="Adote feedbacks em sua organização!" />
          <meta property="og:url" content="https://grati.works/" />
          <meta property="og:type" content="website" />
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

        <div className={styles.containerPlanos}>
          <h1>Planos</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor sem odio ut viverra mi quam.</h2>
          <button><a href="#">Plano Mensal</a></button>
          <button><a href="#">Plano Anual</a></button>
        </div>

        <div className={styles.containerSobre}>
          <h1>Sobre nós</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Dolor sem odio ut viverra mi quam. Vitae fames porttitor arcu tempor vulputate proin. 
            Vitae erat a, vitae a amet vestibulum. Diam a etiam ipsum quis auctor massa. 
            Lacinia at amet facilisi mattis massa placerat. 
            Adipiscing id libero, placerat egestas. Sit amet, morbi viverra in cras amet non quam. 
            Habitant maecenas mattis fermentum id. 
            Pretium pretium maecenas maecenas elit facilisi.
            Turpis suscipit interdum proin curabitur vulputate. 
            Placerat duis nunc molestie dui mi. Velit, aliquam cum faucibus at maecenas at auctor ut in. 
            Neque urna cum ultrices vitae odio etiam quam sed nunc. 
            Felis rhoncus at gravida condimentum viverra quis id bibendum sollicitudin.
            </p>
        </div>
      </>
    </>
  )
}
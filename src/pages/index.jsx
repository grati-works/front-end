import Head from 'next/head';
import styles from './landingPage.module.scss';
import { Button } from '../components/Button';
import Link from 'next/link';

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
      <main className={styles.landingPageWrapper}>
        <img src="/images/circle.png" alt="circle1" className={styles.circle1} />
        <img src="/images/circle.png" alt="circle2" className={styles.circle2} />
        <img src="/images/circle.png" alt="circle3" className={styles.circle3} />

        <div className={styles.mainSectionContainer}>
          <h1>Adote <span>feedbacks</span> em sua organização</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</p>
          <div className={styles.adquireButtons}>
            <Link href=""><img src="/images/app_store.png" alt="appStore" /></Link>
            <Link href=""><img src="/images/google_play.png" alt="googlePlay" /></Link>
          </div>
        <img src="/images/mockups.png" alt="Aplicativos mobile" className={styles.mockups} /> 
        </div>

        <div id='about' className={styles.aboutSectionContainer}>
          <h2>Sobre nós</h2>
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

        <div className={styles.plansSectionContainer}>
          <h2>Planos</h2>
          <p className={styles.plansSectionContainer2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor sem odio ut viverra mi quam.</p>
          <div className={styles.planFilter}>
            <button className={styles.active}>Planos Mensais</button>
            <button>Planos Anuais</button>
          </div>
          <div className={styles.planList}>
            <div id='plans' className={styles.plan}>
              <h3>Plano Mensal</h3>
              <p>All the basics for starting a new business</p>
              <div className={styles.planPrice}>
                R$XX
                <span>/mês</span>
              </div>
              <Button>Adquirir plano</Button>
            </div>
            <div className={styles.plan}>
              <h3>Plano Trimestral</h3>
              <p>All the basics for starting a new business</p>
              <div className={styles.planPrice}>
                R$XX
                <span>/mês</span>
              </div>
              <Button>Adquirir plano</Button>
            </div>
            <div className={styles.plan}>
              <h3>Plano Semestral</h3>
              <p>All the basics for starting a new business</p>
              <div className={styles.planPrice}>
                R$XX
                <span>/mês</span>
              </div>
              <Button>Adquirir plano</Button>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
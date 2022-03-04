import Head from 'next/head';
import styles from './homePage.module.scss';
import { GratiCard } from '../../components/GratiCard';
import { TextEditor } from '../../components/TextEditor';

export default function HomeUser() {
  return (
    <>
      <Head>
          <title>Grati | Home</title>
      </Head>
      <>
      <div className={styles.homeWrapper}>
            <div className={styles.navigation}>
                <TextEditor />
                <div className={styles.feed}>
                    <GratiCard />
                    <GratiCard />
                    <GratiCard />
                    <GratiCard />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.points}>
                  <img src="/images/imgXp.png" alt="Xp" />
                  <p>Você acumulou 26000 xp durante esse mes.</p>
                </div>
                <div className={styles.experience}>
                  <img src="/images/imgXp.png" alt="Xp" />
                  <p>Uma meta de 5300 xp está agendada para 16/02.</p>
                </div>
                <div className={styles.ranking}></div>
            </div>
        </div>
      </>
    </>
  )
}
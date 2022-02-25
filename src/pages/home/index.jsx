import Head from 'next/head';
import styles from './homePage.module.scss';
import { GratiCard } from '../../components/GratiCard';

export default function HomeUser() {
  return (
    <>
      <Head>
          <title>Grati | Home</title>
      </Head>
      <>
      <div className={styles.homeWrapper}>
            <div className={styles.navigation}>
                <div className={styles.sendGrati}>

                </div>
                <div className={styles.feed}>
                    {/* <GratiCard></GratiCard>
                    <GratiCard></GratiCard> */}
                </div>
            </div>
            <div className={styles.rankingRight}>
                <div className={styles.points}></div>
                <div className={styles.experience}></div>
                <div className={styles.ranking}></div>
            </div>
        </div>
      </>
    </>
  )
}
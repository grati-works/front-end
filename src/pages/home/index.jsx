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
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.points}></div>
                <div className={styles.experience}></div>
                <div className={styles.ranking}></div>
            </div>
        </div>
      </>
    </>
  )
}
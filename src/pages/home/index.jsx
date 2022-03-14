import Head from 'next/head';
import styles from './homePage.module.scss';
import { GratiCard } from '../../components/GratiCard';
import { TextEditor } from '../../components/TextEditor';
import { UserRankingCard } from '../../components/UserRankingCard';
import { Wallet, Calendar, TicketStar } from 'react-iconly';

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
                  <Wallet set="light"  className={styles.icon}/>
                  <p>Você acumulou 26000 xp durante esse mes.</p>
                </div>
                <div className={styles.experience}>
                  <Calendar set="light" className={styles.icon}/>
                  <p>Uma meta de 5300 xp está agendada para 16/02.</p>
                </div>
                <div className={styles.ranking}>
                  <div className={styles.top5}>
                    <TicketStar set="light" className={styles.icon} />
                    <p>Top 5 ranking</p>
                    <a href="#">&rarr;</a>
                  </div>
                  <div className={styles.positions}>
                    <UserRankingCard size="sm" position="1" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" name="Luciano Monteiro" status="up" level="12" gratis="37" experience="1600" />
                    <UserRankingCard size="sm" position="2" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" name="Carlos Almeida" status="down" level="11" gratis="34" experience="1560" />
                    <UserRankingCard size="sm" position="3" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" name="Eli Aguiar" status="down" level="10" gratis="30" experience="1460" />
                    <UserRankingCard size="sm" position="4" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/4.webp" name="Sasha Souza" status="down" level="9" gratis="28" experience="1440" />
                    <UserRankingCard size="sm" position="5" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp" name="Camila Pitanga" status="down" level="8" gratis="25" experience="1410" />
                  </div>
                  <div className={styles.date}>
                    <div className={styles.boxDate}>
                      Novembro, Dezembro, Janeiro <span>(3 meses)</span>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </>
    </>
  )
}
import Head from 'next/head';

import styles from './ranking.module.scss';
import { UserRankingCard } from '../../components/UserRankingCard';

export default function Ranking() {
  return (
    <>
      <Head>
          <title>Grati | Ranking</title>
      </Head>
      <div className={styles.rankingContainer}>
      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th className={styles.positionTitle}>POSIÇÃO</th>
            <th>USUÁRIO</th>
            <th>GRATI'S</th>
            <th>EXPERIÊNCIA</th>
          </tr>
        </thead>
        <tbody>
          <UserRankingCard position="1" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" name="Luciano Monteiro" status="up" level="12" gratis="37" experience="1600" />
          <UserRankingCard position="2" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" name="Carlos Almeida" status="down" level="11" gratis="34" experience="1560" />
        </tbody>
      </table>
      </div>
    </>
  )
}
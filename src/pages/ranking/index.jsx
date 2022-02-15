import Head from 'next/head';

import styles from './ranking.module.scss';

export default function Ranking() {
  return (
    <>
      <Head>
          <title>Grati | Ranking</title>
      </Head>
        <table>
          <tr>
            <th>POSIÇÃO</th>
            <th>USUÁRIO</th>
            <th>GRATI'S</th>
            <th>EXPERIÊNCIA</th>
            <tr>
              <td>
                <div className={styles.containerNumber}>
                  <h1>1</h1>
                </div>
                <div className={conatinerInfo}>
                  <nav className={styles.name}>
                    <h1>Luciano Monteiro</h1>
                    <h2>Nivel 12</h2>
                  </nav>
                </div>
              </td>
            </tr>
          </tr>
        </table>
    </>
  )
}
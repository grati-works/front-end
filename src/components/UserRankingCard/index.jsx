import styles from './styles.module.scss';

import { ChevronUp, ChevronDown } from 'react-iconly';
import { Avatar } from '@nextui-org/react';

export function UserRankingCard({ position, avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp", name, status = "up", level, gratis, experience }) {
  return (
    <tr className={styles.cardContainer}>
      <td className={styles.position}>{position}</td>
      <td  className={styles.user}>
        <div>
          <Avatar src={avatar} size="lg" />
          <div>
            <p className={styles.name}>{name}</p>
            <div className={styles.levelContainer}>
              {
                status == "up" ?
                <ChevronUp set='bold' className={styles.up} />
                : <ChevronDown set='bold' className={styles.down} />
              }
              <p>Nível {level}</p>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.grati}><span>{gratis}</span> recebidos</td>
      <td className={styles.experience}><span>{experience}</span> xp</td>
    </tr>
  )
}
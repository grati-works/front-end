import styles from './styles.module.scss';

import { ChevronUp, ChevronDown } from 'react-iconly';
import { Avatar } from '@nextui-org/react';

export function UserRankingCard({ position, avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp", name, level, points, experience, size = "lg" }) {
  return size == "lg" ? (
    <tr className={styles.cardContainer}>
      <td className={styles.position}>{position}</td>
      <td  className={styles.user}>
        <div>
          <Avatar src={avatar} size="lg" text={name} />
          <div>
            <p className={styles.name}>{name}</p>
            <div className={styles.levelContainer}>
              <p>Nível {level}</p>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.grati}><span>{points}</span> recebidos</td>
      <td className={styles.experience}><span>{experience}</span> xp</td>
    </tr>
  ) : (
    <div className={styles.cardContainerSmall}>
      <div className={styles.avatarContainer}>
        <Avatar src={avatar} size="lg" text={name} />
      </div>
      <p className={styles.name}>{name}</p>
      <span className={styles.gratis}>{points}</span>
    </div>
  )
}
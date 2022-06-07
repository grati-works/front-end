import styles from "./styles.module.scss";

import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/router";

export function UserRankingCard({
  id,
  organization_id,
  position,
  avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
  name,
  level,
  received_feedbacks,
  points,
  size = "lg",
}) {
  const { push } = useRouter();

  return size == "lg" ? (
    <tr className={styles.cardContainer}>
      <td className={styles.position}>{position}</td>
      <td className={styles.user} onClick={() => push(`/user/${organization_id}/${id}`)}>
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
      <td className={styles.grati}>
        <span>{received_feedbacks}</span> recebidos
      </td>
      <td className={styles.experience}>
        <span>{points}</span> xp
      </td>
    </tr>
  ) : (
    <div className={styles.cardContainerSmall} onClick={() => push(`/user/${organization_id}/${id}`)}>
      <div className={styles.avatarContainer}>
        <Avatar src={avatar} size="lg" text={name} />
      </div>
      <p className={styles.name}>{name}</p>
      <span className={styles.gratis}>{points}</span>
    </div>
  );
}

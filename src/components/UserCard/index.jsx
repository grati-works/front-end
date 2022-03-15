import styles from "./styles.module.scss";

import { Avatar } from '@nextui-org/react';

export function UserCard({ avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp", name, user, email, group, size = "lg" }) {
  return size == "lg" ? (

    <tr className={styles.cardContainer}>

        <td className={styles.userConteiner}>
            <div>
            <Avatar className={styles.avatar} src={avatar} size="lg" />
            </div>
            <div className={styles.userinfo}>
                <div className={styles.name}>{name}</div>
                <div className={styles.user}>{user}</div>
            </div>
        </td>
        <td className={styles.email}>{email}</td>
        <td className={styles.group}>
          <div className={styles.blockGroup}>
          {group}
          </div>
        </td>
        <td className={styles.acoes}>
            <button className={styles.editor}><img src="/images/iconPencil.png" alt="editor" /></button>
            <button className={styles.trash}><img src="/images/trashIcon.png" alt="delete" /></button>
        </td>

    </tr>
  ) : (
    <div className={styles.cardContainerSmall}>
      <div className={styles.avatarContainer}>
        <Avatar src={avatar} size="lg" />
      </div>
    </div>
  )
}
import styles from "./styles.module.scss";

import { Avatar } from '@nextui-org/react';

export function UserCard({ avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp", name, user, email, size = "lg" }) {
  return size == "lg" ? (

    <tr className={styles.cardContainer}>

        <td className={styles.userConteiner}>
            <div>
            <Avatar src={avatar} size="lg" />
            </div>
            <div className={styles.userinfo}>
                <div className={styles.name}>{name}</div>
                <div className={styles.user}>{user}</div>
            </div>
        </td>
        <td>{email}</td>
        <td>Squade Terno v</td>
        <td><button><img src="/images/iconPencil.png" alt="editor" /></button>
            <button><img src="/images/trashIcon.png" alt="delete" /></button>
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
import styles from "./styles.module.scss";

import { Avatar } from "@nextui-org/react";

export function UserCard({
  avatar = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
  name,
  user,
  email,
  group,
  size = "lg",
}) {
  return size == "lg" ? (
    <tr className={styles.cardContainer}>
      <td className={styles.userConteiner}>
        <Avatar className={styles.avatar} src={avatar} size="lg" />
        <div className={styles.userinfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.user}>{user}</div>
        </div>
      </td>
      <td className={styles.email}>{email}</td>
      <td className={styles.group}>
        <select name="cars" id="cars" className={styles.blockGroup}>
          <option value={group}>{group}</option>
        </select>
      </td>
      <td className={styles.acoes}>
        <button className={styles.editor}>
          <img src="/images/iconPencil.jpg" alt="editor" />
        </button>
        <button className={styles.trash}>
          <img src="/images/trashIcon.jpg" alt="delete" />
        </button>
      </td>
    </tr>
  ) : (
    <div className={styles.cardContainerSmall}>
      <div className={styles.avatarContainer}>
        <Avatar src={avatar} size="lg" />
      </div>
    </div>
  );
}

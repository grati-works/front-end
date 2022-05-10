import styles from "./styles.module.scss";

export function OrganizationEmptyBox() {
  return (
    <div className={styles.emptyOrganizations}>
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.1" cx="75" cy="75" r="75" fill="#7b87f0" />
        <circle
          className={styles.secondMessage}
          fill="#7b87f0"
          cx="30" cy="50" r="30"
        />
        <circle
          className={styles.secondMessage}
          fill="#5562db"
          cx="120" cy="75" r="30"
        />
        <circle
          className={styles.secondMessage}
          fill="#7b87f0"
          cx="60" cy="110" r="15"
        />
      </svg>
      <h2>Nenhuma organização encontrada...</h2>
      <p>Parece que você não está inscrito em nenhuma organização 🙁</p>
      <p>Você pode adquirir acesso à plataforma <a href="/" className={styles.link}>clicando aqui</a>.</p>
    </div>
  );
}

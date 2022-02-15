import styles from './styles.module.scss';

export function Input({ Icon = null, ...rest  }) {
    return (
      Icon !== null ?
        <div className={styles.inputContainer}>
          <div className={styles.inputIconContainer}>
            <Icon />
          </div>
          <input className={styles.input} {...rest} />
        </div> :
        <input className={styles.input} {...rest} />
    )
}
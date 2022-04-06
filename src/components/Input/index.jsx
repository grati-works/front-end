import styles from './styles.module.scss';
import { Input as NextInput } from '@nextui-org/react';

export function Input({ Icon = null, password = false, error, color = "primary", underlined = true, shadow = true, ...rest }) {
  const inputDefaultProps = {
    className: styles.input,
    width: '100%',
    underlined,
    color,
    shadow,
    ...rest,
  };

  return (
    <div className={styles.inputWrapper}>
      {error && <span className={styles.error}>{error}</span>}
      {
        Icon !== null ?
        <div className={styles.inputContainer}>
          <div className={styles.inputIconContainer}>
            <Icon />
          </div>
          {password === true ? <NextInput.Password {...inputDefaultProps} /> : <NextInput {...inputDefaultProps} />}
        </div>
        : password === true ? <NextInput.Password {...inputDefaultProps} /> : <NextInput {...inputDefaultProps} />
      }
    </div>
  );
}

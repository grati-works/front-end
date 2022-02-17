import styles from './styles.module.scss';
import { Input as NextInput } from '@nextui-org/react';

export function Input({ Icon = null, password = false, ...rest  }) {
  const inputDefaultProps = {
    className: styles.input,
    color: "backgroundHighlight",
    width: "100%",
    underlined: true,
    color: "primary",
    ...rest
  }

  return (
    Icon !== null ?
      <div className={styles.inputContainer}>
        <div className={styles.inputIconContainer}>
          <Icon />
        </div>
        { password === true ? <NextInput.Password {...inputDefaultProps} /> : <NextInput {...inputDefaultProps} />}
      </div> :
      password === true ? <NextInput.Password {...inputDefaultProps} /> : <NextInput {...inputDefaultProps} />
  )
}
import { Button as NextButton } from '@nextui-org/react';
import styles from './styles.module.scss';

export function Button({ children, ...rest }) {
    return (
        <NextButton className={styles.buttonContainer} {...rest}>
            {children}
        </NextButton>
    )
}
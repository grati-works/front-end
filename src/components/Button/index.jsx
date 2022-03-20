import { Button as NextButton, Loading } from '@nextui-org/react';
import styles from './styles.module.scss';

export function Button({ children, isLoading = false, ...rest }) {
    return (
        <NextButton className={styles.buttonContainer} {...rest}>
            {
                isLoading ?
                <Loading size="sm" type='points' color="white"/> :
                <>{children}</>
            }
        </NextButton>
    )
}
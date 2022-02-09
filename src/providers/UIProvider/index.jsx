import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

export function UIProvider({ children }) {
    const { asPath } = useRouter();

    const privateRoutes = [
        "organizations",
        "home",
        "profile",
        "ranking"
    ];

    return (
        <div className={styles.container}>
            <Header privatePage={privateRoutes.includes(asPath) ? asPath : ""} />
            <div className={styles.contentContainer}>
                {privateRoutes.includes(asPath) && <NavBar /> }
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
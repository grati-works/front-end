import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

export function UIProvider({ children }) {
    var { asPath } = useRouter();
    asPath = asPath.split('/')[1];

    const privateRoutes = {
        "organizations": "Organizações",
        "home": "Início",
        "profile": "Perfil",
        "ranking": "Ranking"
    };

    const privateRoutesPath = Object.keys(privateRoutes);

    return (
        <div className={styles.container}>
            <Header privatePage={privateRoutesPath.includes(asPath) ? privateRoutes[asPath] : ""} />
            <div className={styles.contentContainer}>
                {privateRoutesPath.includes(asPath) && <NavBar /> }
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

export function UIProvider({ children }) {
    var { asPath } = useRouter();
    asPath = asPath.split('/')[1];

    const privateRoutes = {
        "organizacao": "Organizações Inscritas",
        "home": "Início",
        "profile": "Perfil",
        "ranking": "Ranking"
    };

    const privateRoutesPath = Object.keys(privateRoutes);
    const isPrivateRoute = privateRoutesPath.includes(asPath) 

    return (
        <div className={styles.container}>
            <Header privatePage={isPrivateRoute ? privateRoutes[asPath] : ""} />
            <div className={styles.contentContainer}>
                {isPrivateRoute && <NavBar /> }
                <div className={styles[isPrivateRoute ? "contentNavbarWidth" : "contentFullWidth"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}
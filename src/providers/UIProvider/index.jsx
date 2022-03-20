import { Header } from '../../components/Header';
import { NavBar } from '../../components/NavBar';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import {useAuth} from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

export function UIProvider({ children }) {
    var { user } = useAuth();

    var { asPath } = useRouter();
    asPath = asPath.split('/')[1];

    const privateRoutes = {
        "organizations": "Organizações Inscritas",
        "home": "Início",
        "profile": "Perfil",
        "ranking": "Ranking",
        "applicationManagement": "Gerenciamento"
    };

    const privateRoutesPath = Object.keys(privateRoutes);
    const isPrivateRoute = privateRoutesPath.includes(asPath) 

    return (
        <div className={styles.container}>
            <Header privatePage={isPrivateRoute ? privateRoutes[asPath] : ""} user={user} />
            <div className={styles.contentContainer}>
                {isPrivateRoute && <NavBar /> }
                <div className={styles[isPrivateRoute ? "contentNavbarWidth" : "contentFullWidth"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}
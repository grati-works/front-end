import styles from './styles.module.scss';
import { Home, People, User, TicketStar } from 'react-iconly'
import { ActiveLink } from '../ActiveLink';
import { parseCookies } from 'nookies';

export function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <ActiveLink activeClassname={styles.active} href="/organizations" tooltip="Organizações">
                <a><People set="light" /></a>
            </ActiveLink>
                <ActiveLink activeClassname={styles.active} href={`/home/${parseCookies()['grati.organization_id'] || 0}${parseCookies()['grati.group_id'] ? `/group/${parseCookies()['grati.group_id']}` : ''}`} tooltip="Início">
                    <a><Home set="light" /></a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/profile" tooltip="Perfil">
                    <a><User set="light" /></a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/ranking" tooltip="Ranking">
                    <a><TicketStar set="light" /></a>
                </ActiveLink>
        </nav>
    );
}
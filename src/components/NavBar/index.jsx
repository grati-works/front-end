import styles from './styles.module.scss';
import { Home, People, User, TicketStar } from 'react-iconly'
import { ActiveLink } from '../ActiveLink';

export function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <ActiveLink activeClassname={styles.active} href="/">
                <a><People set="light" /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/home">
                <a><Home set="light" /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/profile">
                <a><User set="light" /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/ranking">
                <a><TicketStar set="light" /></a>
            </ActiveLink>
        </nav>
    );
}
import styles from './styles.module.scss';
import { MdPeopleOutline } from 'react-icons/md';
import { BsHouse } from 'react-icons/bs';
import { RiUser6Line, RiMedalLine } from 'react-icons/ri';
import { ActiveLink } from '../ActiveLink';

export function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <ActiveLink activeClassname={styles.active} href="/">
                <a><MdPeopleOutline /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/home">
                <a><BsHouse /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/profile">
                <a><RiUser6Line /></a>
            </ActiveLink>
            <ActiveLink activeClassname={styles.active} href="/ranking">
                <a><RiMedalLine /></a>
            </ActiveLink>
        </nav>
    );
}
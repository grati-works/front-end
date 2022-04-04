import styles from './styles.module.scss';
import { Home, People, User, TicketStar } from 'react-iconly'
import { ActiveLink } from '../ActiveLink';
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';

export function NavBar() {
    const [selectedOrganizationid, setSelectedOrganizationId] = useState(null);
    const [selectedGroupdId, setSelectedGroupId] = useState(null);
    useEffect(() => {
        const { 'grati.organization_id': organization_id, 'grati.group_id': group_id } = parseCookies();
        setSelectedOrganizationId(organization_id || 0);
        setSelectedGroupId(group_id || null);
    }, [])
    return (
        <nav className={styles.navbarContainer}>
            <ActiveLink activeClassname={styles.active} href="/organizations" tooltip="Organizações">
                <a><People set="light" /></a>
            </ActiveLink>
                <ActiveLink activeClassname={styles.active} href={`/home/${selectedOrganizationid}${selectedGroupdId ? `/group/${selectedGroupdId}` : ''}`} tooltip="Início">
                    <a><Home set="light" /></a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/profile" tooltip="Perfil">
                    <a><User set="light" /></a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href={`/ranking/${selectedOrganizationid}`} tooltip="Ranking">
                    <a><TicketStar set="light" /></a>
                </ActiveLink>
        </nav>
    );
}
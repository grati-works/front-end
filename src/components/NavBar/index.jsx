import styles from "./styles.module.scss";
import { Home, People, User, TicketStar, Setting } from "react-iconly";
import { ActiveLink } from "../ActiveLink";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useRouter } from "next/router";

export function NavBar({ user }) {
  const [selectedOrganizationid, setSelectedOrganizationId] = useState(null);
  const [selectedGroupdId, setSelectedGroupId] = useState(null);
  const [isAuthorOfOrganization, setIsAuthorOfOrganization] = useState(false);
  const { asPath, pathname } = useRouter();

  useEffect(() => {
    let {
      "grati.organization_id": organization_id,
      "grati.group_id": group_id,
    } = parseCookies();

    setSelectedOrganizationId(organization_id || 0);
    setSelectedGroupId(group_id || null);

    async function isAuthorOfOrganization() {
      try {
        await api.get(`organization/is-owner/${organization_id}`);
        setIsAuthorOfOrganization(true);
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) setIsAuthorOfOrganization(false);
      }
    }

    isAuthorOfOrganization();
  }, [pathname]);
  return (
    <nav className={styles.navbarContainer}>
      <ActiveLink
        activeClassname={styles.active}
        href="/organizations"
        tooltip="Organizações"
      >
        <a>
          <People set="light" />
        </a>
      </ActiveLink>
      <ActiveLink
        activeClassname={styles.active}
        href={`/home/${selectedOrganizationid}${
          selectedGroupdId ? `/group/${selectedGroupdId}` : ""
        }`}
        tooltip="Início"
      >
        <a>
          <Home set="light" />
        </a>
      </ActiveLink>
      <ActiveLink
        activeClassname={styles.active}
        href="/user/me"
        tooltip="Perfil"
      >
        <a>
          <User set="light" />
        </a>
      </ActiveLink>
      <ActiveLink
        activeClassname={styles.active}
        href={`/ranking/${selectedOrganizationid}`}
        tooltip="Ranking"
      >
        <a>
          <TicketStar set="light" />
        </a>
      </ActiveLink>
      {isAuthorOfOrganization || asPath.includes("manage") ? (
        <ActiveLink
          activeClassname={styles.active}
          href={`/manage/${selectedOrganizationid}`}
          tooltip="Gerenciamento"
        >
          <a>
            <Setting set="light" />
          </a>
        </ActiveLink>
      ) : null}
    </nav>
  );
}

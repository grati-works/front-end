import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { ActiveLink } from "../ActiveLink";
import { Button } from "../Button";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, Tooltip, Image } from "@nextui-org/react";
import { Notification, Search } from "react-iconly";
import Link from "next/link";
import { SearchInput } from "../SearchInput";
import dayjs from "dayjs";

import { destroyCookie, parseCookies, setCookie } from "nookies";

export function Header({ user, privatePage = "" }) {
  const { push, query } = useRouter();
  const { signOut } = useAuth();

  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(null);
  let { "grati.organization_id": organization_id } = parseCookies();

  function toggleSearchBar() {
    setSearchBarIsOpen(!searchBarIsOpen);
  }

  function toggleNavbar() {
    setNavbarIsOpen(!navbarIsOpen);
  }

  useEffect(() => {
    // if(asPath.includes("auth") && user) push('/organizations');
    // else if(privatePage !== '' && !user) push('/auth/signin')

    async function loadNotifications() {
      const response = await api.get("notification/list");
      const data = await response.data;

      setNotifications(data);
    }

    if (user) {
      loadNotifications();
    }
  }, []);

  useEffect(() => {
    let color = "#6874E8"
    async function loadOrganizationColor() {
      const response = await api.get(`organization/${organization_id}`);
      const data = await response.data;
      color = data.color || "#6874E8";

      document.body.style.setProperty("--nextui-colors-header", color);
    }

    if (!organization_id) {
      document.body.style.setProperty("--nextui-colors-header", color);
      if (query["organization_id"]) {
        organization_id = query["organization_id"];
        setCookie(null, "grati.organization_id", organization_id);
      }
    } else {
      loadOrganizationColor();
    }
  }, [organization_id]);

  return (
    <header className={styles.headerContainer}>
      <div
        className={styles.logoContainer}
        onClick={() => push("/")}
      >
        <Image src="/images/logo.svg" alt="grati" height="50%" width="50%" />
      </div>
      <div className={styles.headerContent}>
        <nav>
          {privatePage !== "" ? (
            <>
              <p className={styles.active}>{privatePage}</p>
            </>
          ) : (
            <>
              <button className={styles.mobileMenu} onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div
                className={
                  navbarIsOpen
                    ? styles.mobileMenuNavbarOpen
                    : styles.mobileMenuNavbarClosed
                }
              >
                <ActiveLink activeClassname={styles.active} href="/">
                  <a>Início</a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/about">
                  <a>Sobre nós</a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/#plans">
                  <a>Nossos Planos</a>
                </ActiveLink>
                <ActiveLink activeClassname={styles.active} href="/faq">
                  <a>FAQ</a>
                </ActiveLink>
              </div>
            </>
          )}
        </nav>
        {!user ? (
          <div className={styles.notLogged}>
            <ThemeSwitcher style={styles.icon} />
            <Link href="/auth/signin">
              <Button aria-label="Fazer login">Fazer login</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.userContainer}>
            {searchBarIsOpen && <SearchInput />}
            <Search
              set="light"
              onClick={toggleSearchBar}
              className={styles.icon}
            />
            <ThemeSwitcher style={styles.icon} />
            <Tooltip
              placement="bottom"
              className={styles.tooltipContainer}
              content={notifications?.map((notification) => (
                <div className={styles.notificationCard}>
                  <Avatar pointer size="lg" src={user.profile_picture} />
                  <div className={styles.contentWrapper}>
                    <span>@{notification.feedback.sender.user.username}</span>{" "}
                    te enviou um grati hoje às{" "}
                    {dayjs(notification.created_at).format("HH:mm")}
                  </div>
                </div>
              ))}
              trigger="click"
            >
              <Notification set="light" className={styles.icon} />
            </Tooltip>
            <Tooltip
              placement="bottomEnd"
              className={styles.tooltipContainer}
              content={
                <div className={styles.userTooltip}>
                  <button onClick={() => push("/organizations")}>
                    Minhas organizações
                  </button>
                  <button
                    onClick={() => {
                      push("/");
                      destroyCookie(null, "grati.group_id");
                      destroyCookie(null, "grati.organization_id");
                      destroyCookie(null, "grati.refreshToken");
                      destroyCookie(null, "grati.token");
                      signOut();
                    }}
                  >
                    Fazer logoff
                  </button>
                </div>
              }
              trigger="click"
            >
              <p>{user.name}</p>
              <Avatar pointer size="lg" src={user.profile_picture} />
            </Tooltip>
          </div>
        )}
      </div>
    </header>
  );
}

import styles from './styles.module.scss';
import { useState } from 'react';

import { ActiveLink } from '../ActiveLink';
import { Button } from '../Button';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Avatar, Input } from '@nextui-org/react';
import { Notification, Search } from 'react-iconly';
import Link from 'next/link';

export function Header({ isLogged = false, privatePage = '' }) {
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  function toggleSearchBar() {
    setSearchBarIsOpen(!searchBarIsOpen);
  }

  function toggleNavbar() {
    setNavbarIsOpen(!navbarIsOpen);
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src='/images/logo.svg' alt='grati' />
      </div>
      <div className={styles.headerContent}>
        <nav>
          <button className={styles.mobileMenu} onClick={toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          {privatePage !== '' ? (
            <>
              <Link className={styles.active}>{privatePage}</Link>
            </>
          ) : (
            <div className={navbarIsOpen ? styles.mobileMenuNavbarOpen : styles.mobileMenuNavbarClosed}>
              <ActiveLink activeClassname={styles.active} href='/'>
                <a>Início</a>
              </ActiveLink>
              <ActiveLink activeClassname={styles.active} href='/about'>
                <a>Sobre nós</a>
              </ActiveLink>
              <ActiveLink activeClassname={styles.active} href='/plans'>
                <a>Nossos Planos</a>
              </ActiveLink>
              <ActiveLink activeClassname={styles.active} href='/faq'>
                <a>FAQ</a>
              </ActiveLink>
            </div>
          )}
        </nav>
        {isLogged == false ? (
          <div className={styles.notLogged}>
            <ThemeSwitcher style={styles.icon} />
            <Link href='/auth/signin'>
              <Button>Fazer login</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.userContainer}>
            {searchBarIsOpen && <Input clearable shadow={false} size='md' placeholder='Insira o termo a ser pesquisado' type='search' />}
            <Search set='light' onClick={toggleSearchBar} className={styles.icon} />
            <ThemeSwitcher style={styles.icon} />
            <Notification set='light' className={styles.icon} />
            <p>Túlio Nogueira</p>
            <Avatar src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' size='lg' />
          </div>
        )}
      </div>
    </header>
  );
}

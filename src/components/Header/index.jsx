import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

import { ActiveLink } from '../ActiveLink';
import { Button } from '../Button';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Avatar, Input } from '@nextui-org/react';
import { Notification, Search } from 'react-iconly';
import Link from 'next/link';

export function Header({ user, privatePage = '' }) {
  const { push, asPath } = useRouter();
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  //const user = useAuth().user ? useAuth().user : typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : {};

  function toggleSearchBar() {
    setSearchBarIsOpen(!searchBarIsOpen);
  }

  function toggleNavbar() {
    setNavbarIsOpen(!navbarIsOpen);
  }
  
  useEffect(() => {
    if(asPath.includes("auth") && user) push('/home');
    else if(privatePage !== '' && !user) push('/auth/signin')
  }, [])

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
              <p className={styles.active}>{privatePage}</p>
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
        {!user ? (
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
            <p>{user.name}</p>
            <Avatar src={`http://localhost:3333/avatars/${user.profile_picture}`} size='lg' />
          </div>
        )}
      </div>
    </header>
  );
}

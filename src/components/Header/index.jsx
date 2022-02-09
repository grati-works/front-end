import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import { Button } from '../Button';
import { Avatar, Textarea } from '@nextui-org/react';
import { VscBell, VscSearch } from 'react-icons/vsc';
import { useState } from 'react';

export function Header({ isLogged = false, privatePage = "" }) {
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);

    function toggleSearchBar() {
        setSearchBarIsOpen(!searchBarIsOpen);
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img src="/images/logo.svg" alt="grati" />
            </div>
            <div className={styles.headerContent}>
                <nav>
                    { privatePage !== "" ?
                        <>
                            <a className={styles.active}>{privatePage}</a>
                        </> :
                        <>
                            <ActiveLink activeClassname={styles.active} href="/">
                                <a>Início</a>
                            </ActiveLink>
                            <ActiveLink activeClassname={styles.active} href="/about">
                                <a>Sobre nós</a>
                            </ActiveLink>
                            <ActiveLink activeClassname={styles.active} href="/plans">
                                <a>Nossos Planos</a>
                            </ActiveLink>
                            <ActiveLink activeClassname={styles.active} href="/faq">
                                <a>FAQ</a>
                            </ActiveLink>
                        </>
                    }
                    
                </nav>
                {
                    isLogged == false ?
                    <Button>Fazer login</Button> :
                    <a className={styles.userContainer} href="#">
                        { searchBarIsOpen &&
                            <Textarea
                                placeholder="Insira o termo a ser pesquisado"
                                maxRows={1}
                            />
                        }
                        <VscSearch onClick={toggleSearchBar} />
                        <VscBell />
                        <p>Túlio Nogueira</p>
                        <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" size="lg" />
                    </a>
                }
            </div>
        </header>
    );
}
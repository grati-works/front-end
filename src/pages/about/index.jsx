import styles from "./aboutWe.module.scss";
import { useRef, useState } from "react";
import Link from "next/link";
import { Modal } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Category } from "react-iconly";
import { Input } from "../../components/Input";

export default function aboutWe() {
  return (
    <>
    <div className={styles.groupCenter}>
      <h1>Sobre nós</h1>
      <div className={styles.container}>

          <img src="./images/imgMac.png" alt="" />

          <div className={styles.containerP}>
              <p>
              Fundamos a empresa Grati em 2022, surgiu com o intuito de facilitar a comunicação entre “organização-funcionário”, e durante o tempo de produção surgiram inúmeras ideias de ferramentas e 
              disponibilidades, nas quais a nossa aplicação detem.
              </p>
              <p>
              Possuímos uma interface intuitiva e com gamificação do inicio ao fim para que o usuário tenha interesse constante em utilizar a plataforma. Temos como objetivo o aumento da produtividade 
              em empresas mantendo a equidade no ambiente entre todos.
              </p>
              <img src="./images/organizacao.png" alt="" />
          </div>
      </div>
    </div>
    <div className={styles.footer}>
        <div className={styles.menu}>
          <Image
            src="/images/logo_dark.svg"
            alt="logo-footer"
            className={styles.logo_footer}
            width={65}
            height={65}
          />
          <nav>
            <Link href="/">Início</Link>
            <Link href="/about">Sobre nós</Link>
            <Link href="#">Planos</Link>
            <Link href="#">Login</Link>
          </nav>
        </div>

        <div className={styles.footer_social_content}>
          <p>
            Grati - {new Date().getFullYear()}. Todos os Direitos Reservados
          </p>
          <Link href="#">Política de privacidade</Link>
          <Link href="#">Termos de serviço</Link>
        </div>
      </div>
    </>
  );
}

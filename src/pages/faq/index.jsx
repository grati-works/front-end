import styles from "./faq.module.scss";
import Link from "next/link";
import { useRef, useState } from "react";
import { Modal } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Category } from "react-iconly";
import { Input } from "../../components/Input";

export default function Faq() {
  const inputFile = useRef(null);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const handlerInfo = () => setVisibleInfo(true);
  const closeHandlerInfo = () => {
    setVisibleInfo(false);
  };
  return (
    <>
    <div className={styles.groupCenter}>
      <div className={styles.containerLeft}>
          <img src="./images/faqBackground.jpg" alt="background" />
      </div>
      <div className={styles.containerFaq}>
        <div className={styles.boxQuestions}>
          <h1>What this?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</p>
        </div>
        <div className={styles.boxQuestions}>
          <h1>What is it for?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</p>
        </div>
        <div className={styles.boxQuestions}>
          <h1>How do I get this application?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci dui sed amet elementum, nunc augue mauris gravida ultrices.</p>
        </div>
        <div className={styles.moreQuestion} onClick={handlerInfo}>
          +
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
    <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleInfo}
        onClose={closeHandlerInfo}
        className={styles.groupsModal}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.groupsModalHeader}>
        </Modal.Header>
        <Modal.Body className={styles.groupsWrapper}>
          <Input Icon={Category} placeholder="Digite sua pergunta"/>
          <button>Realizar pergunta</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

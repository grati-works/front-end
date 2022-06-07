import styles from "./faq.module.scss";
import Link from "next/link";
import { useRef, useState } from "react";
import { Modal, Image, Collapse } from "@nextui-org/react";
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
          <img src="./images/faqBackground.svg" alt="background" />
        </div>
        <Collapse.Group className={styles.containerFaq}>
          <Collapse title="Como a plataforma funciona?" className={styles.boxQuestions}>
            <p>
              Para a utilização da plataforma com a sua organização, é
              necessário um usuário administrador, que gerencia os usuários a
              serem cadastrados. Após os primeiros passos o restante é criar os
              grupos de usuários e definir as metas de interações, com tudo isso
              concluído espere os bons resultados aparecerem.
            </p>
          </Collapse>
          <Collapse title="Existe uma opção de plano superior a 1000 usuários?" className={styles.boxQuestions}>
            <p>
              Sim, para planos superiores a quantidade de usuários que o nosso
              planpo de grande porte oferece, favor entrar em contato connosco.
            </p>
          </Collapse>
          <Collapse title="Quais as formas de pagamentos dísponiveis?" className={styles.boxQuestions}>
            <p>
              Atualmente aceitamos Cartão de crédito e débito como forma de pagamento.
            </p>
          </Collapse>
        </Collapse.Group>
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
        <Modal.Header className={styles.groupsModalHeader}></Modal.Header>
        <Modal.Body className={styles.groupsWrapper}>
          <Input Icon={Category} placeholder="Digite sua pergunta" />
          <button>Realizar pergunta</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

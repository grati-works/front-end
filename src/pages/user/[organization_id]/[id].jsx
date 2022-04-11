import { useState } from 'react';
import Head from 'next/head';

import styles from './profile.module.scss';
import { Avatar, Card, Modal } from '@nextui-org/react';
import { GratiCard } from '../../../components/GratiCard';
import { Button } from '../../../components/Button';
import { DeleteMessageModal } from '../../../components/Modal/DeleteMessage';

export default function Profile() {
  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);

  const message = {
    message: "TESTE",
    receivers: [
      {
        user: {
          id: 1,
          name: "Caua",
          profile_picture: "http://localhost:3333/avatars/teste.png"
        }
      }
    ],
    sender: {
      user: {
        id: 1,
        name: "Caua",
        profile_picture: "http://localhost:3333/avatars/teste.png"
      }
    },
    reactions: [
      
    ]
  }

  function handleOpenDeleteModal(id) {
    setSelectedGrati(id);
    setModalIsVisible(!selectedGrati)
  }

  function handleDeleteMessage() {
    api.delete(`/message/${selectedGrati}`).then(() => {
      setMessages((messages) => ({
        ...messages,
        [selectedMessagesSection]: messages[selectedMessagesSection].filter(
          (message) => message.id !== selectedGrati
        ),
      }));
      setDeleteModalIsVisible(false);
      toast.success("Mensagem excluida com sucesso!");
    });
  }

  return (
    <>
      <Head>
        <title>Grati | Perfil</title>
      </Head>

      <div className={styles.profileWrapper}>
        <div className={styles.containerNavBar}>
          <img className={styles.imgFundo} src='/images/imgFundoProfile.png' alt='imagemDeFundo' />
          <div className={styles.headerContent}>
            <Avatar src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp' className={styles.imgPerfil} />
            <dir className={styles.userName}>
              <h1>Túlio Nogueira</h1>
              <h2>Product Owner</h2>
            </dir>
            <div className={styles.imgIcons}>
              <button>
                <img src='/images/imgGitHub.png' alt='imgGitHub' />
                Github
              </button>
              <button>
                <img src='/images/imgLinkedin.png' alt='imgLinkedin' />
                Linkedin
              </button>
              <button>
                <img src='/images/imgDribbble.png' alt='imgDribbble' />
                Dribbble
              </button>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.personalInfo}>
            <div className={styles.aboutPersonCard}>
              <h1>Sobre mim</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices nulla nunc tortor magna posuere. Amet, faucibus sed malesuada vitae malesuada. Amet eros, ultrices
                ut viverra enim est diam pellentesque. Sapien sodales tempus viverra risus a elit placerat euismod risus. Ipsum mattis volutpat massa tortor lacinia.
              </p>
            </div>
            <div className={styles.skillsCard}>
              <h1>Skills</h1>
              <div className={styles.skillsContent}>
                <div className={styles.experienced}>
                  <ul>Tenho experiência</ul>
                  <li>Comunicação</li>
                  <li>Trabalhar sobre pressão</li>
                </div>

                <div className={styles.studying}>
                  <ul>Estou estudando</ul>
                  <li>Liderança de equipe</li>
                </div>
              </div>
            </div>
            <div className={styles.formationCard}>
              <h1>Formação</h1>
              <div className={styles.formationContent}>
                <div className={styles.completed}>
                  <ul>Concluida</ul>
                  <li>Graduação em Ciência da computação [2016]</li>
                </div>

                <div className={styles.progress}>
                  <ul>Em andamento</ul>
                  <li>Curso de Java Spring avançado</li>
                </div>

                <div className={styles.interested}>
                  <ul>Tenho interesse</ul>
                  <li>Tecnologia em Processamento de Dados</li>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.messageList}>
            <div className={styles.commentHeader}>
              <h3 className={`${styles.cardFilter} ${styles.filterActive}`}>Enviados</h3>
              <h3 className={styles.cardFilter}>Recebidos</h3>
            </div>
            <GratiCard content={message} deleteFunction={handleOpenDeleteModal} />
            <GratiCard content={message} deleteFunction={handleOpenDeleteModal} />
          </div>
        </div>
      </div>
      
      <DeleteMessageModal isVisible={isVisible} closeFunction={handleOpenDeleteModal} deleteFunction={handleDeleteMessage}/>
    </>
  );
}

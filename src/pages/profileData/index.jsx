import { useState } from 'react';
import Head from 'next/head';
import { Input } from '../../components/Input';
import styles from './dadosPerfil.module.scss';
import { Avatar, Card, Modal } from '@nextui-org/react';
import { GratiCard } from '../../components/GratiCard';
import { User, Lock, Edit, People, Paper, Danger, Wallet } from 'react-iconly';
import { Button } from '../../components/Button';

export default function DateProfile() {
  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);
  const [currentSection, setCurrentSection] = useState("data");

  function handleOpenDeleteModal(id) {
    setSelectedGrati(id);
    setModalIsVisible(!selectedGrati)
  }

  return (
    <>
      <Head>
        <title>Grati | Dados do Perfil</title>
      </Head>
        <div className={styles.frame}>
            <div className={styles.editProfile}>
                <div className={styles.imgPerfil}>
                    <Avatar src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp' className={styles.imgPerfilOn} />
                    <img className={styles.cam} src="/images/camImg.jpg" alt="imgCamera" />
                </div>
                <div className={styles.editInfo}>
                    <div className={styles.dados}>
                        <div className={styles.datePassword}>
                            <button onClick={() => setCurrentSection("data")}>Dados</button>
                            <button onClick={() => setCurrentSection("switchPassword")}>Trocar senha</button>
                        </div>
                        {
                          currentSection === "data" ? (
                            <>
                              <Input Icon={User} placeholder="Nome"/>
                              <Input Icon={Paper} placeholder="Usuário"/>
                              <Input Icon={Edit} placeholder="E-mail"/>
                              <Input Icon={Wallet} placeholder="Editar informações corporativas &oplus;"/>
                              <button>Salvar alterações</button>
                            </>
                          ) : (
                            <>
                              <Input Icon={Lock} placeholder="Senha atual"/>
                              <Input Icon={Lock} placeholder="Senha"/>
                              <Input Icon={Lock} placeholder="Repetir senha"/>
                              <button>Salvar alterações</button>
                            </>
                          )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.messageList}>
            <div className={styles.commentHeader}>
              <h3 className={`${styles.cardFilter} ${styles.filterActive}`}>Enviados</h3>
              <h3 className={styles.cardFilter}>Recebidos</h3>
            </div>
            <GratiCard deleteFunction={handleOpenDeleteModal} />
            <GratiCard deleteFunction={handleOpenDeleteModal} />
            </div>
        </div>
    </>
  );
}

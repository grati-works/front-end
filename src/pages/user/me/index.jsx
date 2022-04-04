import { useState } from 'react';
import Head from 'next/head';
import { Input } from '../../../components/Input';
import styles from './dadosPerfil.module.scss';
import { Avatar, Modal } from '@nextui-org/react';
import { GratiCard } from '../../../components/GratiCard';
import { Button } from '../../../components/Button';
import { User, Lock, Edit, Paper, Wallet } from 'react-iconly';

export default function DateProfile() {
  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);
  const [currentSection, setCurrentSection] = useState("data");

  //Modal de visualização das informações corporativas
  const [visibleInfo, setVisibleInfo] = useState(false);
  const handlerInfo = () => setVisibleInfo(true);
  const closeHandlerInfo = () => {
      setVisibleInfo(false);
  };

  //Modal de alteração das informações corporativas
  const [editInfo, setEditInfo] = useState(false);
  const handlerEditInfo = () => setEditInfo(true);
  const closeHandlerEditInfo = () => {
      setEditInfo(false);
  };

  //Modal de alteração das informações corporativas studyInfo
  const [editStudyInfo, setEditStudyInfo] = useState(false);
  const handlerEditStudyInfo = () => setEditStudyInfo(true);
  const closeHandlerEditStudyInfo = () => {
    setEditStudyInfo(false);
  };

  function handleOpenDeleteModal(id) {
    setSelectedGrati(id);
    setModalIsVisible(!selectedGrati)
  }

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
                            <button onClick={() => setCurrentSection("data")} className={currentSection == 'data' ? styles.selectedTitle : ''}>Dados</button>
                            <button onClick={() => setCurrentSection("switchPassword")}  className={currentSection == 'switchPassword' ? styles.selectedTitle : ''}>Trocar senha</button>
                        </div>
                        {
                          currentSection === "data" ? (
                            <>
                              <Input Icon={User} placeholder="Nome"/>
                              <Input Icon={Paper} placeholder="Usuário"/>
                              <Input Icon={Edit} placeholder="E-mail"/>
                              <Input onClick={handlerInfo} readonly Icon={Wallet} placeholder="Editar informações corporativas &oplus;" style={{ cursor: 'pointer' }} />
                              <Button>Salvar alterações</Button>
                            </>
                          ) : (
                            <>
                              <Input Icon={Lock} placeholder="Senha atual"/>
                              <Input Icon={Lock} placeholder="Senha"/>
                              <Input Icon={Lock} placeholder="Repetir senha"/>
                              <Button>Salvar alterações</Button>
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
            <GratiCard content={message} deleteFunction={handleOpenDeleteModal} />
            <GratiCard content={message} deleteFunction={handleOpenDeleteModal} />
            </div>
        </div>
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleInfo}
        onClose={closeHandlerInfo}
        className={styles.groupsModal}
        width="1200px"
        scroll
      >
          <Modal.Body className={styles.groupsWrapper}>
            <div className={styles.user}>
              <div className={styles.imgUser}>
              <Avatar src='https://mdbcdn.b-cdn.net/img/new/avatars/8.webp' className={styles.imgPerfilOn} />
              </div>
              <h1>Túlio Nogueira <br /> Moraes</h1>
              <div className={styles.profession}>
                Cargo/Posição
                <span>Product Owner</span>
              </div>
            </div>
            <div className={styles.infoMe}>
              <div className={styles.InfoAbout} onClick={handlerEditInfo}>
              Sobre mim <span className={styles.span} onClick={handlerEditInfo}>&#9998;</span>
              <div className={styles.whoYou}><span className={styles.spam}> + </span><span> Quem é você e o que faz? </span></div>
              <button>
                <img src='/images/imgGitHub.png' alt='imgGitHub' />
                Github
              </button>
              </div>
              <div className={styles.skills}>
                Skills <span className={styles.span} onClick={handlerEditStudyInfo}>&#9998;</span>
                <div className={styles.editSkills}>
                  <div className={styles.haveExp} onClick={handlerEditStudyInfo}>
                    Tenho experiência
                    <div>+</div>
                  </div>
                  <div className={styles.studi} onClick={handlerEditStudyInfo}>
                    Estou estudando
                    <div>+</div>
                  </div>
                </div>
                </div>
                <div className={styles.formation}>
                  Formação <span className={styles.span} onClick={handlerEditStudyInfo}>&#9998;</span>
                  <div className={styles.editFormation}>
                <div className={styles.finish} onClick={handlerEditStudyInfo}>
                    Concluída
                    <div>+</div>
                  </div>
                  <div className={styles.progress} onClick={handlerEditStudyInfo}>
                    Em andamento
                    <div>+</div>
                  </div>
                  <div className={styles.interest} onClick={handlerEditStudyInfo}>
                    Tenho interesse
                    <div>+</div>
                  </div>
                  </div>
                </div>

            </div>
          </Modal.Body>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={editInfo}
        onClose={closeHandlerEditInfo}
        className={styles.groupsModalInfoCorporative}
        width="1200px"
        scroll
      >
          <Modal.Body className={styles.editGrape}>
              Sobre mim
              <div className={styles.aboutMe}>
                <div className={styles.bar}>
                  <button>B</button>
                  <button>I</button>
                </div>
                <input type="text" placeholder='1200 caractéres'/>
              </div>
              <div className={styles.gitHub}>
                <button>
                <img src='/images/imgGitHub.png' alt='imgGitHub' />
                Github
              </button>
              </div>
              <div className={styles.linkedin}>
              <button>
                <img src='/images/imgLinkedin.png' alt='imgLinkedin' />
                Linkedin
              </button>
              </div>
              <div className={styles.dribbble}>
              <button>
                <img src='/images/imgDribbble.png' alt='imgDribbble' />
                Dribbble
              </button>
              </div>
              <div className={styles.boxButons}>
              <button className={styles.butonCancel}>Cancelar</button>
              <button className={styles.butonSave}>salvar alterações</button>
              </div>
          </Modal.Body>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={editStudyInfo}
        onClose={closeHandlerEditStudyInfo}
        className={styles.groupsModalInfoCorporative}
        width="1200px"
        scroll
      >
          <Modal.Body className={styles.groupsWrapper}>
          Skills
              <div className={styles.cox}>
                <div className={styles.bar}>
                  <button>B</button>
                  <button>I</button>
                </div>
                <input type="text" placeholder='1200 caractéres'/>
              </div>
              Formação
              <div className={styles.cox}>
                <div className={styles.bar}>
                  <button>B</button>
                  <button>I</button>
                </div>
                <input type="text" placeholder='1200 caractéres'/>
              </div>
              <div className={styles.boxButons}>
              <button className={styles.butonCancel} >Cancelar</button>
              <button className={styles.butonSave}>salvar alterações</button>
              </div>
          </Modal.Body>
      </Modal>
    </>
  );
}

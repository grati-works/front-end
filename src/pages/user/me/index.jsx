import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Head from "next/head";
import { Input } from "../../../components/Input";
import styles from "./dadosPerfil.module.scss";
import { Avatar, Modal, Image } from "@nextui-org/react";
import { GratiCard } from "../../../components/GratiCard";
import { Button } from "../../../components/Button";
import { User, Lock, Edit, Paper, Wallet, EditSquare } from "react-iconly";
import { parseCookies } from "nookies";
import { api } from "../../../services/api";
import { Skeleton } from "../../../components/Skeleton";
import Router from "next/router";

export default function DateProfile() {
  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);
  const [currentSection, setCurrentSection] = useState("data");
  const [messages, setMessages] = useState({
    sended_feedbacks: [],
    received_feedbacks: [],
  });

  const { user, profile } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [selectedMessagesSection, setSelectedMessagesSection] =
    useState("sended_feedbacks");
  const vinculed_accounts = {
    github: "/images/imgGitHub.png",
    linkedin: "/images/imgLinkedin.png",
  };

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
    setModalIsVisible(!selectedGrati);
  }

  useEffect(() => {
    async function loadMessages(user) {
      const { "grati.organization_id": organization_id } = parseCookies();
      const response = await api.get(`profile/${organization_id}/${user.id}`);

      let { sended_feedbacks, received_feedbacks } = response.data;
      if (sended_feedbacks.length === 0) sended_feedbacks = "vazio";
      if (received_feedbacks.length === 0) received_feedbacks = "vazio";
      setMessages({ received_feedbacks, sended_feedbacks });
    }

    if (user) {
      console.log(user);
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);

      loadMessages(user);
    }

    if (profile) {
      console.log(profile);
      setResponsibility(profile.responsibility);
    }
  }, [user, profile]);

  return (
    <>
      <Head>
        <title>Grati | Dados do Perfil</title>
      </Head>
      <div className={styles.frame}>
        <div className={styles.editProfile}>
          <div className={styles.imgPerfil}>
            <Avatar
              src={user?.profile_picture}
              className={styles.imgPerfilOn}
            />
            <img
              className={styles.cam}
              src="/images/camImg.jpg"
              alt="imgCamera"
            />
          </div>
          <div className={styles.editInfo}>
            <div className={styles.dados}>
              <div className={styles.datePassword}>
                <button
                  onClick={() => setCurrentSection("data")}
                  className={
                    currentSection == "data" ? styles.selectedTitle : ""
                  }
                >
                  Dados
                </button>
                <button
                  onClick={() => setCurrentSection("switchPassword")}
                  className={
                    currentSection == "switchPassword"
                      ? styles.selectedTitle
                      : ""
                  }
                >
                  Trocar senha
                </button>
              </div>
              {currentSection === "data" ? (
                <>
                  <Input
                    Icon={User}
                    placeholder="Nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Input
                    Icon={Paper}
                    placeholder="Usuário"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <Input
                    Icon={Edit}
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Input
                    onClick={handlerInfo}
                    readOnly
                    Icon={Wallet}
                    placeholder="Editar informações corporativas &oplus;"
                    style={{ cursor: "pointer" }}
                  />
                  <Button>Salvar alterações</Button>
                </>
              ) : (
                <>
                  <Input
                    Icon={Lock}
                    placeholder="Senha atual"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Input
                    Icon={Lock}
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <Input
                    Icon={Lock}
                    placeholder="Repetir nova senha"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                  />
                  <Button>Salvar alterações</Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.messageList}>
          <div className={styles.commentHeader}>
            <h3
              className={`${styles.cardFilter} ${
                selectedMessagesSection == "sended_feedbacks"
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() => setSelectedMessagesSection("sended_feedbacks")}
            >
              Enviados
            </h3>
            <h3
              className={`${styles.cardFilter} ${
                selectedMessagesSection == "received_feedbacks"
                  ? styles.filterActive
                  : ""
              }`}
              onClick={() => setSelectedMessagesSection("received_feedbacks")}
            >
              Recebidos
            </h3>
          </div>
          {messages[selectedMessagesSection] == "vazio" ? (
            <div className={styles.emptyMessages}>
              <Image
                src="/images/empty_messages.svg"
                alt="Ilustração de perguntas"
                showSkeleton
                maxDelay={10000}
                width={200}
                height={200}
              />
              <h2>Nenhuma mensagem por aqui...</h2>
              <p>
                Gostaria de enviar uma nova mensagem? Utilize a caixa acima!
              </p>
            </div>
          ) : messages[selectedMessagesSection].length > 0 ? (
            messages[selectedMessagesSection].map((message) => (
              <GratiCard
                content={message}
                key={message.id}
                reactedMessages={reactions.filter(
                  (reaction) => reaction.feedback_id === message.id
                )}
                deleteFunction={handleOpenDeleteModal}
              />
            ))
          ) : (
            <Skeleton width="100%" height="300px" repeat={5} />
          )}
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
              <Avatar
                src={user?.profile_picture}
                className={styles.imgPerfilOn}
              />
            </div>
            <h1>{user?.name}</h1>
            <Input
              className={styles.profession}
              labelPlaceholder="Cargo/Posição"
              value={responsibility}
              onChange={(event) => setResponsibility(event.target.value)}
              underlined={false}
              shadow={false}
            />
          </div>
          <div className={styles.infoMe}>
            <div className={styles.InfoAbout}>
              <div className={styles.title}>
                Sobre mim
                <EditSquare
                  set="light"
                  className={styles.editIcon}
                  onClick={handlerEditInfo}
                />
              </div>
              {!profile?.description ? (
                <p className={styles.whoYou} onClick={handlerEditInfo}>
                  <span> + </span>
                  Quem é você e o que faz?
                </p>
              ) : (
                <p>{profile?.description}</p>
              )}
              {profile?.vinculed_accounts.map((vinculed_account) => (
                <Button
                  icon={
                    <img
                      src={vinculed_accounts[vinculed_account.provider]}
                      alt={`Ícone de ${vinculed_account.provider}`}
                    />
                  }
                  key={vinculed_account.provider}
                  onClick={() => Router.push(vinculed_account.account)}
                >
                  {vinculed_account.provider}
                </Button>
              ))}
            </div>
            <div className={styles.skills}>
              <div className={styles.title}>
                Skills
                <EditSquare
                  set="light"
                  className={styles.editIcon}
                  onClick={handlerEditStudyInfo}
                />
              </div>
            </div>
            <div className={styles.formation}>
            <div className={styles.title}>
                Formação
                <EditSquare
                  set="light"
                  className={styles.editIcon}
                  onClick={handlerEditStudyInfo}
                />
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
            <input type="text" placeholder="1200 caractéres" />
          </div>
          <div className={styles.gitHub}>
            <button>
              <img src="/images/imgGitHub.png" alt="imgGitHub" />
              Github
            </button>
          </div>
          <div className={styles.linkedin}>
            <button>
              <img src="/images/imgLinkedin.png" alt="imgLinkedin" />
              Linkedin
            </button>
          </div>
          <div className={styles.dribbble}>
            <button>
              <img src="/images/imgDribbble.png" alt="imgDribbble" />
              Dribbble
            </button>
          </div>
          <div className={styles.boxButons}>
            <Button color="error">Cancelar</Button>
            <Button>Salvar alterações</Button>
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
            <input type="text" placeholder="1200 caractéres" />
          </div>
          Formação
          <div className={styles.cox}>
            <div className={styles.bar}>
              <button>B</button>
              <button>I</button>
            </div>
            <input type="text" placeholder="1200 caractéres" />
          </div>
          <div className={styles.boxButons}>
            <Button color="error">Cancelar</Button>
            <Button>Salvar alterações</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import Head from "next/head";

import styles from "./profile.module.scss";
import { Avatar } from "@nextui-org/react";
import { GratiCard } from "../../../components/GratiCard";
import { DeleteMessageModal } from "../../../components/Modal/DeleteMessage";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import { Skeleton } from "../../../components/Skeleton";
import { MessageEmptyBox } from "../../../components/EmptyBox/Message";
import { Button } from "../../../components/Button";
import { vinculed_accounts } from "../../../utils/vinculedAccounts";

export default function Profile() {
  const router = useRouter();

  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedMessagesSection, setSelectedMessagesSection] =
    useState("sended_feedbacks");

  function handleOpenDeleteModal(id) {
    setSelectedGrati(id);
    setModalIsVisible(!selectedGrati);
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

  useEffect(() => {
    async function loadUserData() {
      const { organization_id, id } = router.query;

      if (organization_id && id) {
        var response = await api.get(`profile/${organization_id}/${id}?getAllData=true&isPublic=true`);

        let { sended_feedbacks, received_feedbacks } = response.data;
        if (sended_feedbacks.length === 0)
          response.data.sended_feedbacks = "vazio";
        if (received_feedbacks.length === 0)
          response.data.received_feedbacks = "vazio";

        setUserData(response.data);
      }
    }

    loadUserData();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Grati | Perfil</title>
      </Head>

      <div className={styles.profileWrapper}>
        <div className={styles.containerNavBar}>
          <img
            className={styles.imgFundo}
            src="/images/imgFundoProfile.png"
            alt="imagemDeFundo"
          />
          <div className={styles.headerContent}>
            <Avatar
              src={userData?.user.profile_picture}
              className={styles.imgPerfil}
            />
            <dir className={styles.userName}>
              <h1>{userData?.user.name}</h1>
              <h2>{userData?.responsibility}</h2>
            </dir>
            <div className={styles.imgIcons}>
              {userData?.vinculed_accounts.map((vinculed_account) => (
                <Button
                  icon={
                    <img
                      src={vinculed_accounts[vinculed_account.provider].icon}
                      alt={`Ícone de ${vinculed_account.provider}`}
                    />
                  }
                  key={vinculed_account.provider}
                  onClick={() =>
                    (window.location = `${
                      vinculed_accounts[vinculed_account.provider].prefix
                    }${vinculed_account.account}`)
                  }
                >
                  {vinculed_account.provider}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.personalInfo}>
            <div className={styles.aboutPersonCard}>
              <h1>Sobre mim</h1>
              <p dangerouslySetInnerHTML={{ __html: userData?.description }} />
            </div>
            <div className={styles.skillsCard}>
              <h1>Skills</h1>
              <div className={styles.skillsContent}>
                <p dangerouslySetInnerHTML={{ __html: userData?.skills }} />
              </div>
            </div>
            <div className={styles.formationCard}>
              <h1>Formação</h1>
              <div className={styles.formationContent}>
                <p dangerouslySetInnerHTML={{ __html: userData?.skills }} />
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
            {userData !== null &&
              (userData[selectedMessagesSection] == "vazio" ? (
                <MessageEmptyBox />
              ) : userData[selectedMessagesSection].length > 0 ? (
                userData[selectedMessagesSection].map((message) => (
                  <GratiCard
                    content={message}
                    key={message.id}
                    deleteFunction={() => handleOpenDeleteModal(message.id)}
                  />
                ))
              ) : (
                <Skeleton width="100%" height="300px" repeat={5} />
              ))}
          </div>
        </div>
      </div>

      <DeleteMessageModal
        isVisible={isVisible}
        closeFunction={handleOpenDeleteModal}
        deleteFunction={handleDeleteMessage}
      />
    </>
  );
}

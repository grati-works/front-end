import Head from "next/head";
import styles from "../homePage.module.scss";
import { GratiCard } from "../../../components/GratiCard";
import { TextEditor } from "../../../components/TextEditor";
import { UserRankingCard } from "../../../components/UserRankingCard";
import { Wallet, Calendar, TicketStar } from "react-iconly";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { toastProps } from "../../../utils/toast";
import { useRouter } from "next/router";
import { Skeleton } from "../../../components/Skeleton";
import { Image, Modal } from "@nextui-org/react";
import { dayjs, months } from "../../../services/dayjs";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/Button";

export default function HomeUser(props) {
  const [messages, setMessages] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isVisible, setModalIsVisible] = useState(false);
  const [selectedGrati, setSelectedGrati] = useState(null);
  const [accumulatedPoints, setAccumulatedPoints] = useState(null);

  const router = useRouter();
  const { user } = useAuth();

  function handleOpenDeleteModal(id) {
    setSelectedGrati(id);
    setModalIsVisible(!selectedGrati);
  }

  useEffect(() => {
    async function loadMessages() {
      try {
        const { organization_id, group_id } = router.query;
        if (!organization_id || !user || !group_id) return;

        const nowDate = dayjs().format("YYYY-MM-DD");
        const threeMonthsAgoDate = dayjs()
          .subtract(3, "month")
          .format("YYYY-MM-DD");

        const rankingResponse = await api.get(
          `organization/${organization_id}/ranking?start_date=${threeMonthsAgoDate}&end_date=${nowDate}`
        );
        setRanking(rankingResponse.data);

        const accumulatedPointsResponse = await api.get(
          `profile/${organization_id}/${user.id}/accumulatedPoints`
        );
        setAccumulatedPoints(accumulatedPointsResponse.data);

        const messagesResponse = await api.get(`message/${organization_id}/${group_id}`);
        if (messagesResponse.data.feedbacks.length === 0) {
          setMessages("vazio");
        } else {
          setMessages(messagesResponse.data.feedbacks);
          setReactions(messagesResponse.data.reacted_feedbacks);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, toastProps);
      }
    }

    loadMessages();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Grati | Home</title>
      </Head>
      <>
        <div className={styles.homeWrapper}>
          <div className={styles.navigation}>
            <TextEditor />
            <div className={styles.feed}>
              {messages == "vazio" ? (
                <div className={styles.emptyMessages}>
                  <Image
                    src="/images/empty_messages.svg"
                    alt="Ilustração de perguntas"
                    showSkeleton
                    maxDelay={10000}
                    width={200}
                  />
                  <h2>Nenhuma mensagem por aqui...</h2>
                  <p>
                    Gostaria de enviar uma nova mensagem? Utilize a caixa acima!
                  </p>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message) => (
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
          <div className={styles.info}>
            {accumulatedPoints !== null ? (
              <div className={styles.points}>
                <Wallet set="light" className={styles.icon} />
                <p>Você acumulou {accumulatedPoints} xp durante esse mes.</p>
              </div>
            ) : (
              <Skeleton width="100%" height="5rem" />
            )}
            <div className={styles.experience}>
              <Calendar set="light" className={styles.icon} />
              <p>Uma meta de 5300 xp está agendada para 16/02.</p>
            </div>
            <div className={styles.ranking}>
              <div className={styles.top5}>
                <TicketStar set="light" className={styles.icon} />
                <p>Top 5 ranking</p>
                <Link href="/ranking">&rarr;</Link>
              </div>
              <div className={styles.positions}>
                {ranking.length > 0 ? (
                  ranking
                    .slice(0, 5)
                    .map((profile, index) => (
                      <UserRankingCard
                        size="sm"
                        avatar={profile.user.profile_picture}
                        name={profile.user.name}
                        points={profile.points}
                        key={index}
                      />
                    ))
                ) : (
                  <Skeleton width="100%" height="25rem" />
                )}
              </div>
              <div className={styles.date}>
                <div className={styles.boxDate}>
                  {months[dayjs().subtract(3, "month").get("month")]},{" "}
                  {months[dayjs().subtract(2, "month").get("month")]} e{" "}
                  {months[dayjs().subtract(1, "month").get("month")]}{" "}
                  <span>(3 meses)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={handleOpenDeleteModal}
        className={styles.deleteModal}
        width="500px"
      >
        <Modal.Header className={styles.deleteModalHeader}>
          <img src="/icons/close.svg" alt="Ícone de exclusão" />
          <h4>Deletar Grati</h4>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja deletar essa mensagem?</p>
        </Modal.Body>
        <Modal.Footer className={styles.deleteModalFooter}>
          <Button bordered auto onClick={handleOpenDeleteModal}>
            Cancelar
          </Button>
          <Button color="error" auto>
            Sim, deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

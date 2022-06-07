import Head from "next/head";
import styles from "./homePage.module.scss";
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
import { dayjs, months } from "../../../services/dayjs";
import { useAuth } from "../../../hooks/useAuth";
import { DeleteMessageModal } from "../../../components/Modal/DeleteMessage";
import { MessageEmptyBox } from "../../../components/EmptyBox/Message";

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

  function handleDeleteMessage() {
    api.delete(`/message/${selectedGrati}`).then(() => {
      setMessages((messages) => ({
        ...messages.filter((message) => message.id !== selectedGrati),
      }));
      setModalIsVisible(false);
      toast.success("Mensagem excluida com sucesso!");
    });
  }

  async function loadMessages() {
    try {
      const { organization_id } = router.query;
      if (!organization_id || !user) return;
      if (organization_id == 0) {
        router.push("/organizations");
        toast.warn("Você não selecionou nenhuma organização", toastProps);
        return;
      }

      const nowDate = dayjs().format("YYYY-MM-DD");
      const threeMonthsAgoDate = dayjs()
        .subtract(3, "month")
        .format("YYYY-MM-DD");

      const rankingResponse = await api.get(
        `organization/${organization_id}/ranking?start_date=${threeMonthsAgoDate}&end_date=${nowDate}`
      );
      setRanking(rankingResponse.data.ranking);

      const accumulatedPointsResponse = await api.get(
        `profile/${organization_id}/${user.id}/accumulatedPoints`
      );
      setAccumulatedPoints(accumulatedPointsResponse.data);

      const messagesResponse = await api.get(`message/${organization_id}`);
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

  function handleSendMessage() {
    setMessages([]);
    loadMessages();
  }

  useEffect(() => loadMessages(), [router.query]);
  useEffect(() => loadMessages(), []);

  return (
    <>
      <Head>
        <title>Grati | Home</title>
      </Head>
      <>
        <div className={styles.homeWrapper}>
          <div className={styles.navigation}>
            <TextEditor onSend={handleSendMessage} />
            <div className={styles.feed}>
              {messages == "vazio" ? (
                <MessageEmptyBox />
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <GratiCard
                    content={message}
                    key={message.id}
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
                        id={profile.id}
                        organization_id={profile.organization_id}
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

      <DeleteMessageModal
        isVisible={isVisible}
        cancelFunction={handleOpenDeleteModal}
        deleteFunction={handleDeleteMessage}
      />
    </>
  );
}

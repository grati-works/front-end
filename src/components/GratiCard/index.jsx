import { useState } from "react";
import { Card, Avatar, Tooltip, Image } from "@nextui-org/react";
import { Delete } from "react-iconly";
import { Emoji } from "emoji-mart";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Picker } from "emoji-mart";
import { emojiPickerTexts } from "../TextEditor";
import { api } from "../../services/api";

export function GratiCard({ content, deleteFunction }) {
  const [message, setMessage] = useState({ ...content });
  const { user } = useAuth();
  const [reactions, setReactions] = useState([]);
  const [reactionsToShow, setReactionsToShow] = useState([]);

  useEffect(() => {
    if (!message) setMessage(newContent);
    console.log(
      message.reactions.filter(
        (reaction, index) =>
          message.reactions[message.reactions.indexOf(reaction)].emoji ===
          reaction.emoji
      )
    );
    setReactionsToShow([]);
  }, []);

  async function toggleReaction(id) {
    if (!reactions.find((reacted) => reacted.emoji === id)) {
      console.log({
        add: [
          ...message.reactions,
          {
            id: message.reactions[message.reactions.length - 1].id + 1,
            emoji: id,
            user_id: user.id,
          },
        ],
      });
      setReactions(reactions.concat(id));
      // await api.patch(`/message/${message.id}/reaction/add`, {
      //   emoji: id,
      // });
    } else {
      console.log({
        remove: message.reactions.filter((reaction) => reaction.emoji !== id),
      });
      console.log(reactions.filter((reacted) => reacted !== id));
      // await api.patch(`/message/${message.id}/reaction/remove`, {
      //   emoji: id,
      // });
    }
  }
  // console.log(content.reactions);

  function handleAddReaction() {}

  return (
    <Card className={styles.gratiCardContainer} shadow={false}>
      <Card.Header className={styles.gratiCardHeader}>
        <div className={styles.userInfo}>
          <Avatar.Group
            count={message.receivers.length > 3 && message.receivers.length - 3}
          >
            {message.receivers.slice(0, 3).map(({ user }) => (
              <Avatar
                key={user.id}
                pointer
                src={user.profile_picture}
                text={user.name}
                stacked
                size="lg"
              />
            ))}
          </Avatar.Group>
          <div className={styles.texts}>
            <p className={styles.userInfoText}>
              {message.receivers.slice(0, 3).map(({ user }, currentIndex) => (
                <Link key={currentIndex} href={`/users/${user.id}`}>{`${
                  user.name
                }${
                  message.receivers[currentIndex + 1] !== undefined ? `, ` : ""
                }`}</Link>
              ))}
              {message.receivers.length > 3 &&
                ` + ${message.receivers.length - 3}`}
              <span>
                {message.receivers.length === 1
                  ? message.receivers[0].responsibility
                  : ""}
              </span>
            </p>
            <p className={styles.gratiInfoText}>
              foi gratificado(a) por
              <span>#proatividade</span>
            </p>
          </div>
        </div>
        <div className={styles.gratiInfo}>
          <p>
            Há 4h por{" "}
            <Link href={`/users/${message.sender.user.id}`}>
              {message.sender.user.name}
            </Link>
          </p>
          <Avatar size="sm" src={message.sender.user.profile_picture} />
          <Emoji emoji={{ id: message.emoji }} set="twitter" size={24} />
          <div className={styles.divider} />
          {message.sender.user.id === user?.id && (
            <Delete onClick={() => deleteFunction(message.id)} />
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <p>{message.message}</p>
      </Card.Body>
      <Card.Footer className={styles.gratiCardFooter}>
        {message.attachment && (
          <div className={styles.attachmentContainer}>
            <Image
              className={styles.attachment}
              src={message.attachment}
              alt="Imagem anexada"
              showSkeleton
              objectFit="cover"
            />
          </div>
        )}
        <div className={styles.reactionsContainer}>
          {Object.values(message.reactions).map((reaction) => (
            <span
              className={styles.reaction}
              onClick={() => toggleReaction(reaction.emoji)}
              key={reaction.emoji}
            >
              <Emoji emoji={{ id: reaction.emoji }} set="twitter" size={16} />
              {reaction.count}
            </span>
          ))}
          <div className={styles.addReaction}>
            <Tooltip
              placement="left"
              trigger="click"
              content={
                <Picker
                  i18n={emojiPickerTexts}
                  set="twitter"
                  title="Selecione o emoji"
                  showPreview={false}
                  emoji="grinning"
                  onSelect={(emoji) => handleAddReaction(emoji.colons)}
                />
              }
            >
              <button className={styles.addReactionButton}>
                <img src="/icons/add-emoji.svg" />
              </button>
            </Tooltip>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

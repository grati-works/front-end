import { useEffect, useRef, useState } from "react";
import {
  Card,
  Divider,
  Button,
  Tooltip,
  Input,
  Image,
} from "@nextui-org/react";
import styles from "./styles.module.scss";
import { Heart, ChevronDown } from "react-iconly";
import { Picker } from "emoji-mart";
import ReactGiphySearchbox from "react-giphy-searchbox";
import { Emoji } from "emoji-mart";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export function TextEditor() {
  const emojiPickerTexts = {
    search: "Pesquisa",
    clear: "Limpar", // Accessible label on "clear" button
    notfound: "Emoji não encontrado",
    skintext: "Selecione o tom de pele padrão",
    categories: {
      search: "Resultados de pesquisa",
      recent: "Frequentemente usados",
      smileys: "Emoções",
      people: "Pessoas",
      nature: "Natureza",
      foods: "Alimentação",
      activity: "Atividades",
      places: "Viagem",
      objects: "Objetos",
      symbols: "Símbolos",
      flags: "Bandeiras",
      custom: "Customizados",
    },
    categorieslabel: "Categorias", // Accessible title for the list of categories
    skintones: {
      1: "Tom de pele padrão",
      2: "Tom de pele claro",
      3: "Tom de pele meio-claro",
      4: "Tom de pele médio",
      5: "Tom de pele meio-escuro",
      6: "Tom de pele escuro",
    },
  };

  const inputFile = useRef(null);
  const [attached, setAttached] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [gifPreview, setGifPreview] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [newTagText, setNewTagText] = useState("");
  const [newUserText, setNewUserText] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [data, setData] = useState({
    receivers_usernames: [],
    tags: [],
  });

  const { asPath } = useRouter();
  const [ organization_id, _, group_id ] = asPath.split("/").splice(2, 4);

  function handleDeleteUser(id) {
    const newUsers = data.receivers_usernames.filter(
      (_, index) => index !== id
    );
    setData({ ...data, receivers_usernames: newUsers });
  }

  function handleDeleteTag(id) {
    const newTags = data.tags.filter((_, index) => index !== id);
    setData({ ...data, tags: newTags });
  }

  function handleAddTag(name) {
    setData({ ...data, tags: [...data.tags, name] });
  }

  function handleAddUser(name) {
    setData({
      ...data,
      receivers_usernames: [...data.receivers_usernames, name],
    });
  }

  function handleSelectGif(url) {
    console.log(url);
    setGifPreview(url);
  }

  async function sendMessage() {
    console.log({
      ...data,
      message,
      emoji: selectedEmoji,
      groups: {
        group_id,
      },
      organization_id,
    });
  }

  useEffect(() => {
    const file = inputFile.current.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      setImagePreview("/images/more-icon.png");
    }

    fileReader.onloadend = () => setImagePreview(fileReader.result);
  }, [attached]);

  return (
    <Card className={styles.textEditorContainer} shadow={false}>
      <Card.Header className={styles.header}>
        <div className={styles.users}>
          {data.receivers_usernames.map((user, id) => (
            <button
              className={styles.user}
              key={id}
              onClick={() => handleDeleteUser(id)}
            >
              <p>@{user}</p>
            </button>
          ))}
          <input
            type="text"
            className={styles.userInput}
            placeholder="Insira os usuários"
            value={newUserText}
            onChange={(input) => setNewUserText(input.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleAddUser(newUserText);
                setNewUserText("");
              }
            }}
          />
        </div>
        <div className={styles.leftContainer}>
          <Emoji emoji={selectedEmoji} size={30} set="twitter" />
          <Tooltip
            placement="bottom"
            color="transparent"
            shadow={false}
            trigger="click"
            content={
              <Button.Group size="lg" vertical>
                <Button
                  ghost={selectedPrivacy !== "public" ? true : false}
                  onClick={() => setSelectedPrivacy("public")}
                >
                  Público
                </Button>
                <Button
                  ghost={selectedPrivacy !== "private" ? true : false}
                  onClick={() => setSelectedPrivacy("private")}
                >
                  Privado
                </Button>
                {group_id && (
                  <Button
                    ghost={selectedPrivacy !== "group" ? true : false}
                    onClick={() => setSelectedPrivacy("group")}
                  >
                    Grupo
                  </Button>
                )}
              </Button.Group>
            }
          >
            <button className={styles.privacy}>
              <Image
                src="/icons/privacy.svg"
                alt="Privacidade"
                width={33}
                height={33}
              />
            </button>
          </Tooltip>
        </div>
      </Card.Header>
      <Divider />
      <Card.Body>
        <div className={styles.tags}>
          {data.tags.map((tag, id) => (
            <button
              className={styles.tag}
              key={id}
              onClick={() => handleDeleteTag(id)}
            >
              <div className={styles.icon}>
                <Heart />
              </div>
              <p>{tag}</p>
            </button>
          ))}
          {data.tags.length === 0 && (
            <p className={styles.emptyTags}>Insira as tags</p>
          )}
          <Tooltip
            placement="bottom"
            trigger="click"
            content={
              <Input
                className={styles.tagInput}
                placeholder="Insira a tag"
                value={newTagText}
                onChange={(input) => setNewTagText(input.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleAddTag(newTagText);
                    setNewTagText("");
                  }
                }}
              />
            }
          >
            <button className={styles.tag}>
              <ChevronDown className={styles.addIcon} />
            </button>
          </Tooltip>
        </div>
        <textarea
          placeholder="Digite aqui sua mensagem..."
          className={styles.input}
          value={message}
          onChange={(input) => setMessage(input.target.value)}
        />
        <div className={styles.attachments}>
          {gifPreview && (
            <>
              <div
                className={styles.gifOverlay}
                onClick={() => setGifPreview(null)}
              >
                <p>Preview do GIF</p>
              </div>
              <iframe src={gifPreview} className={styles.gif} />
            </>
          )}
          <Button
            className={attached ? styles.inputFileVisible : styles.inputFile}
            color="background"
            onClick={() => {
              setAttached(false);
            }}
          >
            <img src={imagePreview} alt="" />
          </Button>
        </div>
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={() => setAttached(true)}
          style={{ display: "none" }}
        />
      </Card.Body>
      <Divider />
      <Card.Footer>
        <div className={styles.attachments}>
          <Tooltip
            placement="right"
            trigger="click"
            content={
              <Picker
                i18n={emojiPickerTexts}
                set="twitter"
                title="Selecione o emoji"
                showPreview={false}
                emoji="grinning"
                onSelect={(emoji) => setSelectedEmoji(emoji.colons)}
              />
            }
          >
            <Button className={styles.attachment} auto>
              <Image
                src="/icons/emoji.svg"
                alt="Ícone de emoji"
                width={22}
                height={22}
              />
            </Button>
          </Tooltip>
          <Button
            className={styles.attachment}
            auto
            onClick={() => {
              inputFile.current.value = "";
              inputFile.current.click();
              setAttached(false);
            }}
          >
            <Image
              src="/icons/image.svg"
              alt="Ícone de imagem"
              width={22}
              height={22}
            />
          </Button>
          <Tooltip
            placement="right"
            trigger="click"
            content={
              <ReactGiphySearchbox
                apiKey={process.env.NEXT_PUBLIC_GIPHY_API_KEY}
                onSelect={(item) => handleSelectGif(item.embed_url)}
                messageError="Não foi possível carregar a biblioteca de GIF'S"
                messageLoading="Carregando..."
                messageNoMatches="Nenhum GIF encontrado"
                searchPlaceholder="Pesquisar GIF"
                listWrapperClassName={styles.giphyListWrapper}
                searchFormClassName={styles.giphySearchForm}
              />
            }
          >
            <Button className={styles.attachment} auto>
              <Image
                src="/icons/gif.svg"
                alt="Ícone de GIF"
                width={26}
                height={26}
              />
            </Button>
          </Tooltip>
        </div>
        <Button className={styles.sendGratiButton} onClick={sendMessage}>
          Enviar grati
        </Button>
      </Card.Footer>
    </Card>
  );
}

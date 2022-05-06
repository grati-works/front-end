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
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export function TextEditor({ onSubmit = () => {}, onSend = () => {} }) {
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

  const router = useRouter();
  const inputFile = useRef(null);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [attached, setAttached] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [gifPreview, setGifPreview] = useState(null);
  const isGroupRoute = router.asPath.includes("/group");
  const [selectedPrivacy, setSelectedPrivacy] = useState(
    isGroupRoute ? "group" : "public"
  );
  const [newTagText, setNewTagText] = useState("");
  const [newUserText, setNewUserText] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [data, setData] = useState({
    receivers_usernames: [],
    tags: [],
  });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const { asPath } = useRouter();
  const [organization_id, _, group_id] = asPath.split("/").splice(2, 4);

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
    setTooltipVisible(false);
  }

  function handleAddUser(name) {
    setUserSuggestions([]);
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
    if (
      message == "" ||
      data.receivers_usernames.length < 1 ||
      data.tags.length < 1
    ) {
      toast.error(
        "Por favor, preencha todos os campos! É necessário inserir no mínimo a mensagem, os destinatários e tags"
      );
      return;
    }

    onSubmit();

    let group = selectedPrivacy === "group" ? group_id : selectedPrivacy;

    let sentData = {
      ...data,
      message,
      emoji: selectedEmoji,
      groups: [group],
      organization_id,
    };
    console.log(sentData);

    const formData = new FormData();
    if (inputFile.current.files.length === 1 && attached !== false)
      formData.append("attachment", inputFile.current.files[0]);
    else sentData["attachment_gif"] = gifPreview;

    formData.append("data", JSON.stringify(sentData));

    api
      .post(`message/${organization_id}`, formData)
      .then((response) => {
        toast.success("Mensagem enviada com sucesso!");
        setAttached(false);
        setImagePreview(null);
        setGifPreview(null);
        setSelectedPrivacy("public");
        setNewTagText("");
        setNewUserText("");
        setMessage("");
        setSelectedEmoji("");
        setData({
          receivers_usernames: [],
          tags: [],
        });
        onSend();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const file = inputFile.current.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
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
            onChange={async (input) => {
              setNewUserText(input.target.value);

              if (
                input.target.value.length % 2 === 0 &&
                input.target.value.length > 0
              ) {
                const userSuggestionsResponse = await api.get(
                  `user/suggestions/${organization_id}?q=${input.target.value}`
                );
                setUserSuggestions(userSuggestionsResponse.data);
                console.log(userSuggestionsResponse.data);
              } else if (input.target.value.length === 0) {
                setUserSuggestions([]);
              }
            }}
            onBlur={(event) => {
              if(event.relatedTarget.className !== "autocomplete_item") setUserSuggestions([]);
            }}
            onFocus={async (input) => {
              if (input.target.value.length > 1) {
                const userSuggestionsResponse = await api.get(
                  `user/suggestions/${organization_id}?q=${input.target.value}`
                );
                setUserSuggestions(userSuggestionsResponse.data);
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
                {!isGroupRoute ? (
                  <Button
                    ghost={selectedPrivacy !== "public" ? true : false}
                    onClick={() => setSelectedPrivacy("public")}
                  >
                    Público
                  </Button>
                ) : null}
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
      <div className={styles.autocompleteItems}>
        {userSuggestions
          .filter(
            (suggestion) => data.receivers_usernames.indexOf(suggestion) === -1
          )
          .map((user, id) => (
            <button
              className="autocomplete_item"
              key={id}
              onClick={() => {
                console.log("A");
                handleAddUser(user);
                setNewUserText("");
              }}
            >
              <p>{user}</p>
            </button>
          ))}
      </div>
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
            visible={tooltipVisible}
            content={
              <Input
                className={styles.tagInput}
                placeholder="Insira a tag"
                value={newTagText}
                onChange={(input) => setNewTagText(input.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Tab") {
                    handleAddTag(newTagText);
                    setNewTagText("");
                  }
                }}
              />
            }
          >
            <button
              className={styles.tag}
              onClick={() => setTooltipVisible(true)}
            >
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
          {gifPreview === null && (
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
          )}

          {attached === false && (
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
          )}
        </div>
        <Button className={styles.sendGratiButton} onClick={sendMessage}>
          Enviar grati
        </Button>
      </Card.Footer>
    </Card>
  );
}

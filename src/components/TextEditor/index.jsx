import { useEffect, useRef, useState } from 'react'
import { Card, Divider, Button, Tooltip, Input } from '@nextui-org/react';
import styles from './styles.module.scss';
import { Heart, ChevronDown } from 'react-iconly';
import { Picker } from 'emoji-mart'
import ReactGiphySearchbox from 'react-giphy-searchbox'

export function TextEditor() {
  const emojiPickerTexts = {
    search: 'Pesquisa',
    clear: 'Limpar', // Accessible label on "clear" button
    notfound: 'Emoji não encontrado',
    skintext: 'Selecione o tom de pele padrão',
    categories: {
      search: 'Resultados de pesquisa',
      recent: 'Frequentemente usados',
      smileys: 'Emoções',
      people: 'Pessoas',
      nature: 'Natureza',
      foods: 'Alimentação',
      activity: 'Atividades',
      places: 'Viagem',
      objects: 'Objetos',
      symbols: 'Símbolos',
      flags: 'Bandeiras',
      custom: 'Customizados',
    },
    categorieslabel: 'Categorias', // Accessible title for the list of categories
    skintones: {
      1: 'Tom de pele padrão',
      2: 'Tom de pele claro',
      3: 'Tom de pele meio-claro',
      4: 'Tom de pele médio',
      5: 'Tom de pele meio-escuro',
      6: 'Tom de pele escuro',
    },
  };

  const inputFile = useRef(null);
  const [attached, setAttached] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [newTagText, setNewTagText] = useState("");
  const [newUserText, setNewUserText] = useState("");
  const [data, setData] = useState({
    users: [
      "ericknathan",
      "pedrothecatholic"
    ],
    tags: [
      "Resiliência",
    ]
  });

  function handleDeleteUser(id) {
    const newUsers = data.users.filter((_, index) => index !== id);
    setData({ ...data, users: newUsers });
  }

  function handleDeleteTag(id) {
    const newTags = data.tags.filter((_, index) => index !== id);
    setData({ ...data, tags: newTags });
  }

  function handleAddTag(name) {
    setData({ ...data, tags: [...data.tags, name] });
  }

  function handleAddUser(name) {
    setData({ ...data, users: [...data.users, name] });
  }

  useEffect(() => {
    const file = inputFile.current.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file)
    } else {
      setImagePreview('../images/more-icon.png');
    }

    fileReader.onloadend = () => setImagePreview(fileReader.result);
 }, [attached])

  return (
    <Card className={styles.textEditorContainer} shadow={false}>
      <Card.Header className={styles.header}>
        <div className={styles.users}>
          {
            data.users.map((user, id) => (
              <button className={styles.user} key={id} onClick={() => handleDeleteUser(id)}>
                <p>@{user}</p>
              </button>
            ))
          }
          <input
            type="text"
            className={styles.userInput}
            placeholder="Insira o usuário"
            value={newUserText}
            onChange={input => setNewUserText(input.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleAddUser(newUserText);
                setNewUserText('');
              }
            }}
          />
        </div>
        <Tooltip placement="bottom" color="transparent" shadow={false} trigger="click" content={
          <Button.Group size="lg" vertical >
            <Button
              ghost={selectedPrivacy !== "public" ? true : false}
              onClick={() => setSelectedPrivacy("public")}
            >Público</Button>
            <Button
              ghost={selectedPrivacy !== "private" ? true : false}
              onClick={() => setSelectedPrivacy("private")}
            >Privado</Button>
            <Button
              ghost={selectedPrivacy !== "group" ? true : false}
              onClick={() => setSelectedPrivacy("group")}
            >Grupo</Button>
          </Button.Group>
        }>
          <button className={styles.privacy}>
            <img src="/icons/privacy.svg" alt="Privacidade" />
          </button>
        </Tooltip>
      </Card.Header>
      <Divider/>
      <Card.Body>
        <div className={styles.tags}>
          {
            data.tags.map((tag, id) => (
              <button className={styles.tag} key={id} onClick={() => handleDeleteTag(id)}>
                <div className={styles.icon}>
                  <Heart />
                </div>
                <p>{tag}</p>
              </button>
            ))
          }
          <Tooltip placement="bottom" trigger="click" content={
            <Input
              className={styles.tagInput}
              placeholder="Insira a tag"
              value={newTagText}
              onChange={input => setNewTagText(input.target.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleAddTag(newTagText);
                  setNewTagText('');
                }
              }}
            />
          }>
            <button className={styles.tag}>
              <ChevronDown className={styles.addIcon}/>
            </button>
          </Tooltip>
        </div>
        <textarea
          placeholder="Digite aqui sua mensagem..."
          className={styles.input}
        ></textarea>
        <Button
          className={attached ? styles.inputFileVisible : styles.inputFile}
          color="background"
          onClick={() => {
            setAttached(false)
          }}
        >
          <img src={imagePreview} alt="" />
        </Button>
        <input type='file' id='file' ref={inputFile} onChange={() => setAttached(true)} style={{ display: 'none' }} />
      </Card.Body>
      <Divider/>
      <Card.Footer>
        <div className={styles.attachments}>
          <Tooltip placement="right" trigger="click" content={
            <Picker
              i18n={emojiPickerTexts}
              set="twitter"
              title="Selecione o emoji"
              showPreview={false}
              emoji="grinning"
            />
          }>
            <Button className={styles.attachment} auto>
              <img src="/icons/emoji.svg" alt="" />
            </Button>
          </Tooltip>
          <Button className={styles.attachment} auto onClick={() => {
            inputFile.current.value = '';
            inputFile.current.click();
            setAttached(false)
          }}>
            <img src="/icons/image.svg" alt="" />
          </Button>
          <Tooltip placement="right" trigger="click" content={
            <ReactGiphySearchbox
              apiKey={process.env.NEXT_PUBLIC_GIPHY_API_KEY}
              onSelect={item => console.log(item)}
              messageError="Não foi possível carregar a biblioteca de GIF'S"
              messageLoading="Carregando..."
              messageNoMatches="Nenhum GIF encontrado"
              searchPlaceholder="Pesquisar GIF"
              listWrapperClassName={styles.giphyListWrapper}
              searchFormClassName={styles.giphySearchForm}
            />
          }>
            <Button className={styles.attachment} auto>
              <img src="/icons/gif.svg" alt="" />
            </Button>
          </Tooltip>
        </div>
        <Button className={styles.sendGratiButton}>Enviar grati</Button>
      </Card.Footer>
    </Card>
  )
}
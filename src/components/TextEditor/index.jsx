import { useState } from 'react'
import { Card, Divider, Button, Tooltip } from '@nextui-org/react';
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

  return (
    <Card className={styles.textEditorContainer} shadow={false}>
      <Card.Header className={styles.header}>
        <div className={styles.users}>
          <button className={styles.user}>
            <p>@ericknathan</p>
          </button>
          <button className={styles.user}>
            <p>@pedrothecatholic</p>
          </button>
          <input type="text" className={styles.userInput}/>
        </div>
        <Tooltip placement="bottom" color="transparent" shadow={false} trigger="click" content={
          <Button.Group size="lg" vertical >
            <Button>Público</Button>
            <Button ghost>Privado</Button>
            <Button ghost>Grupo</Button>
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
          <button className={styles.tag}>
            <div className={styles.icon}>
              <Heart />
            </div>
            <p>Resiliência</p>
          </button>
          <button className={styles.tag}>
            <ChevronDown className={styles.addIcon}/>
          </button>
        </div>
        <textarea
          placeholder="Digite aqui sua mensagem..."
          className={styles.input}
        ></textarea>
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
          <Button className={styles.attachment} auto>
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
          <Button className={styles.attachment} auto>
            <img src="/icons/document.svg" alt="" />
          </Button>
        </div>
        <Button className={styles.sendGratiButton}>Enviar grati</Button>
      </Card.Footer>
    </Card>
  )
}
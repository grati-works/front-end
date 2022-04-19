import Head from "next/head";
import { useRef, useState } from "react";
import { Bookmark, Folder, Paper, ShieldDone, User } from "react-iconly";
import { Input } from "../../../components/Input";
import { UserCard } from "../../../components/UserCard";
import { Modal } from "@nextui-org/react";
import { Button } from "../../../components/Button";
import { Checkbox } from "@nextui-org/react";
import { api } from '../../../services/api';

import styles from "./gerenciamento.module.scss";
import { CalendarComponent } from "../../../components/Calendar";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export default function Manage() {
  const inputFile = useRef(null);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const handlerInfo = () => setVisibleInfo(true);
  const closeHandlerInfo = () => {
    setVisibleInfo(false);
  };

  const [organization, setOrganization] = useState(null);
  const [organizationName, setOrganizationName] = useState('');
  const { 'grati.organization_id': organization_id } = parseCookies();

  const [selectedColorScheme, setSelectedColorScheme] = useState("automatic");
  const [selectedColor, setSelectedColor] = useState("grati");

  const [visibleGroup, setVisibleGroup] = useState(false);
  const handlerGroup = () => setVisibleGroup(true);
  const closeHandlerGroup = () => {
    setVisibleInfo(false);
  };

  useEffect(() => {
    async function loadOrganizationData() {
      await api.get(`organization/${organization_id}`).then(response => {
        setOrganization(response.data);
        setOrganizationName(response.data.name);
        setSelectedColorScheme(response.data.color_mode.name)

        console.log(response.data.name)
      });
    }

    loadOrganizationData();
  }, [])

  return (
    <>
      <Head>
        <title>Grati | Gerenciamento</title>
      </Head>
      <div className={styles.manageWrapper}>
        <div className={styles.editions}>
          <div className={styles.editionsPage}>
            Aparência
            <div className={styles.appearance}>
              <div className={styles.automatic} onClick={() => setSelectedColorScheme("automatic")}>
                <button className={selectedColorScheme === 'automatic' && styles.selectedColorScheme} />
                Automático
              </div>
              <div className={styles.darkMode} onClick={() => setSelectedColorScheme("dark")}>
                <button className={selectedColorScheme === 'dark' && styles.selectedColorScheme} />
                Escuro
              </div>
              <div className={styles.clearMode} onClick={() => setSelectedColorScheme("light")}>
                <button className={selectedColorScheme === 'light' && styles.selectedColorScheme} />
                Claro
              </div>
            </div>
            Esquema de cores
            <div className={styles.colorScheme}>
              <button className={`${styles.grati} ${selectedColor === 'grati' && styles.selectedColor}`} onClick={() => setSelectedColor("grati")} />
              <button className={`${styles.red} ${selectedColor === 'red' && styles.selectedColor}`} onClick={() => setSelectedColor("red")} />
              <button className={`${styles.yellow} ${selectedColor === 'yellow' && styles.selectedColor}`} onClick={() => setSelectedColor("yellow")} />
              <button className={`${styles.green} ${selectedColor === 'green' && styles.selectedColor}`} onClick={() => setSelectedColor("green")} />
              <button className={`${styles.blue} ${selectedColor === 'blue' && styles.selectedColor}`} onClick={() => setSelectedColor("blue")} />
              <button className={`${styles.purple} ${selectedColor === 'purple' && styles.selectedColor}`} onClick={() => setSelectedColor("purple")} />
              <button className={`${styles.pink} ${selectedColor === 'pink' && styles.selectedColor}`} onClick={() => setSelectedColor("pink")} />
              <button className={`${styles.black} ${selectedColor === 'black' && styles.selectedColor}`} onClick={() => setSelectedColor("black")} />
              <button className={`${styles.gray} ${selectedColor === 'gray' && styles.selectedColor}`} onClick={() => setSelectedColor("gray")} />
            </div>
            Gerenciamento de grupos
            <div className={styles.manageGroups}>
              <div className={styles.groupCard} onClick={handlerGroup}>
                <div />
                Squad Turtle
              </div>
              <div className={styles.createGroup} onClick={handlerGroup}>
                <div>+</div>
                <nobr>Criar grupo</nobr>
              </div>
            </div>
          </div>
          <div className={styles.boxGood}>
            Dados
            <div className={styles.registerUser}>
              <Input Icon={Bookmark} placeholder="Nome da organização" value={organizationName} onChange={(event) => setOrganizationName(event.target.value)} />
            </div>
            <div className={styles.addCsv}>
              <div className={styles.left}>
                <User set="light" />
              </div>
              <div className={styles.right}>
                Cadastro de usuários
                <div className={styles.boxGrape}>
                  <Button className={styles.manualRegister}>
                    Cadastro manual
                  </Button>
                  <div className={styles.importCsv}>
                    <div className={styles.infoUpload} onClick={handlerInfo}>
                      <img src="/images/info.png" alt="" />
                    </div>
                    <Button
                      backgroundColor
                      className={styles.importCsvButton}
                      auto
                      onClick={() => {
                        inputFile.current.value = "";
                        inputFile.current.click();
                        setAttached(false);
                      }}
                    >
                      Importar arquivo csv
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tabelaUsuarios}>
          <h1>Gerenciamento de usuários</h1>
          <table className={styles.tableUsers}>
            <thead>
              <tr>
                <th>USUÁRIO</th>
                <th>EMAIL</th>
                <th>GRUPO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <UserCard
                avatar="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                name="Luciano Monteiro"
                user="@lu.monteiro"
                email="lu.monteiro@gmail.com"
                group="Squad space V"
              />
              <UserCard
                avatar="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                name="Túlio Nogueira"
                user="@tu.nogueira"
                email="lu.monteiro@gmail.com"
                group="Squad space V"
              />
              <UserCard
                avatar="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp"
                name="Raul Ramos"
                user="@raulzinho"
                email="lu.monteiro@gmail.com"
                group="Squad space V"
              />
              <UserCard
                avatar="https://mdbcdn.b-cdn.net/img/new/avatars/4.webp"
                name="Sasha Souza"
                user="@sashinha"
                email="lu.monteiro@gmail.com"
                group="Squad space V"
              />
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleInfo}
        onClose={closeHandlerInfo}
        className={styles.groupsModal}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.groupsModalHeader}>
          <p>Informações sobre upload de arquivos csv</p>
        </Modal.Header>
        <Modal.Body className={styles.groupsWrapper}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit
            sit risus orci a. Ultricies neque aliquet mattis ipsum posuere
            tincidunt in. Sed eleifend.
          </p>
          <a href="">Clique aqui para baixar o template.</a>
        </Modal.Body>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleGroup}
        onClose={closeHandlerGroup}
        className={styles.groupsModal}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.groupsModalHeader}>
          <p>
            Opções -<span>Squad Terno</span>
          </p>
        </Modal.Header>
        <Modal.Body className={styles.groupsWrapper}>
          <Input Icon={Folder} placeholder="Nome da organização"/>
          <Checkbox>Gerenciar mensagens</Checkbox>
          <Checkbox>Gerenciar grupos</Checkbox>
          <Checkbox>Gerenciar usuários</Checkbox>
          <h2>Meta</h2>
          <Input Icon={Paper} placeholder="Nome" />
          <Input Icon={ShieldDone} placeholder="Pontos" />
          <div className={styles.calendar}>
            <CalendarComponent className={styles.CalendarComponent} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

import Head from "next/head";
import { useRef, useState } from "react";
import { Bookmark, Folder, Paper, Wallet, User } from "react-iconly";
import { Input } from "../../../components/Input";
import { UserCard } from "../../../components/UserCard";
import { Modal } from "@nextui-org/react";
import { Button } from "../../../components/Button";
import { Checkbox } from "@nextui-org/react";
import { api } from "../../../services/api";

import styles from "./gerenciamento.module.scss";

import { CalendarComponent } from "../../../components/Calendar";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function Manage() {
  const defaultColors = [
    "#e86868",
    "#e8db68",
    "#b0e868",
    "#68e0e8",
    "#8268e8",
    "#e868d4",
    "#121212",
  ];
  const defaultColorModes = {
    "light": 1,
    "dark": 2,
    "system": 3,
  }

  const inputFile = useRef(null);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const handlerInfo = () => setVisibleInfo(true);
  const closeHandlerInfo = () => {
    setVisibleInfo(false);
  };

  const [attached, setAttached] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [organizationName, setOrganizationName] = useState("");
  const { "grati.organization_id": organization_id } = parseCookies();

  const [groupName, setGroupName] = useState("");
  const [objectiveName, setObjectiveName] = useState("");
  const [objectivePoints, setObjectivePoints] = useState(0);
  const [objectiveDate, setObjectiveDate] = useState(new Date());

  const [selectedColorScheme, setSelectedColorScheme] = useState("system");
  const [selectedColor, setSelectedColor] = useState("grati");

  const [visibleGroup, setVisibleGroup] = useState(false);
  const handlerGroup = (group, status = !visibleGroup) => {
    setVisibleGroup(status);
    setSelectedGroup(group);

    setGroupName(group?.name);
    setObjectiveName(group?.objective?.name);
    setObjectivePoints(group?.objective?.goal);
    setObjectiveDate(dayjs(group?.objective?.expires_in).toDate());
  };

  async function handleUpdateGroupData() {
    if (
      objectiveName !== "" &&
      objectivePoints !== 0 &&
      objectiveDate !== null
    ) {
      await api.put(`objective/${selectedGroup.id}`, {
        name: objectiveName,
        goal: objectivePoints,
        expires_in: `${dayjs(objectiveDate).format(
          "YYYY-MM-DD"
        )}T23:59:59.000Z`,
      });
    }

    if (selectedGroup.name !== groupName) {
      await api.patch(`group/${selectedGroup.id}`, {
        name: groupName,
      });

      setOrganization({
        ...organization,
        groups: organization.groups.map((group) =>
          group.id === selectedGroup.id ? { ...group, name: groupName } : group
        ),
        users: organization.users.map(
          (profile) =>
            profile.groups[0]?.id === selectedGroup.id ? {
              ...profile,
              groups: [
                {
                  ...profile.groups[0],
                  name: groupName,
                },
              ],
            } : profile
        ),
      })

    }

    handlerGroup(null, false);
    toast.success("Grupo atualizado com sucesso!");
  }

  async function updateColorScheme(name) {
    setSelectedColorScheme(name);
    await api.patch(`organization/${organization_id}`, {
      color_mode: defaultColorModes[name],
    });
  }

  useEffect(() => {
    async function loadOrganizationData() {
      await api.get(`organization/${organization_id}`).then((response) => {
        setOrganization(response.data);
        setOrganizationName(response.data.name);
        setSelectedColorScheme(response.data.color_mode.name);
        setSelectedColor(
          defaultColors.includes(response.data.color)
            ? response.data.color
            : "personalizated"
        );
      });
    }

    loadOrganizationData();
  }, []);

  useEffect(() => {
    const file = inputFile.current.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    }

    fileReader.onloadend = async () => {
      const formData = new FormData();
      formData.append("file", inputFile.current.files[0]);

      await api.post(`organization/${organization_id}/users/csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };
  }, [attached])

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
              <div
                className={styles.system}
                onClick={() => updateColorScheme("system")}
              >
                <button
                  className={
                    selectedColorScheme === "system" &&
                    styles.selectedColorScheme
                  }
                />
                Automático
              </div>
              <div
                className={styles.darkMode}
                onClick={() => updateColorScheme("dark")}
              >
                <button
                  className={
                    selectedColorScheme === "dark" && styles.selectedColorScheme
                  }
                />
                Escuro
              </div>
              <div
                className={styles.clearMode}
                onClick={() => updateColorScheme("light")}
              >
                <button
                  className={
                    selectedColorScheme === "light" &&
                    styles.selectedColorScheme
                  }
                />
                Claro
              </div>
            </div>
            Esquema de cores
            <div className={styles.colorScheme}>
              <button
                className={`${styles.grati} ${
                  selectedColor === "grati" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("grati")}
              />
              <button
                className={`${styles.red} ${
                  selectedColor === "red" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("red")}
              />
              <button
                className={`${styles.yellow} ${
                  selectedColor === "yellow" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("yellow")}
              />
              <button
                className={`${styles.green} ${
                  selectedColor === "green" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("green")}
              />
              <button
                className={`${styles.blue} ${
                  selectedColor === "blue" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("blue")}
              />
              <button
                className={`${styles.purple} ${
                  selectedColor === "purple" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("purple")}
              />
              <button
                className={`${styles.pink} ${
                  selectedColor === "pink" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("pink")}
              />
              <button
                className={`${styles.black} ${
                  selectedColor === "black" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("black")}
              />
              <button
                className={`${styles.personalizated} ${
                  selectedColor === "personalizated" && styles.selectedColor
                }`}
                onClick={() => setSelectedColor("personalizated")}
              />
            </div>
            Gerenciamento de grupos
            <div className={styles.manageGroups}>
              {organization?.groups.map((group) => (
                <div
                  className={styles.groupCard}
                  onClick={() => {
                    handlerGroup(group);
                  }}
                >
                  <div style={{ backgroundColor: group.color }} />
                  {group.name}
                </div>
              ))}
              <div className={styles.createGroup} onClick={handlerGroup}>
                <div>+</div>
                <nobr>Criar grupo</nobr>
              </div>
            </div>
          </div>
          <div className={styles.boxGood}>
            Dados
            <div className={styles.registerUser}>
              <Input
                Icon={Bookmark}
                placeholder="Nome da organização"
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                onBlur={async () => {
                  if(organizationName !== organization.name) {
                    await api.patch(`organization/${organization_id}`, {
                      name: organizationName,
                    }).then(() => toast.success("Nome da organização atualizado com sucesso!"));

                    setOrganization({
                      ...organization,
                      name: organizationName,
                    });
                  }
                }}
              />
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
                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      onChange={() => setAttached(true)}
                      style={{ display: "none" }}
                    />
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
              {organization?.users.map((profile) => (
                <UserCard
                  avatar={profile.user.profile_picture}
                  name={profile.user.name}
                  user={`@${profile.user.username}`}
                  email={profile.user.email}
                  group={profile?.groups[0]?.name || "Nenhum"}
                  id={profile.id}
                />
              ))}
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
        onClose={() => handlerGroup(null, false)}
        className={styles.editGroupModalWrapper}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.editGroupModalHeader}>
          <p>Opções de grupo</p>
        </Modal.Header>
        <Modal.Body className={styles.editGroupModalBody}>
          <Input
            Icon={Folder}
            placeholder="Nome do grupo"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <h2>Meta</h2>
          <Input
            Icon={Paper}
            placeholder="Nome da meta"
            value={objectiveName}
            onChange={(event) => setObjectiveName(event.target.value)}
          />
          <Input
            Icon={Wallet}
            placeholder="Pontos"
            value={objectivePoints}
            onChange={(event) => setObjectivePoints(event.target.value)}
          />
          <div className={styles.calendar}>
            <CalendarComponent
              className={styles.CalendarComponent}
              onChange={setObjectiveDate}
              value={objectiveDate}
            />
          </div>
          <Button onClick={handleUpdateGroupData}>Salvar alterações</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

import Head from "next/head";
import { useRef, useState } from "react";
import {
  Bookmark,
  Folder,
  Paper,
  Wallet,
  User,
  Calendar,
  Edit,
  Message,
  Delete,
} from "react-iconly";
import { Input } from "../../../components/Input";
import { UserCard } from "../../../components/UserCard";
import { Modal, Input as NextuiInput } from "@nextui-org/react";
import { Button } from "../../../components/Button";
import { api } from "../../../services/api";

import styles from "./gerenciamento.module.scss";

import { CalendarComponent } from "../../../components/Calendar";
import { useEffect } from "react";
import { dayjs, months } from "../../../services/dayjs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { validateEmail } from "../../../utils/validator";

export default function Manage() {
  const [defaultColors] = useState({
    grati: "#6874E8",
    red: "#e86868",
    yellow: "#e8db68",
    green: "#b0e868",
    blue: "#68e0e8",
    purple: "#8268e8",
    pink: "#e868d4",
    black: "#121212",
  });

  const defaultColorModes = {
    light: 1,
    dark: 2,
    system: 3,
  };

  const router = useRouter();
  const { setTheme } = useTheme();

  const inputFile = useRef(null);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [userRegisterModalIsVisible, setUserRegisterModalIsVisible] =
    useState(false);
  const handlerInfo = () => setVisibleInfo(true);
  const closeHandlerInfo = () => {
    setVisibleInfo(false);
  };

  const [attached, setAttached] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [organizationName, setOrganizationName] = useState("");
  const { organization_id } = router.query;

  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("#000000");
  const [objectiveName, setObjectiveName] = useState("");
  const [objectivePoints, setObjectivePoints] = useState(0);
  const [objectiveDate, setObjectiveDate] = useState(new Date());

  const [selectedColorScheme, setSelectedColorScheme] = useState("system");
  const [selectedColor, setSelectedColor] = useState(defaultColors.grati);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const [visibleGroup, setVisibleGroup] = useState(false);
  const handlerGroup = (group, status = !visibleGroup) => {
    setVisibleGroup(status);
    setSelectedGroup(group);

    setGroupName(group?.name);
    setGroupColor(group?.color);
    setObjectiveName(group?.objective?.name);
    setObjectivePoints(group?.objective?.goal);
    if(dayjs(group?.objective?.expires_in).toDate() < new Date()) {
      setObjectiveDate(new Date());
    } else {
      setObjectiveDate(dayjs(group?.objective?.expires_in).toDate());
    }
  };

  async function handleDeleteUser(userId) {
    console.log("Deletar", userId)
  }

  async function handleUpdateUser(userId) {
    console.log("Atualizar", userId)
  }

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
        color: groupColor,
      });

      setOrganization({
        ...organization,
        groups: organization.groups.map((group) =>
          group.id === selectedGroup.id ? { ...group, name: groupName } : group
        ),
        users: organization.users.map((profile) =>
          profile.groups[0]?.id === selectedGroup.id
            ? {
                ...profile,
                groups: [
                  {
                    ...profile.groups[0],
                    name: groupName,
                  },
                ],
              }
            : profile
        ),
      });
    }

    handlerGroup(null, false);
    toast.success("Grupo atualizado com sucesso!");
  }

  async function handleCreateGroup() {
    if (
      groupName.trim() !== ''
    ) {
      await api.post(`group`, {
        name: groupName,
        color: groupColor,
        organization_id
      });
      
      setOrganization({
        ...organization,
        groups: [
          ...organization.groups,
          {
            id: Date.now(),
            name: groupName,
            color: groupColor,
          },
        ],
      });

      toast.success("Grupo criado com sucesso!");

      setGroupName("");
      setGroupColor("#000000");
      setObjectiveName("");
      setObjectivePoints(0);
      setObjectiveDate(new Date());
      handlerGroup(null, false);
      setIsCreatingGroup(false);
    } else {
      return toast.error("Preencha o nome do grupo!");
    }
  }

  async function handleDeleteGroup() {
    await api.delete(`group/${selectedGroup.id}`);
    setOrganization({
      ...organization,
      groups: organization.groups.filter(
        (group) => group.id !== selectedGroup.id
      ),
      users: organization.users.map((profile) =>
        profile.groups[0]?.id === selectedGroup.id
          ? {
              ...profile,
              groups: [],
          } : profile
      ),
    });

    handlerGroup(null, false);
    toast.success("Grupo deletado com sucesso!");
  }

  async function updateColorScheme(name) {
    setSelectedColorScheme(name);

    setTheme(name);
    localStorage.setItem("theme", name);

    await api.patch(`organization/${organization_id}`, {
      color_mode: defaultColorModes[name],
    });

    toast.success("Esquema de cores atualizado com sucesso!");
  }

  async function updateColor(color) {
    setSelectedColor(color);
    document.body.style.setProperty("--nextui-colors-header", color);

    await api.patch(`organization/${organization_id}`, {
      color,
    });

    toast.success("Cor atualizada com sucesso!");
  }

  async function handleGenerateMonthReports() {
    setIsSubmitting(true);

    const response = await api.get(
      `organization/${organization_id}/reports?start_date=${dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD")}&end_date=${dayjs().format("YYYY-MM-DD")}`
    );

    try {
      const [cloudinaryURL, filePath] = response.data.split("/upload/");
      const fileName = filePath.split("/reports/")[1];

      await api
        .get(`${cloudinaryURL}/upload/fl_attachment/${filePath}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName.replace("%20", " "));
          document.body.appendChild(link);
          link.click();
        });
    } catch {
      router.push(response.data);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitUserRegister() {
    const emailError = validateEmail(email);

    if (emailError !== true) {
      setErrors({ ...emailError });
      return;
    }

    setIsSubmitting(true);

    try {
      await api
        .post(`organization/${organization_id}/users`, {
          users: [
            {
              name,
              username,
              email,
            },
          ],
        })
        .then(() => {
          toast.success("Usuário adicionado à organização com sucesso!");
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function loadOrganizationData() {
      await api.get(`organization/${organization_id}`).then((response) => {
        setOrganization(response.data);
        setOrganizationName(response.data.name);
        setSelectedColorScheme(response.data.color_mode.name);
        setSelectedColor(response.data.color);
      });
    }

    if (organization_id) {
      loadOrganizationData();
    }
  }, [organization_id]);

  useEffect(() => {
    const file = inputFile.current.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    }

    fileReader.onloadend = async () => {
      const formData = new FormData();
      formData.append("file", inputFile.current.files[0]);

      await api
        .post(`organization/${organization_id}/users/csv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Usuários importados com sucesso!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
  }, [attached]);

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
              {Object.values(defaultColors).map((color) => (
                <button
                  className={`${
                    selectedColor === color && styles.selectedColor
                  }`}
                  onClick={() => updateColor(color)}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                />
              ))}
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
              <div className={styles.createGroup} onClick={() => { setIsCreatingGroup(true); handlerGroup();}}>
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
                  if (organizationName !== organization.name) {
                    await api
                      .patch(`organization/${organization_id}`, {
                        name: organizationName,
                      })
                      .then(() =>
                        toast.success(
                          "Nome da organização atualizado com sucesso!"
                        )
                      );

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
                  <Button
                    className={styles.manualRegister}
                    onClick={() => setUserRegisterModalIsVisible(true)}
                  >
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
            <div className={styles.monthReports}>
              <p>
                <Calendar />
                Resultados do último mês{" "}
                {months[dayjs().subtract(1, "month").get("month")].toLowerCase()} a{" "}
                {months[dayjs().get("month")].toLowerCase()}
              </p>
              <Button
                backgroundColor
                className={styles.generateMonthReportsButton}
                auto
                onClick={handleGenerateMonthReports}
                isLoading={isSubmitting}
              >
                Gerar relatório mensal
              </Button>
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
                  deleteFunction={handleDeleteUser}
                  updateFunction={handleUpdateUser}
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
        open={userRegisterModalIsVisible}
        onClose={() => setUserRegisterModalIsVisible(false)}
        className={styles.registerUserModalWrapper}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.registerUserModalHeader}>
          <p>Cadastro de usuário</p>
        </Modal.Header>
        <Modal.Body className={styles.registerUserModalBody}>
          <Input
            Icon={Edit}
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSubmitUserRegister();
            }}
          />
          <Input
            Icon={User}
            placeholder="Usuário"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSubmitUserRegister();
            }}
          />
          <Input
            Icon={Message}
            placeholder="E-mail"
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
            error={errors.email}
            color={errors.email ? "error" : "primary"}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSubmitUserRegister();
            }}
          />
          <Button
            className={styles.registerButton}
            isLoading={isSubmitting}
            onClick={handleSubmitUserRegister}
          >
            Cadastrar usuário
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleGroup}
        onClose={() => { handlerGroup(null, false); setIsCreatingGroup(false); }}
        className={styles.editGroupModalWrapper}
        width="530px"
        scroll
      >
        <Modal.Header className={styles.editGroupModalHeader}>
          {
            isCreatingGroup ?
            <p>Criar grupo</p> :
            <p>Opções de grupo</p>
          }
        </Modal.Header>
        <Modal.Body className={styles.editGroupModalBody}>
          <Input
            Icon={Folder}
            placeholder="Nome do grupo"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <h2>Cor</h2>
          <NextuiInput
            type="color"
            value={groupColor}
            onChange={(event) => setGroupColor(event.target.value)}
            className={styles.groupColor}
          />
          {
            !isCreatingGroup &&
            <>
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
            </>
          }
          {
            isCreatingGroup ?
            <Button onClick={handleCreateGroup}>Criar grupo</Button> :
            <div className={styles.editGroupButtons}>
              <Button color="error" auto onClick={handleDeleteGroup}>
                <Delete />
              </Button>
              <Button onClick={handleUpdateGroupData}>Salvar alterações</Button>
            </div>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

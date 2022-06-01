import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import { Button } from "../../Button";
import styles from "./styles.module.scss";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { toastProps } from "../../../utils/toast";

export function AboutMeModal({ open, onToggle = () => {}, profile }) {
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [dribbble, setDribbble] = useState("");

  async function handleSaveData() {
    const data = {
      description,
      vinculed_accounts: [
        github !== "" ? {
          provider: "Github",
          account: github,
        } : null,
        linkedin !== "" ? {
          provider: "Linkedin",
          account: linkedin,
        } : null,
        dribbble !== "" ? {
          provider: "Dribbble",
          account: dribbble,
        } : null
      ],
    };

    await api.put(`profile/${profile.id}`, data);
    onToggle(false);

    toast.success("Perfil atualizado com sucesso!", toastProps);
  }

  useEffect(() => {
    if (profile) {
      profile.description && setDescription(profile.description);
      profile.vinculed_accounts &&
        profile.vinculed_accounts.forEach((vinculed_account) => {
          switch (vinculed_account.provider) {
            case "Github":
              setGithub(vinculed_account.account);
              break;
            case "Linkedin":
              setLinkedin(vinculed_account.account);
              break;
            case "Dribbble":
              setDribbble(vinculed_account.account);
              break;
          }
        });
    }
  }, [profile]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      onClose={() => onToggle(false)}
      className={styles.groupsModalInfoCorporative}
      width="1200px"
      scroll
    >
      <Modal.Body className={styles.editGrape}>
        Sobre mim
        <div className={styles.aboutMe}>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value) => {
              if (value.replace(/(<([^>]+)>)/gi, "").length <= 1200) {
                setDescription(value);
              } else {
                setDescription(value.substring(0, 1203));
              }
            }}
          />
          <span
            className={
              description.replace(/(<([^>]+)>)/gi, "").length >= 1200
                ? styles.maxCharLimit
                : styles.maxChar
            }
          >
            {description.replace(/(<([^>]+)>)/gi, "") === "undefined"
              ? 1200
              : 1200 - description.replace(/(<([^>]+)>)/gi, "").length}{" "}
            caractéres restantes
          </span>
        </div>
        <div className={styles.gitHub}>
          <div>
            <img src="/images/imgGitHub.png" alt="imgGitHub" />
            Github
          </div>
          <input
            type="text"
            value={github}
            onChange={(event) => setGithub(event.target.value)}
          />
        </div>
        <div className={styles.linkedin}>
          <div>
            <img src="/images/imgLinkedin.png" alt="imgLinkedin" />
            Linkedin
          </div>
          <input
            type="text"
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
          />
        </div>
        <div className={styles.dribbble}>
          <div>
            <img src="/images/imgDribbble.png" alt="imgDribbble" />
            Dribbble
          </div>
          <input
            type="text"
            value={dribbble}
            onChange={(event) => setDribbble(event.target.value)}
          />
        </div>
        <div className={styles.boxButons}>
          <Button onClick={() => onToggle(false)} color="error">
            Cancelar
          </Button>
          <Button onClick={handleSaveData}>Salvar alterações</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

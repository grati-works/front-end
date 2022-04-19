import dynamic from "next/dynamic";
import { Modal } from "@nextui-org/react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useState } from "react";
import { Button } from "../../Button";
import styles from './styles.module.scss';
import { useEffect } from "react";

export function EditInfoModal({ title, open, onToggle = () => {}, onSave = () => {}, profile, contentKey }) {
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {
    if (profile !== undefined && profile[contentKey]) setInputContent(profile[contentKey]);

  }, [profile])

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      onClose={() => onToggle(false)}
      className={styles.editInfoModal}
      width="1200px"
      scroll
    >
      <Modal.Body className={styles.editInfoWrapper}>
        {title}
        <div className={styles.inputWrapper}>
          <ReactQuill
            theme="snow"
            value={inputContent}
            onChange={(value) => {
              if (value.replace(/(<([^>]+)>)/gi, "").length <= 1200) {
                setInputContent(value);
              } else {
                setInputContent(value.substring(0, 1203));
              }
            }}
          />
          <span
            className={
              inputContent.replace(/(<([^>]+)>)/gi, "").length >= 1200
                ? styles.maxCharLimit
                : styles.maxChar
            }
          >
            {inputContent.replace(/(<([^>]+)>)/gi, "") === "undefined"
              ? 1200
              : 1200 - inputContent.replace(/(<([^>]+)>)/gi, "").length}{" "}
            caractéres restantes
          </span>
        </div>
        <div className={styles.boxButons}>
          <Button onClick={() => onToggle(false)} color="error">Cancelar</Button>
          <Button onClick={() => onSave(inputContent)}>Salvar alterações</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

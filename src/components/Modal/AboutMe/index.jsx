import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import { Button } from "../../Button";
import styles from "./styles.module.scss";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export function AboutMeModal({
  open,
  onToggle = () => {},
  onSave = () => {},
}) {
  const [value, setValue] = useState('');

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      onClose={onToggle}
      className={styles.groupsModalInfoCorporative}
      width="1200px"
      scroll
    >
      <Modal.Body className={styles.editGrape}>
        Sobre mim
        <div className={styles.aboutMe}>
          <ReactQuill theme="snow" value={value} onChange={setValue}/>
          {/* <div className={styles.bar}>
            <button>B</button>
            <button>I</button>
          </div>
          <input type="text" placeholder="1200 caractéres" /> */}
        </div>
        <div className={styles.gitHub}>
          <button>
            <img src="/images/imgGitHub.png" alt="imgGitHub" />
            Github
          </button>
        </div>
        <div className={styles.linkedin}>
          <button>
            <img src="/images/imgLinkedin.png" alt="imgLinkedin" />
            Linkedin
          </button>
        </div>
        <div className={styles.dribbble}>
          <button>
            <img src="/images/imgDribbble.png" alt="imgDribbble" />
            Dribbble
          </button>
        </div>
        <div className={styles.boxButons}>
          <Button onClick={onToggle} color="error">Cancelar</Button>
          <Button onClick={onSave}>Salvar alterações</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

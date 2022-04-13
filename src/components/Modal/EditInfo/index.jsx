import { Modal } from "@nextui-org/react";
import { Button } from "../../Button";
import styles from './styles.module.scss';

export function EditInfoModal({ title, open, onToggle = () => {}, onSave = () => {} }) {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      onClose={() => onToggle()}
      className={styles.groupsModalInfoCorporative}
      width="1200px"
      scroll
    >
      <Modal.Body className={styles.groupsWrapper}>
        {title}
        <div className={styles.cox}>
          <div className={styles.bar}>
            <button>B</button>
            <button>I</button>
          </div>
          <input type="text" placeholder="1200 caractéres" />
        </div>
        <div className={styles.boxButons}>
          <Button onClick={() => onToggle()} color="error">Cancelar</Button>
          <Button onClick={onSave}>Salvar alterações</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

import { Modal } from "@nextui-org/react";
import { Button } from "../../Button";

import styles from './styles.module.scss';

export function DeleteMessageModal({ isVisible, cancelFunction, deleteFunction }) {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isVisible}
      onClose={cancelFunction}
      className={styles.deleteModal}
      width="500px"
    >
      <Modal.Header className={styles.deleteModalHeader}>
        <img src="/icons/close.svg" alt="Ícone de exclusão" />
        <h4>Deletar Grati</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja deletar essa mensagem?</p>
      </Modal.Body>
      <Modal.Footer className={styles.deleteModalFooter}>
        <Button bordered auto onClick={cancelFunction}>
          Cancelar
        </Button>
        <Button color="error" auto onClick={deleteFunction}>
          Sim, deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

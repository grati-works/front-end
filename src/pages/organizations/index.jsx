import { useState } from 'react';
import Head from 'next/head';

import styles from './organizacao.module.scss';
import { Modal } from '@nextui-org/react';

export default function Organizacao() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
      setVisible(false);
      console.log('closed');
  };

  return (
    <>
      <Head>
          <title>Grati | Organização</title>
      </Head>
      <div className={styles.organizationWrapper}>
        <div className={styles.cardOrganization} onClick={handler}>
          <div className={styles.organizationIcon} style={{ backgroundColor: '#FE0A00' }}>
            <img src="https://jandira.sp.senai.br/Img/logo-senai2.png" alt="Senai" />
          </div>
          <p>Senai</p>
        </div>
        <div className={styles.cardOrganization} onClick={handler}>
          <div className={styles.organizationIcon} style={{ backgroundColor: '#EEEEEE' }}>
            <img src="https://logodownload.org/wp-content/uploads/2014/04/microsoft-logo.png" alt="Senai" />
          </div>
          <p>Microsoft</p>
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        className={styles.groupsModal}
        width="530px"
        scroll
      >
          <Modal.Header className={styles.groupsModalHeader}>
              <p>Grupos inscritos na organização - Senai</p>
          </Modal.Header>
          <Modal.Body className={styles.groupsWrapper}>
              <div className={styles.cardGroup}>
                <div style={{ backgroundColor: '#DD473B' }} />
                <p>Gestão</p>
              </div>
              <div className={styles.cardGroup}>
                <div style={{ backgroundColor: '#5CB531' }} />
                <p>Turtle Squad</p>
              </div>
          </Modal.Body>
      </Modal>
    </>
  )
}
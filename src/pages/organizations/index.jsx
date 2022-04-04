import { useState } from 'react';
import Head from 'next/head';

import styles from './organizacao.module.scss';
import { Modal } from '@nextui-org/react';
import { useEffect } from 'react';
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';

export default function Organizacao() {
  const [visible, setVisible] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const router = useRouter();

  function handler(id) {
    setSelectedOrganization(id);
    setCookie(undefined, 'grati.organization_id', id, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    setVisible(true);
  };

  function closeHandler() {
      setVisible(false);
  };

  function enterGroup(id) {
    router.push(`/home/${selectedOrganization}/group/${id}`);
    setCookie(undefined, 'grati.group_id', id, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    setSelectedGroup(id);
  }

  useEffect(() => {
    async function loadSelectedInfo() {
      try {
        const { 'grati.organization_id': organization_id, 'grati.group_id': group_id } = parseCookies();
        if(organization_id) setSelectedOrganization(organization_id);
        if(group_id) setSelectedGroup(group_id);
      } catch (error) {
        toast.error('Não foi possível recarregar organização selecionada')
      }
    }

    async function loadOrganizations() {
      try {
        const organizations = await api.get('user/organizations');

        setOrganizations(organizations.data);
      } catch (error) {
        console.log(error);
        toast.error('Não foi possível carregar as organizações de usuário', toastProps);
      }
    }

    loadSelectedInfo();
    loadOrganizations();
  }, [])

  return (
    <>
      <Head>
          <title>Grati | Organização</title>
      </Head>
      <div className={styles.organizationWrapper}>
        {
          organizations.map(organization => (
            <div key={organization.id} className={`${styles.cardOrganization} ${selectedOrganization == organization.id ? styles.selectedOrganization : ''}`} onClick={() => handler(organization.id)}>
              <div className={styles.organizationIcon} style={{ backgroundColor: `${organization.color || 'var(--nextui-colors-primary)'}` }} />
              <p>{organization.name}</p>
            </div>
          ))
        }
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
              <p>Grupos inscritos na organização - {organizations.find(organization => organization.id === selectedOrganization)?.name}</p>
          </Modal.Header>
          <Modal.Body className={styles.groupsWrapper}>
            {
              organizations.find(organization => organization.id === selectedOrganization)?.groups.map(group => (
                <div className={`${styles.cardGroup} ${selectedGroup == group.id ? styles.cardGroupSelected : ''}`} key={group.id} onClick={() => enterGroup(group.id)}>
                  <div style={{ backgroundColor: `${group.color || 'var(--nextui-colors-primary)'}` }} />
                  <p>{group.name}</p>
                </div>
              ))
            }

          </Modal.Body>
      </Modal>
    </>
  )
}
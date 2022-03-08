import Head from 'next/head';
import { Lock } from 'react-iconly';
import { Input } from '../../components/Input';

import styles from './gerenciamento.module.scss';

export default function Manage() {
  return (
    <>
      <Head> 
          <title>Grati | Gerenciamento</title>
      </Head>
      <div className={styles.editions}>
      <div className={styles.editionsPage}>
          Aparência
          <div className={styles.appearance}>
              <div className={styles.darkMode}>
                  <button></button>
                  Escuro
              </div>
              <div className={styles.clearMode}>
                  <button></button>
                  Claro
              </div>
              <div className={styles.automatic}>
                  <button></button>
                  Automático
              </div>
          </div>
          Esquema de cores
          <div className={styles.colorScheme}>
              <button></button>
          </div>
          Gerenciamento de grupos
          <div className={styles.manageGroups}>
              <div className={styles.gestao}>
                  <div></div>
                  Gestão
              </div>
              <div className={styles.squadTerno}>
              <div></div>
              Squad Terno
              </div>
              <div className={styles.squadTurtle}>
              <div></div>
              Squad Turtle
              </div>
              <div className={styles.createGroup}>
              <div>+</div>
              Criar grupo
              </div>

          </div>
      </div>
      <div className={styles.registerUser}>
          Dados
          <Input Icon={Lock} placeholder="Nome da organização" />
      </div>
      </div>
    </>
  )
}
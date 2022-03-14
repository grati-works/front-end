import Head from 'next/head';
import { Bookmark, Document, Lock } from 'react-iconly';
import { Input } from '../../components/Input';
import { UserCard } from '../../components/UserCard';


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
              <button className={styles.red}></button>
              <button className={styles.yellow}></button>
              <button className={styles.green}></button>
              <button className={styles.blue}></button>
              <button className={styles.purple}></button>
              <button className={styles.pink}></button>
              <button className={styles.black}></button>
              <button className={styles.gray}></button>

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
              <nobr>Criar grupo</nobr>
              </div>

          </div>
      </div>
      <div className={styles.boxGood}>
      Dados
      <div className={styles.registerUser}>
          <Input Icon={Bookmark} placeholder="Nome da organização" />
      </div>
      <div className={styles.addCsv}>
          <div className={styles.left}>
              <img src="/images/user.png" alt="user" />
          </div>
          <div className={styles.right}>
              Cadastro de usuários
              <div className={styles.boxGrape}>
              <button>Cadastro manual</button>
              <div className={styles.documenttCsv}>
                  <img src="/images/info.png" alt="" />
                  <nav>Importar arquivo csv</nav>
              </div>
              </div>
          </div>
          </div>
      </div>
      </div>
      <div className={styles.tabelaUsuarios}>
          <h1>Gerenciamento de grupos</h1>
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
        <UserCard avatar="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" name="Luciano Monteiro" user="@lu.monteiro" email="lu.monteiro@gmail.com" />

         </tbody>
      </table>
      </div>
    </>
  )
}
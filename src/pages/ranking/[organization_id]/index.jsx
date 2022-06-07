import Head from "next/head";

import styles from "./ranking.module.scss";
import { UserRankingCard } from "../../../components/UserRankingCard";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import { api } from "../../../services/api";
import { parseCookies } from 'nookies';
import dayjs from 'dayjs';
import { useRouter } from "next/router";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { asPath } = useRouter();

  useEffect(() => {
    const { "grati.organization_id": selectedOrganizationId } = parseCookies();
    setOrganizationId(selectedOrganizationId);

    if (selectedOrganizationId == 0) {
      router.push("/organizations");
      toast.warn("Você não selecionou nenhuma organização", toastProps);
      return;
    }

    async function loadRanking() {
      const nowDate = dayjs().format("YYYY-MM-DD");
      const threeMonthsAgoDate = dayjs()
        .subtract(3, "month")
        .format("YYYY-MM-DD");

      const response = await api.get(
        `organization/${selectedOrganizationId}/ranking?page=${
          currentPage - 1
        }&start_date=${threeMonthsAgoDate}&end_date=${nowDate}`
      );

      setRanking(response.data.ranking);
      setTotalPages(response.data.total_pages);
    }

    loadRanking();
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Grati | Ranking</title>
      </Head>
      <div className={styles.rankingContainer}>
        <table className={styles.rankingTable}>
          <thead>
            <tr>
              <th className={styles.positionTitle}>POSIÇÃO</th>
              <th>USUÁRIO</th>
              <th>GRATI'S</th>
              <th>EXPERIÊNCIA</th>
            </tr>
          </thead>
          <tbody>
            {
              ranking.map((profile, position) => (
                <UserRankingCard key={position} organization_id={asPath.split('/')[2]} position={position+1} avatar={profile.user.profile_picture} name={profile.user.name} level={profile.level} received_feedbacks={profile.received_feedbacks} points={profile.points} id={profile.user.id} />
              ))
            }
            {/* <UserRankingCard position="2" avatar="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" name="Carlos Almeida" status="down" level="11" gratis="34" experience="1560" /> */}
          </tbody>
        </table>
        <Pagination
          total={totalPages}
          initialPage={1}
          onClick={(event) =>
            event.target.textContent !== "" &&
            setCurrentPage(event.target.textContent)
          }
        />
      </div>
    </>
  );
}

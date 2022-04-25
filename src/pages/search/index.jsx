import styles from "./search.module.scss";
import { UserCard } from "../../components/UserCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { parseCookies } from "nookies";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { "grati.organization_id": organization_id } = parseCookies();

  useEffect(() => {
    const q = router.query?.q;
    if (q) {
      setQuery(q.charAt(0).toUpperCase() + q.slice(1));
      getQueryResults(q);
    }

    async function getQueryResults(query) {

      const results = await api.get(`/search/${organization_id}?q=${query}`);

      setResults(results.data);
    }
  }, [router.query]);

  return (
    <div className={styles.searchWrapper}>
      <h2>
        Exibindo resultados para: {query}
        <span></span>
      </h2>
      {results.map((result) => (
        <UserCard
          id={result.user.id}
          key={result.id}
          type="search"
          avatar={result.user.profile_picture}
          name={result.user.name}
          user={result.user.username}
          organization_id={organization_id}
        />
      ))}
    </div>
  );
}

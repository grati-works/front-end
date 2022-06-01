import { Input, Link } from "@nextui-org/react";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  async function updateSuggestions(query) {
    const { "grati.organization_id": organization_id } = parseCookies();
    const suggestions = await api.get(
      `/search/suggest/${organization_id}?q=${query}`
    );
    setSuggestions(suggestions.data);
  }

  useEffect(() => {
    if (query) {
      if (query.length === 0) {
        setSuggestions([]);
      }
      if (query.length > 0 && query.length % 3 === 0) {
        updateSuggestions(query);
      }
    }
  }, [query]);

  useEffect(() => {
    setQuery(Router.query["q"]);
  }, []);

  return (
    <div className={styles.searchBoxWrapper}>
      <Input
        animated={false}
        clearable
        shadow={false}
        size="md"
        placeholder="Insira o termo a ser pesquisado"
        type="search"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        className={styles.input}
      />
      {suggestions.length !== 0 && (
        <div className={styles.suggestionsWrapper}>
          {suggestions.map((suggestion) => (
            <Link href={`/search?q=${suggestion}`} key={suggestion}>
              {suggestion.slice(0, 1).toUpperCase() + suggestion.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

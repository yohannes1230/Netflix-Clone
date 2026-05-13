import { useEffect, useState } from "react";
import DetailModal from "../components/Modal/DetailModal";
import MovieCard from "../components/MovieCard/MovieCard";
import { useDebounce } from "../hooks/useDebounce";
import { requests } from "../utils/tmdb";
import styles from "../styles/Netflix.module.css";

export default function Search({ search }) {
  const debounced = useDebounce(search, 400);
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!debounced?.trim()) {
      setResults([]);
      return undefined;
    }
    requests.search(debounced).then((payload) => {
      if (!cancelled) {
        setResults((payload.results || []).filter((item) => item.media_type === "movie" || item.media_type === "tv"));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  return (
    <main className={`${styles.app} ${styles.section}`}>
      <h1 className={styles.pageTitle}>Search</h1>
      {!debounced && <p className={styles.empty}>Search for movies, shows, actors, and genres from the navigation bar.</p>}
      {debounced && results.length === 0 && <p className={styles.empty}>No results yet for "{debounced}".</p>}
      <div className={styles.gridPage}>
        {results.map((item, index) => <MovieCard key={item.id} item={item} index={index} onMoreInfo={setActive} />)}
      </div>
      <DetailModal item={active} onClose={() => setActive(null)} onMoreInfo={setActive} />
    </main>
  );
}

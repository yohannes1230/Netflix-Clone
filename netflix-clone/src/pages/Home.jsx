import { useMemo, useState } from "react";
import Hero from "../components/Hero/Hero";
import Row from "../components/Row/Row";
import DetailModal from "../components/Modal/DetailModal";
import { useAuth } from "../context/AuthContext";
import { hasTMDBKey, requests } from "../utils/tmdb";
import { useTMDB } from "../hooks/useTMDB";
import styles from "../styles/Netflix.module.css";

export default function Home() {
  const [active, setActive] = useState(null);
  const { settings, setSettings } = useAuth();
  const trending = useTMDB(requests.trending, []);
  const topRated = useTMDB(requests.topRated, []);
  const popularMovies = useTMDB(requests.popularMovies, []);
  const popularTv = useTMDB(requests.popularTv, []);
  const action = useTMDB(requests.action, []);
  const comedy = useTMDB(requests.comedy, []);
  const hero = useMemo(() => trending.data.find((item) => item.backdrop_path) || trending.data[0], [trending.data]);

  return (
    <main className={styles.app}>
      <Hero item={hero} onMoreInfo={setActive} />
      {!hasTMDBKey && (
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <p className={styles.empty}>Add `REACT_APP_TMDB_KEY` to `.env` to load live TMDB rows.</p>
        </section>
      )}
      <section className={styles.section} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <label className={styles.settings}>
          <input type="checkbox" checked={settings.matureContent} onChange={(event) => setSettings({ ...settings, matureContent: event.target.checked })} />
          Mature content
        </label>
      </section>
      <Row title="Trending Now" items={trending.data} loading={trending.loading} onMoreInfo={setActive} />
      <Row title="Top 10 in the U.S. Today" items={topRated.data.slice(0, 10)} loading={topRated.loading} topTen onMoreInfo={setActive} />
      <Row title="New Releases" items={popularMovies.data} loading={popularMovies.loading} onMoreInfo={setActive} />
      <Row title="Action Movies" items={action.data} loading={action.loading} onMoreInfo={setActive} />
      <Row title="Comedy" items={comedy.data} loading={comedy.loading} onMoreInfo={setActive} />
      <Row title="Continue Watching" items={popularTv.data} loading={popularTv.loading} progress onMoreInfo={setActive} />
      <DetailModal item={active} onClose={() => setActive(null)} onMoreInfo={setActive} />
    </main>
  );
}

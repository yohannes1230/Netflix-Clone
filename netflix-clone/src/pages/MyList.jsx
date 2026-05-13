import { useState } from "react";
import DetailModal from "../components/Modal/DetailModal";
import MovieCard from "../components/MovieCard/MovieCard";
import { useMyList } from "../context/MyListContext";
import styles from "../styles/Netflix.module.css";

export default function MyList() {
  const { items, remove } = useMyList();
  const [active, setActive] = useState(null);

  return (
    <main className={`${styles.app} ${styles.section}`}>
      <h1 className={styles.pageTitle}>My List</h1>
      {items.length === 0 && <p className={styles.empty}>Titles you add with the plus button will appear here.</p>}
      <div className={styles.gridPage}>
        {items.map((item, index) => (
          <div key={item.id}>
            <MovieCard item={item} index={index} onMoreInfo={setActive} />
            <button className={styles.secondaryButton} style={{ marginTop: 10, minHeight: 34, fontSize: ".8rem" }} onClick={() => remove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <DetailModal item={active} onClose={() => setActive(null)} onMoreInfo={setActive} />
    </main>
  );
}

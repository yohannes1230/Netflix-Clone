import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "../../styles/Netflix.module.css";

export default function Row({ title, items, loading, topTen = false, progress = false, onMoreInfo }) {
  const railRef = useRef(null);

  const scrollPage = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    const onKeyDown = (event) => {
      if (document.activeElement && rail?.contains(document.activeElement)) {
        if (event.key === "ArrowRight") scrollPage(1);
        if (event.key === "ArrowLeft") scrollPage(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const skeletons = Array.from({ length: 12 }, (_, index) => index);

  return (
    <section className={styles.row} aria-label={title}>
      <h2 className={styles.rowTitle}>{title}</h2>
      <div className={styles.railWrap}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} aria-label={`Previous ${title}`} onClick={() => scrollPage(-1)}>‹</button>
        <div className={styles.rail} ref={railRef}>
          {loading
            ? skeletons.map((key) => <div className={styles.skeleton} key={key} />)
            : items.map((item, index) => (
                <div className={topTen ? styles.topTenSlot : styles.cardSlot} key={`${title}-${item.id}`}>
                  {topTen && <span className={styles.rank}>{index + 1}</span>}
                  <MovieCard
                    item={item}
                    index={index}
                    onMoreInfo={onMoreInfo}
                    progress={progress ? 20 + ((index * 13) % 70) : undefined}
                  />
                </div>
              ))}
        </div>
        <button className={`${styles.arrow} ${styles.arrowRight}`} aria-label={`Next ${title}`} onClick={() => scrollPage(1)}>›</button>
      </div>
    </section>
  );
}

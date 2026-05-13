import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { imageUrl, mediaTypeOf, requests, titleOf } from "../../utils/tmdb";
import { useMyList } from "../../context/MyListContext";
import styles from "../../styles/Netflix.module.css";

export default function DetailModal({ item, onClose, onMoreInfo }) {
  const [detail, setDetail] = useState(null);
  const { toggle, has } = useMyList();
  const active = detail || item;

  useEffect(() => {
    if (!item) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    requests.details(item.id, mediaTypeOf(item)).then(setDetail).catch(() => setDetail(item));
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div className={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            layoutId={`card-${item.id}`}
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>
            <div className={styles.modalHero} style={{ backgroundImage: `url(${imageUrl(active.backdrop_path || active.poster_path, "original")})` }}>
              <div className={styles.modalHeroContent}>
                <h2 className={styles.modalTitle}>{titleOf(active)}</h2>
                <div className={styles.buttonRow}>
                  <button className={styles.primaryButton}>▶ Play</button>
                  <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label={has(item.id) ? "Remove from list" : "Add to list"} onClick={() => toggle(item)}>
                    {has(item.id) ? "✓" : "+"}
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.modalBody}>
              <div>
                <div className={styles.meta}>
                  <span className={styles.match}>98% Match</span>
                  <span>{(active.release_date || active.first_air_date || "2026").slice(0, 4)}</span>
                  <span className={styles.badge}>HD</span>
                  <span className={styles.badge}>TV-MA</span>
                  <span>{active.runtime || active.number_of_seasons || 2} {mediaTypeOf(active) === "tv" ? "Seasons" : "h"}</span>
                </div>
                <p className={styles.detailsText}>{active.overview}</p>
                {mediaTypeOf(active) === "tv" && (
                  <select className={styles.select} aria-label="Select season">
                    <option>Season 1</option>
                    <option>Season 2</option>
                    <option>Season 3</option>
                  </select>
                )}
              </div>
              <aside className={styles.sideMeta}>
                <span><strong>Cast:</strong> {(active.credits?.cast || []).slice(0, 4).map((person) => person.name).join(", ") || "TMDB cast unavailable"}</span>
                <span><strong>Genres:</strong> {(active.genres || []).map((genre) => genre.name).join(", ") || "Drama, Thriller"}</span>
                <span><strong>This title is:</strong> Suspenseful, Slick, Dark</span>
              </aside>
              <div style={{ gridColumn: "1 / -1" }}>
                <h3>More Like This</h3>
                <div className={styles.similarGrid}>
                  {(active.similar?.results || []).slice(0, 12).map((similar, index) => (
                    <MovieCard key={similar.id} item={similar} index={index} compact onMoreInfo={onMoreInfo} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

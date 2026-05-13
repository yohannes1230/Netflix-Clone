import { motion } from "framer-motion";
import { imageUrl, mediaTypeOf, titleOf } from "../../utils/tmdb";
import { useMyList } from "../../context/MyListContext";
import styles from "../../styles/Netflix.module.css";

export default function MovieCard({ item, index = 0, onMoreInfo, progress, compact = false }) {
  const { toggle, has } = useMyList();
  const saved = has(item.id);
  const title = titleOf(item);
  const poster = imageUrl(item.backdrop_path || item.poster_path, "w500");
  const edgeClass = index % 6 === 0 ? styles.edgeLeft : index % 6 === 5 ? styles.edgeRight : "";
  const year = (item.release_date || item.first_air_date || "2026").slice(0, 4);

  return (
    <motion.article layoutId={`card-${item.id}`} className={`${styles.card} ${edgeClass}`} tabIndex={0}>
      {poster ? <img className={styles.poster} src={poster} alt={title} loading="lazy" /> : <div className={styles.poster} />}
      {typeof progress === "number" && (
        <div className={styles.progress} aria-label={`${progress}% watched`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
      {!compact && (
        <div className={styles.cardInfo}>
          <div className={styles.buttonRow}>
            <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label="Play">▶</button>
            <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label={saved ? "Remove from list" : "Add to list"} onClick={() => toggle(item)}>
              {saved ? "✓" : "+"}
            </button>
            <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label="Like">👍</button>
            <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label="Dislike">👎</button>
            <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label="More info" onClick={() => onMoreInfo(item)}>⌄</button>
          </div>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.meta}>
            <span className={styles.match}>98% Match</span>
            <span>{year}</span>
            <span className={styles.badge}>HD</span>
            <span>{mediaTypeOf(item) === "tv" ? "Series" : "Movie"}</span>
          </div>
          <div className={styles.pills}>
            <span className={styles.pill}>Suspenseful</span>
            <span className={styles.pill}>Gritty</span>
            <span className={styles.pill}>Binge-worthy</span>
          </div>
        </div>
      )}
    </motion.article>
  );
}

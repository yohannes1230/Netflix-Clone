import { motion } from "framer-motion";
import { imageUrl, titleOf } from "../../utils/tmdb";
import styles from "../../styles/Netflix.module.css";

export default function Hero({ item, onMoreInfo }) {
  const title = titleOf(item);
  const background = imageUrl(item?.backdrop_path, "original") || imageUrl(item?.poster_path, "original");

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.heroBg}
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundImage: background ? `url(${background})` : "linear-gradient(135deg, #2d1114, #141414)" }}
      />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroText}>{item?.overview || "Stream cinematic stories, acclaimed series, and audience favorites from TMDB."}</p>
        <div className={styles.buttonRow}>
          <button className={styles.primaryButton}>▶ Play</button>
          <button className={styles.secondaryButton} onClick={() => onMoreInfo(item)}>ⓘ More Info</button>
          <span className={styles.maturity}>TV-MA</span>
        </div>
      </div>
    </section>
  );
}

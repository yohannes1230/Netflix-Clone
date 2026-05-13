import { motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Netflix.module.css";

function Icon({ children }) {
  return <span aria-hidden="true">{children}</span>;
}

export default function Navbar({ search, setSearch }) {
  const [solid, setSolid] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signout } = useAuth();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (openSearch) inputRef.current?.focus();
  }, [openSearch]);

  const activateSearch = () => {
    setOpenSearch(true);
    if (location.pathname !== "/search") navigate("/search");
  };

  return (
    <motion.header
      className={`${styles.nav} ${solid ? styles.navSolid : ""}`}
      initial={{ opacity: 0, y: -68 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Link className={styles.logo} to="/home">NETFLIX</Link>
      <nav className={styles.navLinks} aria-label="Primary">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home?type=tv">TV Shows</NavLink>
        <NavLink to="/home?type=movies">Movies</NavLink>
        <NavLink to="/home?type=popular">New & Popular</NavLink>
        <NavLink to="/my-list">My List</NavLink>
      </nav>
      <div className={styles.navRight}>
        <div className={`${styles.searchBox} ${openSearch ? styles.searchOpen : ""}`}>
          <button className={styles.iconButton} aria-label="Search" onClick={activateSearch}>
            <Icon>⌕</Icon>
          </button>
          <input
            ref={inputRef}
            value={search || ""}
            onChange={(event) => setSearch?.(event.target.value)}
            placeholder="Titles, people, genres"
            aria-label="Search titles"
          />
        </div>
        <button className={`${styles.iconButton} ${styles.tooltip}`} aria-label="Notifications">
          <Icon>🔔</Icon>
        </button>
        <button className={`${styles.iconButton} ${styles.avatar} ${styles.tooltip}`} aria-label="Sign out" onClick={signout} />
      </div>
    </motion.header>
  );
}

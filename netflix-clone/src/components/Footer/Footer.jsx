import styles from "../../styles/Netflix.module.css";

const links = ["FAQ", "Investor Relations", "Privacy", "Speed Test", "Help Center", "Jobs", "Cookie Preferences", "Legal Notices", "Account", "Ways to Watch", "Corporate Information", "Only on Netflix", "Media Center", "Terms of Use", "Contact Us"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Questions? Contact us.</p>
      <div className={styles.footerGrid}>
        {links.map((link) => <a href="/" key={link}>{link}</a>)}
      </div>
      <select className={styles.select} aria-label="Select language">
        <option>English</option>
        <option>Español</option>
        <option>Français</option>
      </select>
    </footer>
  );
}

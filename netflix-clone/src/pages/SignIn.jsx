import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTMDB } from "../hooks/useTMDB";
import { imageUrl, requests } from "../utils/tmdb";
import styles from "../styles/Netflix.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();
  const trending = useTMDB(requests.trending, []);
  const backdrop = imageUrl(trending.data.find((item) => item.backdrop_path)?.backdrop_path, "original");

  const submit = (event) => {
    event.preventDefault();
    signin(email || "demo@netflix.test", password || "password");
    navigate("/home");
  };

  return (
    <main className={styles.authPage} style={backdrop ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.76)), url(${backdrop})` } : undefined}>
      <Link className={styles.logo} style={{ position: "absolute", top: 28, left: 60 }} to="/">NETFLIX</Link>
      <form className={`${styles.authCard} ${styles.form}`} onSubmit={submit}>
        <h1>Sign In</h1>
        <input className={styles.input} type="email" placeholder="Email or phone number" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className={styles.redButton} type="submit">Sign In</button>
        <div className={styles.formOptions}>
          <label><input type="checkbox" defaultChecked /> Remember me</label>
          <a className={styles.helpLink} href="/">Need help?</a>
        </div>
        <p>New to Netflix? <Link className={styles.helpLink} to="/signup">Sign up now.</Link></p>
      </form>
    </main>
  );
}

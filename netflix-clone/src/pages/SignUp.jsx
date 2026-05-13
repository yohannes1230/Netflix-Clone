import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTMDB } from "../hooks/useTMDB";
import { imageUrl, requests } from "../utils/tmdb";
import styles from "../styles/Netflix.module.css";

export default function SignUp() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Premium");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const trending = useTMDB(requests.trending, []);
  const backdrop = imageUrl(trending.data.find((item) => item.backdrop_path)?.backdrop_path, "original");

  const next = (event) => {
    event.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    signup({ email: email || "member@netflix.test", name: "Member", plan });
    navigate("/home");
  };

  return (
    <main className={styles.authPage} style={backdrop ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.76)), url(${backdrop})` } : undefined}>
      <Link className={styles.logo} style={{ position: "absolute", top: 28, left: 60 }} to="/">NETFLIX</Link>
      <form className={`${styles.authCard} ${styles.form}`} onSubmit={next}>
        <h1>{step === 1 ? "Create your account" : step === 2 ? "Set your password" : "Choose your plan"}</h1>
        {step === 1 && <input className={styles.input} type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />}
        {step === 2 && <input className={styles.input} type="password" placeholder="Create a password" value={password} onChange={(event) => setPassword(event.target.value)} />}
        {step === 3 && (
          <select className={styles.select} value={plan} onChange={(event) => setPlan(event.target.value)}>
            <option>Standard with ads</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        )}
        <button className={styles.redButton} type="submit">{step === 3 ? "Start Membership" : "Next"}</button>
      </form>
    </main>
  );
}

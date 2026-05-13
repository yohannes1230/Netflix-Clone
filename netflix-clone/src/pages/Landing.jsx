import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import { useTMDB } from "../hooks/useTMDB";
import { imageUrl, requests } from "../utils/tmdb";
import styles from "../styles/Netflix.module.css";

const faqs = [
  ["What is Netflix?", "Netflix is a streaming service with a wide variety of award-winning TV shows, movies, anime, documentaries, and more."],
  ["How much does Netflix cost?", "Watch on your smartphone, tablet, smart TV, laptop, or streaming device, all for one fixed monthly fee."],
  ["Where can I watch?", "Watch anywhere, anytime. Sign in with your account to watch instantly on the web."],
  ["How do I cancel?", "Netflix is flexible. There are no contracts and no commitments. You can cancel your account online anytime."],
  ["What can I watch on Netflix?", "Netflix has an extensive library of feature films, documentaries, TV shows, anime, and original programming."],
  ["Is Netflix good for kids?", "Profiles give families control over maturity ratings while kids discover family-friendly entertainment."],
];

export default function Landing() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();
  const trending = useTMDB(requests.trending, []);
  const backdrop = imageUrl(trending.data.find((item) => item.backdrop_path)?.backdrop_path, "original");

  const submit = (event) => {
    event.preventDefault();
    navigate(`/signup${email ? `?email=${encodeURIComponent(email)}` : ""}`);
  };

  return (
    <div className={styles.app}>
      <section
        className={styles.landingHero}
        style={backdrop ? { backgroundImage: `radial-gradient(circle at 50% 12%, rgba(229, 9, 20, 0.24), transparent 24%), linear-gradient(90deg, rgba(229, 9, 20, 0.46), rgba(0, 0, 0, 0.32) 38%, rgba(0, 0, 0, 0.92)), linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.2) 45%, #000 100%), url(${backdrop})` } : undefined}
      >
        <header className={styles.landingNav}>
          <Link className={styles.logo} to="/">NETFLIX</Link>
          <div className={styles.buttonRow}>
            <select className={styles.select} aria-label="Select language">
              <option>English</option>
              <option>Español</option>
            </select>
            <Link className={styles.redButton} to="/signin">Sign In</Link>
          </div>
        </header>
        <div className={styles.landingInner}>
          <h1 className={styles.landingTitle}>Unlimited movies, TV shows, and more</h1>
          <p className={styles.landingSub}>Watch anywhere. Cancel anytime.</p>
          <form className={styles.emailCta} onSubmit={submit}>
            <input className={styles.input} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" />
            <button className={styles.redButton} type="submit">Get Started ›</button>
          </form>
        </div>
      </section>
      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map(([question, answer], index) => (
          <div className={styles.faqItem} key={question}>
            <button className={styles.faqButton} onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              <span>{question}</span>
              <span>{open === index ? "×" : "+"}</span>
            </button>
            {open === index && <div className={styles.faqPanel}>{answer}</div>}
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

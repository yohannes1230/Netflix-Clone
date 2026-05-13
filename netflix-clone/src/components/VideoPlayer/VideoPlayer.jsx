export default function VideoPlayer({ src, poster }) {
  if (!src) {
    return poster ? <img src={poster} alt="" /> : null;
  }

  return <video src={src} poster={poster} autoPlay muted loop playsInline />;
}

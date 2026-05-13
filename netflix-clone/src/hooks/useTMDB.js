import { useEffect, useState } from "react";

export function useTMDB(requestFn, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    requestFn()
      .then((payload) => {
        if (!cancelled) {
          setData(payload.results || payload || []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Unable to load titles.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

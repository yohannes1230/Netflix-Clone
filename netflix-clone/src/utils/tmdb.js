const API_BASE = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/";
const API_KEY = process.env.REACT_APP_TMDB_KEY;

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY || "");
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

export const hasTMDBKey = Boolean(API_KEY);

export const imageUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}${size}${path}` : "";

export const titleOf = (item) => item?.title || item?.name || item?.original_name || "Untitled";

export const mediaTypeOf = (item) => item?.media_type || (item?.first_air_date ? "tv" : "movie");

export async function tmdbFetch(path, params) {
  if (!API_KEY) {
    return { results: [] };
  }

  const response = await fetch(buildUrl(path, params));
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  return response.json();
}

export const requests = {
  trending: () => tmdbFetch("/trending/all/week"),
  topRated: () => tmdbFetch("/movie/top_rated"),
  popularMovies: () => tmdbFetch("/movie/popular"),
  popularTv: () => tmdbFetch("/tv/popular"),
  action: () => tmdbFetch("/discover/movie", { with_genres: "28", sort_by: "popularity.desc" }),
  comedy: () => tmdbFetch("/discover/movie", { with_genres: "35", sort_by: "popularity.desc" }),
  search: (query) => tmdbFetch("/search/multi", { query, include_adult: "false" }),
  similar: (id, type = "movie") => tmdbFetch(`/${type}/${id}/similar`),
  genres: () => tmdbFetch("/genre/movie/list"),
  details: (id, type = "movie") =>
    tmdbFetch(`/${type}/${id}`, { append_to_response: "credits,videos,similar" }),
};

import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("nf_user", null);
  const [settings, setSettings] = useLocalStorage("nf_profile_settings", { matureContent: true });

  const signin = (email, password) => {
    const profile = { email, name: email.split("@")[0], token: `mock-${Date.now()}` };
    setUser(profile);
    return profile;
  };

  const signup = (profile) => {
    const next = { ...profile, token: `mock-${Date.now()}` };
    setUser(next);
    return next;
  };

  const signout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), signin, signup, signout, settings, setSettings }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

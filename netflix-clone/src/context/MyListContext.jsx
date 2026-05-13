import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MyListContext = createContext(null);

export function MyListProvider({ children }) {
  const [items, setItems] = useLocalStorage("nf_my_list", []);

  const add = (item) => {
    setItems((current) => (current.some((entry) => entry.id === item.id) ? current : [item, ...current]));
  };

  const remove = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const toggle = (item) => (items.some((entry) => entry.id === item.id) ? remove(item.id) : add(item));
  const has = (id) => items.some((item) => item.id === id);

  return <MyListContext.Provider value={{ items, add, remove, toggle, has }}>{children}</MyListContext.Provider>;
}

export const useMyList = () => useContext(MyListContext);

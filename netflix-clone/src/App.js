import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useOutletContext } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Outlet context={{ search }} />
    </>
  );
}

function SearchRoute() {
  const { search } = useOutletContext();
  return <Search search={search} />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Landing />} />
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/home" replace /> : <SignIn />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchRoute />} />
        <Route path="/my-list" element={<MyList />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MyListProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MyListProvider>
    </AuthProvider>
  );
}

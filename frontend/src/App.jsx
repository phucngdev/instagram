import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicRouter from "./routes/PublicRouter";
import PrivateRouter from "./routes/PrivateRouter";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Home from "./pages/user/Home";
import Message from "./pages/user/Message";

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRouter />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Profile />} />
          <Route path="message" element={<Message />} />
          <Route path="message/:id" element={<Message />} />
        </Route>
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route path="/admin" element={<PrivateRouter />}></Route>
      </Routes>
    </>
  );
}

export default App;

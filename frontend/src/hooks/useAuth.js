import { createContext, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../services/auth";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const value = useMemo(() => {
    const login = async (data) => {
      const resp = await AuthAPI.login(data);
      if (resp.access_token === undefined) {
        setError(true);
        return;
      }

      localStorage.removeItem("nav");

      setError(false);
      setToken(resp.access_token);
      setUser(data.username);
      navigate("/", { replace: true });
    };

    const logout = async () => {
      await AuthAPI.logout();
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    };

    const resetPassword = async (data) => {
      await AuthAPI.resetPassword(data);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    };

    return { error, user, token, login, logout, setUser, resetPassword };
  }, [error, setError, user, token, setToken, setUser, navigate]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

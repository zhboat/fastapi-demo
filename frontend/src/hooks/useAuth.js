import { createContext, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../services/auth";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const value = useMemo(() => {
    const login = async (data) => {
      const resp = await AuthAPI.login(data);
      if (resp.access_token === undefined) {
        setError(true);
        return;
      }

      // clear nav local storage when login success
      localStorage.removeItem("nav");

      setError(false);
      setUser(data.username);
      navigate("/", { replace: true });
    };

    // todo: api fail handling
    const logout = async () => {
      await AuthAPI.logout();
      navigate("/login", { replace: true });
    };

    return { error, user, login, logout, setUser };
  }, [error, setError, user, setUser, navigate]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

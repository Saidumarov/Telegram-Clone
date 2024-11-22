import { getUser } from "@/service/get.service";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ data, isLoading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

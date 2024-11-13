import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [render, setRender] = useState(0);
  const router = useNavigate();
  const url = window.location.pathname;
  useEffect(() => {
    try {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        if (url === "/login" || url === "/register") {
          return router("/");
        }
      } else {
        if (url !== "/login" && url !== "/register") {
          return router("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, render]);

  return (
    <UserContext.Provider
      value={{
        render,
        setRender,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

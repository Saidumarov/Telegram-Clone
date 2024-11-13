import { ThemeProvider } from "@/context/ThemeContext";
import UserProvider from "@/context/UserContext";

const Provedirs = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
};

export default Provedirs;

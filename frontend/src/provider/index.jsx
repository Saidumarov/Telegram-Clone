import { AuthProvider } from "@/context/AuthProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import UserProvider from "@/context/UserContext";

const Provedirs = ({ children }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Provedirs;

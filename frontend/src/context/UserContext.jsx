import { createContext, useState, useMemo, useContext } from "react";

// Context yaratish
const UserContext = createContext();

// Custom Hook (contextdan foydalanishni osonlashtirish)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Context Provider
function UserProvider({ children }) {
  const [userPhone, setUserPhone] = useState(null);

  // Value-ni memoize qilish (Keraksiz qayta render oldini olish)
  const value = useMemo(() => ({ userPhone, setUserPhone }), [userPhone]);

  return (
    <UserContext.Provider value={{ value }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;

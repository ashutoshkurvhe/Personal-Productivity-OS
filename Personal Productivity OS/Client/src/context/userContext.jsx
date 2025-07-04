import { createContext, useState } from "react";

// Create context with default value
export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
});

const UseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUser = (userData) => {
    setUser(userData);
  };

  //Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UseProvider;

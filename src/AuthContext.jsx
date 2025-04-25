// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // null = not logged in, object = logged in

//   const login = (userData) => {
//     setUser(userData); // Set user data (e.g., { id, email })
//   };

//   const logout = () => {
//     setUser(null); // Clear user data
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
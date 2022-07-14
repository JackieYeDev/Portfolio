import React from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const currentUser = { isLoggedIn: false, username: null, id: null };
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };

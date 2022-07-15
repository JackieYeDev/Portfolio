import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    id: null,
    username: null,
    password: null,
    stocks: [],
  });
  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

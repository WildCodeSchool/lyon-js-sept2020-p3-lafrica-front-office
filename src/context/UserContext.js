import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useLocalStorage('user_info', {});
  const [loggedIn, setLoggedIn] = useLocalStorage('user_logged', false);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, loggedIn, setLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

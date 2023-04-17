import React, { useContext, useEffect, useState } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAuth = (): IAuthContext => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => console.log(isAuthenticated), [isAuthenticated]);

  const authenticateUser = (): void => {
    console.log(isAuthenticated);
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuth;

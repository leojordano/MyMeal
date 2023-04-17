import React, { createContext, useEffect, useState } from 'react';
import { User, getAuth } from 'firebase/auth';
import Api from '../Service/Api';

export interface IUser {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  authenticateUser: (user: User, token: string) => void;
  user?: User | null;
}

const AUTH_INITIAL_VALUES: IAuthContext = {
  isAuthenticated: false,
  authenticateUser: () => {}
};

const AuthContext = createContext<IAuthContext>(AUTH_INITIAL_VALUES);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();

  const authenticateUser = (
    user: User | null,
    token: string | undefined
  ): void => {
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
    if (token) {
      Api.setToken(token);
    }
  };

  const values: IAuthContext = {
    isAuthenticated,
    authenticateUser,
    user
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

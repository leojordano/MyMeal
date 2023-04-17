import React, { useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../Contexts/Auth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, authenticateUser } = useContext(AuthContext);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;

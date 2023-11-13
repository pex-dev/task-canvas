'use client';

import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, isLoading]);

  return <div>{isLoading ? 'Loading...' : <>{children}</>}</div>;
};

export default Auth;

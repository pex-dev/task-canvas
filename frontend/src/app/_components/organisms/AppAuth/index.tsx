'use client';

import React, { useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  loader?: React.ReactNode;
  children: React.ReactNode;
};

const Auth: React.FC<Props> = ({ loader = null, children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }
    (async (): Promise<void> => {
      await loginWithRedirect();
    })();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return <>{isLoading ? loader : isAuthenticated ? children : 'redirecting...'}</>;
};

export default Auth;

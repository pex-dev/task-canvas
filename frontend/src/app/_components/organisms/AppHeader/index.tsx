'use client';

import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const AppHeader: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      {isAuthenticated && user ? (
        <>
          <button onClick={() => logout()}>Logout</button>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </header>
  );
};

export default AppHeader;

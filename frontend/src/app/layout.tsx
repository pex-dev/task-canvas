'use client';

import { Auth0Provider } from '@auth0/auth0-react';

import Auth from './_components/organisms/AppAuth';

import AppHeader from './_components/organisms/AppHeader';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <Auth0Provider
          authorizationParams={{
            redirect_uri: process.env.NEXT_PUBLIC_VERCEL_URL,
          }}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
        >
          <Auth>
            <AppHeader />
            {children}
          </Auth>
        </Auth0Provider>
      </body>
    </html>
  );
};

export default RootLayout;

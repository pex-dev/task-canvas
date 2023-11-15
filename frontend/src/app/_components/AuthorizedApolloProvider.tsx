import React, { useMemo } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

const GRAPHQL_API_URL = '/api/query';

type Props = {
  children: React.ReactNode;
};

const AuthorizedApolloProvider: React.FC<Props> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: GRAPHQL_API_URL,
      credentials: 'include',
    });

    const authLink = setContext(async () => {
      const token = await getAccessTokenSilently();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getAccessTokenSilently]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;

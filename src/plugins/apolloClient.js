import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import typeDefs from './schema/user2.gql';
import { UserResolvers } from './schema/userResolver';
// for subscription
// import { split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4000/subscriptions',
//   options: {
//     reconnect: true,
//   },
// });
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition'
//       && definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('JWT');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  typeDefs,
  resolvers: UserResolvers,
  cache,
  connectToDevTools: true,
});

export default apolloClient;

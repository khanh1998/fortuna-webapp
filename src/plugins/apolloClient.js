import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
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

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
});

export default apolloClient;

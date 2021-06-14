import { ApolloClient } from 'apollo-client';
import VueApollo from 'vue-apollo';

export const apolloProvider = new VueApollo({
  defaultClient: ApolloClient,
});

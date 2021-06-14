// The provider holds the Apollo client instances that can then be used by all the child components.
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import apolloClient from './apolloClient';

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;

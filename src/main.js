import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import apolloProvider from './plugins/apolloProvider';

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');

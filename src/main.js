// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import VueResource from 'vue-resource';
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';

Vue.use(VueSocketio, 'http://localhost:3000');

Vue.material.registerTheme('default', {
  primary: 'indigo',
  accent: 'pink',
  warn: 'deep-orange',
  background: 'white'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

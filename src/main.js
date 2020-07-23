import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './sass/variable.scss'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch';


Vue.use(VueTouch);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

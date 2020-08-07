import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false
 
Vue.use(VueAxios, axios)

Vue.use(new VueSocketIO({
  debug: true,
  connection: `${location.hostname}:3000`,
}))


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

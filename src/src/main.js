import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookie from 'vue-cookie';	

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueCookie);


// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

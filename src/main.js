/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';

// datePicker
import flatPickr from 'vue-flatpickr-component'  
import 'flatpickr/dist/flatpickr.css'  
import { Spanish } from 'flatpickr/dist/l10n/es.js'  

// plugin setup
Vue.use(DashboardPlugin);
flatpickr.localize(Spanish);
Vue.use(flatPickr);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.moment = moment
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(BootstrapVue)
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

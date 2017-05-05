import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import vueResource from 'vue-resource'
import _ from 'lodash'

Vue.use(ElementUI)
Vue.use(vueResource)


new Vue({
  el: '#app',
  render: h => h(App)
})
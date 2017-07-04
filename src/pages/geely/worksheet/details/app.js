import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vueResource from 'vue-resource'
import _ from 'lodash'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './app.vue'

Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(vueResource)


new Vue({
	el: '#app',
	render: h=> h(App),
	components: { App }
})
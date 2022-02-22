import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
// import page from '@/components/page.vue'
import myPlugin from '@/plugin'
import '@/scss/index.scss'
Vue.use(uView)
Vue.use(myPlugin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

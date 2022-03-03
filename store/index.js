import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: uni.getStorageSync('user') || {}
	},
	getters: {

	},
	mutations: {
		setUser(state, data) {
			state.user = data
			uni.setStorageSync('user', data)
		}
	},
	actions: {

	}
})

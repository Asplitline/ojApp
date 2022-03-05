import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: uni.getStorageSync('user') || {},
		token: uni.getStorageSync('token') || {},
	},
	getters: {
		isLogin: (state) => {
			return state.token?.length > 0
		}
	},
	mutations: {
		setUser(state, data) {
			state.user = data
			uni.setStorageSync('user', data)
		},
		setToken(state, data = '') {
			state.token = data
			uni.setStorageSync('token', data)
		}
	},
	actions: {

	}
})

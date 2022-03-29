import {
	imgUrl
} from '@/utils/static'
import api from '@/utils/api/index.js'
import * as utils from '@/utils'
import * as mock from '@/utils/mock'
import * as _static from '@/utils/static'
const myPlugin = {}

myPlugin.install = (Vue) => {
	Vue.prototype.$imgUrl = imgUrl
	Vue.prototype.$api = api
	Vue.prototype.$utils = utils
	Vue.prototype.$handleStatus = utils.handleStatus
	Vue.prototype.$mock = mock
	Vue.prototype.$static = _static
	Vue.filter('handleDate', (v) => {
		return utils.handleDate(v)
	})

	Vue.filter('firstName', (v) => {
		return v.slice(0, 1)
	})
	Vue.filter('formatDate', (t, format = 'yyyy-MM-DD HH:mm:ss') => {
		let date = t ? new Date(t) : new Date(),
			Y = date.getFullYear() + '',
			M = date.getMonth() + 1,
			D = date.getDate(),
			H = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds()

		return format.replace(/YYYY|yyyy/g, Y)
			.replace(/YY|yy/g, Y.substr(2, 2))
			.replace(/MM/g, (M < 10 ? '0' : '') + M)
			.replace(/DD/g, (D < 10 ? '0' : '') + D)
			.replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
			.replace(/mm/g, (m < 10 ? '0' : '') + m)
			.replace(/ss/g, (s < 10 ? '0' : '') + s)
	})
}

export default myPlugin

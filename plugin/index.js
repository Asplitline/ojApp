import {
	imgUrl,
} from "@/utils/static"
import api from '@/utils/api/index.js'
import * as utils from '@/utils'
const myPlugin = {}

myPlugin.install = (Vue) => {
	Vue.prototype.$imgUrl = imgUrl
	Vue.prototype.$api = api
	Vue.prototype.$utils = utils
	Vue.prototype.$handleStatus = utils.handleStatus
	Vue.filter('handleDate', v => {
		return utils.handleDate(v)
	})
}

export default myPlugin

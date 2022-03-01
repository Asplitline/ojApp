import {
	imgUrl,
} from "@/utils/static"
import api from '@/utils/api/index.js'
import {
	handleDate
} from '@/utils'
const myPlugin = {}

myPlugin.install = (Vue) => {
	Vue.prototype.$imgUrl = imgUrl
	Vue.prototype.$api = api
	Vue.filter('handleDate', v => {
		return handleDate(v)
	})
}

export default myPlugin

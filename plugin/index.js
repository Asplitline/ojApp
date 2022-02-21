import {
	imgUrl,
} from "@/utils/static"
import api from '@/utils/api/index.js'
const myPlugin = {}

myPlugin.install = (Vue) => {
	Vue.prototype.$imgUrl = imgUrl
	Vue.prototype.$api = api
}

export default myPlugin

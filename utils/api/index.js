// http://47.108.129.64:6688/swagger-ui.html'
// https://www.naenano.cn/home
// const BASE_URL = 'http://47.108.129.64:6688/'
import {
	apiUrl
} from '@/utils/static.js'


export default ({
	method = "post",
	url,
	data,
	header = {},
	all = false
}) => {
	return new Promise((resolve, reject) => {
		// const 
		const token = uni.getStorageSync('token')
		token && Object.assign(header, {
			Authorization: token
		})
		uni.request({
			method,
			url: apiUrl + url,
			data,
			header,
			success(res) {
				if (res.data.status === 401) {
					uni.removeStorageSync('token')
				}
				all ? resolve(res) : resolve(res.data)
			},
			fail(error) {
				console.log(error);
				reject(error)
			},
			complete() {
				//
			}
		})
	})
}

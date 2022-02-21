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
	header
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: apiUrl + url,
			data,
			header,
			success(res) {
				resolve(res.data)
			},
			fail(error) {
				reject(error)
			},
			complete() {
				//
			}
		})
	})
}

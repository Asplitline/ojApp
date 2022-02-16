// http://47.108.129.64:6688/swagger-ui.html'
// https://www.naenano.cn/home
// const BASE_URL = 'http://47.108.129.64:6688/'
const BASE_URL = 'https://www.naenano.cn/api/'

export default ({
	method = "post",
	url,
	data,
	header
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: BASE_URL + url,
			data,
			header,
			success(res) {
				resolve(res)
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

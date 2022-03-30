export function exampleStr2Arr(str = '') {
	const arr = []
	const reg = /<input>([\s\S]*?)<\/input><output>([\s\S]*?)<\/output>/g
	let res = reg.exec(str)
	while (res) {
		const [_, input, output] = res
		console.log(_)
		arr.push({
			input,
			output
		})
		res = reg.exec(str)
	}
	return arr
}

export function handleDate(date) {
	const val = new Date(date).getTime()
	const now = Date.now()
	const diff = now - val
	if (diff < 0) return '未知'
	const second = 1000
	const min = 60 * second
	const hour = 60 * min
	const day = 24 * hour
	const month = 30 * day
	const year = 12 * month
	const fl = Math.floor
	const base = {
		second,
		min,
		hour,
		day,
		month,
		year
	}
	const end = {}
	for (const key in base) {
		end[key] = fl(diff / base[key])
	}
	if (end.year > 0) {
		return `${end.year}年前`
	} else if (end.month > 0) {
		return `${end.month}月前`
	} else if (end.day) {
		return `${end.day}天前`
	} else if (end.hour) {
		return `${end.hour}小时前`
	} else if (end.min) {
		return `${end.min}分钟前`
	} else if (end.second) {
		return `${end.second}秒前`
	} else {
		return '刚刚'
	}
}

export function isEmpty(v) {
	const type = Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
	if (type === 'string' || type === 'array') {
		return !v.length
	} else if (type === 'object') {
		return !Object.keys(v).length
	} else if (type === 'number') {
		return !v
	} else {
		return !v
	}
}

export function handleStatus(status, callback, errorCallback) {
	if (status === 200) {
		callback && callback()
		callback()
	} else {
		errorCallback && errorCallback()
	}
}

export function dateToNumber(v) {
	return new Date(v).getTime()
}

export function showDate(v, isMs = true) {
	const unit = isMs ? 1000 : 1
	const base = {
		second: unit,
		min: 60 * unit,
		hour: 60 * 60 * unit,
		day: 24 * 60 * 60 * unit
	}
	const fl = Math.floor
	const s = fl((v % base.min) / base.second)
	const m = fl((v % base.hour) / base.min)
	const h = fl((v % base.day) / base.hour)
	const d = fl(v / base.day)
	// console.log(s, m, h, d)
	let str = ''
	d && (str += d + '天')
	h && (str += h + '小时')
	m && (str += m + '分')
	s && (str += s + '秒')
	return str
}


export function getCurrentStatus(startTime, endTime) {
	const now = Date.now()
	const start = new Date(startTime).getTime()
	const end = new Date(endTime).getTime()
	if (now > start && now < end) {
		return 0
	} else if (now < start) {
		return -1
	} else {
		return 1
	}
}

export function exampleStr2Arr(str = '') {
	const arr = []
	const reg = /<input>([\s\S]*?)<\/input><output>([\s\S]*?)<\/output>/g
	let res = reg.exec(str)
	while (res) {
		const [_, input, output] = res
		console.log(_);
		arr.push({
			input,
			output,
		})
		res = reg.exec(str)
	}
	return arr
}

export function handleDate(date) {
	const val = new Date(date).getTime()
	const now = Date.now()
	const diff = now - val
	if(diff < 0 ) return '未知'
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
	}else {
		return '刚刚'
	}
}

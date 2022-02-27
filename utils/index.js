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

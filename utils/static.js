export const apiUrl = 'https://www.naenano.cn/api/'
export const imgUrl = 'https://www.naenano.cn'

export const REMOTE_OJ = [{
		value: '全部',
		key: 'All'
	},
	{
		value: '主题库',
		key: 'Mine'
	},
	{
		value: 'HDU',
		key: 'HDU'
	},
	{
		value: 'Codeforces',
		key: 'CF'
	},
	{
		value: 'POJ',
		key: 'POJ'
	},
	{
		value: 'GYM',
		key: 'GYM'
	}
]

export const PROBLEM_LEVEL = {
	0: {
		key: 'Easy',
		class: 'Easy',
		value: '简单'
	},
	1: {
		key: 'Mid',
		class: 'Mid',
		value: '中等'
	},
	2: {
		key: 'Hard',
		class: 'Hard',
		value: '困难'
	}
}
export const PROBLEM_LEVEL_RESERVE = [{
		key: '',
		value: '全部'
	},
	{
		key: 0,
		value: '简单'
	},
	{
		key: 1,
		value: '中等'
	},
	{
		key: 2,
		value: '困难'
	}
]

export const REPORT_TAG = ['垃圾广告', '违法违规', '色情低俗', '赌博诈骗', '恶意骂战', '恶意抄袭']

export const JUDGE_STATUS = {
	'-10': {
		name: 'Not Submitted',
		short: 'NS',
		color: 'gray',
		type: 'info',
		rgb: '#909399'
	},
	'-5': {
		name: 'Submitted Unknown Result',
		short: 'SNR',
		color: 'gray',
		type: 'info',
		rgb: '#909399'
	},
	'-3': {
		name: 'Presentation Error',
		short: 'PE',
		color: 'yellow',
		type: 'warning',
		rgb: '#f90'
	},
	'-2': {
		name: 'Compile Error',
		short: 'CE',
		color: 'yellow',
		type: 'warning',
		rgb: '#f90'
	},
	'-1': {
		name: 'Wrong Answer',
		short: 'WA',
		color: 'red',
		type: 'danger',
		rgb: '#ed3f14'
	},
	0: {
		name: 'Accepted',
		short: 'AC',
		color: 'green',
		type: 'success',
		rgb: '#19be6b'
	},
	1: {
		name: 'Time Limit Exceeded',
		short: 'TLE',
		color: 'red',
		type: 'danger',
		rgb: '#ed3f14'
	},
	2: {
		name: 'Memory Limit Exceeded',
		short: 'MLE',
		color: 'red',
		type: 'danger',
		rgb: '#ed3f14'
	},
	3: {
		name: 'Runtime Error',
		short: 'RE',
		color: 'red',
		type: 'danger',
		rgb: '#ed3f14'
	},
	4: {
		name: 'System Error',
		short: 'SE',
		color: 'gray',
		type: 'info',
		rgb: '#909399'
	},
	5: {
		name: 'Pending',
		color: 'yellow',
		type: 'warning',
		rgb: '#f90'
	},
	6: {
		name: 'Compiling',
		short: 'CP',
		color: 'green',
		type: 'info',
		rgb: '#25bb9b'
	},
	7: {
		name: 'Judging',
		color: 'blue',
		type: '',
		rgb: '#2d8cf0'
	},
	8: {
		name: 'Partial Accepted',
		short: 'PAC',
		color: 'blue',
		type: '',
		rgb: '#2d8cf0'
	},
	9: {
		name: 'Submitting',
		color: 'yellow',
		type: 'warning',
		rgb: '#f90'
	},
	10: {
		name: 'Submitted Failed',
		color: 'gray',
		short: 'SF',
		type: 'info',
		rgb: '#909399'
	}
}


export const CONTEST_STATUS_REVERSE = {
	'-1': {
		name: 'Scheduled',
		color: '#f90',
		text: '未开始'
	},
	'0': {
		name: 'Running',
		color: '#19be6b',
		text: '进行中'
	},
	'1': {
		name: 'Ended',
		color: '#ed3f14',
		text: '已结束'
	}
}

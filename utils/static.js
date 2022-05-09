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
		text: '未开始',
		order: 2
	},
	'0': {
		name: 'Running',
		color: '#19be6b',
		text: '进行中',
		order: 3,
	},
	'1': {
		name: 'Ended',
		color: '#ed3f14',
		text: '已结束',
		order: 1
	}
}


export const problemFlag = {
	0: {
		value: 'A',
		color: '#c8de00'
	},
	1: {
		value: 'B',
		color: '#83c024'
	},
	2: {
		value: 'C',
		color: '#37aa35'
	},
	3: {
		value: 'D',
		color: '#00973a'
	},
	4: {
		value: 'E',
		color: '#008f57'
	},
	5: {
		value: 'F',
		color: '#00917c'
	},
	6: {
		value: 'G',
		color: '#0091a2'
	},
	7: {
		value: 'H',
		color: '#0091c8'
	},
	8: {
		value: 'I',
		color: '#0080c7'
	},
	9: {
		value: 'J',
		color: '#0065ab'
	},
	10: {
		value: 'K',
		color: '#004890'
	},
	11: {
		value: 'L',
		color: '#202778'
	},
	12: {
		value: 'M',
		color: '#47166f'
	},
	13: {
		value: 'N',
		color: '#6f1a75'
	},
	14: {
		value: 'O',
		color: '#971a76'
	},
	15: {
		value: 'P',
		color: '#c51578'
	},
	16: {
		value: 'Q',
		color: '#db146f'
	},
	17: {
		value: 'R',
		color: '#da1c5a'
	},
	18: {
		value: 'S',
		color: '#da2045'
	},
	19: {
		value: 'T',
		color: '#d72229'
	},
	20: {
		value: 'U',
		color: '#dd4a16'
	},
	21: {
		value: 'V',
		color: '#e47615'
	},
	22: {
		value: 'W',
		color: '#efa100'
	},
	23: {
		value: 'X',
		color: '#fad900'
	},
	24: {
		value: 'Y',
		color: '#666'
	},
	25: {
		value: 'Z',
		color: '#000'
	}
}


export const CONTEST_TYPE_REVERSE = {
  '0': {
    name:'Public',
    color:'success',
    tips:'Public_Tips',
    submit:true,              // 公开赛可看可提交
    look:true,
  },
  '1':{
    name:'Private',
    color:'danger',
    tips:'Private_Tips',
    submit:false,         // 私有赛 必须要密码才能看和提交
    look:false,
  },
  '2':{
    name:'Protected',
    color:'warning',
    tips:'Protected_Tips',
    submit:false,       //保护赛，可以看但是不能提交，提交需要附带比赛密码
    look:true,
  }
}

export const CONTEST_TYPE = {
  PUBLIC: 0,
  PRIVATE: 1,
  PROTECTED: 2
}

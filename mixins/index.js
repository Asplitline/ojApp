export default {
	data() {
		return {
			query: {
				currentPage: 1,
				limit: 15
			},
			total: 0,
			loadList: [],
			status: 'loadmore'
		}
	},
	computed: {
		isFill() {
			return this.loadList.length && this.loadList.length === this.total
		},
	},
	methods: {
		loadData() {
			if (this.isFill) {
				this.status = 'nomore'
				return
			} else {
				this.query.currentPage++
				this.fetchData()
			}
		},
		handleLoadData(records) {
			if (this.isFull) {
				this.status = 'nomore';
			} else {
				this.loadList.push(...records);
				this.status = this.isFill ? 'nomore' : 'loadmore'
				// if (this.isFull) this.status = 'nomore';
				// else this.status = 'loadmore';
			}
		},
		fetchData() {
			console.log('fetchData')
		}
	},
	onReachBottom() {
		!this.isFill && this.loadData();
	},
}

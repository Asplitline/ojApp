<template>
	<view>
		<u-navbar title="总排名" :autoBack="true" height="44px" class="t-navbar"></u-navbar>

		<t-box text="暂无信息" :show="loadList.length > 0" class="t-pg rd-page">
			<t-rank :data="loadList"></t-rank>
		</t-box>
	</view>
</template>

<script>
import mixins from '@/mixins';
export default {
	data() {
		return {
			query: {
				currentPage: 1,
				limit: 20,
				type: 0
			}
		};
	},
	mixins: [mixins],
	computed: {
		isFull() {
			return this.loadList.length && this.loadList.length === this.total;
		}
	},
	methods: {
		async fetchData() {
			this.status = 'loading';
			const {
				data: { records, total }
			} = await this.$api({ method: 'get', url: 'get-rank-list', data: { ...this.query } });
			this.total = total;
			this.handleLoadData(records);
		}
	},
	filters: {
		firstName(v) {
			if (v.nickname) {
				return v.nickname.slice(0, 1);
			} else {
				return v.username.slice(-1);
			}
		}
	},
	onShow() {
		this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.rd-page {
	background-color: #fafafa;
	height: 100%;
}
</style>

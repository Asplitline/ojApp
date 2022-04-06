<template>
	<view>
		<t-rank :data="loadList"></t-rank>
		<u-loadmore :status="status" @loadmore="loadData"  v-if="!$utils.isEmpty(loadList)"/>
		<view class="" v-else>
			123
		</view>
	</view>
</template>

<script>
import mixins from '@/mixins/index.js';
export default {
	props: ['id'],
	data() {
		return {
			cid: 0
		};
	},
	mixins: [mixins],
	methods: {
		async fetchData() {
			const {
				data: { records, total }
			} = await this.$api({ url: 'get-contest-rank', data: { ...this.query, cid: this.id, forceRefresh: false }, method: 'get' });
			this.total = total
			this.handleLoadData(records)
		}
	},

	mounted() {
		this.fetchData();
	}
};
</script>

<style lang="scss"></style>

<template>
	<view>
		<t-rank :data="loadList" :showTime="true"></t-rank>
		<t-box :show="!$utils.isEmpty(loadList)" text="暂无排名"><u-loadmore :status="status" @loadmore="loadData" v-if="!$utils.isEmpty(loadList)" /></t-box>
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
			this.total = total;
			this.handleLoadData(records);
		}
	},

	mounted() {
		this.fetchData();
	}
};
</script>

<style lang="scss"></style>

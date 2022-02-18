<template>
	<page class="index"><u-swiper :list="list" indicatorMode="line" keyName="url" :autoplay="false" class="swiper"></u-swiper></page>
</template>

<script>
import $api, { BASE_IMG } from '@/api';
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		// this.fetchData();
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const { data } = await $api({ method: 'get', url: 'home-carousel' });
			this.list = data.map(i => ({
				...i,
				url: BASE_IMG + i.url
			}));
			console.log(this.list);
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	.swiper {
		height: 200rpx;
		border: 2rpx solid #f0f0f0;
		padding: 10rpx;
	}
}
</style>

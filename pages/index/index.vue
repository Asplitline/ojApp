<template>
	<view class="content">首页</view>
</template>

<script>
import $api from '@/api';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const res = await $api({ method: 'get', url: 'get-recent-other-contest' });
			console.log(res);
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>

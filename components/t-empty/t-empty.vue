<template>
	<view class="t-empty">
		<slot>{{ text }}</slot>
	</view>
</template>

<script>
export default {
	name: 't-empty',
	props: {
		text: {
			type: String,
			default: '暂无数据'
		}
	}
};
</script>

<style lang="scss" scoped>
.t-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 300rpx;
	width: 100%;
	background-color: #fafafa;
}
</style>

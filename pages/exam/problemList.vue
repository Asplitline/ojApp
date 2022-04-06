<template>
	<view class="problem-list">
		<view class="problem-item" v-for="(i, idx) in data" :key="i.id" @click="gotoProblem(i)">
			<view class="problem-item__idx">
				<t-icon type="icon-air-ballon" :color="$static.problemFlag[idx].color" fontSize="60rpx"></t-icon>
				<!-- <text :style="{ color: $static.problemFlag[idx].color }">{{ $static.problemFlag[idx].value }}</text> -->
				<text class="text">{{ $static.problemFlag[idx].value }}</text>
			</view>
			<view class="problem-item__title">{{ i.displayTitle }}</view>
			<view class="problem-item__AC">{{ i.ac }} AC</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		gotoProblem(i) {
			uni.navigateTo({
				url: `/pages/exam/examProblemDetail?cid=${i.cid}&displayId=${i.displayId}`
			});
			
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.problem-list {
	padding: 0 20rpx;
	margin-top: 20rpx;
	border-radius: 10rpx;
	background-color: #f8f8f899;
	.problem-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 1rpx dashed #f0f0f0;
		&:last-child {
			border-bottom: none;
		}
		&__idx {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #333;
			.text {
				color: #555;
				font-size: 36rpx;
			}
		}

		&__title {
			font-size: 30rpx;
			color: #555;
		}
		&__AC {
			color: #888;
			font-size: 28rpx;
			letter-spacing: 2rpx;
		}
	}
}
</style>

<template>
	<view>
		<u-navbar :title="problem.title" :autoBack="true" height="44px" class="t-navbar">
		</u-navbar>
		<view class="pd-page t-pg">
			<t-problem :data="problem"></t-problem>
		</view>

	</view>
</template>

<script>
import { exampleStr2Arr } from '@/utils';
import { PROBLEM_LEVEL } from '@/utils/static';
export default {
	data() {
		return {
			// showPopup: false,
			chartData: {
				series: [
					{
						data: [
							{
								name: 'AC',
								value: 50
							},
							{
								name: 'MLE',
								value: 30
							},
							{
								name: 'PA',
								value: 20
							},
							{
								name: 'PE',
								value: 18
							},
							{
								name: 'RE',
								value: 8
							},
							{
								name: 'SE',
								value: 8
							},
							{
								name: 'TLE',
								value: 8
							},
							{
								name: 'WA',
								value: 8
							}
						]
					}
				]
			},
			problem: {},
			problemCount: {},
			PROBLEM_LEVEL,
			payload: {}
		};
	},

	onLoad(payload) {
		this.payload = payload;
	},
	onShow() {
		this.fetchProblemDetail();
	},
	methods: {
		async fetchProblemDetail() {
			const { data } = await this.$api({
				method: 'get',
				url: 'get-contest-problem-details',
				data: { ...this.payload }
			});
			console.log(data);
			this.problem = data.problem;
		},
		gotoMySubmit() {
			uni.navigateTo({
				url: '/pages/problem/mySubmitRecord?id=' + this.id
			});
		}
	},
	computed: {
		examplesArr() {
			return exampleStr2Arr(this.problem.examples);
		}
	}
};
</script>

<style lang="scss" scoped>
.pd-page {
}
.problem-top {
	display: flex;
	padding: 30rpx;
	border-top: 1rpx solid $uni-border-color;
	&__tag {
		display: inline-block;
		background-color: #f5f5f7;
		padding: 6rpx 10rpx;
		border-radius: 8rpx;
		font-size: 26rpx;
		color: $uni-color-success;
		margin-right: 20rpx;
		&.Mid {
			color: $uni-color-warning;
		}
		&.Hard {
			color: $uni-color-error;
		}
	}
	&__num {
		position: relative;
		padding: 0 20rpx;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 20rpx;
			width: 1rpx;
			background-color: $uni-border-color;
		}
		.num {
			font-size: 30rpx;
			font-weight: 700;
		}
		.text {
			margin-left: 16rpx;
			font-size: 28rpx;
			color: $uni-color-grey-dd;
		}
	}
	&__statistic {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
}

.charts-popup {
	position: relative;
	.charts-main {
		padding: 100rpx 0 80rpx;
	}
	.charts-tips {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		.close-icon {
			background-color: #4b55ff;
			border-radius: 50%;
			padding: 10rpx;
		}
	}
}
.link {
	color: $uni-color-primary;
}
</style>

<template>
	<view>
		<u-navbar :title="problem.title" :autoBack="true" height="44px" class="t-navbar">
			<template #right>
				<text class="link" @click="gotoMySubmit">我的提交</text>
			</template>
		</u-navbar>
		<view class="pd-page t-pg">
			<view class="problem-top" v-if="PROBLEM_LEVEL[problem.difficulty]">
				<view class="problem-top__tag" :class="[PROBLEM_LEVEL[problem.difficulty].class]">{{ PROBLEM_LEVEL[problem.difficulty].value }}</view>
				<view class="problem-top__num">
					<text class="num">{{ problemCount.ac }}</text>
					<text class="text">通过</text>
				</view>
				<view class="problem-top__num">
					<text class="num">{{ problemCount.total }}</text>
					<text class="text">提交</text>
				</view>

				<view class="problem-top__statistic"><t-icon @click.native="showChart" type="icon-cq-piechat"></t-icon></view>
			</view>
			<t-problem :data="problem"></t-problem>
			
		</view>
		<u-popup :show="showPopup" class="charts-popup">
			<view class="charts-main">
				<qiun-data-charts style="height: 500rpx;" v-if="problemCount.total" type="pie" :chartData="chartData" :echartsApp="true" background="none" />
				<u-empty text="没有提交记录" v-else></u-empty>
			</view>
			<view class="charts-tips" @click="showPopup = false"><u-icon class="close-icon" name="close" size="24" color="#fff"></u-icon></view>
		</u-popup>
	</view>
</template>

<script>
import { exampleStr2Arr } from '@/utils';
import { PROBLEM_LEVEL } from '@/utils/static';
export default {
	data() {
		return {
			showPopup: false,
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
			id: '',
			problem: {},
			problemCount: {},
			PROBLEM_LEVEL
		};
	},

	onLoad({ id }) {
		console.log(id);
		this.id = id;
	},
	onShow() {
		this.fetchProblemDetail();
	},
	methods: {
		showChart(){
			this.showPopup = true
			// console.log(this.chartData);
		},
		async fetchProblemDetail() {
			const { data } = await this.$api({
				method: 'get',
				url: 'get-problem',
				data: {
					problemId: this.id
				}
			});
			this.problem = data.problem;
			this.problemCount = data.problemCount;
			this.chartData.series[0].data = this.chartData.series[0].data
				.map(i => {
					const key = i.name.toLowerCase();
					const value = data.problemCount[key];
					return {
						...i,
						value
					};
				})
				.filter(i => i.value);
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

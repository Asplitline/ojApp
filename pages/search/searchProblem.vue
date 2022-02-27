<template>
	<t-page class="search-page">
		<view class="search-box">
			<u-search v-model="query.keyword" :showAction="false" height="40" @search="enterSearch" @clear="clear"></u-search>
			<text class="cancel-text" @click="cancel">取消</text>
		</view>
		<view class="problem-list" v-if="problemList.length">
			<view class="problem-item" v-for="i in problemList" :key="i.id" @click="gotoDetail(i)">
				<view class="problem-item__title">
					<text class="tag" :class="[PROBLEM_LEVEL[i.difficulty].class]">{{ PROBLEM_LEVEL[i.difficulty].value }}</text>
					<text class="text">{{ i.title }}</text>
					<view class="no">
						<text class="prefix">No.</text>
						{{ i.problemId }}
					</view>
				</view>
				<view class="problem-item__desc">
					<u-icon name="minus" class="status">-</u-icon>
					<view class="desc">
						<text class="title">提交数</text>
						<text class="num">{{ i.total }}</text>
					</view>
					<view class="desc">
						<text class="title">通过率</text>
						<text class="num">{{ handlePercentage(i.ac, i.total) }}%</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" @loadmore="loadData" />
		</view>
		<u-empty mode="search" class="t-empty" v-if="total === 0"></u-empty>
	</t-page>
</template>

<script>
import { PROBLEM_LEVEL } from '@/utils/static';
export default {
	data() {
		return {
			query: {
				keyword: '',
				currentPage: 1,
				limit: 15,
				oj: 'All',
				difficulty: ''
			},
			status: 'loadmore',
			total: 10,
			problemList: [],
			PROBLEM_LEVEL
		};
	},
	methods: {
		handlePercentage(ac, all) {
			const percentage = (ac / all) * 100;
			if (Number.isNaN(percentage)) return '00.00';
			else return percentage.toFixed(2);
		},
		clear() {
			this.problemList = [];
		},
		loadData() {
			if (this.isFull) return;
			else {
				this.query.currentPage++;
				this.fetchData();
			}
		},
		cancel() {
			uni.switchTab({
				url: '/pages/problem/problem'
			});
		},
		enterSearch() {
			this.problemList = [];
			this.query.currentPage = 1;
			this.fetchData();
		},
		async fetchData() {
			this.status = 'loading';
			const { data } = await this.$api({
				url: 'get-problem-list',
				method: 'get',
				data: this.query
			});
			this.total = data.total;
			if (this.isFull) {
				this.status = 'nomore';
			} else {
				this.problemList.push(...data.records);
				if (this.isFull) this.status = 'nomore';
				else this.status = 'loadmore';
			}
		},
		gotoDetail(i) {
			console.log(i);
			uni.navigateTo({
				url: '/pages/problem/problemDetail?id=' + i.problemId
			});
		}
	},
	computed: {
		isFull() {
			return this.total === this.problemList.length;
		}
	},
	onShow() {
		// this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.search-page {
	padding: 0;
}
.search-box {
	padding: 40rpx 30rpx;
	background-color: #fff;
	border-bottom: 2rpx solid #f0f0f0;
	display: flex;
	align-items: center;
	.cancel-text {
		display: inline-block;
		margin-left: 20rpx;
		color: #666;
	}
}

.problem-list {
	display: flex;
	flex-direction: column;
	padding: 10rpx 20rpx;
	background-color: #fff;

	.problem-item {
		border-bottom: 1rpx dashed #f0f0f0;
		padding: 30rpx 0;
		&:last-child {
			border-bottom-color: transparent;
		}
		&__title {
			position: relative;
			.tag {
				display: inline-block;
				background-color: #f5f5f7;
				padding: 6rpx 10rpx;
				border-radius: 8rpx;
				font-size: 26rpx;
				color: $uni-color-success;
				&.Mid {
					color: $uni-color-warning;
				}
				&.Hard {
					color: $uni-color-error;
				}
			}
			.text {
				font-weight: 700;
				margin-left: 0.5em;
			}
			.no {
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				color: #888;
				font-size: 28rpx;
				.prefix {
					color: #888;
				}
			}
		}
		&__desc {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.status {
				margin-right: 20rpx;
			}
			.desc {
				display: flex;
				position: relative;
				padding: 0 20rpx;
				font-size: 28rpx;
				&::before {
					position: absolute;
					left: 0;
					top: 50%;
					content: '';
					height: 26rpx;
					background: #999999;
					width: 2rpx;
					transform: scaleX(0.5) translateY(-50%);
				}
				.title,
				.num {
					font-size: 26rpx;
					color: #808080;
				}
				.title {
					margin-right: 14rpx;
				}
				.num {
				}
			}
		}
	}
}
</style>

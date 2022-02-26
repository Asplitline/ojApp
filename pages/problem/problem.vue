<template>
	<t-page class="problem-page">
		<view class="top-search">
			<view class="search-box">
				<u-icon name="search" size="22"></u-icon>
				<text class="placeholder">搜索相关文章</text>
			</view>
		</view>
		<view class="center-content">
			<u-tabs class="problem-tabs" :list="PROBLEM_LEVEL_RESERVE" lineWidth="30" lineColor=" #4b55ff" keyName="value" @click="changeTabs">
				<view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')"><u-icon name="list" size="21" bold @click="showPopup"></u-icon></view>
			</u-tabs>
		</view>
		<view class="problem-list">
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
		<u-popup :show="show" :round="10" mode="bottom" class="filter-popup">
			<view class="filter-box">
				<view class="filter-header">
					<text class="reset" @click="resetFilter">重置</text>
					<text class="title">筛选题目</text>
					<text class="confirm" @click="confirmFilter">确定</text>
				</view>
				<view class="filter-list">
					<view class="filter-item">
						<view class="filter-item__title">题库类型</view>
						<t-select :list="REMOTE_OJ" :active.sync="query.oj"></t-select>
					</view>

					<view class="filter-item">
						<view class="filter-item__title">题目标签</view>
						<t-select :list="tags" :active.sync="query.tagId" valName="name" keyName="id"></t-select>
					</view>
				</view>
			</view>
		</u-popup>
	</t-page>
</template>

<script>
import { REMOTE_OJ, PROBLEM_LEVEL, PROBLEM_LEVEL_RESERVE } from '@/utils/static';
export default {
	data() {
		return {
			keyword: null,
			status: 'loadmore',
			query: {
				currentPage: 1,
				limit: 15,
				oj: 'All',
				difficulty: '',
				tagId: ''
			},
			total: 10,
			mulActive: [],
			problemList: [],
			show: false,
			tags: [],
			REMOTE_OJ,
			PROBLEM_LEVEL,
			PROBLEM_LEVEL_RESERVE
		};
	},
	methods: {
		search() {
			console.log('search');
		},
		showPopup() {
			this.show = true;
			this.fetchTags();
		},
		handlePercentage(ac, all) {
			const percentage = (ac / all) * 100;
			if (Number.isNaN(percentage)) return '00.00';
			else return percentage.toFixed(2);
		},
		loadData() {
			if (this.isFull) return;
			else {
				this.query.currentPage++;
				this.fetchProblemList();
			}
		},
		async fetchTags() {
			const { data } = await this.$api({ url: 'get-all-problem-tags', method: 'get' });
			this.tags = data;
		},
		async fetchProblemList() {
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
		initLoad() {
			this.problemList = [];
			this.query.currentPage = 1;
		},
		changeTabs(i) {
			this.initLoad();
			this.query.difficulty = i.key;
			this.fetchProblemList();
		},
		resetFilter() {
			this.initLoad();
			Object.assign(this.query, {
				currentPage: 1,
				limit: 15,
				oj: 'All',
				tagId: ''
			});
			this.show = false;
			this.fetchProblemList();
		},
		confirmFilter() {
			this.show = false;
			this.initLoad();
			this.fetchProblemList();
		},
		gotoDetail(i) {
			console.log(i);
			uni.navigateTo({
				url: 'problemDetail',
				fail: function(res) {
					console.log(res);
				}
			});
		}
	},
	onReachBottom() {
		this.loadData();
	},
	computed: {
		isFull() {
			return this.total === this.problemList.length;
		}
	},
	mounted() {
		this.fetchProblemList();
	}
};
</script>

<style lang="scss" scoped>
.problem-page {
	overflow-y: scroll;
	padding: 0;
	background-color: #fff;
}
.top-search {
	padding: 20rpx 60rpx;

	.search-box {
		display: flex;
		padding: 0 40rpx;
		background-color: #f1f2f6;
		border-radius: 36rpx;
		justify-content: center;
		align-items: center;
		height: 72rpx;
		.placeholder {
			color: #777;
			font-size: 30rpx;
			margin-left: 4rpx;
		}
	}
}

.center-content {
	background-color: #fff;
	padding: 10rpx 20rpx;
	position: sticky;
	top: 0;
	width: 100%;
	background-color: #fff;
	z-index: 998;
	border-bottom: 1rpx solid #f0f0f0;
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
.filter-popup {
}

.filter-box {
	padding: 40rpx 30rpx;
	.filter-header {
		display: flex;
		padding-bottom: 30rpx;
		.reset {
			color: #999;
		}
		.title {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
		}
		.confirm {
			color: $uni-color-primary;
			font-weight: 700;
		}
	}
	.filter-list {
		padding: 0 0 40rpx;
		max-height: 800rpx;
		overflow-y: scroll;
		.filter-item {
			padding-bottom: 30rpx;
			&__title {
				font-weight: 700;
			}
		}
	}
}
</style>

<template>
	<t-page class="problem-page">
		<view class="top-search">
			<view class="search-box">
				<u-icon name="search" size="22"></u-icon>
				<text class="placeholder">搜索相关文章</text>
			</view>
		</view>
		<view class="center-content">
			<u-tabs class="problem-tabs" :list="list4" lineWidth="30" lineColor=" #4b55ff"
				:activeStyle="{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}" :inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				<view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
					<u-icon name="list" size="21" bold @click="showPopup"></u-icon>
				</view>
			</u-tabs>
		</view>
		<view class="problem-list">
			<view class="problem-item" v-for="i in problemList" :key="i.id">
				<view class="problem-item__title">
					<text class="tag">简单</text>
					<text class="text">{{i.title}}</text>
					<view class="no">
						<text class="prefix">No.</text>
						{{i.problemId}}
					</view>
				</view>
				<view class="problem-item__desc">
					<u-icon name="minus" class="status">-</u-icon>
					<view class="desc">
						<text class="title">提交数</text>
						<text class="num">{{i.total}}</text>
					</view>
					<view class="desc">
						<text class="title">通过率</text>
						<text class="num">{{handlePercentage(i.ac,i.total)}}%</text>
					</view>
				</view>
			</view>
		</view>

		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="filter-box">
				<view class="filter-header">
					<text class="reset">重置</text>
					<text class="title">筛选题目</text>
					<text class="confirm" @click="closePopup">确定</text>
				</view>
				<view class="filter-list">
					<view class="filter-item">
						<view class="filter-item__title">题库类型</view>
						<t-select :list="list" :active="active" @change="setActive"></t-select>
					</view>
					<view class="filter-item">
						<view class="filter-item__title">题库类型</view>
						<t-select :list="list1" :active="active" @change="setActive"></t-select>
					</view>
					<view class="filter-item">
						<view class="filter-item__title">筛选状态</view>
						<t-select :list="list2" :active="active" @change="setActive"></t-select>
					</view>
					<view class="filter-item">
						<view class="filter-item__title">筛选状态</view>
						<t-select :list="list3" :active="mulActive" @change="setMulActive"
							:multiple="true"></t-select>
					</view>
				</view>
			</view>
		</u-popup>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			keyword: null,
			list4: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				}
			],
			active: 1,
			mulActive: [],
			problemList: [],
			list: [
				{ id: 1, text: '全部' },
				{ id: 2, text: '简单' },
				{ id: 3, text: '中等' },
				{ id: 4, text: '困难' }
			],
			list1: [
				{ id: 1, text: '全部' },
				{ id: 2, text: '简单简单' },
				{ id: 3, text: '中等中等' },
				{ id: 4, text: '困难困难' },
				{ id: 5, text: '困难困难' },
				{ id: 6, text: '困难困难' },
				{ id: 7, text: '困难困难' }
			],
			list2: [
				{ id: 1, text: '全部' },
				{ id: 2, text: '未做' },
				{ id: 3, text: '已解答' },
				{ id: 4, text: '尝试过' }
			],
			list3: [
				{ id: 1, text: '全部' },
				{ id: 2, text: '未做' },
				{ id: 3, text: '已解答' },
				{ id: 4, text: '尝试过' },
				{ id: 5, text: '尝试过' },
				{ id: 6, text: '尝试过' },
				{ id: 7, text: '尝试过' },
				{ id: 8, text: '尝试过' },
				{ id: 9, text: '尝试过' },
				{ id: 10, text: '尝试过' },
				{ id: 11, text: '尝试过' }
			],
			show: false
		}
	},
	methods: {
		search() {
			console.log('search')
		},
		showPopup() {
			this.show = true
		},
		closePopup() {
			this.show = false
		},
		setActive(v) {
			this.active = v.id
		},
		setMulActive(v) {
			this.mulActive = v
			console.log(v)
		},
		handlePercentage(ac, all) {
			const percentage = (ac / all) * 100
			if (Number.isNaN(percentage)) return '00.00'
			else return percentage.toFixed(2)
		},
		async fetchProblemList() {
			const { data } = await this.$api({
				url: 'get-problem-list',
				method: 'get'
			})
			console.log(data.total)
			this.problemList = data.records
			console.log(this.problemList)
		}
	},
	mounted() {
		this.fetchProblemList()
	}
}
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
				padding: 4rpx 8rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				color: $uni-color-success;
				&.medium {
					color: $uni-color-warning;
				}
				&.difficult {
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

.filter-box {
	padding: 40rpx 30rpx;
	.filter-header {
		display: flex;
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
		padding: 40rpx 0;
		.filter-item {
			padding-bottom: 30rpx;
			&__title {
				font-weight: 700;
			}
		}
	}
}
</style>

<template>
	<t-page class="problem-page">
		<view class="top-search">
			<u-search v-model="keyword" placeholder="搜索题目" :height="38" :showAction="false"
				@search="search" class="top-search-ipt" bgColor="#e8e7ea"></u-search>
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
			<view class="problem-list">
				<view class="problem-item" v-for="i in 8">
					<view class="problem-item__title">
						<text class="tag">简单</text>
						<text class="text">两数之和</text>
						<view class="no">
							<text class="prefix">No.</text>
							1000
						</view>
					</view>
					<view class="problem-item__desc">
						<u-icon name="minus" class="status">-</u-icon>
						<view class="desc">
							<text class="title">提交数</text>
							<text class="num">1000</text>
						</view>
						<view class="desc">
							<text class="title">通过率</text>
							<text class="num">52%</text>
						</view>
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
						<t-select :list="list2" :active="active" @change="setActive">
						</t-select>
					</view>
					<view class="filter-item">
						<view class="filter-item__title">筛选状态</view>
						<t-select :list="list3" :active="mulActive" @change="setMulActive"
							:multiple="true">
						</t-select>
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
			show: true
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
		}
	}
}
</script>

<style lang="scss" scoped>
.problem-page {
	overflow-y: scroll;
	padding: 0;
}
.top-search {
	position: sticky;
	top: 0;
	z-index: 999;
	padding: 40rpx;
	background-color: #f6f6f6;
}

.center-content {
	background-color: #fff;
	height: 100%;
	padding: 0 20rpx;
	.problem-tabs {
		position: sticky;
		top: 160rpx;
		background-color: #fff;
		z-index: 998;
	}
	.problem-list {
		display: flex;
		flex-direction: column;
		padding: 40rpx 0;
		background-color: #fff;

		.problem-item {
			margin-bottom: 40rpx;
			&:last-child {
				margin-bottom: 0;
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

<template>
	<t-page class="discuss-page">
		<view class="top-search">
			<view class="search-box">
				<u-icon name="search" size="22"></u-icon>
				<text class="placeholder" @click="searchPage">搜索相关文章</text>
			</view>
		</view>
		<view class="center-tabs"><u-tabs :list="category" @click="setActive"></u-tabs></view>
		<t-box text="暂无讨论" :show="total > 0">
			<view class="discuss-list">
				<view class="discuss-item" v-for="(i,idx) in loadList" :key="idx" @click="gotoDetail(i)">
					<view class="discuss-item-header">
						<image :src="`${$imgUrl}${i.avatar}`" mode="" class="discuss-item__avatar" v-if="i.avatar"></image>
						<view class="discuss-item__first" v-else>{{ i | firstName }}</view>
						<view class="discuss-item__title">
							<text class="text">{{ i.title }}</text>
							<text class="date">刚刚</text>
						</view>
					</view>
					<view class="discuss-item-content">
						<view class="desc">{{ i.description }}</view>
						<view class="tool">
							<view class="thumb tool-box">
								<u-icon name="thumb-up" color="#4b55ff" size="20"></u-icon>
								<text class="text">{{ i.likeNum }}</text>
							</view>
							<text class="spot">·</text>
							<view class="reply tool-box">
								<text class="title">回复</text>
								<text class="text">{{ i.commentNum }}</text>
							</view>
							<text class="spot">·</text>
							<view class="view tool-box">
								<text class="title">浏览量</text>
								<text class="text">{{ i.viewNum }}</text>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadData" />
			</view>
		</t-box>
	</t-page>
</template>

<script>
import mixins from '@/mixins';
export default {
	data() {
		return {
			category: [],
			query: {
				currentPage: 1,
				limit: 15,
				keyword: '',
				cid: null
			}
		};
	},
	mixins: [mixins],
	filters: {
		firstName(v) {
			return v.author.slice(0, 1);
		}
	},
	methods: {
		async fetchCategory() {
			const { data } = await this.$api({ url: 'discussion-category', method: 'get' });
			data.unshift({
				id: 0,
				name: '全部'
			});
			this.category = data;
		},
		async fetchData() {
			this.status = 'loading';
			const { data } = await this.$api({ url: 'discussions', method: 'get', data: this.query });
			this.total = data.total;
			this.handleLoadData(data.records);
		},
		setActive(v) {
			this.query.cid = v.id === 0 ? '' : v.id;
			this.query.currentPage = 1;
			this.loadList = [];
			this.fetchData();
		},

		gotoDetail(i) {
			uni.navigateTo({
				url: '/pages/discuss/discussDetail?id=' + i.id
			});
		},
		searchPage() {
			uni.navigateTo({
				url: '/pages/search/searchDiscuss'
			});
		}
	},
	onShow() {
		this.fetchCategory();
		this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.discuss-page {
	padding: 0;
	background-color: #fff;
	overflow-y: scroll;
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
.center-tabs {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	background-color: #fff;
	z-index: 999;
	border-bottom: 1rpx solid #f0f0f0;
}
.discuss-list {
	padding: 20rpx 0;
	background-color: #f9f9fb;
	.discuss-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx 16rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		&-header {
			display: flex;
			align-items: center;
		}
		&__avatar {
			width: 90rpx;
			height: 90rpx;
			background-color: #fff;
			border-radius: 50%;
			padding: 12rpx;
			margin-right: 10rpx;
		}
		&__first {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background-color: $uni-color-primary;
			font-size: 36rpx;
			color: $uni-color-white;
			margin-right: 10rpx;
		}

		&__title {
			display: flex;
			flex-direction: column;
			flex: 1;
			.text {
				font-weight: 700;
				width: 600rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.date {
				color: $uni-color-grey;
				font-size: 28rpx;
				margin-top: 8rpx;
			}
		}
		&-content {
			.desc {
				color: $uni-color-grey-dd;
				font-size: 30rpx;
				// line-height: 1.5;
				// padding: 20rpx 0;
				margin: 20rpx 0;
				letter-spacing: 2rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.tool {
				display: flex;
				align-items: center;
				color: $uni-color-grey-d;
				&-box {
					color: $uni-color-grey-d;
					font-size: 28rpx;
					&.thumb {
						display: flex;
						align-items: center;
					}
					.title {
						padding-right: 140rpx;
						margin-right: 10rpx;
					}
					.text {
						font-size: 26rpx;
					}
				}
				.spot {
					margin: 0 20rpx;
				}
			}
		}
	}
}
</style>

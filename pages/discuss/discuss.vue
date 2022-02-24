<template>
	<t-page class="discuss-page">
		<view class="top-search">
			<view class="search-box">
				<u-icon name="search" size="22"></u-icon>
				<text class="placeholder">搜索相关文章</text>
			</view>
		</view>
		<view class="center-tabs"><u-tabs :list="list1" ></u-tabs></view>
		<view class="discuss-list">
			<view class="discuss-item" v-for="i in 10" :key="i">
				<view class="discuss-item-header">
					<image src="/static/rank1.png" mode="" class="discuss-item__avatar"></image>
					<view class="discuss-item__title">
						<text class="text">如何在「求职面试」中发布一篇帖子?如何在「求职面试」中发布一篇帖子?</text>
						<text class="date">刚刚</text>
					</view>
				</view>
				<view class="discuss-item-content">
					<view class="desc">
						星光不问赶路人，时光不负有心人星光不问赶路人，时光不负有心人星光不问赶路人，时光不负有心人星光不问赶路人，时光不负有心人星光不问赶路人，时光不负有心人
					</view>
					<view class="tool">
						<view class="thumb tool-box">
							<u-icon name="thumb-up" color="#4b55ff" size="20"></u-icon>
							<text class="text">12</text>
						</view>
						<text class="spot">·</text>
						<view class="reply tool-box">
							<text class="title">回复</text>
							<text class="text">12</text>
						</view>
						<text class="spot">·</text>
						<view class="view tool-box">
							<text class="title">浏览量</text>
							<text class="text">12</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			list1: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '电影'
				},
				{
					name: '科技'
				},
				{
					name: '音乐'
				},
				{
					name: '美食'
				},
				{
					name: '文化'
				},
				{
					name: '财经'
				},
				{
					name: '手工'
				}
			]
		};
	},
	methods: {}
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

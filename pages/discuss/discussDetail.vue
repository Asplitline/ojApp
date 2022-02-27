<template>
	<view class="discuss-detail-page">
		<u-navbar title="" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="discuss-detail">
			<view class="discuss-detail__title">经验分享 啊实打实大苏打的青蛙打网球单位签订</view>
			<view class="discuss-detail__author">
				<image src="../../static/logo.png" mode="" class="avatar"></image>
				<view class="author">
					<text class="name">你好啊</text>
					<view class="box">
						<text class="views">2356 阅读</text>
						·
						<text class="date">刚刚</text>
					</view>
				</view>
			</view>
			<view class="discuss-detail__content"><rich-text nodes="<h1>1231<h2>"></rich-text></view>
			<view class="bottom-tools">
				<view class="bottom-tool">
					<u-icon name="home" class="bottom-tool__icon"></u-icon>
					<text class="bottom-tool__num">12</text>
				</view>
		<!-- 		<view class="bottom-tool">
					<u-icon name="home" class="bottom-tool__icon"></u-icon>
					<text class="bottom-tool__num">12</text>
				</view> -->
				<view class="bottom-tool">
					<u-icon name="home" class="bottom-tool__icon"></u-icon>
					<text class="bottom-tool__num">12</text>
				</view>
				<view class="bottom-input">说点什么把....</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.discuss-detail-page {
	.t-navbar {
		height: 44px;
	}
	.discuss-detail {
		padding: 0 30rpx 30rpx;
		&__title {
			font-size: 40rpx;
			line-height: 1.5;
			font-weight: 700;
		}
		&__author {
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			.avatar {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
				border-radius: 50%;
			}
			.box {
				.views,
				.date {
					color: #808080;
				}
				.views {
					font-size: 28rpx;
					margin-right: 10rpx;
				}
				.date {
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom-tools {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		padding: 0 40rpx;
		.bottom-tool {
			&__icon {
			}
			&__num {
				font-size: 26rpx;
			}
		}
		.bottom-input {
			width: 400rpx;
			background-color: #F0F0F0;
			height: 72rpx;
			text-align: center;
			line-height: 72rpx;
			color: #808080;
			border-radius: 36rpx;
			font-size: 28rpx;
		}
	}
}
</style>

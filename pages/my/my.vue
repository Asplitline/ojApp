<template>
	<t-page class="info-page">
		<view class="top-box">
			<view class="top-box__left">
				<image src="../../static/logo.png" mode="" class="avatar"></image>
				<view class="edit-box"><u-icon class="edit-icon" name="edit-pen-fill"></u-icon></view>
			</view>
			<view class="top-box__center">
				<text class="title">1020.524</text>
				<text class="desc">未填写</text>
			</view>
			<view class="top-box__right">
				个人主页
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="bottom-box">
			<view class="bottom-box__info">
				<view class="info-card">
					<text class="title">通过率</text>
					<text class="text">
						88.55
						<text class="unit">%</text>
					</text>
				</view>
				<view class="info-card">
					<text class="title cf">Codeforces</text>
					<text class="text">1355</text>
				</view>
			</view>
			<view class="bottom-box__list">
				<view class="bottom-box__item" v-for="i in list" :key="i.id">
					<u-icon class="item-icom" :name="i.icon" :size="26" :color="i.color"></u-icon>
					<text class="item-title">{{ i.text }}</text>
					<u-icon class="item-arrorw" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ text: '做题记录', id: 1, icon: 'coupon', color: '#1879fe' },
				{ text: '我的资料', id: 2, icon: 'account', color: '#ff9d0d' },
				{ text: '修改密码', id: 3, icon: 'lock', color: '#0bb6a3' },
				{ text: '邮箱修改', id: 4, icon: 'email', color: '#685dc5' },
				{ text: '设置', id: 5, icon: 'setting', color: '#8d8d8d' }
			]
		};
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	overflow: hidden;
}
.info-page {
	background-color: $uni-bg-color;
	height: 100%;
	.top-box {
		color: #000;
		display: flex;
		align-items: center;
		padding: 20rpx;
		&__left {
			position: relative;
			.avatar {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
			}
			.edit-box {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				.edit-icon {
					font-size: 32rpx;
				}
			}
		}
		&__center {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 30rpx;
			.title {
				font-size: 40rpx;
			}
			.desc {
				font-size: 28rpx;
				color: #666;
			}
		}
		&__right {
			display: flex;
			color: #777;
			font-size: 26rpx;
		}
	}
	.bottom-box {
		height: 100%;
		// margin: 0 -20rpx 0;
		padding: 40rpx 30rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		&__info {
			display: flex;
			.info-card {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				justify-content: space-between;
				width: 48%;
				padding: 40rpx;
				background-color: #f9f9f9;
				border-radius: 40rpx;
				margin-right: 2%;
				&:last-child {
					margin-right: 0;
				}
				.title {
					font-size: 36rpx;
					margin-bottom: 30rpx;
					color: $uni-color-success;
					font-weight: 700;
					letter-spacing: 2rpx;
					&.cf {
						color: #685dc5;
					}
				}
				.text {
					font-size: 30rpx;
					font-weight: 700;
					.unit {
						margin-left: 12rpx;
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}
		&__list {
			padding: 40rpx 0;
		}

		&__item {
			display: flex;
			align-items: center;
			height: 80rpx;

			.item-title {
				margin-left: 20rpx;
				flex: 1;
				letter-spacing: 2rpx;
				color: #444;
			}
		}
	}
}
</style>

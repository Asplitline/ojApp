<template>
	<t-page class="info-page" v-show="show">
		<view class="top-box">
			<view class="top-box__left" @click="gotoEdit">
				<image :src="user.avatar ? `${$imgUrl}${user.avatar}` : '../../static/logo.png'" mode="" class="avatar"></image>
				<view class="edit-box"><u-icon class="edit-icon" name="edit-pen-fill"></u-icon></view>
			</view>
			<view class="top-box__center">
				<text class="title">{{ user.username }}</text>
				<text class="desc">{{ user.signature || '未填写' }}</text>
			</view>
			<view class="top-box__right" @click="goto('/pages/my/infoCenter')">
				个人主页
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="bottom-box">
			<view class="bottom-box__info">
				<view class="info-card">
					<text class="title cf">提交数</text>
					<text class="text">{{ userInfo.solvedList ? userInfo.solvedList.length : 0 }}</text>
				</view>
				<view class="info-card">
					<text class="title">通过率</text>
					<text class="text">
						{{ percentage }}
						<text class="unit">%</text>
					</text>
				</view>
			</view>
			<view class="bottom-box__list">
				<view class="bottom-box__item" v-for="i in list" :key="i.id" @click="goto(i.url)">
					<u-icon class="item-icom" :name="i.icon" :size="26" :color="i.color"></u-icon>
					<text class="item-title">{{ i.text }}</text>
					<u-icon class="item-arrorw" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<u-popup :show="showPopup" :round="10" mode="bottom">
			<view class="t-popup"><button class="btn" @click="logout">退出登录</button></view>
		</u-popup>
	</t-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			isLogin: false,
			list: [
				{ text: '做题记录', id: 1, icon: 'coupon', color: '#1879fe', url: '/pages/my/problemRecord' },
				{ text: '我的资料', id: 2, icon: 'account', color: '#ff9d0d', url: '/pages/my/myInfo' },
				{ text: '修改密码', id: 3, icon: 'lock', color: '#0bb6a3', url: '/pages/my/modifyPassword' },
				{ text: '邮箱修改', id: 4, icon: 'email', color: '#685dc5', url: '/pages/my/modifyEmail' },
				{ text: '退出用户', id: 5, icon: 'setting', color: '#8d8d8d', url: '' }
			],
			userInfo: {},
			show: false,
			showPopup: false
		};
	},
	methods: {
		async fetchUserInfo() {
			const { data } = await this.$api({
				url: 'get-user-home-info',
				method: 'get',
				data: {
					uid: this.user.uid
				}
			});
			this.userInfo = data;
		},
		gotoEdit() {
			uni.navigateTo({
				url: '/pages/my/myInfo'
			});
		},
		goto(url) {
			if (url === '') {
				this.showPopup = true;
			} else {
				uni.navigateTo({
					url
				});
			}
		},
		logout() {
			uni.clearStorageSync();
			uni.switchTab({
				url: '/pages/index/index'
			});
			this.showPopup = false;
		}
	},
	computed: {
		...mapState(['user', 'token']),
		percentage() {
			if (this.userInfo.solvedList) {
				const v = (this.userInfo.solvedList.length / this.userInfo.total) * 100;
				return Number.isNaN(v) ? 0 : v.toFixed(2);
			} else {
				return 0;
			}
		}
	},
	onShow() {
		if (this.token?.length > 0) {
			this.show = true;
			this.fetchUserInfo();
		} else {
			this.show = false;
			uni.navigateTo({
				url: '/pages/login/login'
			});
		}
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
.t-popup {
	padding: 100rpx 40rpx;
	.btn {
		width: 200rpx;
		outline: none;
		font-size: 28rpx;
		color: $u-error;
		border: 1px solid $u-error;
		background-color: #fff;
	}
}
</style>

<template>
	<t-page class="entry-page">
		<u-toast ref="uToast"></u-toast>
		<t-icon type="icon-Close" class="close-page" @click.native="back"></t-icon>
		<view class="entry-box" v-if="active === 'login'">
			<view class="top-banner">登录你的用户吧</view>
			<view class="entry-form">
				<u-input type="text" placeholder="用户名" class="entry-ipt" v-model="login.username" />
				<u-input type="password" placeholder="密码" class="entry-ipt" v-model="login.password" />
				<button class="entry-btn">登录</button>
				<view class="entry-link">
					<text class="forget link" @click="setActive('forget')">忘记密码?</text>
					<text class="register link" @click="setActive('register')">注册账号</text>
				</view>
			</view>
		</view>
		<view class="entry-box" v-else-if="active === 'forget'">
			<view class="top-banner">重置密码</view>
			<view class="entry-form">
				<u-input type="text" placeholder="电子邮箱" class="entry-ipt" />
				<u-input type="password" placeholder="验证码" class="entry-ipt" />
				<button class="entry-btn">获取验证码</button>
				<view class="entry-link" @click="setActive('login')"><text class="back link" @click="setActive('forget')">返回</text></view>
			</view>
		</view>
		<view class="entry-box" v-else-if="active === 'register'">
			<view class="top-banner">注册账号</view>
			<view class="entry-form">
				<u-input type="text" placeholder="用户名" class="entry-ipt" />
				<u-input type="text" placeholder="用户密码" class="entry-ipt" />
				<u-input type="text" placeholder="再次输入密码" class="entry-ipt" />
				<u-input type="text" placeholder="电子邮箱" class="entry-ipt" />
				<u-input type="password" placeholder="验证码" class="entry-ipt" />
				<button class="entry-btn">获取验证码</button>
				<view class="entry-link" @click="setActive('login')"><text class="back link" @click="setActive('forget')">返回</text></view>
			</view>
		</view>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			active: 'login',
			code: ''
		};
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		setActive(active) {
			console.log(active);
			this.active = active;
		},
		showToast(message){
			this.$refs.uToast.show({message})
		},
		login() {
			if(this.$utils.isEmpty()){}
			// if()
		}
	}
};
</script>

<style lang="scss" scoped>
.entry-page {
	position: relative;
	background-color: #fefefe;
	.close-page {
		position: absolute;
		right: 50rpx;
		top: 50rpx;
	}
	.entry-box {
		margin-top: 80rpx;
		padding: 20rpx 30rpx;
		.top-banner {
			padding: 100rpx 0 40rpx;
			font-size: 54rpx;
			position: relative;
			&::before {
				content: 'WELCOME';
				position: absolute;
				font-weight: 700;
				top: 0;
				font-size: 80rpx;
				color: #ddd;
			}
		}
		.entry-form {
			padding: 20rpx 0;
			.entry-ipt {
				padding: 16rpx 30rpx !important;
				background-color: #fafafa;
				margin-bottom: 40rpx;
			}
			.entry-btn {
				height: 76rpx;
				line-height: 76rpx;
				border-radius: 38rpx;
				font-size: 30rpx;
				background-color: $uni-color-primary;
				color: #fff;
				&::after,
				&::before {
					display: none;
				}
			}
			.entry-link {
				display: flex;
				justify-content: space-between;
				padding-top: 40rpx;
				.link {
					font-size: 32rpx;
					text-decoration: underline;
					color: #666;
					letter-spacing: 2rpx;
					&.back {
						margin-left: auto;
					}
				}
			}
		}
	}
}
</style>

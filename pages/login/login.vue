<template>
	<t-page class="entry-page">
		<u-toast ref="uToast"></u-toast>
		<t-icon type="icon-Close" class="close-page" @click.native="back"></t-icon>
		<view class="entry-box" v-if="active === 'login'">
			<view class="top-banner">登录你的用户吧</view>
			<view class="entry-form">
				<u-input type="text" placeholder="用户名" class="entry-ipt" v-model="loginForm.username" />
				<u-input type="password" placeholder="密码" class="entry-ipt" v-model="loginForm.password" />
				<button class="entry-btn" @click="login">登录</button>
				<view class="entry-link">
					<text class="forget link" @click="setActive('forget')">忘记密码?</text>
					<text class="register link" @click="setActive('register')">注册账号</text>
				</view>
			</view>
		</view>
		<view class="entry-box" v-else-if="active === 'forget'">
			<view class="top-banner">重置密码</view>
			<view class="entry-form">
				<u-input type="text" placeholder="电子邮箱" class="entry-ipt" v-model="resetForm.email" />
				<u-input type="password" placeholder="验证码" class="entry-ipt" v-model="resetForm.code" />
				<button class="entry-btn">获取验证码</button>
				<view class="entry-link" @click="setActive('login')"><text class="back link" @click="setActive('forget')">返回</text></view>
			</view>
		</view>
		<view class="entry-box" v-else-if="active === 'register'">
			<view class="top-banner">注册账号</view>
			<view class="entry-form">
				<u-input type="text" placeholder="用户名" class="entry-ipt" v-model="registerForm.username" />
				<u-input type="password" placeholder="用户密码" class="entry-ipt" v-model="registerForm.password" />
				<u-input type="password" placeholder="再次输入密码" class="entry-ipt" v-model="registerForm.passwordAgain" />
				<view class="entry-form-item">
					<u-input type="text" placeholder="电子邮箱" class="entry-ipt" v-model="registerForm.email" />
					<text class="check-code" @click="getCheckCode" :class="{ 'disabled-event': isClick }">{{ isClick ? timer + 's' : '获取验证码' }}</text>
				</view>
				<u-input type="password" placeholder="验证码" class="entry-ipt" v-model="registerForm.code" />
				<button class="entry-btn" @click="handleRegister">注册</button>
				<view class="entry-link" @click="setActive('login')"><text class="back link" @click="setActive('forget')">返回</text></view>
			</view>
		</view>
	</t-page>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			active: 'login',
			code: '',
			loginForm: {},
			resetForm: {},
			registerForm: {},
			isClick: false,
			timer: 60
		};
	},
	methods: {
		...mapMutations(['setUser', 'setToken']),
		back() {
			uni.switchTab({
				url: '/pages/my/my'
			});
		},
		goHome(){
			uni.switchTab({
				url:''
			})
		},
		setActive(active) {
			console.log(active);
			this.active = active;
		},
		showToast(message) {
			this.$refs.uToast.show({ message });
		},
		validateEmail(v) {
			const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (v == null || v.trim().length === 0) {
				this.showToast('邮箱不能为空');
			} else if (reg.test(v)) {
				return true;
			} else {
				this.showToast('邮箱格式错误');
				return false;
			}
		},
		async getCheckCode() {
			if (!this.validateEmail(this.registerForm.email)) return;
			const { msg, status } = await this.$api({
				url: 'get-register-code',
				method: 'get',
				data: {
					email: this.registerForm.email
				}
			});
			this.showToast(msg);
			if (status === 200) {
				this.isClick = true;
				this.startTime();
			}
		},
		startTime() {
			const timerId = setInterval(() => {
				this.timer--;
				if (this.timer === 0) {
					clearInterval(timerId);
					this.timer = 60;
					this.isClick = false;
				}
			}, 1000);
		},
		async validateEmailAndUsername() {
			const res = await this.$api({
				url: 'check-username-or-email',
				data: {
					username: this.registerForm.username,
					email: this.registerForm.email
				}
			});
			console.log(res);
		},
		async login() {
			if (this.$utils.isEmpty(this.loginForm.username)) {
				return this.showToast('用户名不能为空');
			}
			if (this.$utils.isEmpty(this.loginForm.password)) {
				return this.showToast('密码不能为空');
			}

			const {
				data: { status, msg, data },
				header: { authorization }
			} = await this.$api({ url: 'login', data: this.loginForm, all: true });
			status === 400 && this.showToast(msg);
			if (status === 200) {
				this.setUser(data);
				this.setToken(authorization)
				this.back();
			}
			// if()
		},
		async handleRegister() {
			if (this.$utils.isEmpty(this.registerForm.username)) {
				return this.showToast('用户名不能为空');
			}
			if (this.$utils.isEmpty(this.registerForm.password)) {
				return this.showToast('密码不能为空');
			}
			if (this.$utils.isEmpty(this.registerForm.passwordAgain)) {
				return this.showToast('请再次输入密码');
			}
			if (this.registerForm.password.length < 6 || this.registerForm.password.length > 20) {
				return this.showToast('密码长度应该为6~20位！');
			}
			if (this.registerForm.passwordAgain !== this.registerForm.password) {
				return this.showToast('两次密码不一致');
			}
			if (!this.validateEmail(this.registerForm.email)) {
				return;
			}
			if (this.$utils.isEmpty(this.registerForm.code)) {
				return this.showToast('请输入验证码');
			}
			const { status, msg } = await this.$api({ url: 'register', method: 'post', data: this.registerForm });
			if (status === 200) {
				this.showToast('注册成功');
				this.setActive('login');
			} else {
				this.showToast(msg);
			}
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
			.entry-form-item {
				position: relative;
				.check-code {
					position: absolute;
					top: 50%;
					right: 40rpx;
					transform: translateY(-50%);
					color: $uni-color-primary;
				}
			}
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

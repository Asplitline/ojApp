<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-navbar title="修改邮箱" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="me-page">
			<view class="me-box">
				<u--form labelPosition="left" :model="emailInfo" :rules="rules" ref="emailInfo" labelWidth="80" class="me-form">
					<u-form-item label="旧邮箱" borderBottom class="me-form-item"><u--input v-model="user.email" border="none" readonly></u--input></u-form-item>
					<u-form-item label="新邮箱" prop="newEmail" borderBottom class="me-form-item"><u--input v-model="emailInfo.newEmail" border="none"></u--input></u-form-item>
					<u-form-item label="密码" prop="password" borderBottom class="me-form-item"><u--input v-model="emailInfo.password" type="password" border="none"></u--input></u-form-item>
				</u--form>
				<view class="me-btns">
					<u-button class="me-btn reset" type="info" @click="resetForm">重置</u-button>
					<u-button class="me-btn" type="success" @click="handleSubmit">更新</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			emailInfo: {
				newEmail: '',
				password: ''
			},
			rules: {
				newEmail: [
					{
						required: true,
						message: '请输入新电子邮箱',
						trigger: 'blur'
					},
					{
						validator: (rule, value) => {
							const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							if (!reg.test(value)) {
								return new Error('邮箱格式错误');
							}
						},
						trigger: 'blur'
					},
					{
						asyncValidator: (rule, value) => {
							const promise = this.$api({
								url: 'check-username-or-email',
								data: {
									email: this.emailInfo.newEmail
								}
							});
							return new Promise((resolve, reject) => {
								promise
									.then(({ data }) => {
										if (data.email) {
											reject('邮箱已被绑定');
										} else {
											resolve();
										}
									})
									.catch(err => {
										reject('未知错误');
									});
							});
						},
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {
		...mapState(['user'])
	},
	onShow() {},
	methods: {
		...mapActions(['updateUser']),
		resetForm() {
			this.$refs.emailInfo.resetFields();
		},
		showToast(message) {
			this.$refs.uToast.show({ message });
		},
		handleSubmit() {
			this.$refs.emailInfo.validate().then(async v => {
				console.log(v);
				const { status, msg } = await this.$api({
					url: 'change-email',
					data: { ...this.emailInfo, oldEmail: this.user.email }
				});
				if (status === 200) {
					this.updateUser();
					this.resetForm();
					console.log(this.user.email);
					this.$set(this.emailInfo, 'oldEmail', this.user.email);
					// this.emailInfo.oldEmail = this.user.email
				}
				this.showToast(msg);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.me-box {
	padding: 140rpx 40rpx 0;
}
.me-form {
	::v-deep.me-form-item {
		.u-form-item__body {
			padding: 40rpx 0;
		}
	}
}
.me-btns {
	display: flex;
	justify-content: space-evenly;
	.me-btn {
		margin: 0;
		margin-top: 40rpx;
		background-color: $uni-color-primary;
		color: #fff;
		height: 72rpx;
		width: 240rpx;
		&.reset {
			background-color: #f3f5f7;
			color: #666;
		}
		&::before {
			border: none;
		}
		&::after {
			border: none;
		}
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>

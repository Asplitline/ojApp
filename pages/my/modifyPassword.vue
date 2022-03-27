<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-navbar title="修改密码" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="mp-page t-pg">
			<view class="mp-box">
				<u--form labelPosition="left" :model="passwordInfo" :rules="rules" ref="passwordInfo" labelWidth="80" class="mp-form">
					<u-form-item label="当前密码" prop="oldPassword" borderBottom class="mp-form-item">
						<u--input v-model="passwordInfo.oldPassword" border="none" type="password"></u--input>
					</u-form-item>
					<u-form-item label="新密码" prop="newPassword" borderBottom class="mp-form-item">
						<u--input v-model="passwordInfo.newPassword" border="none" type="password"></u--input>
					</u-form-item>
					<u-form-item label="确定新密码" prop="againPassword" borderBottom class="mp-form-item">
						<u--input v-model="passwordInfo.againPassword" type="password" border="none"></u--input>
					</u-form-item>
				</u--form>
				<view class="mp-btns">
					<u-button class="mp-btn reset" type="info" @click="resetForm">重置</u-button>
					<u-button class="mp-btn" type="success" @click="handleSubmit">修改密码</u-button>
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
			passwordInfo: {
				oldPassword: '',
				newPassword: '',
				againPassword: ''
			},
			rules: {
				oldPassword: [
					{
						required: true,
						message: '请输入当前密码',
						trigger: 'blur'
					}
				],
				newPassword: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}
				],
				againPassword: [
					{
						required: true,
						message: '再次输入新密码',
						trigger: 'blur'
					},
					{
						validator: (rule, value, v) => {
							if (value && this.passwordInfo.newPassword !== value) {
								return new Error('两次密码不一致');
							}
						},
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {
		...mapState(['user'])
	},
	onShow() {
		this.passwordInfo.oldEmail = this.user.email;
	},
	methods: {
		resetForm() {
			this.$refs.passwordInfo.resetFields();
		},
		showToast(message) {
			this.$refs.uToast.show({ message });
		},
		handleSubmit() {
			this.$refs.passwordInfo.validate().then(async v => {
				const {
					status,
					msg,
					data: { code }
				} = await this.$api({
					url: 'change-password',
					data: this.passwordInfo
				});
				if (code === 200) {
					this.resetForm();
				}
				this.showToast(msg);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mp-box {
	padding: 0 40rpx 0;
}
.mp-form {
	::v-deep.mp-form-item {
		.u-form-item__body {
			padding: 40rpx 0;
		}
	}
}
.mp-btns {
	display: flex;
	justify-content: space-evenly;
	.mp-btn {
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

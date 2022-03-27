<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-navbar title="" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="cd-page t-pg">
			<view class="cd-main">	
			<view class="cd-title mb">	
				<text class="title">代码分享</text>	
				<u-switch v-model="isPublic" :size="20" @change="changeIsPublic"></u-switch>	
			</view>	
			<view class="error-detail" v-if="JUDGE_STATUS[detail.status]">	
				<pre class="error-box" :style="{ color: 'white', background: JUDGE_STATUS[detail.status].rgb }">
            {{ detail.errorMessage }}
        </pre
					>
					<!-- <u-alert title="123" type="warning" effect="light" :description="detail.errorMessage"></u-alert> -->	
			</view>

				<view class="cd-title" v-if="testNum !== '-'">	
				<text class="title">测试点</text>
					<!-- <t-icon type="icon-chenggongtishi"></t-icon>  -->	
				<text class="number">{{ testSuccessNum }}/{{ testNum }}</text>
				</view>	
			<view class="test-list" v-if="testNum !== '-'">
					<view class="test-item" v-for="(i, idx) in testList" :key="i.id">	
					<view class="test-item__title">
							<text class="title">#{{ idx + 1 }}</text>	
						<t-icon :type="i.status === 0 ? 'icon-chenggongtishi' : 'icon-error1'" fontSize="32rpx" :color="JUDGE_STATUS[i.status].color"></t-icon>
						</view>	
					<text class="status-text">{{ JUDGE_STATUS[i.status].short }}</text>	
				</view>	
			</view>	
			<view class="cd-title">	
				<text class="title">代码</text>	
				<view class="link" @click="copy">
						<t-icon type="icon-list-copy"></t-icon>	
						
				</view>	
			</view>	
			<view class="code-main"><t-hljs :code="detail.code" :language="detail.language"></t-hljs></view>	
		</view>
		</view>
	</view>
</template>

<script>
import { JUDGE_STATUS } from '@/utils/static';
export default {
	data() {
		return {
			id: -1,
			detail: {},
			isPublic: false,
			testList: [],
			JUDGE_STATUS
		};
	},
	methods: {
		async fetchCodeDetail() {
			const {
				data: { submission, codeShare }
			} = await this.$api({ url: 'submission', method: 'get', data: { submitId: this.id } });
			this.detail = submission;
			this.isPublic = submission.share;
		},
		async fetchAllCase() {
			const { data } = await this.$api({ url: 'get-all-case-result', method: 'get', data: { submitId: this.id } });
			console.log(data);
			this.testList = data;
		},
		async changeIsPublic(e) {
			const { msg } = await this.$api({
				url: 'submission',
				method: 'put',
				data: {
					share: e,
					submitId: this.detail.submitId,
					uid: this.detail.uid
				}
			});
			this.showToast(msg);
		},
		showToast(message) {
			this.$refs.uToast.show({ message });
		},
		copy() {
			uni.setClipboardData({
				data: this.detail.code,
				success: function() {
					console.log('success');
				}
			});
		}
	},
	computed: {
		testSuccessNum() {
			return this.testList?.filter(i => i.status === 0)?.length ?? '-';
		},
		testNum() {
			return this.testList?.length ?? '-';
		}
	},
	onLoad({ id }) {
		console.log(id);
		this.id = id;
	},
	onShow() {
		this.fetchCodeDetail();
		this.fetchAllCase();
	}
};
</script>

<style lang="scss" scoped>
.cd-page {
	padding: 0 20rpx 0;
	background-color: #f0f0f0;
	height: 100%;
	.cd-main {
		.cd-title {
			font-size: 30rpx;
			padding: 16rpx 24rpx;
			background-color: #fff;
			border-radius: 8rpx;
			display: flex;
			align-self: center;
			justify-content: space-between;
			@include box-shadow-3;

			.title {
			}
			.number {
				font-size: 30rpx;
			}
			.link {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: $uni-color-primary;
			}
		}
		.test-list {
			display: flex;
			/* flex-direction: column; */
			flex-wrap: wrap;
			padding: 20rpx 0;
			.test-item {
				@include box-shadow-2;

				padding: 20rpx 10rpx;
				background-color: #fff;
				width: 23%;
				display: flex;
				flex-direction: column;
				margin-right: 2.6%;
				align-items: center;
				border-radius: 8rpx;
				&:nth-child(4n) {
					margin-right: 0;
				}
				&:nth-child(n + 5) {
					margin-top: 20rpx;
				}
				&__title {
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					width: 100%;
					.title {
						font-size: 28rpx;
					}
				}

				.status-text {
					margin-top: 8rpx;
					font-size: 28rpx;
				}
			}
		}
		.code-main {
			margin-top: 20rpx;
			/* background-color: #fff;
      border-radius: 20rpx; */
			::v-deep.hljs {
				background-color: #fff;
				border-radius: 10rpx;
				padding: 30rpx 20rpx;
				/* box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
         */
				@include box-shadow-2;
			}
		}
	}
}
.mb {
	margin-bottom: 20rpx;
}
.error-detail {
	@include box-shadow-2;
	border-radius: 10rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	.error-box {
		padding: 40rpx;
		overflow-x: scroll;
	}
}
</style>

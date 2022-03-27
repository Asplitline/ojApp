<template>
	<view>
		<u-navbar title="提交记录" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="pr-page t-pg">
			<view class="pr-list">
				<view class="pr-item" v-for="i in list" :key="i.id">
					<view class="pr-header">
						<view class="pr-header__left">
							<text class="title">{{ i.displayPid }} {{ i.title }}</text>
							<text class="date">{{ i.submitTime | formatDate }}</text>
						</view>
						<view class="pr-header__right" :style="{ background: JUDGE_STATUS[i.status].rgb }">{{ JUDGE_STATUS[i.status].name }}</view>
					</view>
					<view class="pr-body">
						<view class="pr-body__item">
							<text class="pr-body__item--left">运行时间</text>
							<text class="pr-body__item--right">{{ i.time }} ms</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">运行内存</text>
							<text class="pr-body__item--right">{{ i.memory }} KB</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">代码长度</text>
							<text class="pr-body__item--right">{{ i.length }} B</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">语言</text>
							<text class="pr-body__item--right">{{ i.language }}</text>
						</view>
					</view>
					<view class="pr-footer">
						<button class="btn success" @click="gotoProblemDetail(i)">
							<t-icon color="#5ac725" fontSize="36rpx" type="icon-Share-"></t-icon>
							题目详情
						</button>
						<button class="btn primary" @click="gotoCodeDetail(i)">
							<t-icon fontSize="36rpx" type="icon-code"></t-icon>
							我的代码
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { JUDGE_STATUS } from '@/utils/static';

export default {
	data() {
		return {
			list: [],
			JUDGE_STATUS
		};
	},
	methods: {
		async fetchSubmitList() {
			const {
				data: { records, total }
			} = await this.$api({
				url: '/submissions',
				method: 'get',
				data: {
					onlyMine: true,
					currentPage: 1,
					limit: 15,
					completeProblemID: false
				}
			});
			this.list = records;

			// console.log(res)
		},
		gotoProblemDetail(i) {
			uni.navigateTo({
				url: '/pages/problem/problemDetail?id=' + i.displayPid
			});
		},
		gotoCodeDetail(i) {
			uni.navigateTo({
				url: '/pages/my/codeDetail?id=' + i.submitId
			});
		}
	},
	mounted() {
		this.fetchSubmitList();
	}
};
</script>

<style lang="scss" scoped>
.pr-page {
	background-color: #fafafa;

	.pr-list {
		padding: 20rpx;
		.pr-item {
			padding: 30rpx;
			background-color: #fff;
			margin-bottom: 30rpx;
			border-radius: 10rpx;
			box-shadow: 1px 1px 1px 1px #0000000d;
			border: 1px solid #fafafa;
		}
		.pr-header {
			display: flex;
			position: relative;
			&__left {
				display: flex;
				flex-direction: column;
				.title {
					font-size: 32rpx;
					font-weight: 700;
				}
				.date {
					font-size: 26rpx;
					color: #666;
					margin-top: 10rpx;
				}
			}
			&__right {
				position: absolute;
				right: 0;
				top: 0;
				padding: 4rpx 14rpx;
				color: #fff;
				border-radius: 8rpx;
				font-size: 26rpx;
			}
		}
		.pr-body {
			display: flex;
			&__item {
				flex: 1;
				display: flex;
				align-items: center;
				flex-direction: column;
				padding: 30rpx 0;
				&--left,
				&--right {
					font-size: 26rpx;
				}
				&--left {
				}
				&--right {
					margin-top: 10rpx;
				}
			}
		}
		.pr-footer {
			display: flex;
			.btn {
				display: flex;
				align-items: center;
				background-color: transparent;
				outline: none;
				border: 1px solid transparent;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 32rpx;
				border-radius: 6rpx;
				min-width: 160rpx;
				padding: 0 20rpx;
				&.primary {
					color: $uni-color-primary;
					/* border-color: $u-primary; */
				}
				&.success {
					color: $uni-color-success;
					/* border-color: $u-success; */
				}
				&::after {
					display: none;
				}
				.iconfont {
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>

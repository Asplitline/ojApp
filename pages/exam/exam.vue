<template>
	<t-page class="exam-page">
		<!-- <view class="exam-header"><text>考试列表</text></view> -->
		<view class="exam-list">
			<view class="exam-item" v-for="i in list" :key="i.id">
				<view class="exam-item__title">
					{{ i.title }}
					<t-icon type="icon-lock" class="icon" :color="['', '#d9534f', '#f0ad4e'][i.auth]" fontSize="40rpx" v-if="i.auth !== 0"></t-icon>
				</view>
				<!-- <view class="exam-item__desc">{{ i.description }}</view> -->
				<view class="exam-item__tag" :style="{ backgroundColor: $static.CONTEST_STATUS_REVERSE[i.status].color }">{{ $static.CONTEST_STATUS_REVERSE[i.status].text }}</view>
				<view class="exam-item__info">
					<view class="info-box">
						<text class="info-box__text">开始时间</text>
						<text class="info-box__text">{{ i.startTime | formatDate }}</text>
					</view>
					<view class="info-box">
						<text class="info-box__text">结束时间</text>
						<text class="info-box__text">{{ i.endTime | formatDate }}</text>
					</view>
				</view>
				<!-- <view class="exam-item__duration">{{ $utils.showDate(i.duration) }}</view> -->
			</view>
		</view>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			list: this.$mock.contestList
		};
	},
	onShow() {
		console.log(this.list);
	}
};
</script>

<style lang="scss" scoped>
.exam-page {
	.exam-header {
		font-size: 40rpx;
		text-align: center;
	}
	.exam-list {
		padding: 30rpx 10rpx;
		display: flex;
		flex-wrap: wrap;
		.exam-item {
			position: relative;
			width: 100%;
			background-color: #fff;
			margin-bottom: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			box-shadow: 1px 4rpx 8rpx 1px #4b55ff33;
				
			&:last-child {
				margin-bottom: 0;
			}
			&__title {
				font-size: 32rpx;
				color: #444;
				letter-spacing: 1rpx;
				display: flex;
				align-items: center;
					
				.icon {
					margin-left: 4rpx;
				}
			}
			&__desc {
				font-size: 28rpx;
			}

			&__tag {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				padding: 8rpx 20rpx;
				transform-origin: center;
				color: #fff;
				border-radius: 4rpx;
				font-size: 28rpx;
			}

			&__info {
				font-size: 26rpx;
				padding: 20rpx 0;
				color: #666;
				display: flex;
				.info-box {
					display: flex;
					flex-direction: column;
					width: 100%;
					.info-box__text {
						text-align: center;
						&:first-child {
							padding: 20rpx 0;
							font-size: 32rpx;
						}
					}
					// :first-child {
					// 	font-size: 48rpx;
					// }
				}
			}
		}
	}
}
</style>

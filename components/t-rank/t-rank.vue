<template>
	<view class="rank-list">
		<view class="rank-item" v-for="(i, index) in data" :key="i.id">
			<view class="rank-item__index">
				<template v-if="index < 3">
					<image :src="require(`@/static/rank${index + 1}.png`)" mode="" class="ico-trophy"></image>
				</template>
				<template v-else>
					<view class="rank-item__index">{{ index + 1 }}</view>
				</template>
			</view>
			<view class="rank-item__img">
				<image :src="`${$imgUrl}${i.avatar}`" mode="" v-if="i.avatar" class="rank-item__avatar"></image>
				<view class="rank-item__first" v-else>{{ i | firstName }}</view>
			</view>
			<text class="rank-item__name">{{ i.nickname || i.username }}</text>
			<text class="rank-item__ac">
				{{ i.ac }}
				<text class="suffix">AC</text>
			</text>
			<text class="rank-item__date">
				<text class="total__date">{{ i.totalTime | showTime }}</text>
				<view class="first__problem">
					<t-icon type="icon-air-ballon"></t-icon>
					<t-icon type="icon-air-ballon"></t-icon>
					<t-icon type="icon-air-ballon"></t-icon>
					<t-icon type="icon-air-ballon"></t-icon>
				</view>
			</text>
		</view>
		<!-- <u-loadmore :status="status" @loadmore="loadData" /> -->
	</view>
</template>

<script>
import * as utils from '@/utils';
export default {
	props: {
		data: { type: Array, default: () => [] }
	},
	name: 't-rank',
	data() {
		return {};
	},
	methods: {
		getFirstInfo(i) {
			return;
		}
	},
	filters: {
		firstName(v) {
			if (v.nickname) {
				return v.nickname.slice(0, 1);
			} else {
				return v.username.slice(-1);
			}
		},
		showTime(v) {
			return v;
		}
	}
};
</script>

<style lang="scss" scoped>
.rank-list {
	position: relative;
	padding: 16rpx 10rpx;
	background-color: $uni-color-white;
	/* border: 2rpx solid $uni-border-color; */
	/* border-radius: 0 0 20rpx 20rpx; */
	.rank-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		&__img {
			max-width: 100rpx;
		}
		&__avatar {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}

		&__first {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: $uni-color-primary;
			font-size: 28rpx;
			color: $uni-color-white;
		}
		&__index {
			min-width: 100rpx;
			text-align: center;
			.ico-trophy {
				height: 64rpx;
				width: 64rpx;
			}
		}
		&__name {
			width: 480rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			font-size: 28rpx;
			padding-left: 20rpx;
		}
		&__ac {
			min-width: 120rpx;
			text-align: center;
			font-size: 40rpx;
			color: $uni-color-dark;

			.suffix {
				font-size: 26rpx;
				margin-left: 6rpx;
				color: $uni-text-color-grey;
			}
		}
	}
}
</style>

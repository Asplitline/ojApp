<template>
	<view class="rank-list" :class="customClass">
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
			<view class="rank-item__date" v-if="showTime">
				<text class="total__date">{{ i.totalTime | showTime }}</text>
				<view class="first__problem"><t-icon type="icon-air-ballon" v-for="item in getFirstInfo(i)" :color="item"></t-icon></view>
			</view>
		</view>
		<!-- <u-loadmore :status="status" @loadmore="loadData" /> -->
	</view>
</template>

<script>
import * as utils from '@/utils';
export default {
	props: {
		data: { type: Array, default: () => [] },
		customClass: { type: String, default: 'contest' },
		showTime: { type: Boolean, default: false }
	},
	name: 't-rank',
	data() {
		return {};
	},
	methods: {
		getFirstInfo(v) {
			const arr = [];
			for (const i in v.submissionInfo) {
				if (v.submissionInfo[i].isFirstAC) {
					arr.push(i);
				}
			}
			return arr.length
				? arr.map(i => {
						const idx = i.charCodeAt() - 'A'.charCodeAt();
						return this.$static.problemFlag[idx].color;
				  })
				: arr;
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
			return utils.formatDate(v);
		}
	}
};
</script>

<style lang="scss" scoped>
.rank-list {
	position: relative;
	padding: 16rpx 24rpx;
	background-color: $uni-color-white;
	.rank-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		&__img {
			max-width: 140rpx;
		}
		&__avatar {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}

		&__first {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: $uni-color-primary;
			font-size: 36rpx;
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
			padding-left: 20rpx;
		}
		&__ac {
			min-width: 120rpx;
			text-align: center;
			font-size: 40rpx;
			color: $uni-color-dark;

			.suffix {
				font-size: 28rpx;
				margin-left: 18rpx;
				color: $uni-text-color-grey;
			}
		}
	}
	&.index {
		padding: 16rpx 10rpx;
	}
	&.contest {
		padding: 16rpx 0rpx;
		.rank-item {
			border-bottom: 1rpx dashed #e0f0ef;
			&__img {
				max-width: 100rpx;
			}
			&__first {
				width: 60rpx;
				height: 60rpx;
			}
			&__index {
				min-width: 70rpx;
			}
			&__name {
				width: 240rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				padding-left: 20rpx;
			}
			&__ac {
				.suffix {
					margin-left: 6rpx;
				}
			}
			&__date {
				min-width: 160rpx;
				text-align: center;
				.total__date {
					color: #444;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>

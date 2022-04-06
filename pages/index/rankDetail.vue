<template>
	<view>
		<u-navbar title="总排名" :autoBack="true" height="44px" class="t-navbar"></u-navbar>

		<t-box text="暂无信息" :show="loadList.length > 0" class="t-pg rd-page">
			<view class="rank-list">
				<view class="rank-item" v-for="(i, index) in loadList" :key="i.id">
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
				</view>
				<u-loadmore :status="status" @loadmore="loadData" />
			</view>
		</t-box>
	</view>
</template>

<script>
import mixins from '@/mixins';
export default {
	data() {
		return {
			query: {
				currentPage: 1,
				limit: 20,
				type: 0
			}
			// total: 0,
			// status: 'loadmore'
		};
	},
	mixins: [mixins],
	computed: {
		isFull() {
			return this.loadList.length && this.loadList.length === this.total;
		}
	},
	methods: {
		async fetchData() {
			this.status = 'loading';
			const {
				data: { records, total }
			} = await this.$api({ method: 'get', url: 'get-rank-list', data: { ...this.query } });
			this.total = total;
			this.handleLoadData(records);
			// if (records.length && !this.isFull) {
			// 	this.loadList.push(...records);
			// 	this.status = 'loadmore';
			// } else {
			// 	this.status = 'nomore';
			// }
		}
	},
	filters: {
		firstName(v) {
			if (v.nickname) {
				return v.nickname.slice(0, 1);
			} else {
				return v.username.slice(-1);
			}
		}
	},
	onShow() {
		this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.rd-page {
	background-color: #fafafa;
	height: 100%;
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
	}
}
</style>

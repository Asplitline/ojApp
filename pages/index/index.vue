<template>
	<t-page class="index">
		<u-swiper :list="carouselList" indicatorMode="line" keyName="url" :autoplay="false" class="swiper"></u-swiper>

		<view class="rank-content">
			<view class="rank-list">
				<text class="rank-title">排行榜</text>
				<view class="rank-item" v-for="(i, index) in rankList" :key="i.id">
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
			</view>
		</view>

		<view class="recent-contest">
			<view class="recent-list">
				<view class="recent-item" v-for="i in recentOtherContest" :key="i.id">
					<view class="recent-item__top">
						<text class="title">{{ i.title }}</text>
					</view>
					<view class="recent-item__bottom">
						<view class="text"><text>时间：2020-12-12 12:30</text></view>
						<view class="text"><text>时长: 12:30</text></view>
					</view>
				</view>
			</view>
		</view>
	</t-page>
</template>

<script>
// https://www.58pic.com/newpic/35507063.html
export default {
	data() {
		return {
			carouselList: [],
			rankList: [],
			recentOtherContest: []
		};
	},
	onLoad() {
		this.fetchData();
	},
	mounted() {},
	computed: {
		firstName() {}
	},
	filters: {
		firstName(v) {
			if (v.nickname) {
				return v.nickname.slice(0, 1);
			} else {
				return v.username.slice(-2);
			}
		}
	},
	methods: {
		fetchData() {
			this.fetchCarousel();
			this.fetchRankList();
			this.fetchRecentOtherContest();
		},
		async fetchCarousel() {
			const { data } = await this.$api({ method: 'get', url: 'home-carousel' });
			this.carouselList = data.map(i => ({
				...i,
				url: this.$imgUrl + i.url
			}));
		},
		async fetchRankList() {
			const { data } = await this.$api({ method: 'get', url: 'get-recent-seven-ac-rank' });
			this.rankList = data;
			console.log(this.rankList);
		},
		async fetchRecentOtherContest() {
			const { data } = await this.$api({ method: 'get', url: 'get-recent-other-contest' });
			this.recentOtherContest = data;
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	overflow: scroll;
	overflow-x: hidden;
	.swiper {
		height: 200rpx;
		border: 2rpx solid #f0f0f0;
		padding: 10rpx;
	}
	.rank-title {
		font-size: 48rpx;
		position: absolute;
		top: -34rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: $uni-color-white;
		width: 200rpx;
		text-align: center;
	}
	.rank-list {
		position: relative;
		margin-top: 80rpx;
		margin-bottom: 80rpx;
		padding: 40rpx 10rpx;
		background-color: $uni-color-white;
		border: 2rpx solid $uni-border-color;
		border-radius: 8rpx;
		.rank-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16rpx 0;
			font-size: 32rpx;
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
				min-width: 120rpx;
				text-align: center;
				.ico-trophy {
					height: 64rpx;
					width: 64rpx;
				}
			}
			&__name {
				flex: 1;
				padding-left: 40rpx;
			}
			&__ac {
				min-width: 120rpx;
				text-align: center;
				font-size: 48rpx;
				color: $uni-color-dark;

				.suffix {
					font-size: 28rpx;
					margin-left: 18rpx;
					color: $uni-text-color-grey;
				}
			}
		}
	}
	.recent-contest {
		background-color: $uni-color-white;
		.recent-list {
			display: flex;
			flex-wrap: wrap;
			.recent-item {
				display: flex;
				flex-direction: column;
				position: relative;
				width: 100%;
				border: 1px solid #f0f0f0;
				padding: 20rpx;
				border-radius: 8rpx;
				margin-bottom: 40rpx;
				&__top {
					.title {
						font-size: 32rpx;
						line-height: 1.2;
					}
				}
				&__bottom {
					display: flex;
					justify-content: space-between;
					color: #555555;
					.text {
						font-size: 28rpx;
						margin-top: 60rpx;
					}
				}
			}
		}
	}
}
</style>

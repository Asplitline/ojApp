<template>
	<t-page class="search-page">
		<view class="search-box">
			<u-search v-model="query.keyword" :showAction="false" height="40" @search="enterSearch" @clear="clear"></u-search>
			<text class="cancel-text" @click="cancel">取消</text>
		</view>
		<view class="discuss-list" v-if="query.keyword">
			<template v-if="total > 0">
				<view class="discuss-item" v-for="i in discussList" :key="i.id" @click="gotoDetail(i)">
					<view class="discuss-item-header">
						<image :src="`${$imgUrl}${i.avatar}`" mode="" class="discuss-item__avatar" v-if="i.avatar"></image>
						<view class="discuss-item__first" v-else>{{ i.author | firstName  }}</view>
						<view class="discuss-item__title">
							<text class="text">{{ i.title }}</text>
							<text class="date">刚刚</text>
						</view>
					</view>
					<view class="discuss-item-content">
						<view class="desc">{{ i.description }}</view>
						<view class="tool">
							<view class="thumb tool-box">
								<u-icon name="thumb-up" color="#4b55ff" size="20"></u-icon>
								<text class="text">{{ i.likeNum }}</text>
							</view>
							<text class="spot">·</text>
							<view class="reply tool-box">
								<text class="title">回复</text>
								<text class="text">{{ i.commentNum }}</text>
							</view>
							<text class="spot">·</text>
							<view class="view tool-box">
								<text class="title">浏览量</text>
								<text class="text">{{ i.viewNum }}</text>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadData" />
			</template>
			<u-empty v-else></u-empty>
		</view>
	</t-page>
</template>

<script>
export default {
	data() {
		return {
			query: {
				limit: 8,
				keyword: '',
				currentPage: 1,
				onlyMine: false
			},
			status: 'loadmore',
			total: 8,
			discussList: []
		};
	},
	methods: {
		clear() {
			this.discussList = [];
		},
		loadData() {
			if (this.isFull) return;
			else {
				this.query.currentPage++;
				this.fetchData();
			}
		},
		cancel() {
			uni.switchTab({
				url: '/pages/discuss/discuss'
			});
		},
		enterSearch() {
			this.discussList = [];
			this.query.currentPage = 1;
			this.fetchData();
		},
		async fetchData() {
			this.status = 'loading';
			const { data } = await this.$api({ url: 'discussions', method: 'get', data: this.query });
			this.total = data.total;
			console.log(data);
			if (this.isFull) {
				this.status = 'nomore';
			} else {
				this.discussList.push(...data.records);
				if (this.isFull) this.status = 'nomore';
				else this.status = 'loadmore';
			}
		},
		gotoDetail(i) {
			uni.navigateTo({
				url: '/pages/discuss/discussDetail?id=' + i.id
			});
		}
	},
	computed: {
		isFull() {
			return this.total === this.discussList.length;
		}
	},
	onShow() {
		// this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.search-page {
	padding: 0;
}
.search-box {
	padding: 40rpx 30rpx;
	background-color: #fff;
	border-bottom: 2rpx solid #f0f0f0;
	display: flex;
	align-items: center;
	.cancel-text {
		display: inline-block;
		margin-left: 20rpx;
		color: #666;
	}
}
.discuss-list {
	padding: 20rpx 0;
	background-color: #f9f9fb;
	.discuss-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx 16rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		&-header {
			display: flex;
			align-items: center;
		}
		&__avatar {
			width: 90rpx;
			height: 90rpx;
			background-color: #fff;
			border-radius: 50%;
			padding: 12rpx;
			margin-right: 10rpx;
		}
		&__first {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background-color: $uni-color-primary;
			font-size: 36rpx;
			color: $uni-color-white;
			margin-right: 10rpx;
		}

		&__title {
			display: flex;
			flex-direction: column;
			flex: 1;
			.text {
				font-weight: 700;
				width: 600rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.date {
				color: $uni-color-grey;
				font-size: 28rpx;
				margin-top: 8rpx;
			}
		}
		&-content {
			.desc {
				color: $uni-color-grey-dd;
				font-size: 30rpx;
				// line-height: 1.5;
				// padding: 20rpx 0;
				margin: 20rpx 0;
				letter-spacing: 2rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.tool {
				display: flex;
				align-items: center;
				color: $uni-color-grey-d;
				&-box {
					color: $uni-color-grey-d;
					font-size: 28rpx;
					&.thumb {
						display: flex;
						align-items: center;
					}
					.title {
						margin-right: 10rpx;
					}
					.text {
						font-size: 26rpx;
					}
				}
				.spot {
					margin: 0 20rpx;
				}
			}
		}
	}
}
</style>

<template>
	<view class="discuss-detail-page">
		<u-navbar title="" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="discuss-detail">
			<view class="discuss-detail__title">{{detail.title}}</view>
			<view class="discuss-detail__author">
				<image :src="`${$imgUrl}${detail.avatar}`" mode="" class="avatar"></image>
				<view class="author">
					<text class="name">{{detail.root}}</text>
					<view class="box">
						<text class="views">{{detail.viewNum}} 阅读</text>
						·
						<text class="date">{{detail.gmtModified}}</text>
					</view>
				</view>
			</view>
			<view class="discuss-detail__content">
				<view v-html="detail.content"></view>
				<!-- <rich-text :nodes="detail.content"></rich-text> -->
			</view>
			<view class="bottom-tools" v-if="!showComment">
				<view class="bottom-tool">
					<t-icon type="icon-thumbs-o-up" class="bottom-tool__icon"></t-icon>
					<text class="bottom-tool__num">{{detail.likeNum}}</text>
				</view>
				<view class="bottom-tool">
					<t-icon type="icon-error" class="bottom-tool__icon" color="#cc2d19"></t-icon>
					<text class="bottom-tool__num">举报</text>
				</view>
				<view class="bottom-tool">
					<t-icon type="icon-share" class="bottom-tool__icon" color="#75c82b"></t-icon>
					<text class="bottom-tool__num">分享</text>
				</view>
				<view class="bottom-input" @click="showComment = true" v-if="false">
					说点什么把....
				</view>
				<view class="bottom-input" v-else>
					登陆后可以评论
				</view>
			</view>
			<view class="comment-box" @click.self="closeCommentBox" v-else>
				<view class="comment-ipt">
					<u--textarea v-model="comment" placeholder="请输入内容"></u--textarea>
					<view class="comment-tool">
						<image :src="`${$imgUrl}${detail.avatar}`" class="avatar"></image>
						<u-button class="send-btn">
							<t-icon type="icon-send" color="#fff" fontSize="16" class="send-btn-icon">
							</t-icon> 发送
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			comment: '',
			showComment: false,
			id: 0,
			detail: {}
		}
	},
	methods: {
		closeCommentBox() {
			this.showComment = false
			this.comment = ''
		},
		async fetchDiscussDetail() {
			const { data } = await this.$api({
				url: 'discussion',
				method: 'get',
				data: {
					did: this.id
				}
			})
			console.log(data)
			this.detail = data
		}
	},
	onLoad({ id }) {
		this.id = id
	},
	onShow() {
		this.fetchDiscussDetail()
	}
}
</script>

<style lang="scss" scoped>
.discuss-detail-page {
	.t-navbar {
		height: 44px;
	}
	.discuss-detail {
		padding: 0 30rpx 30rpx;
		&__title {
			font-size: 40rpx;
			line-height: 1.5;
			font-weight: 700;
		}
		&__author {
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			.avatar {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
				border-radius: 50%;
			}
			.box {
				.views,
				.date {
					color: #808080;
				}
				.views {
					font-size: 28rpx;
					margin-right: 10rpx;
				}
				.date {
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom-tools {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 30rpx;
		border-top: 1rpx solid #f0f0f0;
		.bottom-tool {
			display: flex;
			align-items: center;
			flex-direction: column;
			&__icon {
				padding: 0 18rpx;
			}
			&__num {
				font-size: 24rpx;
				color: #707070;
				margin-top: 10rpx;
			}
		}
		.bottom-input {
			flex: 1;
			background-color: #f0f0f0;
			height: 72rpx;
			margin-left: 40rpx;
			text-align: center;
			line-height: 72rpx;
			color: #808080;
			border-radius: 36rpx;
			font-size: 28rpx;
		}
	}
}
.comment-box {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 12;
	background-color: $uni-bg-color-mask;
	.comment-ipt {
		position: fixed;
		bottom: -400rpx;
		left: 0;
		right: 0;
		padding: 20rpx;
		transform-origin: bottom;
		transform: translateY(-400rpx);
		transition: transform 0.3s ease-in-out;
		background-color: #fff;
		.comment-tool {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		.send-btn {
			width: 160rpx;
			height: 70rpx;
			border-radius: 35rpx;
			background-image: linear-gradient(to right, #434343 0%, black 100%);
			color: #fff;
			font-size: 30rpx;
			margin: 0;
			margin-left: auto;
			&-icon {
				margin-right: 10rpx;
			}
		}
	}
}
</style>

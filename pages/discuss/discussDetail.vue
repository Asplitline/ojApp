<template>
	<view class="discuss-detail-page">
		<u-navbar title="" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="discuss-detail">
			<view class="discuss-detail__title">{{ detail.title }}</view>
			<view class="discuss-detail__author">
				<image :src="`${$imgUrl}${detail.avatar}`" mode="" class="avatar"></image>
				<view class="author">
					<text class="name">{{ detail.root }}</text>
					<view class="box">
						<text class="views">{{ detail.viewNum }} 阅读</text>
						·
						<text class="date">{{ detail.gmtCreate | handleDate }}</text>
					</view>
				</view>
			</view>
			<view class="discuss-detail__content">
				<view v-html="detail.content"></view>
				<!-- <rich-text :nodes="detail.content"></rich-text> -->
			</view>
			<view class="discuss-comment">
				<view class="comment-title">
					共
					<text class="total">{{ commentList.length }}</text>
					个讨论
				</view>
				<view class="comment-list" v-if="commentList.length">
					<view class="comment-item" v-for="i in commentList" :key="i.id">
						<view class="comment-item__hd">
							<image :src="`${$imgUrl}${i.fromAvatar}`" mode="" class="avatar" v-if="!$utils.isEmpty(i.fromAvatar)"></image>
							<view class="avatar-placeholder" v-else>{{ i.fromName | firstName }}</view>
							<view class="author">
								<text class="name">{{ i.fromName }}</text>
								<text class="date">{{ i.gmtCreate | handleDate }}</text>
							</view>
						</view>
						<view class="comment-item__bd">{{ i.content }}</view>
						<view class="comment-item__ft">
							<view class="comment-item__ft--texts">
								<text class="text" @click="commentLike(i)" :class="{ 'is-like': i.isLike }">
									点赞
									<text class="num">{{ i.likeNum }}</text>
								</text>
								·
								<text class="text">
									回复
									<text class="num">{{ i.replyList.length }}</text>
								</text>
							</view>
							<view class="comment-item__ft--icons">
								<t-icon type="icon-thumbs-o-up" color="#777" class="icon"></t-icon>
								<t-icon type="icon-comments" color="#777" class="icon" @click.native="commentReply(i)"></t-icon>
							</view>
						</view>

						<view class="reply-list" v-if="i.replyList.length > 0">
							<view class="reply-item" v-for="reply in i.replyList" :key="reply.id">
								<text class="name">{{ reply.fromName }} :</text>
								<text class="content">{{ reply.content }}</text>
							</view>
							<view>
								<text class="reply-total">共 {{ i.totalReplyNum }} 条回复</text>
								<text v-if="i.replyList.length < i.totalReplyNum" class="reply-all" @click="showAllReply(i.id)">查看全部</text>
							</view>
						</view>
					</view>
				</view>
				<u-empty v-else></u-empty>

				<view class="bottom-tools" v-if="!showComment">
					<view class="bottom-tool" :class="{ active: detail.hasLike }">
						<t-icon type="icon-thumbs-o-up" class="bottom-tool__icon" color="#707070" @click.native="discussLike"></t-icon>
						<text class="bottom-tool__num">{{ detail.likeNum }}</text>
					</view>
					<view class="bottom-tool" @click="showModal = true">
						<t-icon type="icon-error" class="bottom-tool__icon" color="#cc2d19"></t-icon>
						<text class="bottom-tool__num">举报</text>
					</view>
					<view class="bottom-tool">
						<t-icon type="icon-share" class="bottom-tool__icon" color="#75c82b"></t-icon>
						<text class="bottom-tool__num">分享</text>
					</view>
					<view class="bottom-input" @click="showComment = true" v-if="isLogin">说点什么把....</view>
					<view class="bottom-input" v-else>登陆后可以评论</view>
				</view>
				<view class="comment-box" @click.self="closeCommentBox" @touchmove.native.prevent v-else>
					<view class="comment-ipt">
						<u--textarea v-model="comment" placeholder="请输入内容"></u--textarea>
						<view class="comment-tool">
							<image :src="`${$imgUrl}${user.avatar}`" class="avatar"></image>
							<u-button class="send-btn" @click="submitComment">
								<t-icon type="icon-send" color="#fff" fontSize="16" class="send-btn-icon"></t-icon>
								发送
							</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal title="举报文章" :show="showModal">
			<u--form :borderBottom="false" labelPosition="top" :model="reportForm" :rules="rules" ref="form1" style="width:100%;" labelWidth="140px">
				<u-form-item label="标签" prop="name" ref="item1">
					<u-checkbox-group v-model="reportForm.tag" placement="column" @change="checkboxChange" class="report-checkbox-list">
						<u-checkbox v-for="(item, index) in REPORT_TAG" :key="index" :label="item" :name="item" class="report-checkbox-item"></u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="举报原因" prop="name" ref="item1"><u--textarea v-model="reportForm.content" placeholder="请输入内容"></u--textarea></u-form-item>
			</u--form>
			<view slot="confirmButton" class="report-btns">
				<button class="report-btn cancel" @click="cancelModal">取消</button>
				<button class="report-btn" @click="confirmReport">举报</button>
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { REPORT_TAG } from '@/utils/static';
import { mapGetters, mapState } from 'vuex';
export default {
	data() {
		return {
			comment: '',
			showComment: false,
			id: 0,
			detail: {},
			query: {
				currentPage: 1,
				limit: 55
			},
			commentList: [],
			showModal: false,
			reportForm: {},
			rules: {},
			REPORT_TAG,
			currentComment: {},
			commentType: 'comment'
		};
	},
	computed: {
		...mapGetters(['isLogin']),
		...mapState(['user'])
	},
	methods: {
		async commentLike(item) {
			const { status } = await this.$api({
				url: 'comment-like',
				method: 'get',
				data: {
					cid: item.id,
					toLike: !item.isLike,
					sourceId: this.id,
					sourceType: 'Discussion'
				}
			});
			if (status === 200) this.fetchCommentList();
		},
		showToast(message) {
			this.$refs.uToast.show({ message });
		},
		async commentReply(item) {
			this.currentComment = item;
			this.showComment = true;
			this.commentType = 'reply';
		},
		async submitComment() {
			if (this.$utils.isEmpty(this.comment)) return this.showToast('请输入内容');
			if (this.commentType === 'reply') {
				const { status } = await this.$api({
					url: 'reply',
					data: {
						did: this.id,
						quoteId: this.currentComment.id,
						quoteType: 'Comment',
						reply: {
							commentId: this.currentComment.id,
							content: this.comment,
							toAvatar: this.currentComment.fromAvatar,
							toUid: this.currentComment.fromUid,
							toName: this.currentComment.fromName
						}
					}
				});
				this.$handleStatus(
					status,
					() => {
						this.closeCommentBox();
						this.fetchCommentList();
					},
					() => {
						this.showToast(msg);
					}
				);
			} else if (this.commentType === 'comment') {
				const { status, msg } = await this.$api({
					url: 'comment',
					data: { cid: null, content: this.comment, did: this.id }
				});
				this.$handleStatus(
					status,
					() => {
						this.closeCommentBox();
						this.fetchCommentList();
					},
					() => {
						this.showToast(msg);
					}
				);
			}
		},
		async showAllReply(id) {
			const { data, status } = await this.$api({
				url: 'reply',
				method: 'get',
				data: {
					commentId: id
				}
			});
			if (status === 200) {
				this.commentList = this.commentList.map(i => {
					if (i.id === id) {
						return {
							...i,
							replyList: data
						};
					} else {
						return { ...i };
					}
				});
			}
		},
		closeCommentBox() {
			this.showComment = false;
			this.commentType = 'comment';
			this.currentComment = {};
			this.comment = '';
		},
		cancelModal() {
			this.showModal = false;
		},
		confirmReport() {
			console.log(111);
		},
		async fetchDiscussDetail() {
			const { data } = await this.$api({
				url: 'discussion',
				method: 'get',
				data: {
					did: this.id
				}
			});
			console.log(data);
			this.detail = data;
		},
		async fetchCommentList() {
			const { data } = await this.$api({
				url: 'comments',
				method: 'get',
				data: {
					did: this.id,
					...this.query
				}
			});
			this.commentList = data.commentList.records.map(i => {
				const isLike = !!data.commentLikeMap[i.id];
				return { ...i, isLike };
			});
			console.log(this.commentList);
		},
		async discussLike() {
			const { status } = await this.$api({ url: 'discussion-like', method: 'get', data: { did: this.id, toLike: !this.detail.hasLike } });
			this.fetchDiscussDetail();
			// this.$handleStatus(status, () => {
			// 	this
			// });
		}
	},
	onLoad({ id }) {
		this.id = id;
	},
	onShow() {
		console.log(this.user);
		this.fetchDiscussDetail();
		this.fetchCommentList();
	}
};
</script>

<style lang="scss" scoped>
.discuss-detail-page {
	.t-navbar {
		height: 44px;
	}
	.discuss-detail {
		padding: 0 30rpx 160rpx;
		&__title {
			font-size: 40rpx;
			line-height: 1.5;
			font-weight: 700;
			background-color: #fff;
		}
		&__author {
			display: flex;
			align-items: center;
			padding: 20rpx 0 30rpx;
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
		&__content {
			padding: 0 0 30rpx;
			line-height: 1.5;
			letter-spacing: 1rpx;
			color: #333;
		}
	}
	.discuss-comment {
		margin: 0 -30rpx;
		padding: 10rpx 0;
		background-color: #f9f9fb;
		.comment-title {
			font-weight: 700;
			font-size: 36rpx;
			padding: 20rpx 16rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #f0f0f0;
			margin-bottom: 10rpx;
		}
		.comment-list {
			.comment-item {
				padding-bottom: 20rpx;
				background-color: #fff;
				&__hd {
					display: flex;
					padding: 18rpx 20rpx;
					.avatar {
						width: 70rpx;
						border-radius: 50%;
						height: 70rpx;
					}
					.author {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						padding-left: 16rpx;
						.name {
							color: #111;
						}
						.date {
							font-size: 26rpx;
							color: #707070;
						}
					}
				}
				&__bd {
					padding: 0 20rpx 20rpx;
					letter-spacing: 1rpx;
					line-height: 1.5;
					color: #333333;
				}
				&__ft {
					display: flex;
					padding: 0 0 30rpx;
					&--texts {
						flex: 2;
						padding: 0 20rpx;
						font-size: 28rpx;
						.text {
							margin: 0 20rpx;
							color: #777;
							&.is-like {
								color: $uni-color-primary;
							}
							.num {
								margin-left: 14rpx;
								font-size: 26rpx;
							}
							&:first-child {
								margin-left: 0;
							}
						}
					}
					&--icons {
						display: flex;
						flex: 1;
						.icon {
							width: 50%;
							text-align: center;
						}
					}
				}
				.reply-list {
					margin: 0 30rpx;
					padding: 20rpx;
					border-radius: 10rpx;
					background-color: #fafafa;
					position: relative;
					&::before {
						content: '';
						position: absolute;
						top: 0;
						border: 20rpx solid transparent;
						border-bottom: 24rpx solid #fafafa;
						transform: translateY(-100%);
					}
					.reply-item {
						font-size: 31rpx;
						margin-bottom: 20rpx;
						&:last-child {
							margin-bottom: 0;
						}
						.name {
							color: #777;
							font-weight: 700;
							margin-right: 10rpx;
						}
						.content {
							line-height: 1.5;
							letter-spacing: 1rpx;
							color: #666;
						}
					}
				}
				.reply-total {
					font-size: 26rpx;
					color: #666;
					line-height: 1.5;
				}
				.reply-all {
					color: $uni-color-primary;
					font-size: 28rpx;
					margin-left: 6rpx;
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
		background-color: #fff;
		.bottom-tool {
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-right: 54rpx;
			&.active {
				.bottom-tool__icon {
					position: relative;
					box-sizing: border-box;
					color: $uni-color-primary !important;
				}
				.bottom-tool__num {
					color: $uni-color-primary;
				}
			}
			&__icon {
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
			text-align: center;
			line-height: 72rpx;
			color: #808080;
			border-radius: 36rpx;
			font-size: 28rpx;
		}
	}
}
.comment-box {
	position: fixed;
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

.report-checkbox-list {
	flex-direction: row;
	flex-wrap: wrap;
	flex-shrink: 1;
	.report-checkbox-item {
		width: 50%;
		padding: 20rpx 0;
	}
}
.report-btns {
	display: flex;
	.report-btn {
		background-color: #ff4d47;
		height: 64rpx;
		line-height: 64rpx;
		color: #fff;
		&.cancel {
			background-color: #666;
		}
	}
}
</style>

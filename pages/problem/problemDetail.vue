<template>
	<view class="problem-detail-page">
		<u-navbar title="两数之和" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class=""></view>
		<view class="problem-top">
			<view class="problem-top__tag">简单</view>
			<view class="problem-top__num">
				<text class="num">1231</text>
				<text class="text">提交</text>
			</view>
			<view class="problem-top__num">
				<text class="num">1231</text>
				<text class="text">通过</text>
			</view>
			<view class="problem-top__statistic">
				<t-icon type="icon-cq-piechat"></t-icon>
			</view>
		</view>
		<view class="problem-content">
			<view class="problem-content__desc">
				<text class="title">题目描述</text>
				<view class="content">求两个整数的和。</view>
			</view>
			<view class="problem-content__desc">
				<text class="title">输入描述</text>
				<view class="content">一行，两个用空格隔开的整数。</view>
			</view>
			<view class="problem-content__desc">
				<text class="title">输出描述</text>
				<view class="content">两个整数的和。</view>
			</view>
		</view>
		<view class="problem-example">
			<view class="problem-example__input">
				<text class="title">示例1 输入</text>
				<view class="desc">1 2 3</view>
			</view>
			<view class="problem-example__output">
				<text class="title">示例1 输出</text>
				<view class="desc">1 2 3</view>
			</view>
		</view>
		<view class="problem-tip">
			<view class="problem-tip__item">
				<text class="title">时间限制</text>
				<text class="text">1000MS</text>
			</view>
			<view class="problem-tip__item">
				<text class="title">内存限制</text>
				<text class="text">256MB</text>
			</view>
			<view class="problem-tip__item">
				<text class="title">出题人</text>
				<text class="text">naenano</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.problem-detail-page {
	.t-navbar {
		height: 44px;
	}
}
.problem-top {
	display: flex;
	padding: 30rpx;
	border-top: 1rpx solid $uni-border-color;
	&__tag {
		display: inline-block;
		background-color: #f5f5f7;
		padding: 6rpx 10rpx;
		border-radius: 8rpx;
		font-size: 26rpx;
		color: $uni-color-success;
		margin-right: 20rpx;
		&.Mid {
			color: $uni-color-warning;
		}
		&.Hard {
			color: $uni-color-error;
		}
	}
	&__num {
		position: relative;
		padding: 0 20rpx;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 20rpx;
			width: 1rpx;
			background-color: $uni-border-color;
		}
		.num {
			font-size: 30rpx;
			font-weight: 700;
		}
		.text {
			margin-left: 16rpx;
			font-size: 28rpx;
			color: $uni-color-grey-dd;
		}
	}
	&__statistic {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
}

.problem-content {
	padding: 0 30rpx;
	&__desc {
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: #555;
		}
		.content {
			letter-spacing: 2rpx;
			line-height: 1.5;
			color: $uni-color-grey-dd;
			padding: 16rpx 0 20rpx;
		}
	}
}
.problem-example {
	padding: 10rpx 30rpx;
	&__input,
	&__output {
		.title {
			font-size: 36rpx;
			font-weight: 700;
			color: #555;
		}
		.desc {
			margin: 20rpx 0 40rpx;
			padding: 20rpx 30rpx;
			background-color: #f2f3f5;
			border-radius: 8rpx;
		}
	}
}
.problem-tip {
	display: flex;
	padding:20rpx 30rpx;
	&__item {
		display: flex;
		flex: 1;
		flex-direction: column;
		text-align: center;

		.title,
		.text {
			font-size: 28rpx;
		}
		.title {
			color: #000;
			margin-bottom: 10rpx;
		}
		.text {
			color: #666;
		}
	}
}
</style>

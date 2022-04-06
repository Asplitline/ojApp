<template>
	<view class="t-problem">
		<view class="problem-content">
			<view class="problem-content__desc">
				<text class="title">题目描述</text>
				<view class="content">{{ data.description }}</view>
			</view>
			<view class="problem-content__desc">
				<text class="title">输入描述</text>
				<view class="content">{{ data.input }}</view>
			</view>
			<view class="problem-content__desc">
				<text class="title">输出描述</text>
				<view class="content">{{ data.output }}</view>
			</view>
		</view>
		<view class="problem-example" v-for="(i, idx) in examplesArr" :key="idx">
			<view class="problem-example__input">
				<text class="title">示例 {{ idx + 1 }} 输入</text>
				<pre class="desc">{{ i.input }}</pre>
			</view>
			<view class="problem-example__output">
				<text class="title">示例 {{ idx + 1 }} 输出</text>
				<pre class="desc">{{ i.output }}</pre>
			</view>
		</view>
		<view class="problem-tip">
			<view class="problem-tip__item">
				<text class="title">时间限制</text>
				<text class="text">{{ data.timeLimit }}MS</text>
			</view>
			<view class="problem-tip__item">
				<text class="title">内存限制</text>
				<text class="text">{{ data.memoryLimit }}MB</text>
			</view>
			<view class="problem-tip__item">
				<text class="title">出题人</text>
				<text class="text">{{ data.author || 'admin' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { exampleStr2Arr } from '@/utils';
import { PROBLEM_LEVEL } from '@/utils/static';
export default {
	props: {
		data: {
			type: Object
		}
	},
	name: 't-problem',
	data() {
		return {
			PROBLEM_LEVEL
		};
	},
	computed: {
		examplesArr() {
			return exampleStr2Arr(this.data.examples);
		}
	}
};
</script>

<style lang="scss" scoped>
.t-problem {
	.problem-content {
		padding: 0 30rpx;
		&__desc {
			padding: 30rpx 0;
			.title {
				display: inline-block;
				font-size: 36rpx;
				font-weight: 600;
				color: #555;
				margin-bottom: 14rpx;
			}
			.content {
				letter-spacing: 4rpx;
				line-height: 1.5;
				color: $uni-color-grey-dd;
				padding: 16rpx 0 20rpx;
			}
		}
	}
	.problem-example {
		padding: 20rpx 30rpx 40rpx;
		&__input,
		&__output {
			.title {
				display: inline-block;
				padding: 20rpx 0 20rpx;
				font-size: 36rpx;
				font-weight: 700;
				color: #555;
			}
			.desc {
				padding: 20rpx;
				font-size: 36rpx;
				background-color: #f2f3f5;
				border-radius: 8rpx;
			}
		}
	}
	.problem-tip {
		display: flex;
		padding: 20rpx 30rpx 40rpx;
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
}
</style>

<template>
	<view class="ed-page">
		<u-navbar title="比赛" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="ed-main t-pg">
			<view class="ed-main__header">
				<view class="header-title">{{ detail.title }}</view>
				<view class="header-info">
					<text class="header-info__date">{{ detail.startTime | formatDate }}</text>
					<text class="header-info__duration">{{ $utils.showDate(detail.duration, false) }}</text>
				</view>
				<view class="banner" v-if="diff < 0">
					<t-icon type="icon-timer" color="#666" class="banner-icon"></t-icon>
					<text>比赛已结束</text>
				</view>
				<view class="banner cutdown" v-else>
					<t-icon type="icon-timer" color="#ed3f14" class="banner-icon"></t-icon>
					<text>{{countDown()}}</text>
				</view>
				<view class="tabs"><u-tabs :list="tabs" @click="clickTabs"></u-tabs></view>
				<components :is="currentComponent" :data="list" :id="id"></components>
			</view>
		</view>
	</view>
</template>

<script>
import problemList from './problemList';
import rankList from './rankList';
import recordList from './recordList';
export default {
	data() {
		return {
			id: '',
			detail: {},
			tabs: [{ name: '题目', component: 'problemList' }, { name: '排行榜', component: 'rankList' }, { name: '提交记录', component: 'recordList' }],
			list: [],
			currentComponent: 'problemList',
			timer: null,
			now: 0,
			diff: 0
		};
	},
	components: {
		problemList,
		rankList
	},
	computed:{
		showCountDown(){
			// return this.$utils.showDate(this.diff)
			return ''
		}
	},
	methods: {
		async fetchExamDetail() {
			const res = await this.$api({ url: 'get-contest-info', method: 'get', data: { cid: this.id } });
			if (res.status === 401) {
				return uni.redirectTo({
					url: '/pages/login/login'
				});
			}
			this.detail = res.data;
			this.countDown();
		},

		async fetchProblemList() {
			const { data } = await this.$api({ url: 'get-contest-problem', method: 'get', data: { cid: this.id } });
			this.list = data;
		},
		fetchData() {
			if (this.currentComponent === 'problemList') {
				this.fetchProblemList();
			} else if (this.currentComponent === 'rankList') {
			}
		},
		clickTabs(v) {
			this.currentComponent = v.component;
			console.log(v);
		},
		countDown() {
			const endTime = new Date(this.detail.endTime).getTime();
			this.diff = endTime - this.now;
			return this.$utils.showDate(this.diff)
		}
	},
	onLoad({ id }) {
		console.log('onLoad');
		this.id = id;
	},
	onHide() {
		clearInterval(this.timer);
	},
	onShow() {
		this.now = Date.now();
		this.timer = setInterval(() => {
			this.now = Date.now();
		}, 1000);
		console.log('onShow');
		this.fetchExamDetail();
		this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.ed-main {
	&__header {
		padding: 0 20rpx 20rpx;
		.header {
			&-title {
				font-size: 40rpx;
				font-weight: 700;
			}
			&-info {
				display: flex;
				align-items: center;
				margin: 20rpx 0;
				&__date,
				&__duration {
					color: #666;
					font-size: 26rpx;
				}
				&__date {
					position: relative;
					padding-right: 20rpx;
					&::after {
						content: '';
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 20rpx;
						width: 2rpx;
						background-color: #999;
					}
				}
				&__duration {
					padding-left: 20rpx;
				}
			}
		}

		.banner {
			display: flex;
			align-items: center;
			padding: 12rpx 18rpx;
			background-color: #eee;
			border-radius: 8rpx;
			font-size: 28rpx;
			letter-spacing: 1rpx;

			&.cutdown {
				color: #ed3f14;
				background-color: #fafafa;
				text {
					font-size: 32rpx;
				}
			}
			&-icon {
				margin-right: 8rpx;
			}
		}
	}
}
</style>

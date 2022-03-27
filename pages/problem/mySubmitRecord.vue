<template>
	<view>
		<u-navbar title="提交记录" :autoBack="true" height="44px" class="t-navbar"></u-navbar>
		<view class="msr-page t-pg">
			<view class="pr-list">
				<view class="pr-item" v-for="i in list" :key="i.id">
					<view class="pr-header">
						<view class="pr-header__left">
							<text class="title">{{ i.displayPid }} {{ i.title }}</text>
							<text class="date">{{ i.submitTime | formatDate }}</text>
						</view>
						<view class="pr-header__right" :style="{ background: JUDGE_STATUS[i.status].rgb }">{{ JUDGE_STATUS[i.status].name }}</view>
					</view>
					<view class="pr-body">
						<view class="pr-body__item">
							<text class="pr-body__item--left">运行时间</text>
							<text class="pr-body__item--right">{{ i.time }} ms</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">运行内存</text>
							<text class="pr-body__item--right">{{ i.memory }} KB</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">代码长度</text>
							<text class="pr-body__item--right">{{ i.length }} B</text>
						</view>
						<view class="pr-body__item">
							<text class="pr-body__item--left">语言</text>
							<text class="pr-body__item--right">{{ i.language }}</text>
						</view>
					</view>
					<view class="pr-footer">
						<button class="btn success" @click="gotoProblemDetail(i)">
							<t-icon color="#5ac725" fontSize="36rpx" type="icon-Share-"></t-icon>
							题目详情
						</button>
						<button class="btn primary" @click="gotoCodeDetail(i)">
							<t-icon fontSize="36rpx" type="icon-code"></t-icon>
							我的代码
						</button>
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
			id: ''
		};
	},
	methods: {
		async fetchSubmitList() {
			const res = await this.$api({ url: 'submissions', method: 'get', data: { onlyMine: true, currentPage: 1, problemID: this.id, contestID: 0, limit: 15 } });
		}
	},
	onLoad({ id }) {
		this.id = id;
	},
	onShow() {
		this.fetchSubmitList();
	}
};
</script>

<style lang="scss"></style>

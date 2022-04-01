<template>
	<view class="problem-list">
		<view class="problem-item" v-for="(i, idx) in data" :key="i.id">
			<view class="problem-item__idx">
				<t-icon type="icon-balloon" :color="$static.problemFlag[idx].color" fontSize="34rpx"></t-icon>
				{{ $static.problemFlag[idx].value }}
			</view>
			<view class="problem-item__title">{{ i.displayTitle }}</view>
			<view class="problem-item__AC">{{ i.ac }}/{{ i.total }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => []
		}
	},
	
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped></style>

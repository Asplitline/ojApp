<template>
	<view class="iconfont" :class="type" :style="{ color, fontSize }"></view>
</template>

<script>
export default {
	name: 't-icon',
	props: {
		type: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: '#4b55ff'
		},
		fontSize: {
			type: String,
			default: '24px'
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_3207542_8wttkg93qzx.css');
</style>

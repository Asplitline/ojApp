<template>
	<view class="t-box">
		<template v-if="show">
			<slot></slot>
		</template>
		<template v-else>
			<t-empty :text="text"></t-empty>
		</template>
	</view>
</template>

<script>
export default {
	name: 't-box',
	props: {
		text: {
			type: String
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>

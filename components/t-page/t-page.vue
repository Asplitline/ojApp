<template>
	<view class="page">
		<view class="status-bar"></view>
		<slot></slot>
	</view>
</template>

<script></script>

<style lang="scss" scoped>

.page {
	box-sizing: border-box;
	@include base-layout;
}
.status-bar {
	height: var(--status-bar-height);
}
</style>

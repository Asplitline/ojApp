<template>
	<view class="page">
		<view class="status-bar"></view>
		<slot></slot>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	// background-color: #fafafa;
	@include base-layout;
}
.status-bar {
	height: var(--status-bar-height);
}
</style>

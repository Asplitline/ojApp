<template>
	<view class="page">
		<view class="status-bar"><slot></slot></view>
	</view>
</template>

<script></script>

<style lang="scss" scoped>
.page {
	@include base-layout;
}
.status-bar {
	height: var(--status-bar-height);
}
</style>

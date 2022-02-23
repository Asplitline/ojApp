<template>
	<view class="page">
		<view class="status-bar"></view>
		<slot></slot>
	</view>
</template>

<script></script>

<style lang="scss" scoped>

.page {
	position: relative;
	box-sizing: border-box;
	background-color: #f6f6f6;
	height: 100%;
	@include base-layout;
}
.status-bar {
	height: var(--status-bar-height);
}
page {
	height: 100%;
}
</style>

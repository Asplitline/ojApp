<template>
	<view class="hljs-box">
		<pre :class="className">
			<code v-html="highlightCode"></code>
		</pre>
		<!-- <view class="hljs-language">{{ language }}</view> -->
	</view>
</template>

<script>
import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css';
export default {
	name: 't-hljs',
	props: {
		code: {
			type: String,
			default: ''
		},
		language: {
			type: String,
			default: 'c'
		},
		auto: {
			type: Boolean,
			default: false
		},
		customClass: {
			type: String,
			default: ''
		}
	},

	computed: {
		highlightCode() {
			return this.auto ? hljs.highlightAuto(this.code).value : hljs.highlight(this.language, this.code).value;
		},
		className() {
			return `hljs ${this.language} ${this.customClass}`;
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('~@/scss/github.css');
.hljs-box {
	/* padding: 20rpx; */
	position: relative;
	.hljs-language {
		content: '';
		top: 0;
		right: 0;
		position: absolute;
		height: 30px;
		padding: 0 10px;
	}
}
</style>

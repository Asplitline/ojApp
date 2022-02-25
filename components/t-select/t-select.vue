<template>
	<view class="t-select" :class="{ multiple: multiple }">
		<view class="t-select-list">
			<view class="t-select-item" v-for="i in showList" :key="i[keyName]" :class="{ active: i._isActive }" @click="setActive(i)">{{ i[valName] }}</view>
		</view>
	</view>
</template>

<script>
// done select {single | multiple}
export default {
	props: {
		valName: {
			type: String,
			default: 'value'
		},
		keyName: {
			type: String,
			default: 'key'
		},
		active: {
			type: [String, Number, Array]
		},
		list: {
			type: Array,
			default: () => []
		},
		multiple: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	mounted(){
		console.log(this.active);
	},
	computed: {
		showList() {
			return this.list.map(i => {
				const _isActive = this.multiple ? this.active.includes(i[this.keyName]) : i[this.keyName] === this.active;
				return { ...i, _isActive };
			});
		}
	},
	methods: {
		setActive(i) {
			if (!this.multiple) {
				this.$emit('update:active', i);
			} else {
				let arr = JSON.parse(JSON.stringify(this.active));
				if (arr.includes(i[this.keyName])) {
					const idx = arr.findIndex(v => v === i[this.keyName]);
					console.log(idx);
					idx === -1 ? arr : arr.splice(idx, idx + 1);
				} else {
					arr.push(i[this.keyName]);
				}
				this.$emit('change', arr);
			}
		},
		toggleActive() {},
		selectClass(i) {
			if (!this.multiple) {
				return i[this.keyName] === this.active ? 'active' : '';
			} else {
				return this.active.includes(i[this.keyName]) ? 'active' : '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.t-select {
	.t-select-list {
		display: flex;
		flex-wrap: wrap;
		.t-select-item {
			margin-right: 20rpx;
			padding: 8rpx 20rpx;
			background-color: #f5f5f7;
			color: #666;
			border-radius: 8rpx;
			font-size: 28rpx;
			margin-top: 20rpx;
			&:last-child {
				margin-right: 0;
			}
			&.active {
				background-color: $uni-bg-color-primary;
				color: $uni-color-primary;
			}
		}
	}
	&.multiple {
		.t-select-list {
			.t-select-item {
				border-radius: 27rpx;
			}
		}
	}
}
</style>

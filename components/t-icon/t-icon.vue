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
      default: '48rpx'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
	@import url("https://at.alicdn.com/t/font_3207542_mywcgabuljo.css");
.iconfont {
  display: inline-block;
}
</style>

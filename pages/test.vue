<template>
  <view class="hljs-box"> </view>
</template>

<script>
import * as utils from '@/utils'
export default {
  data() {
    return {
      test1: [1000, 10000, 100000, 1000000]
    }
  },
  methods: {
    test() {
      this.test1.forEach((i) => {
        const res = utils.showDate(i)
        console.log(res)
      })
    }
  },
  mounted() {
    this.test()
  }
}
</script>

<style lang="scss"></style>

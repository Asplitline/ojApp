<template>
  <view class="pr-page">
    <u-navbar title="提交记录" :autoBack="true" height="44px" class="t-navbar"> </u-navbar>
    <view class="pr-list">
      <view class="pr-item" v-for="i in list" :key="i.id">
        <view class="pr-header">
          <view class="pr-header__left">
            <text class="title">{{ i.displayPid }} {{ i.title }}</text>
            <text class="date">2018-08-22 19:00:00</text>
          </view>
          <view class="pr-header__right"> Accept </view>
        </view>
        <view class="pr-body">
          <view class="pr-body__item">
            <text class="pr-body__item--left">运行时间</text>
            <text class="pr-body__item--right">{{ i.time }} ms</text>
          </view>
          <view class="pr-body__item">
            <text class="pr-body__item--left">运行内存</text>
            <text class="pr-body__item--right">{{ i.memory }} KB</text>
          </view>
          <view class="pr-body__item">
            <text class="pr-body__item--left">代码长度</text>
            <text class="pr-body__item--right">{{ i.length }} B</text>
          </view>
          <view class="pr-body__item">
            <text class="pr-body__item--left">语言</text>
            <text class="pr-body__item--right">{{ i.language }}</text>
          </view>
        </view>
        <view class="pr-body">
          <button class="btn">题目详情</button>
          <button class="btn">我的代码</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    async fetchSubmitList() {
      const {
        data: { records, total }
      } = await this.$api({
        url: '/submissions',
        method: 'get',
        data: {
          onlyMine: true,
          currentPage: 1,
          limit: 15,
          completeProblemID: false
        }
      })
      this.list = records
      // console.log(res)
    }
  },
  mounted() {
    this.fetchSubmitList()
  }
}
</script>

<style lang="scss" scoped>
.pr-page {
  padding-top: 100rpx;
  background-color: #fafafa;

  .pr-list {
    padding: 20rpx;
    .pr-item {
      padding: 30rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      border-radius: 10rpx;
      box-shadow: 1px 1px 1px 1px #0000000d;
    }
    .pr-header {
      display: flex;
      position: relative;
      &__left {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 32rpx;
          font-weight: 700;
        }
        .date {
          font-size: 26rpx;
          color: #666;
          margin-top: 10rpx;
        }
      }
      &__right {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .pr-body {
      display: flex;
      &__item {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 30rpx 0 10rpx;
        &--left,
        &--right {
          font-size: 26rpx;
        }
        &--left {
        }
        &--right {
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>

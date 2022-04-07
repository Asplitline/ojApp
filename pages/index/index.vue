<template>
  <t-page class="index">
    <u-swiper :list="carouselList" indicatorMode="line" keyName="url" :autoplay="false" class="swiper"></u-swiper>
    <!-- <navigator url="/pages/test" hover-class="navigator-hover">test </navigator> -->
    <view class="rank-content">
      <view class="rank-header">	
        <text class="title">近期排名(7天)</text>
        <view @click="goto" class="more">
          <text>总排名</text>
          <u-icon name="arrow-right" color="#fff"></u-icon>
        </view>
      </view>
			<t-rank :data="rankList" customClass="index"></t-rank>
      
    </view>

    <view class="recent-contest">
      <view class="recent-header">
        <text class="title">最近比赛</text>
      </view>
      <view class="recent-list">
        <view class="recent-item" v-for="i in recentOtherContest" :key="i.id">
          <view class="recent-item__top">
            <text class="title" @click="skipOuterLink(i)">{{ i.title }}</text>
          </view>
          <view class="recent-item__bottom">
            <view class="text"
              ><text>时间：{{ i.beginTime | formatDate('yyyy-MM-DD hh:mm') }}</text></view
            >
            <view class="text"
              ><text>时长: {{ handleTime(i) }}</text></view
            >
          </view>
        </view>
      </view>
    </view>
  </t-page>
</template>

<script>
// https://www.58pic.com/newpic/35507063.html
export default {
  data() {
    return {
      carouselList: [],
      rankList: [],
      recentOtherContest: []
    }
  },
  onLoad() {
    this.fetchData()
  },
  mounted() {},
  computed: {
    firstName() {}
  },
  filters: {
    firstName(v) {
      if (v.nickname) {
        return v.nickname.slice(0, 1)
      } else {
        return v.username.slice(-1)
      }
    }
  },
  methods: {
    handleTime({ beginTime, endTime }) {
      // const dateToNo =
      const dn = this.$utils.dateToNumber
      return this.$utils.showDate(dn(endTime) - dn(beginTime))
    },
    fetchData() {
      this.fetchCarousel()
      this.fetchRankList()
      this.fetchRecentOtherContest()
    },
    async fetchCarousel() {
      const { data } = await this.$api({ method: 'get', url: 'home-carousel' })
      this.carouselList = data.map((i) => ({
        ...i,
        url: this.$imgUrl + i.url
      }))
    },
    async fetchRankList() {
      const { data } = await this.$api({ method: 'get', url: 'get-recent-seven-ac-rank' })
      this.rankList = data
      console.log(this.rankList)
    },
    async fetchRecentOtherContest() {
      const { data } = await this.$api({ method: 'get', url: 'get-recent-other-contest' })
      this.recentOtherContest = data
    },
    goto() {
      uni.navigateTo({
        url: '/pages/index/rankDetail'
      })
    },
    skipOuterLink(i) {
      // #ifdef APP-PLUS
      plus.runtime.openURL(i.url)
      // #endif
      // #ifdef H5
      window.location.href = i.url
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  overflow: scroll;
  overflow-x: hidden;
  .swiper {
    padding: 10rpx;
    height: 200rpx;
    border-radius: 20rpx;
  }
  .rank-content {
    margin: 40rpx 0;
    .rank-header {
      display: flex;
      align-items: center;
      padding: 20rpx 30rpx;
      background-color: $uni-color-primary;
      color: $uni-color-white;
      border-radius: 20rpx 20rpx 0 0;
      .title {
        flex: 1;
      }
      .more {
        display: flex;
        .text {
        }
      }
    }
  }
  .recent-contest {
    .recent-header {
      display: flex;
      align-items: center;
      padding: 20rpx 30rpx;

      background-color: $uni-color-success;
      color: $uni-color-white;
      border-radius: 20rpx 20rpx 0 0;
      .title {
        flex: 1;
      }
      .more {
        display: flex;
        .text {
        }
      }
    }
    .recent-list {
      display: flex;
      flex-wrap: wrap;
      padding: 20rpx;
      background-color: #fff;
      border-radius: 0 0 20rpx 20rpx;
      .recent-item {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        border: 1px solid #f0f0f0;
        padding: 20rpx;
        border-radius: 8rpx;
        margin-bottom: 40rpx;
        &__top {
          .title {
            font-size: 30rpx;
            line-height: 1.2;
            color: $uni-color-primary;
            text-decoration: underline;
          }
        }
        &__bottom {
          display: flex;
          justify-content: space-between;
          color: #555555;
          .text {
            font-size: 28rpx;
            margin-top: 60rpx;
          }
        }
      }
    }
  }
}
</style>

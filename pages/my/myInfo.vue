<template>
  <view class="mi-page">
    <u-toast ref="uToast"></u-toast>

    <u-navbar title="我的资料" :autoBack="true" height="44px" class="t-navbar">
      <template #right>
        <text class="link" @click="handleSubmit">保存</text>
      </template>
    </u-navbar>
    <view class="mi-box">
      <u--form labelPosition="left" :model="infoData" :rules="rules" ref="infoData" errorType="toast" labelWidth="80" class="mi-form">
        <u-form-item label="头像" prop="oldEmail" borderBottom class="mi-form-item"
          ><u-upload :fileList="upload" previewFullImage class="mi-upload" @afterRead="afterRead" imageMode="aspectFill">
            <view class="img-box">
              <template v-if="!infoData.avatar">
                <image src="../../static/rank1.png" class="img"></image>
              </template>
              <template v-else>
                <image :src="`${imgUrl}/${infoData.avatar}`" class="img"></image>
              </template>
              <view class="edit-box"><u-icon class="edit-icon" name="edit-pen-fill"></u-icon></view>
            </view>
          </u-upload>
        </u-form-item>
        <u-form-item label="学号" prop="number" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.number" border="none"></u--input>
        </u-form-item>

        <u-form-item label="昵称" prop="nickname" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.nickname" border="none"></u--input>
        </u-form-item>
        <u-form-item label="真实姓名" prop="realname" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.realname" border="none"></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="gender" borderBottom @click="showSex = true" class="mi-form-item" ref="item1">
          <text class="">{{ showSexText }}</text>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="学校" prop="school" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.school" border="none"></u--input>
        </u-form-item>
        <u-form-item label="Github" prop="github" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.github" border="none"></u--input>
        </u-form-item>
        <u-form-item label="Blog" prop="blog" borderBottom class="mi-form-item"
          ><u--input v-model="infoData.blog" border="none"></u--input>
        </u-form-item>
        <u-form-item label="个人简介" prop="signature" borderBottom class="mi-form-item">
          <u--textarea v-model="infoData.signature" placeholder="请输入内容"></u--textarea>
        </u-form-item>
      </u--form>
    </view>
    <u-action-sheet :show="showSex" :actions="sexList" title="请选择性别" @close="showSex = false" @select="sexSelect"> </u-action-sheet>
  </view>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { apiUrl, imgUrl } from '@/utils/static'
export default {
  data() {
    return {
      infoData: {
        number: '',
        gender: '',
        nickname: '',
        realname: '',
        school: '',
        Github: '',
        blog: ''
      },
      upload: [],
      showSex: false,
      sexList: [
        {
          name: '男',
          value: 'male'
        },
        {
          name: '女',
          value: 'female'
        },
        {
          name: '保密',
          value: 'secrecy'
        }
      ],
      rules: {
        nickname: [{ required: true, trigger: 'blur', message: '请输入昵称' }],
        realname: [{ required: true, trigger: 'blur', message: '请输入真实姓名' }],
        gender: [{ required: true, trigger: 'blur', message: '请选择性别' }],
        school: [{ required: true, trigger: 'blur', message: '请输入学校名称' }]
        // Github: [{ required: true, trigger: 'blur', message: '请输入...' }],
        // blog: [{ required: true, trigger: 'blur', message: '请输入...' }]
      },
      imgUrl
    }
  },
  computed: {
    ...mapState(['user']),
    showSexText() {
      const i = this.sexList.find((i) => i.value === this.infoData.gender)
      return i ? i.name : '请选择性别'
    }
  },
  // onShow() {
  //   this.infoData = JSON.parse(JSON.stringify(this.user))
  // },
  // todo 数据置空问题 + 图片问题 + 用户数据获取
  mounted() {
    this.updateUser()
    this.infoData = JSON.parse(JSON.stringify(this.user))
  },
  methods: {
    ...mapActions(['updateUser']),
    ...mapMutations(['setUser']),
    resetForm() {
      this.$refs.infoData.resetFields()
    },
    showToast(message) {
      this.$refs.uToast.show({ message })
    },
    handleSubmit() {
      this.$refs.infoData.validate().then(async (v) => {
        const { status, msg, data } = await this.$api({ url: 'change-userInfo', data: this.infoData })
        if (status === 200) {
          this.setUser(data)
          this.infoData = JSON.parse(JSON.stringify(this.user))
        }
        this.showToast(msg)
      })
    },
    sexSelect(v) {
      this.infoData.gender = v.value
    },
    afterRead(evt) {
      this.uploadFilePromise(evt.file.url)
    },
    uploadFilePromise(url) {
      const token = uni.getStorageSync('token')
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: `${apiUrl}file/upload-avatar`,
          filePath: url,
          name: 'image',
          header: { Authorization: token },
          success: (res) => {
            const { data, statusCode } = res
            const t = JSON.parse(data)
            this.setUser(t.data)
            this.infoData = JSON.parse(JSON.stringify(this.user))
          },
          fail: (err) => {
            console.log(err)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mi-box {
  padding: 100rpx 40rpx 0;
}
.mi-form {
  ::v-deep.mi-form-item {
    .u-form-item__body {
      padding: 30rpx 0;
    }
  }
}
.mi-btns {
  display: flex;
  justify-content: space-evenly;
  .mi-btn {
    margin: 0;
    margin-top: 40rpx;
    background-color: $uni-color-primary;
    color: #fff;
    height: 72rpx;
    width: 240rpx;
    &.reset {
      background-color: #f3f5f7;
      color: #666;
    }
    &::before {
      border: none;
    }
    &::after {
      border: none;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.mi-upload {
  align-items: flex-end;
  .img-box {
    position: relative;
    background-color: #f0f0f08c;
    width: 120rpx;
    height: 120rpx;
    padding: 20rpx;
    border-radius: 50%;
    .img {
      width: 100%;
      height: 100%;
    }
    .edit-box {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .edit-icon {
        font-size: 32rpx;
      }
    }
  }
}
.link {
  color: $uni-color-primary;
}
</style>

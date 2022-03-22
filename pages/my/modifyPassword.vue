<template>
  <view class="mp-page">
    <u-toast ref="uToast"></u-toast>

    <u-navbar
      title="修改密码"
      :autoBack="true"
      height="44px"
      class="t-navbar"
    ></u-navbar>
    <view class="mp-box">
      <u--form
        labelPosition="left"
        :model="passwordInfo"
        :rules="rules"
        ref="passwordInfo"
        labelWidth="80"
        class="mp-form"
      >
        <u-form-item
          label="当前密码"
          prop="oldEmail"
          borderBottom
          class="mp-form-item"
          ><u--input
            v-model="passwordInfo.oldPassword"
            border="none"
            readonly
          ></u--input
        ></u-form-item>
        <u-form-item
          label="新密码"
          prop="newEmail"
          borderBottom
          class="mp-form-item"
          ><u--input v-model="passwordInfo.newPassword" border="none"></u--input
        ></u-form-item>
        <u-form-item
          label="确定新密码"
          prop="password"
          borderBottom
          class="mp-form-item"
          ><u--input
            v-model="passwordInfo.againPassword"
            type="password"
            border="none"
          ></u--input
        ></u-form-item>
      </u--form>
      <view class="mp-btns">
        <u-button class="mp-btn reset" type="info" @click="resetForm"
          >重置</u-button
        >
        <u-button class="mp-btn" type="success" @click="handleSubmit"
          >更新</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      passwordInfo: {
        oldPassword: '',
        newPassword: '',
        againPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入新电子邮箱',
            trigger: 'blur'
          },
          {
            validator: (rule, value) => {
              const reg =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              if (!reg.test(value)) {
                return new Error('邮箱格式错误')
              }
            },
            trigger: 'blur'
          },
          {
            asyncValidator: (rule, value) => {
              const promise = this.$api({
                url: 'check-usernamp-or-email',
                data: {
                  email: this.passwordInfo.newEmail
                }
              })
              return new Promise((resolve, reject) => {
                promise
                  .then(({ data }) => {
                    if (data.email) {
                      reject('邮箱已被绑定')
                    } else {
                      resolve()
                    }
                  })
                  .catch((err) => {
                    reject('未知错误')
                  })
              })
            },
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        againPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  onShow() {
    this.updateUser()
    this.passwordInfo.oldEmail = this.user.email
  },
  mpthods: {
    ...mapActions(['updateUser']),
    resetForm() {
      this.$refs.passwordInfo.resetFields()
    },
    showToast(message) {
      this.$refs.uToast.show({ message })
    },
    async validateEmailAndUsernamp() {
      const res = await this.$api({
        url: 'check-usernamp-or-email',
        data: {
          usernamp: this.registerForm.usernamp,
          email: this.registerForm.email
        }
      })
      console.log(res)
    },
    handleSubmit() {
      this.$refs.passwordInfo.validate().then(async (v) => {
        console.log(v)
        const { status, msg } = await this.$api({
          url: 'change-email',
          data: this.passwordInfo
        })
        this.showToast(msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mp-box {
  padding: 140rpx 40rpx 0;
}
.mp-form {
  ::v-deep.mp-form-item {
    .u-form-item__body {
      padding: 40rpx 0;
    }
  }
}
.mp-btns {
  display: flex;
  justify-content: space-evenly;
  .mp-btn {
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
</style>

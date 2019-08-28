<template>
  <div class="login">
      <el-card class="card">
          <img src="./../../assets/img/logo_index.png" alt="">
          <el-form :model="formData" ref="form" :rules="rules">
              <el-form-item prop="mobile">
                  <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="formData.code" placeholder="请输入密码" class="pwd_input"></el-input>
                  <el-button plain class="code">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="login" type="primary" class="login_btn">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import { login, login2 } from '../../api/login'
export default {
  methods: {
    login () {
      // console.log(this.$refs.form)
      this.$refs.form.validate(async (isok, result) => {
        if (isok) {
          // console.log(login)
          console.log(login2)
          let result = await login(this.formData)
          // console.log(result)
          // let result = await this.$axios({
          //   url: 'authorizations',
          //   method: 'post',
          //   data: this.formData
          // })
          // console.log(result)

          localStorage.setItem('userInfo', JSON.stringify(result.data))
          console.log(123)
          this.$router.push('/home')
        }
      })
    }
  },
  data () {
    var func = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('勾选'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误', trigger: 'blur' }
        ],
        check: [
          { validator: func }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    height: 100vh;
    background-image: url(./../../assets/img/login_bg.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .card{
        width: 400px;
        height: 330px;
        img{
            height: 40px;
            display: block;
            margin: 0 auto 10px;
        }
        .pwd_input{
            width: 65%;
        }
        .code{
            float: right
        }
        .login_btn{
            width: 100%;
        }
    }
}
</style>

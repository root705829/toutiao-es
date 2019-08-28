<template>
  <el-card class="card">
      <bread-crumb slot="header"><span slot="title">账户信息</span></bread-crumb>
      <el-row type="flex">
        <el-form :model="ruleForm"  label-width="100px" >
            <el-form-item label="用户名称" >
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户简介">
                <el-input v-model="ruleForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input v-model="ruleForm.mobile" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit">保存信息</el-button>
            </el-form-item>
        </el-form>
        <div class="photobox">
            <div>
                <el-upload action :http-request="uploadIMG">
                    <img :src="ruleForm.photo" alt="">
                </el-upload>
            </div>
        </div>
      </el-row>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
import { $edit, $uploadIMG, $getData } from '../../api/account'
export default {
  data () {
    return {
      ruleForm: {

      }
    }
  },
  methods: {
    async getData () {
      let result = await $getData()
      // let result = await this.$axios({
      //   url: 'user/profile'
      // })
      console.log(result)
      this.ruleForm = result.data
    },
    async uploadIMG (abc) {
      let formData = new FormData()
      formData.append('photo', abc.file)
      let result = await $uploadIMG(formData)
      // let result = await this.$axios({
      //   method: 'patch',
      //   url: 'user/photo',
      //   data: formData
      // })
      console.log(result)
      this.ruleForm.photo = result.data.photo
      eventBus.$emit('uploadSuccess', result.data.photo)
    },
    async edit () {
      await $edit(this.ruleForm)
      // await this.$axios({
      //   method: 'patch',
      //   url: 'user/profile',
      //   data: this.ruleForm
      // })
      eventBus.$emit('editSuccess')
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.card {
    min-height: 100%;
}
.photobox {
    display: flex;
    align-items: center;
    margin-left: 80px;
    div {
        width: 350px;
        height: 300px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">发表文章 {{typeof id}} {{id&&id.length}} {{typeof ruleForm.cover.type}}</span>
    </bread-crumb>
    <el-form
      label-position="right"
      label-width="80px"
      :model="ruleForm"
      :rules="rules"
      ref="myForm"
    >
      <el-form-item label="* 标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="* 内容" prop="content">
        <quill-a class="quill" v-model="ruleForm.content"></quill-a>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group @change="passValue" v-model="ruleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <uploadContainer
        :type="ruleForm.cover.type"
        :images="ruleForm.cover.images"
        @passurlandindex="init">
      </uploadContainer>
      <el-form-item label="* 频道" prop="channel_id">
        <el-select v-model="ruleForm.channel_id">
          <el-option v-for="(item,index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validate(false)">发布</el-button>
        <el-button @click="validate(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadContainer from '../../components/publish/upload-container'
import { $fromIDget, $publish, $getchannel } from '../../api/publish'
import URL from '../../constant/api'
export default {
  components: { uploadContainer: uploadContainer },
  data () {
    return {
      list: [],
      id: null,
      ruleForm: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题内容应该是5-30个字符之间' }
        ],
        content: [{ required: true, message: '内容内容不能为空' }],
        channel_id: [{ required: true, message: '请选择频道' }]
      }
    }
  },
  methods: {
    async getchannel () {
      let result = await $getchannel()
      // let result = await this.$axios({
      //   url: 'channels'
      // })
      // console.log(result)
      this.list = result.data.channels
    },
    validate (draft) {
      let length = this.ruleForm.cover.images.length
      let bool
      if (length === 3 || length === 1) {
        bool = this.ruleForm.cover.images.every((item, index, arr) => item !== '')
      } else {
        bool = true
      }
      console.log(this.$refs.myForm)
      this.$refs.myForm.validate(isok => {
        if (isok) {
          console.log(isok)
          if (!bool) {
            this.$message({ type: 'warning', message: '您的图片信息还未填写完成' })
            return
          }
          this.publish(draft)
        }
      })
    },
    fromTypegetArr () {
      if (this.ruleForm.cover.type === 1) {
        this.ruleForm.cover.images = ['']
      } else if (this.ruleForm.cover.type === 3) {
        this.ruleForm.cover.images = ['', '', '']
      } else {
        this.ruleForm.cover.images = []
      }
    },
    async publish (draft) {
      let method = this.$route.params.id ? 'put' : 'post'
      let url = this.$route.params.id ? (URL.publish.publish + `/${this.id}`) : URL.publish.publish
      await $publish(method, url, draft, this.ruleForm)
      // await this.$axios({
      //   method,
      //   url,
      //   params: { draft },
      //   data: this.ruleForm
      // })
      this.$router.push('/home/articles')
    },
    fromIDget () {
      this.id = this.$route.params.id
      let id = this.id
      this.id && $fromIDget(id).then(result => {
        console.log(result)
        this.ruleForm = result.data
      })
      // id &&
      //   this.$axios({
      //     url: `articles/${id}`
      //   }).then(result => {
      //     console.log(result)
      //     this.ruleForm = result.data
      //   })
    },
    passValue (type) {
      this.fromTypegetArr()
    },
    init (url, index) {
      console.log(url)
      this.ruleForm.cover.images = this.ruleForm.cover.images.map((item, i) => {
        return index === i ? url : item
      })
      console.log(this.ruleForm.cover.images)
    }
  },
  created () {
    this.getchannel()
    this.fromIDget()
  }
}
</script>

<style lang="less" scoped>
.quill {
  height: 300px;
  margin-bottom: 70px;
}
</style>

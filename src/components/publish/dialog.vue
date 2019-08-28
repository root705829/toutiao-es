<template>
  <el-dialog :visible="bool" :before-close="handleclose">
    <el-card>
      <el-tabs v-model="nameValue1">
        <el-tab-pane label="素材库" name="Library">
          <div class="img-list">
            <el-card  class="img-card" v-for="(item,index) in list" :key="index" >
              <img :src="item.url" alt @click="clickIMG(item)"/>
            </el-card>
          </div>
          <el-row type="flex" justify="center">
            <el-pagination
              layout="prev, pager, next"
              :page-size="page.pageSize"
              :current-page="page.currentPage"
              :total="page.total"
              @current-change="currentChange"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="Upload">
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadImg"
                >
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-dialog>
</template>

<script>
import eventBus from './eventBus'
export default {
  data () {
    return {
      list: [],
      bool: false,
      nameValue1: 'Library',
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },

  methods: {
    async getdata (value) {
      console.log(value)
      let result = await this.$axios({
        url: 'user/images',
        params: { collect: value === '收藏', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      console.log(result)
      this.list = result.data.results
      let { page, per_page: pageSize, total_count: total } = result.data
      this.page.currentPage = page
      this.page.pageSize = pageSize
      this.page.total = total
    },
    reGet () {
      this.getdata()
    },
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getdata()
    },
    async uploadImg (abc) {
      console.log(abc)
      var formData = new FormData()
      formData.append('image', abc.file)
      let result = await this.$axios({
        method: 'post',
        url: 'user/images',
        data: formData
      })
      console.log(result)
      // result.data.url
      this.$emit('uploadSuccess', result.data.url)
      this.bool = false
    },
    clickIMG (item) {
      console.log(item)
      this.$emit('uploadSuccess', item.url)
      this.bool = false
    },
    handleclose (done) {
      // console.log(21, done)
      this.bool = false
      // done()
    }
  },
  created () {
    this.getdata()
    eventBus.$on('openDialog', () => {
      // console.log('bus')
      this.bool = true
    })
    console.log('dialog')
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .img-card {
    width: 161px;
    height: 160px;
    margin: 4px 4px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

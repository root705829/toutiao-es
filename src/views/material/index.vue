<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">素材管理</span>
    </bread-crumb>
    <el-upload action="" :http-request="uploadImg" class="upload-material"
    :show-file-list="false">
        <el-button type="primary" size="medium">图片上传</el-button>
    </el-upload>
    <!--el-tabs中 v-model属性绑定是当前子标签页的name -->
    <el-tabs v-model="namelValue" @tab-click="handleClick">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="index">
            <img :src="item.url" alt />
            <el-row align="middle" type="flex" justify="space-around" class="operate">
              <i class="el-icon-star-on" @click="likeORdislike(item)" :style="{color:item.is_collected?'red':''}"></i>
              <i class="el-icon-delete-solid" @click="delImg(item)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="index">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-row type="flex" justify="center" style="margin:20px 0;">
      <el-pagination :background="true"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="currentChange"
      ></el-pagination>
    </el-row>
    {{namelValue}}{{'当前页'+page.currentPage}}
  </el-card>
</template>

<script>
import { $uploadImg, $likeORdislike, $delImg, $getImgs } from '../../api/material'
export default {
  data () {
    return {
      namelValue: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 15
      },
      isCollect: false
    }
  },
  methods: {
    handleClick (tab, event) {
    //   console.log(tab, event)
    //   console.log(tab.name, tab.label)
      if (tab.name === 'all') {
        this.isCollect = false
        this.page.currentPage = 1
        this.getImgs()
      } else {
        this.isCollect = true
        this.page.currentPage = 1
        this.getImgs()
      }
    },
    currentChange (newPage) {
    //   console.log(newPage)
      this.page.currentPage = newPage
      this.getImgs()
    },
    async getImgs () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        collect: this.isCollect
      }
      let result = await $getImgs(params)
      // let result = await this.$axios({
      //   url: 'user/images',
      //   params
      // })
      console.log($getImgs)
      // console.log(result)
      this.list = result.data.results
      let {
        total_count: total,
        page: currentPage,
        per_page: pageSize
      } = result.data
      this.page.total = total
      this.page.currentPage = currentPage
      this.page.pageSize = pageSize
    },
    delImg (item) {
      this.$confirm('您确定要删除此照片吗?', '提示').then(async () => {
        await $delImg(item)
        // await this.$axios({
        //   method: 'delete',
        //   url: `user/images/${item.id}`
        // })
        console.log($delImg)
        // console.log(result)
        this.getImgs()
      }).catch(() => {})
    },
    async likeORdislike (item) {
      await $likeORdislike(item)
      // await this.$axios({
      //   method: 'put',
      //   url: `user/images/${item.id}`,
      //   data: { collect: !item.is_collected }
      // })
      console.log($likeORdislike)
      // console.log(result)
      this.getImgs()
    },
    async uploadImg () {
      // console.log(arguments)
      var formData = new FormData()
      formData.append('image', arguments[0].file)
      await $uploadImg(formData)
      this.$message('上传成功')
      // await this.$axios({
      //   method: 'post',
      //   url: 'user/images',
      //   data: formData
      // })
      console.log($uploadImg)
      // console.log(result)
      this.page.currentPage = 1
      this.getImgs()
    }
  },
  created () {
    this.getImgs()
  }
}
</script>

<style lang="less" scoped>
.upload-material{
  position: absolute;
  z-index: 1;
  right: 40px;
  margin-top:-10px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 20px 10px;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      width: 100%;
      height: 30px;
      background-color: pink;
      bottom: 0;
      left: 0;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>

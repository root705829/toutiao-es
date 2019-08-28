<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">内容列表</span>
    </bread-crumb>
    <el-form class="form">
      <el-form-item label="文章状态">
        <el-radio-group v-model="radio" @change="coniditionchange">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
        {{radio}}
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="selectValue" @change="coniditionchange">
          <el-option
            v-for="(item,index) in channel"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        {{selectValue}}
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="dateValue"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="coniditionchange"
        ></el-date-picker>
        {{dateValue}}
      </el-form-item>
    </el-form>

    <!-- {{radio+typeof radio}} -->
        共找到{{page.total}}条数据
    <div class="container">
      <div class="row" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div id="img">
            <img :src="item.cover.images[0]" alt />
          </div>
          <div class="detail" style="margin-left:20px;">
            <span>{{item.title}}</span>
            <el-tag class="tag" :type="item.status|tag_type">{{item.status|tag_text}}</el-tag>
            <div style="font-size:12px;color:#aaa;">{{item.pubdate}}</div>
          </div>
        </div>
        <div class="right">
          <div @click="edit(item)">
            <i class="el-icon-edit"></i>&nbsp;修改
          </div>
          <div @click="deleteWZ(item)">
            <i class="el-icon-delete"></i>&nbsp;删除
          </div>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center">
      <el-pagination
        :background="true"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="currentchange"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { $deleteWZ, $getchannel, $getlist } from '../../api/articles'
export default {
  data () {
    return {
      radio: 5,
      selectValue: '',
      dateValue: [],
      list: [],
      channel: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    async getlist (params) {
      let result = await $getlist(params)
      // let result = await this.$axios({
      //   url: 'articles',
      //   params: params
      // })
      console.log(result)
      this.list = result.data.results
      let { total_count: total, page, per_page: pageSize } = result.data
      this.page.total = total
      this.page.currentPage = page
      this.page.pageSize = pageSize
    },
    async getchannel () {
      let result = await $getchannel()
      // let result = await this.$axios({
      //   url: 'channels'
      // })
      // console.log(result)
      this.channel = result.data.channels
    },
    getconidition () {
      let params = {
        status: this.radio === 5 ? null : this.radio,
        channel_id: this.selectValue === '' ? null : this.selectValue,
        begin_pubdate: this.dateValue && this.dateValue.length ? this.dateValue[0] : null,
        end_pubdate: this.dateValue && this.dateValue.length > 1 ? this.dateValue[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      //   params.page = this.page.currentPage
      //   params.per_page = this.page.pageSize
      return params
    },
    currentchange (newPage) {
      this.page.currentPage = newPage
      let params = this.getconidition()
      this.getlist(params)
    },
    coniditionchange () {
      this.page.currentPage = 1
      let params = this.getconidition()
      this.getlist(params)
    },
    deleteWZ (item) {
      this.$confirm('您确定删除吗?').then(async result => {
        await $deleteWZ(item)
        // let result = await this.$axios({
        //   method: 'delete',
        //   url: `articles/${item.id}`
        // })
        console.log(result)
        this.getconidition()
        this.getlist()
      }).catch(() => {})
    },
    edit (item) {
      console.log(item.id)
      this.$router.push(`/home/publish/${item.id}`)
    }
  },
  created () {
    this.getlist({ page: 1, per_page: this.page.pageSize })
    this.getchannel()
  },
  filters: {
    tag_text (value) {
      switch (value) {
        case 0:
          return '草稿'// warning
        case 2:
          return '审核成功'// success
        case 3:
          return '审核失败'// danger
        case 4:
          return '已删除'
      }
    },
    tag_type (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return ''
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form {
    margin-bottom: 50px;
}
.container {
    margin-top: 20px;
    border-top: 1px dashed #ccc;

}
.row {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .left {
    display: flex;
    #img {
      width: 180px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .tag {
        width: 70px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    display: flex;
    width: 120px;
    justify-content: space-around;
    div {
      cursor: pointer;
    }
  }
}
</style>

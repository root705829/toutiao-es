<template>
  <el-card>
    <template slot="header">
      <bread-crumb>
        <span slot="title">评论列表</span>
      </bread-crumb>
    </template>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="title" label="评论内容"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" :formatter="abc"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="closeOrOpen(obj.row)"
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0;">
      <el-pagination
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        @current-change="changepage"
        :current-page="page.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { $closeOrOpen, $getComment } from '../../api/comment'
export default {
  data () {
    return {
      tableData: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    async getComment () {
      this.loading = true
      let pageobj = {
        per_page: this.page.pageSize,
        page: this.page.currentPage
      }
      let result = await $getComment(pageobj)
      // let result = await this.$axios({
      //   url: 'articles',
      //   params: { response_type: 'comment', ...pageobj }
      // })
      // console.log(result)
      this.tableData = result.data.results
      this.page.pageSize = result.data.per_page
      this.page.total = result.data.total_count
      this.loading = false
    },
    abc (row, column, cellValue, index) {
      // console.log(cellValue)
      return cellValue ? '正常' : '关闭'
    },
    // abc2 (row, column, cellValue, index) {
    //   // console.log(row.comment_status)
    //   return row.comment_status ? '关闭评论' : '打开评论'
    // },
    // change123 (row, column, cell, event) {
    //   // console.log(row.comment_status)
    //   this.$axios({
    //     method: 'put',
    //     url: 'comments/status',
    //     params: { article_id: row.id },
    //     data: { allow_comment: !row.comment_status }
    //   }).then(result => {
    //     console.log(result)
    //   })
    // },
    changepage (q) {
      this.page.currentPage = q
      this.getComment()
    },
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗?`, '提示').then(async () => {
        await $closeOrOpen(row)
        // await this.$axios({
        //   method: 'put',
        //   url: '/comments/status',
        //   params: { article_id: row.id.toString() },
        //   data: { allow_comment: !row.comment_status }
        // })
        this.getComment()
      }).catch(() => {})
    }
    // closeOrOpen (row) {
    //   let mess = row.comment_status ? '关闭' : '打开'
    //   this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
    //     this.$axios({
    //       method: 'put',
    //       url: '/comments/status',
    //       params: { article_id: row.id.toString() },
    //       data: { allow_comment: !row.comment_status } // 状态是反着的
    //     }).then((result) => {
    //       // 如果进入到then函数 一定成功
    //       // this.getComments()
    //       console.log(result)
    //     })
    //   })
    // }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>

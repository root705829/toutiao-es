<template>
    <div class="aside" >
        <div class="title">
            <img :src="isfold?smallImg:bigImg" alt="">
        </div>
        <el-menu text-color="#ccc" background-color="#353b4e" :router="bool" active-text-color="yellow"
        :collapse="isfold" :collapse-transition="false"
        >
            <el-menu-item>
                <i class="el-icon-s-home"></i>
                首页
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-mouse"></i>
                    内容管理系统
                </template>
                <el-menu-item index="/home/publish">发表文章</el-menu-item>
                <el-menu-item index="/home/articles">内容列表</el-menu-item>
                <el-menu-item index="/home/comment">评论列表</el-menu-item>
                <el-menu-item index="/home/material">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-present"></i>
                    粉丝管理
                </template>
                <el-menu-item index="/home/fansdata">图文信息</el-menu-item>
                <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
                <el-menu-item index="/home/fansimg">粉丝花香</el-menu-item>
                <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/account">
                <i class="el-icon-key"></i>
                账户信息
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png'),
      bool: true,
      isfold: false
    }
  },
  created () {
    eventBus.$on('foldORopen', isFold => {
      this.isfold = isFold
    })
  }
}
</script>

<style lang="less" scoped>
.aside{
    .title{
        padding: 15px 0;
        text-align: center;
        background-color: #2e2f32;
        img{
            height: 30px;
        }
    }
}
</style>

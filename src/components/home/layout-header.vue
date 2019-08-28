<template>
  <el-row class="layout-header" type="flex" justify="space-between">
    <el-col :span="6" class="left-header">
      <i
        @click="foldORopen"
        :class="fold?'el-icon-turn-off':'el-icon-open'"
        style="font-size:24px;margin-right:5px;background:#eee;border-radius:10px;"
      ></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right-header">
      <img :src="user.photo ? user.photo : imgurl" alt />
      <!-- <img :src="imgurl" alt=""> -->
      <el-dropdown trigger="click" @command="logout">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      user: {},
      imgurl: require('../../assets/img/avatar.jpg'),
      fold: false
    }
  },
  methods: {
    logout (value) {
      if (value === 'logout') {
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
    },
    async getUserInfo () {
      // console.log(1)
      let result = await this.$axios({
        url: 'user/profile'
      })
      // console.log(result)
      this.user = result.data
    },
    foldORopen () {
      this.fold = !this.fold
      eventBus.$emit('foldORopen', this.fold)
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('uploadSuccess', url => {
      console.log(url)
      this.user.photo = url
    })
    eventBus.$on('editSuccess', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  padding: 10px 0;
  .left-header {
    display: flex;
    align-items: center;
  }
  .right-header {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

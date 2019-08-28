<template>
  <el-container>
    <el-aside style="min-height:100vh;background-color:#323745;" :style="fold?'width:49px;':'width:200px;'">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
import eventBus from '../../utils/eventBus'
export default {
  components: {
    // 'layout-aside': layoutAside
    // 'layout-header': layoutHeader
  },
  data () {
    return {
      fold: false
    }
  },
  created () {
    eventBus.$on('foldORopen', (isFold) => {
      this.fold = isFold
    })
  }
}
</script>

<style scoped>

</style>>

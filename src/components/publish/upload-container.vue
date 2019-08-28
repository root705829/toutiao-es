<template>
  <div>
    <div class="big">
        <div v-for="(item,index) in images" :key="index" class="box" @click="opendialog(index)">
          <img :src="item ? item : defaultIMG" alt="">
        </div>
    </div>
    <diaLog @uploadSuccess="passurlandindex"></diaLog>
  </div>

</template>

<script>
import dialog from './dialog'
import eventBus from './eventBus'
export default {
  components: { diaLog: dialog },
  props: ['type', 'images'],
  data () {
    return {
      index: -1,
      defaultIMG: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    opendialog (i) {
      this.index = i
      eventBus.$emit('openDialog')
    },
    passurlandindex (url) {
      console.log(url, this.index)
      this.$emit('passurlandindex', url, this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.big {
    display: flex;
    // background-color: pink;
    margin-left: 50px;
    margin-bottom: 10px;
    .box {
        width: 120px;
        height: 120px;
        border: 1px solid #ccc;
        img {
          width: 100%;
          height: 100%;
        }
    }
}
</style>

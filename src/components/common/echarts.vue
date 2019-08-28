<template>
  <div class="box" ref="box"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  methods: {
    init () {
      console.log(this.$refs.box)
      let chart = echarts.init(this.$refs.box)
      let option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }

      chart.setOption(option)
    }
  },
  created () {
    // this.init()
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 400px;
}
</style>

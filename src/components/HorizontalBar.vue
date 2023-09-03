<template>
  <div>
    <div class="flex justify-between items-center">【大区数据信息】 <slot></slot></div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref, onMounted, watch} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

let myChart = null
const target = ref(null)

onMounted(()=> {
  myChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    xAxis: {
      show: false,
      type: 'value',
      max: function (value){
        return parseInt(`${value.max * 1.2}`)
      }
    },
    yAxis: {
      type: 'category',
      data: props.data.regions.map((item)=>item.name),
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#22a2c3'
      }
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        data: props.data.regions.map(item=>({
          name: item.name,
          value: item.value,
        })),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color: '#2f89cf',
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'right',
          color: '#fff'
        }
      }
    ]
  }
  myChart.setOption(options)
}

watch(()=>props.data, renderChart)

</script>

<style scoped lang="scss">

</style>
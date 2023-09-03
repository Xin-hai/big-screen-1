<template>
  <div>
    <div>【服务资源占比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";

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
      show: true,
      type: 'category',
      data: props.data.servers.map((item)=>item.name),
      inverse: false,
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        color: '#22a2c3'
      }
    },
    yAxis: {
      show: false,
      type: 'value',
      max: function (value){
        return parseInt(`${value.max * 1.2}`)
      }
    },
    grid: {
      top: 16,
      right: '1%',
      bottom: 36,
      left: '1%',
    },
    series: [
      {
        type: 'bar',
        data: props.data.servers.map(item=>({
          name: item.name,
          value: item.value,
        })),
        itemStyle: {
          color: '#2f89cf',
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: '{c} %'
        }
      }
    ]
  }
  myChart.setOption(options)
}

watch(()=>props.data,renderChart)

</script>

<style scoped lang="scss">

</style>
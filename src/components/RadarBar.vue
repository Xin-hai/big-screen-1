<template>
  <div>
    <div>【云端报警风险】</div>
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

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    radar: {
      center: ['50%', '50%'],
      radius: '85%',
      axisName: {
        textStyle: {
          color: '#05d5ff',
          fontSize: 14
        }
      },
      shape: 'polygon',
      startAngle: 120,
      axisLine: {
        lineStyle: {
          color: 'rgba(5,213,255,0.8)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(5,213,255,0.8)'
        }
      },
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: 100,
        min: 0
      })),
      splitArea: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '0%',
    },
    // 角度轴
    angleAxis: {
      min: 0,
      // 坐标轴分割间隔
      interval: 5,
      clockwise: false,
    },
    // 径向轴
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show: false
      }
    },
    series:
        {
          type: 'radar',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
              color: '05D5ff'
          },
          areaStyle: {
              color: '05D5ff',
              opacity: .5
          },
          lineStyle: {
            width: 2,
            color: '05D5ff'
          },
          label: {
              show: true,
              color: '#fff'
          },
          data: [
            {
              value: props.data.risks.map((item) => item.value)
            }
          ]
        }
  }
  myChart.setOption(options)
}

watch(() => props.data, renderChart)
</script>

<style scoped lang="scss">

</style>
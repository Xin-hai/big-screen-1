<template>
  <div>
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
    timeline: {
      data: props.data.voltageLevel,
      // axisType: 'category',
      autoPlay: true,
      // 根据数据刷新定
      playInterval: 3000,
      controlPosition: 'right',
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      symbol: 'diamond',
      symbolSize: 12,
      label: {
        color: '#ddd'
      },
      emphasis: {
        label: {
          color: 'rgba(5,213,255,0.8)'
        },
        controlStyle: {
          color: '#aaa',
          borderColor: '#aaa'
        }
      },
      lineStyle: {
        color: '#555',
        width: 2,
      },
      checkpointStyle: {
        borderColor: '#888',
        borderWidth: 2
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        color: '#666',
        borderColor: '#666',
      }
    },
    baseOption: {
      grid: {
        top: '15%',
        right: '2%',
        bottom: '10%',
        width: '20%'
      }
    },
    options: [],
  }
  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroundColor: '#142037',
      title: [
        {
          text: '2019-2023年度数据统计',
          left: '0%',
          top: '0%',
          textStyle: {
            color: '#ccc',
            fontSize: 30
          }
        },
        {
          text: '该地图仅显示中国部分区域，特此注明',
          top: '5%',
          left: '0%',
          textStyle: {
            color: '#ccc',
            fontSize: 12
          }
        },
        {
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#ccc',
            fontSize: 20
          }
        }
      ],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        splitLine: {
          show: false
        },
        axisLabel: {
          margin: 4,
          color: '#aaa'
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false
        },
        label: {
          interval: 0,
          textStyle: {
            color: '#ddd',
          }
        },
        data: props.data.categoryData[item].map((item)=>item.name)
      },
      series: [
        {
          type: 'bar',
          zlevel: 1.5,
          itemStyle: {
            color: props.data.colors[index+1]
          },
          data: props.data.categoryData[item].map((item)=> item.value)
        }
      ]
    })
  })
  myChart.setOption(options)
}

watch(() => props.data, renderChart)

</script>

<style scoped lang="scss">

</style>
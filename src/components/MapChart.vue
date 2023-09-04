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
console.log(props.data)

let myChart = null
const target = ref(null)

onMounted(()=> {
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
    }
  }
  myChart.setOption(options)
}

watch(()=>props.data, renderChart)

</script>

<style scoped lang="scss">

</style>
<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import 'echarts-wordcloud'
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

const randomRgb = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}

const renderChart = () => {
  const options = {
    series: [
      {
        // 此配置需参考 echarts-wordcloud
        type: 'wordCloud',
        left: 'center',
        top: 'center',
        width: '85%',
        height: '85%',
        right: null,
        bottom: null,
        sizeRange: [8, 48],
        rotationRange: [0, 0],
        gridSize: 6,
        layoutAnimation: true,
        textStyle: {
          color: randomRgb
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000',
            textShadowBlur: 1,
            textShadowColor: 'blue'
          }
        },
        data: props.data.datas
      }
    ]
  }
  myChart.setOption(options)
}

watch(()=>props.data,renderChart)

</script>

<style scoped lang="scss">

</style>
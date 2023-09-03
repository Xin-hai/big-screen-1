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

const renderChart = () => {
  const options = {}
  myChart.setOption(options)
}

watch(()=>props.data,renderChart)

</script>

<style scoped lang="scss">

</style>
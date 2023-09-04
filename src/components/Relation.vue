<template>
  <div>
    <div>【数据传递信息】</div>
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
    xAxis: {show: false, type: 'value'},
    yAxis: {show: false, type: 'value'},
    series: [
      {
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 26,
        z: 3,
        edgeLabel: {
          show: true,
          color: '#fff',
          fontSize: 14,
          formatter: function(params){
            return params.data.speed
          }
        },
        label: {
          show: true,
          position: 'bottom',
          distance: 10,
          color: 'rgba(5,213,255,0.6)',
          rotate: 0,
          align: 'center'
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 8,
        data: props.data.relations.map(item=>{
          if(item.id!==0){
            return {
              name: item.name,
              category: 0,
              // speed: `${item.speed}kb/s`,
              value: item.value,
            }
          }else{
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                color: {
                  colorStops: [
                    {offset: 0, color: '#e871ff'},
                    {offset: 1, color: '#35c2ff'}
                  ]
                }
              },
              label: {
                fontSize: 16
              }
            }
          }
        }),
        links: props.data.relations.map((item, index)=> ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle: {
            color: '#12b5d0',
            curveness: 0.2
          },
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0]
          }
        }))
      },
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55,155,255,0.6)',
          symbolSize: 10
        },
        lineStyle: {
          curveness: 0.2
        },
        data: [
          // 二维坐标数组
          { coords: [ [0,300], [50,200] ] },
          { coords: [ [0,100], [50,200] ] },
          { coords: [ [50,200], [100,300] ] },
          { coords: [ [50,200], [100,100] ] }
        ]
      }
    ]
  }
  myChart.setOption(options)
}

watch(()=>props.data,renderChart)

</script>

<style scoped lang="scss">

</style>
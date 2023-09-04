<template>
  <div class=" bg-cover bg-center
   h-screen text-white p-2 flex overflow-hidden" v-if="data" :style="{ backgroundImage: `url( ${bg} )` }">
    <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--      横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData">  <button @click="change" class="text-lime-500">背景切换</button></HorizontalBar>
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
      <!--      雷达图-->
      <Relation class="h-1/3" :data="data.relationData"/>
      <!--      关系图-->
    </div>
    <div class="w-1/2 mr-2 flex flex-col">
      <!--      数据总览图-->
      <TotalData class="opacity-50 bg-slate-800 p-3 " :data="data.totalData"/>
      <!--      地图可视化-->
      <MapChart class="opacity-50 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData"/>
    </div>
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--      竖向柱状图 -->
      <VerticalBar class="h-1/3 box-border pb-3"  :data="data.serverData"/>
      <!--      环形图 -->
      <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData"/>
      <!--      文档云图 -->
      <WordCloud class="h-1/3 box-border " :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import MapChart from "./components/MapChart.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import RingBar from "./components/RingBar.vue";
import TotalData from "./components/TotalData.vue";
import VerticalBar from "./components/VerticalBar.vue";
import WordCloud from "./components/WordCloud.vue";
import bg1 from './assets/imgs/bg-1.jpg'
import bg2 from './assets/imgs/bg-2.jpg'
import bg3 from './assets/imgs/bg-3.jpg'
import bg4 from './assets/imgs/bg-4.jpg'
import bg5 from './assets/imgs/bg-5.jpg'

import {ref} from "vue";
import {getVisualization} from './api/visualization.js'

let bg = bg1
let bgImages = [bg1,bg2,bg3,bg4,bg5]
const change = ()=> {
  let {length} = bgImages
  if(bg !== bgImages[length-1]){
    let index = bgImages.indexOf(bg) + 1
    bg = bgImages[index]
  }else{
    bg = bg1
  }
}



const data = ref(null)
const loadData = async ()=> {
  data.value = await getVisualization()
}

setInterval(()=> {
  loadData()
}, 2000)
</script>

<style lang="scss" scoped>

</style>
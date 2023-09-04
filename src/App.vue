<template>
  <div class=" bg-cover bg-center
   h-screen text-white p-2 flex overflow-hidden" v-if="data" :style="{ backgroundImage: `url( ${currentBg} )` }">
    <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--      横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData">  <change-bg /> </HorizontalBar>
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
  <div v-else :style="{backgroundImage: `url( ${currentBg} )`}" class=" bg-cover bg-center h-screen text-white p-2 flex overflow-hidden
  text-6xl justify-center items-center flex-row">
    <n-space class="flex flex-row">
      <span>加载中请稍后</span>
      <n-spin size="small"  stroke="white"/>
      <n-spin size="small"  stroke="white"/>
      <n-spin size="small"  stroke="white"/>
    </n-space>
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
import bg1 from '@/assets/imgs/bg-1.jpg';
import {NSpin, NSpace} from 'naive-ui'

import {provide, ref} from "vue";
import {getVisualization} from './api/visualization.js'
import ChangeBg from "@/components/ChangeBg.vue";

let currentBg = ref(bg1)
provide('changeBackground', currentBg)

const data = ref(null)
const loadData = async ()=> {
  data.value = await getVisualization()
}

setInterval(()=> {
  loadData()
}, 3000)
</script>

<style lang="scss" scoped>

</style>
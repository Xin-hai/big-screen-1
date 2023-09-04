<template>
  <button @click="change" class="text-green-500">背景切换</button>
</template>

<script setup>

import {inject} from "vue";
import bg1 from '@/assets/imgs/bg-1.jpg'
import bg2 from '@/assets/imgs/bg-2.jpg'
import bg3 from '@/assets/imgs/bg-3.jpg'
import bg4 from '@/assets/imgs/bg-4.jpg'
import bg5 from '@/assets/imgs/bg-5.jpg'
import bg6 from '@/assets/imgs/bg-6.jpg'

let currentBg = inject('changeBackground')

let bgImages = [bg1,bg2,bg3,bg4,bg5,bg6]
const change = ()=> {
  let {length} = bgImages
  if(currentBg.value !== bgImages[length-1]){
    let index = bgImages.indexOf(currentBg.value) + 1
    currentBg.value = bgImages[index]
  }else{
    currentBg.value = bg1
  }
}

</script>

<style scoped lang="scss">

</style>
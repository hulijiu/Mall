<template>
<swiper class="deatil-swiper">
  <swiper-item v-for="item in topImages">
    <img :src="item" alt="" />
  </swiper-item>
</swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../common/swiper/index.js'

  export default{
    name:'DetailSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .deatil-swiper{
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
</style>

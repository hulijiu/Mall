<template>
  <swiper>
    <swiper-item v-for='item in banners'>
     <a :href="item.link">
       <img :src="item.image" alt=""  @load="imageLoad"/>
     </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default{
  name:"HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      //设置isLoad记录状态，第一张图片加载完成之后就不再执行监听图片加载完成
      if (!this.isLoad){
          this.$emit('swiperImageLoad')
          //console.log("监听轮播图加载完毕")
          this.isLoad=true
      }


    }
  }
}
</script>

<style>
</style>

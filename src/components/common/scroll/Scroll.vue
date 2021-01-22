<template>
  <div class="wrappers" ref="wrapper">
    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default{
    name:"Scroll",
    data(){
      return{
        scroll:null,
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
  mounted() {
   //1. 创建better-scroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 2.监听滚动位置
    if(this.scroll.probeType==2||this.probeType==3){
      this.scroll.on('scroll',(position)=>{
        //console.log(position)
        this.$emit('scroll',position)
      })
    }
    //监听scroll滚动到底部，实现下拉加载更多
   if (this.pullUpLoad){
     this.scroll.on('pullingUp',()=>{
       //console.log("下拉加载更多")
       this.$emit('pullingUp')

     })
   }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      //console.log("------")
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getSrollY(){
      return this.scroll.y ? this.scroll.y : 0
    }
  }
  }
</script>

<style>

</style>

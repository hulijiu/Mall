 import {debounce} from 'components/common/utills'
 import BackTop from '../content/backtop/BackTop.vue'

export const itemListenerMixins = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  components:{

  },
  methods:{

  },
  mounted(){
   this.newRefresh = debounce(this.$refs.scroll.refresh,100)
         //对监听的事件进行保存

          this.itemImgListener = ()=>{
                 this.newRefresh()
         }

         this.$bus.$on('itemImgLoad',this.itemImgListener)
         //console.log("我是混路中的内容")
    }
  }


export const backTopMixins = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
   backClick(){
     this.$refs.scroll.scrollTo(0,0,500)
   },
   listenShowBackTop(position){
     this.isShowBackTop = -position.y > 1000
   },
  }
}

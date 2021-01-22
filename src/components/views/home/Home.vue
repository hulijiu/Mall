<template>
  <div id="home"  class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="contentH" ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature/>
      <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
   </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <!-- 修饰符native什么时候用 -->
<!--  在我们需要监听一个组件的原生事件时，必须给对应的事件加上native修饰符，才能进行组件的事件监听。 -->

  </div>
</template>

<script>
  import TabControl from '../../content/tabControl/TabControl.vue'
  import NavBar from '../../common/navbar/NavBar.vue'
  import Scroll from '../../common/scroll/Scroll.vue'

  import GoodsListItem from '../../content/goods/GoodsListItem.vue'
  import GoodsList from '../../content/goods/GoodsList.vue'
  // import BackTop from '../../content/backtop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import Feature from './childComps/Feature.vue'

  import {getHomeMutidata,getHomeGoods} from 'network/home'
  import {debounce} from 'components/common/utills'
  import {itemListenerMixins,backTopMixins} from 'components/common/mixins'


  export default{
    name:"Home",
    components:{
      TabControl,
      NavBar,
      Scroll,
      HomeSwiper,
      RecommendView,
      Feature,
      GoodsList,
      GoodsListItem,
      // BackTop

    },
    mixins:[itemListenerMixins,backTopMixins],
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop' : { page: 1, list:[] },
          'new' : { page: 1, list:[] },
         'sell' : { page: 1, list:[] }
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,

      }
    },
    created() {
      //请求多个数据
      this.getHomeMutidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //监听item中图片加载完成


    },
    mounted() {

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      //console.log("home destroyed")
    },
    activated() {
       //console.log('actived')
       this.$refs.scroll.scrollTo(0,this.saveY,0)
       this.$refs.scroll.refresh()
    },
    deactivated() {
       //console.log('deactived')
       //保存Y值
       this.saveY = this.$refs.scroll.getSrollY()
       //取消全局事件胡监听
       this.$bus.$off('itemImgLoad',this.itemImgListener)
       //this.$bus.$off('itemImgLoad',函数) 不能直接只传一个事件，否则所有的实践都会被取消，所以要有一个函数
      // console.log(this.saveY)
    },

    methods:{
       /**
        * 事件监听相关方法
        */


       tabClick(index){
         switch(index){
           case 0:
            this.currentType='pop'
            break
           case 1:
            this.currentType='new'
            break
           case 2:
            this.currentType='sell'
            break
           }
           this.$refs.tabControl1.currentIndex = index;
           this.$refs.tabControl2.currentIndex = index;
       },

       // backClick(){
       //   this.$refs.scroll.scrollTo(0,0,500)
       // },
       contentscroll(position){
         //1.判断backtop是否显示
         //console.log(Position)
         // this.isShowBackTop = -position.y > 1000
         //2.决定tabControl是否吸顶(position:fixed)
         this.listenShowBackTop(position)
         this.isTabFixed=(-position.y)>this.tabOffsetTop
       },

       loadMore(){
         //console.log("加在更多")
         this.getHomeGoods(this.currentType)
       },
       //实现图片加载完成之后获取元素的offsetTop属性
       swiperImageLoad(){
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
         //console.log("offsetTop属性")
       },


      /**
       * 网络请求相关方法
       */
      getHomeMutidata(){
        getHomeMutidata().then(res=>{
         //console.log(res)
         this.banners=res.data.banner.list;
         this.recommends=res.data.recommend.list;
        })
      },
       getHomeGoods(type){
         const page=this.goods[type].page;
        // console.log("发送前"+this.goods[type].page)
         getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            //console.log("发送后"+this.goods[type].page)


          //完成加载更多
          this.$refs.scroll.finishPullUp()
         })


    }

  }

}
</script>

<style>
  #home{
  /*  padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
   /* 在使用浏览器原生滚动时为了让导航不随页面一起滚动 */
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

 .contentH{
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
  }

</style>

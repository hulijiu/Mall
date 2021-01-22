<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content-detial" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :params-info="paramsInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref= "commit"/>
      <goods-list :goods="recommendList" ref="recommand" />

  </scroll>
  <detail-bottom-bar @addCart = "addCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <!-- <Toast :message="message" :show="show"/> -->



</div>
</template>

<script>
  import Scroll from '../../common/scroll/Scroll.vue'
  import GoodsList from '../../content/goods/GoodsList.vue'
  import GoodsListItem from '../../content/goods/GoodsListItem.vue'

  // import Toast from '../../common/Toast/Toast.vue'




  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'


  import {Goods,shop,GoodsParam} from '../../../network/detail.js'



  import {getDetail,getRecommend} from 'network/detail.js'

  import {itemListenerMixins,backTopMixins} from '../../common/mixins.js'
  import {debounce} from 'components/common/utills'
  import {mapActions} from 'vuex'


  export default{
    name:"Detail",
    components:{
      Scroll,
      GoodsList,
      GoodsListItem,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      // Toast


    },
    mixins:[itemListenerMixins,backTopMixins],

    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommendList:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false,
      }
    },
    methods:{
      ...mapActions(["addCart"]),
      addCart(){
        //console.log("cart")
        //获取购物车需要展示的信息
        const product={}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //将商品加入购物车里面
       // this.$store.commit('addCart',product)
       //this.addCart(product).then(res => {console.log(res)})
        this.$store.dispatch('addCart',product).then(res =>{
          // this.show = true
          // this.message = res
          // setTimeout(()=>{
          //   this.show = false
          //   this.message = ""
          // },1500)

         this.$toast.show(res)
          //console.log(this.$toast)
          })

        //添加购物车
      },
      imageLoad(){
        this.newRefresh()
        //console.log('接收图片加载完毕')
        this.getThemeTopY()

      },

      titleClick(index){
       // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        //console.log(position)
        const positionY= -position.y
       // console.log(Number.MAX_VALUE)
        //positionY 和主题中的值进行对比
        //[0,1000,2000,3000，非常大的值]
        //positionY 在0和1000之间,index = 0
        //positionY 在1000和2000之间,index = 1
        //positionY 在2000和3000之间,index = 2
    //positionY 超过3000,index = 3

       //positionY 在3000和一个非常大的值之间,index = 3
       let length =  this.themeTopYs.length
       for(let i=0;i < length-1;i++){
         if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
           this.currentIndex = i;
           this.$refs.nav.currentIndex = this.currentIndex;
         }
         this.listenShowBackTop(position)
        // if (positionY > this.themeTopYs[i]&&positionY <= this.themeTopYs[i+1]){
        //   console.log(i)
        // }
        // if (this.currentIndex !==i &&((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||
        // (i=== length-1 && positionY >= this.themeTopYs[i]))){
        //   //console.log(i)
        //   this.currentIndex = i
        //   //console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex == this.currentIndex
        // }
       }


       },


    },
    mounted() {


    },
    updated() {

    },
    destroyed() {

    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid获取详情数据
      getDetail(this.iid).then(res=>{
        //console.log(res)
        const data=res.result
        //1.获取顶部的图片轮播数据
        this.topImages=data.itemInfo.topImages;
         //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.创建店铺信息
        this.shop = new shop(data.shopInfo)
        //获取商品详细信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论数据
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        //请求推荐数据
        getRecommend().then(res=>{
          //console.log(res)
          this.recommendList = res.data.list
        })

      })
      //值不对，因为图片还未加载完毕
      // this.$nextTick(()=>{
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.commit.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommand.$el.offsetTop);
      //   console.log(this.themeTopYs)
      // })
     //给getThemeTopY赋值
        this.getThemeTopY =debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commit.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommand.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        //console.log(this.themeTopYs);
      },500)
      },


    }



</script>

<style>
 #detail{
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
    height: 100vh;

  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
  }

  .content-detial{
    height: calc(100% - 44px);
   /* overflow: hidden; */
  }

</style>

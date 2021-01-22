<template>
  <div id = "cart">
    <cart-nav-bar />
    <scroll ref="scroll"  class="content-cart">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import cartNavBar from './childCopms/cartNavBar.vue'
  import cartList from './childCopms/cartList.vue'
  import CartBottomBar from './childCopms/CartBottomBar.vue'
  import Scroll from '../../common/scroll/Scroll.vue'

  export default{
    name:"Cart",
    components:{
      cartNavBar,
      cartList,
      CartBottomBar,
      Scroll
    },
    activated() {
     this.$refs.scroll.refresh()
    }
  }


</script>

<style>
  #cart{
    height: 100vh;
  }
  .content-cart{
    height: calc(100% - 49px - 44px - 40px);
    overflow: hidden;
  }
</style>

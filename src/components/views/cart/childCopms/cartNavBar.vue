<template>
 <nav-bar class="cart-navbar">
   <div slot="center">购物车({{cartLength}})</div>
 </nav-bar>
</template>

<script>
  import NavBar from '../../../common/navbar/NavBar.vue'
  
  import {mapGetters} from 'vuex'

  export default{
    name:"cartNavBar",
    components:{
      NavBar
    },
    computed:{
     ...mapGetters(["cartLength","cartList"])
    }
  }
</script>

<style>
  .cart-navbar{
    background-color: var(--color-tint);
    color: #fff;

  }
</style>

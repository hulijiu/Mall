<template>
  <div class="cart-list" >
      <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index" />
  </div>
</template>

<script>
  import  {mapGetters} from 'vuex'



  import cartListItem from './cartListItem.vue'

  export default{
    name:"cartList",
    components:{
      cartListItem
    },
    computed:{
      ...mapGetters(["cartList"])
    },
   
  }
</script>

<style>


</style>

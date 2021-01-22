<template>
  <div class="cart-boottom-bar">
    <div class="check-content" >
      <check-button class="check-button" :is-checked="isSelectAll"  @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
     去计算:({{checklength}})
    </div>
  </div>
</template>

<script>

  import CheckButton from '../../../content/checkButton/CheckButton.vue'
  import {mapGetters} from 'vuex'

  export default{
    name:"CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return  '￥'+ this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price*item.count
        },0).toFixed(2)
      },

      checklength(){
        return this.cartList.filter(item=>item.checked).length

    },
    isSelectAll(){
      //return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length == 0) return false
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods:{
    checkClick(){
      //console.log("---")
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }
      else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
     if(!this.isSelectAll){
       this.$toast.show("请选择需要结算的商品",2000)
     }
    },
  }
  }
</script>

<style>
  .cart-boottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 60px;

  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 20px;
    flex:1;
    text-align: center;
  }

  .calculate{
   width: 90px;
   color: #FFF;
   background-color: red;
   text-align: center;
  }
</style>

<template>
  <div class="toast" v-show="isshow">{{message}}</div>
</template>

<script>
  export default {
    name:"Toast",
    props:{
      // message:{
      //   Type:String,
      //   default:""
      // },
      // show:{
      //   Type:Boolean,
      //   default:false
      // }
    },
    data(){
      return {
        message:'',
        isshow: false
      }
    },
    methods:{
      show(message,duration=2000){

        this.isshow = true
        this.message = message
        setTimeout(()=>{
          this.isshow = false
          this.message = ""
        },duration)
      }
    }
  }
</script>

<style>
  .toast{
    position: fixed;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    padding: 8px 10px;

    background-color: rgba(0,0,0,0.7);
    color: #fff;
    z-index: 99;
  }
</style>

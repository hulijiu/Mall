<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active :index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"TabControl",
    props:{
      titles:{
        type:Array,
        // 当返回默认值是个对象或者数组时,default必须是个函数
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
  }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
      //console.log('***')
    }
  }
  }
</script>

<style>
  .tab-control{
    background-color: #fff;
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;

  }
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);

  }
  .active span{
     border-bottom: 2px solid var(--color-tint);
     padding: 5px;
  }
</style>

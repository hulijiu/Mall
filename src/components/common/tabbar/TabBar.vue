<template>
<div id="tab-bar">
	<slot></slot>
</div>
</template>

<script>
	export default{
		name:"TabBar"
	}
</script>

<style>
  #tab-bar{
   display: flex;
   background-color: #f6f6f6;
   position: fixed;
   left: 0px;
   right: 0px;
   bottom: 0px;
   box-shadow: 0px -3px 1px  rbga(1,1,1,0.2);
  }
   
</style>

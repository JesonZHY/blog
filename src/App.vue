<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
	/* 滚动条样式 */
::-webkit-scrollbar-track
{
	background: rgba(0,0,0,.1);
	border-radius: 0;
}
::-webkit-scrollbar
{
	-webkit-appearance: none;
	width: 3px;
	height: 10px;
}
::-webkit-scrollbar-thumb
{
	cursor: pointer;
	border-radius: 5px;
	background: rgba(0,0,0,.25);
	transition: color .2s ease;
}
</style>

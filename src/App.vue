<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	html{
		width: 100%;
		height: 100%;
	}
	body {
		padding:0px;
		margin:0px auto;
		height: 100%;
		width: 100%;
	}
	*{margin: 0;
		padding: 0;
	}
	a{
		text-decoration:none;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: left;
		color: #2c3e50;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}
	
/*修改滚动条样式*/
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  width: 8px;
  height: 8px;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #1D8CE0;
}
</style>

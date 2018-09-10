<template>
	<div style='width: 100%;height: 100%;'>
 <OBJECT classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" v-bind:id="Idd" width="100%" height="100%" althtml="<EMBED pluginspage='http://www.videolan.org'  
       type='application/x-vlc-plugin'  
       version='VideoLAN.VLCPlugin.2'  
       text='Waiting for video'  
       name='vlc'  
       ></EMBED>" codebase=""   events="True">  
 <param name="MRL" value="" />  
 <param name="Src" value="" />  
   <param name="ShowDisplay" value="True" />  
 <param name="AutoLoop" value="False" />  
 <param name="AutoPlay" value="False" />  
 <param name="Time" value="True"/>  
   
 </OBJECT>
 <el-button @click="showEditWin" type="text" size="small">播放</el-button>
	</div>
</template>
<script>
	export default {
		props:["urlBase","Idd"],
//		props: {
//			urlBase: {
//				//类型 普通类型：字符串（String）、数字（Number）、布尔值（Boolean）、空（Null）引用类型：数组（Array）、对象（Object）
//				/*其中，普通类型是可以在子组件中更改，不会影响其他兄弟子组件内同样调用的来自父组件的值，但是，引用类型的值，当在子组件中修改后，父组件的也会修改，那么后果就是，其他同样引用了改值的子组件内部的值也会跟着被修改。除非你有特殊的要求这么去做，否则最好不要这么做。*/
//				type: String,
//				require: true,
//				default: "", //默认值
//				validator: function(value) {
//					//验证器
//					console.log("验证器",value);
//					return value;
//				},
//			},
//			Idd:""
//		},
		data() {
			return {
				videoUrl:this.urlBase,
			}
		},
		methods: {
			getVLC(name) {
				console.log("类别", name);
				console.log("0", window.document);
				if(window.document[name]) {
					console.log("1", window.document[name]);
					return window.document[name];
				}
				if(navigator.appName.indexOf("Microsoft Internet") == -1) {
					if(document.embeds && document.embeds[name])
						console.log("2", window.document[name]);
					return document.embeds[name];
				} else {
					console.log("3", window.document[name]);
					return document.getElementById(name);
				}
			},
			doGo(mrl) {
				var vlc = this.getVLC(this.Idd);
				console.log("vlc", vlc);
				console.log("playlist", vlc.playlist);
				let itemId = vlc.playlist.add(mrl);
				console.log("itemId",itemId);
				vlc.playlist.playItem(itemId);
			},
			showEditWin(){
				console.log(this.urlBase);
				this.doGo(this.urlBase);
//				this.doGo('rtsp://dxftech.asuscomm.com:554/pag://192.168.7.53:7302:180608121946016861:0:SUB:TCP?cnid=0&pnid=0');
			},
		},
		watch:{
			urlBase:function(val){
				this.videoUrl=val;
				console.log("监控函数",val);
				this.doGo(this.videoUrl);
			},
			test:function(val){
				console.log("test",val);
			},
		},
		mounted() {
			console.log("初始化URL",this.urlBase);
			window.onload=function(){
				this.doGo(this.urlBase);
			}
//			this.doGo("rtsp://dxftech.asuscomm.com:554/pag://192.168.7.53:7302:180608121946016861:0:SUB:TCP?cnid=0&pnid=0");
			this.doGo(this.urlBase);
			
		},
	}
</script>
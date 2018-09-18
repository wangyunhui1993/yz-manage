<template>
	<div style='width: 100%;height: 100%;position: relative;' class="videoSize">
		<div class="videoItem">
			<video-player v-if="playerOptions.sources[0].src" style='width: 100%;height: 100%;' class="vjs-custom-skin" ref="videoPlayer" @dblclick.native="videoClick" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @statechanged="playerStateChanged($event)" @error="errorInfo($event)">
			</video-player>
		</div>
		<div v-loading="VLoading" element-loading-text="视频加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="mode" :class="index==0?'modeBorder':''" v-if="modeShow" @click="clickMode($event)" @dblclick="dblclickMode" @mouseenter="showInfo" @mouseleave="hideInfo">
			<i class="el-icon-close closeBtn" title="关闭" v-if="closeShow" @click="closeBtn"></i>
			<p v-if="checkFlash" style="font-size: 20px;color: #FFFFFF;text-align: center;">您的电脑flash版本过低或是异常,请点击<a href="https://www.flash.cn/" style="color: red;cursor: pointer;">安装</a></p>
		</div>
		<!--<iframe src="" width="" height="" class="vjs-resize-manager"></iframe>-->

	</div>
</template>
<script>
	import { publicMethods } from '../../js/publicMethods';
	export default {
		//		props: ["VOptions", "VParameters"],
		props: {
			VOptions: {
				//类型 普通类型：字符串（String）、数字（Number）、布尔值（Boolean）、空（Null）引用类型：数组（Array）、对象（Object）
				/*其中，普通类型是可以在子组件中更改，不会影响其他兄弟子组件内同样调用的来自父组件的值，但是，引用类型的值，当在子组件中修改后，父组件的也会修改，那么后果就是，其他同样引用了改值的子组件内部的值也会跟着被修改。除非你有特殊的要求这么去做，否则最好不要这么做。*/
				type: Object,
				require: true,
				default: {
					id: "",
					serial: "",
					title: ""
				}, //默认值
				//						validator: function(value) {
				//							//验证器
				//							console.log("验证器",value);
				//							return value;
				//						},
			},
			VParameters: {
				type: Object,
				require: true,
				//						default: {brightness: 50,contrast: 50,saturation: 50}, //默认值
			},
			type: {
				type: String,
				require: true,
				default: "", //默认值
			},
			VIndex: {
				type: Number,
				require: true,
				default: 0, //默认值
			},
		},
		data() {
			return {
				checkFlash:false,
				eleIndex:0,
				VLoading: false,
				index: "",
				modeClass: "",
				closeShow: false,
				modeShow: true,
				options: {
					id: "",
					serial: "",
					title: ""
				},
				parameters: {
					brightness: 50,
					contrast: 50,
					saturation: 50,
				},
				initialized: false,
				currentTech: '',
				playerOptions: {
					overNative: true,
					autoplay: true,
					controls: false,
					
					bigPlayButton: false,
					//      textTrackDisplay : false,
					posterImage: false,
					errorDisplay: false,

					preload: 'auto',
					//					 poster: "http://dxftech.asuscomm.com:9988/img/180608121946016861.jpg", //你的封面地址
					//					notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//					techOrder: ['flash', 'html5'],
					techOrder: ['flash'],
					sourceOrder: true,
// 					fluid:true,
					// aspectRatio:"16:9",
					flash: {
						hls: {
							withCredentials: false
						},
						swf: 'static/videojs-swf_5.4.1_video-js.swf',
					},
					html5: {
						nativeVideoTracks:false,
//						hls: {
//							withCredentials: false
//						}
					},
					sources: [{
						type: 'rtmp/mp4',
						//						src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
						//						src: 'rtmp://dxftech.asuscomm.com/hls/mystream'
						src: ""
					}, 
//					{
//						withCredentials: false,
//						type: 'application/x-mpegURL',
//						src: ''
//					}
					],
					//					 fullscreenToggle: true, // 全屏
					controlBar: {
						timeDivider: false, // 时间分割线
						durationDisplay: false, // 总时间
						progressControl: false, // 进度条
						customControlSpacer: false, // 未知
						fullscreenToggle: true // 全屏
					},
				},
			}
		},
		computed: {
			player() {
				return this.$refs.videoPlayer.player
			},
			currentStream() {
//				return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
				return this.currentTech === 'Flash' ? 'RTMP' : 'RTMP'
			}
		},
		methods: {
			visVideoParameters() {
				this.showVideoParameters = !this.showVideoParameters;
			},
			onPlayerReadied() {
				console.log("onPlayerReadied");
// 				$('.videoItem').css({width:'99%'});
				// $($('.videoItem')[this.eleIndex]).css({height:'99%'});
				if(!this.initialized) {
					this.initialized = true
					     this.currentTech = this.player.techName
				}
			},
			// record current time
			onTimeupdate(e) {
				//								console.log('onTimeupdate');
				//				    console.log('currentTime', e.cache_.currentTime)
				e.cache_.currentTime > 0 ? this.modeShow = true : "";

			},
			changeTech() {
				if(this.currentTech === 'Html5') {
					this.playerOptions.techOrder = ['flash']
				} else if(this.currentTech === 'Flash') {
					this.playerOptions.techOrder = ['flash']
				}
				this.playerOptions.autoplay = true
			},
			videoClick() {
				console.log("是否全屏");
				if(!this.playerOptions.sources[0].src) return false;
				if(!this.player.isFullscreen()) {
					this.player.requestFullscreen();
					this.player.isFullscreen(true);
				} else {
					
					this.player.exitFullscreen();
					this.player.isFullscreen(false);
					$(".obMode").remove();
				}
			},

			// listen event
			onPlayerPlay(player) {
				console.log('player play!', player)
			},
			onPlayerPause(player) {
				console.log('player pause!', player)
			},
			onPlayerEnded(player) {
				console.log('player ended!', player)
			},
			onPlayerLoadeddata(player) {
				console.log('player Loadeddata!', player)
			},
			onPlayerWaiting(player) {
				this.VLoading = true;
				console.log('player Waiting!', player)

			},
			onPlayerPlaying(player) {
				this.VLoading = false;
				console.log('player Playing!', player)
			},
			onPlayerCanplay(player) {
				// $('.videoItem').css({padding:'0.5px'});
				console.log('player Canplay!', player)
			},
			onPlayerCanplaythrough(player) {
				console.log('player Canplaythrough!', player)
			},
			// or listen state event
			playerStateChanged(playerCurrentState) {
				//         console.log('player current update state', playerCurrentState)
			},
			errorInfo(player) {
				this.VLoading = false;
				console.log('player error!', player)
				this.$message({
					message: "视频加载失败",
					type: 'error'
				});
			},
			SingleLeftClick(player) {
				console.log('player SingleLeftClick!', player)
			},

			//全屏
			dblclickMode() {
				console.log("是否全屏");
				if(!this.playerOptions.sources[0].src) return false;
				if(!this.player.isFullscreen()) {
					this.player.requestFullscreen();
					this.player.isFullscreen(true);
					//       let ele="<div class='obMode' onclick='obMode()'></div>";
					$(this.player.el_).append("<div class='obMode'></div>");
				} else {
					this.player.exitFullscreen();
					this.player.isFullscreen(false);
				}
				console.log(this.player.isFullscreen());
			},
			showInfo() {
				if(!this.playerOptions.sources[0].src) return false;
				if(!this.player.isFullscreen()) {
					this.closeShow = true;
					//this.modeClass="modeBorder";
				}
			},
			hideInfo() {
				this.closeShow = false;
				//			this.modeClass="";
			},
			clickMode(e) {
				console.log(e.currentTarget);
				$(".mode").css("border", "none");
				e.currentTarget.style.border = "2px solid #00FF00";
				console.log("当前参数", this.parameters);
				console.log("当前index", this.index);
				this.$emit("Cparameters", this.parameters);
				this.$emit("CIndex", this.index);
			},
			closeBtn() {
				this.playerOptions.sources[0].src = "";
				this.VLoading = false;
				this.checkFlash=false;
				this.$emit("CcloseWin");
				
			},

		},
		watch: {
			VOptions(val) {
				console.log('变化了吗？', val);
//				console.log("index变化了",this.testIndex);
				
				this.playerOptions.sources[0].src = val.serial;
				this.eleIndex=val.index;
				console.log("element",this.eleIndex);
				if(this.type === 'bigScreen') {
					if(publicMethods.judgmentFlash()) {
						this.modeShow = true;
						this.checkFlash=false;
					} else {
						// this.modeShow = false;
						this.closeShow=false;
						const h = this.$createElement;
// 						this.$notify({
// 						title: '提示',
// 						message: h('i', { style: 'color: teal'}, '您的浏览器未启用Flash插件')
// 						});
							this.checkFlash=true;
					}
				}
			},
			VParameters(val) {
				this.parameters = Object.assign({}, val);
			},
			VIndex:function(val){
				console.log("index变化了",val);
			},

		},
		created(){
			this.options = Object.assign({}, this.VOptions);
			this.playerOptions.sources[0].src = this.VOptions.serial;
			console.log('aaaaaaaaaaaa', this.options);
			this.parameters = Object.assign({}, this.VParameters);
			this.index = this.VIndex;
		},
		mounted() {
			$(".mode").bind("contextmenu", function() {
				return false;
			})
			if(this.type === 'map') {
				if(publicMethods.judgmentFlash()) {
					this.modeShow = true;
					this.checkFlash=false;
				} else {
// 					const h = this.$createElement;
// 					this.$notify({
// 					  title: '提示',
// 					  message: h('i', { style: 'color: teal'}, '您的浏览器未启用Flash插件')
// 					});
					this.checkFlash=true;
				}
			}

		},
	}
</script>
<style type="text/css">
	.mode {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		box-sizing: border-box;
	}
	
	.modeBorder {
		border: 2px solid #00FF00;
	}
	
	.vjs-button {
		z-index: 100;
	}
	
	.closeBtn {
		position: absolute;
		float: right;
		margin: 5px;
		color: #fff;
		border-radius: 8px;
		background: #333;
		right: 5px;
		top: 5px;
		z-index: 3000;
	}
	
	.closeBtn:hover {
		background: #FF0000;
		cursor: pointer;
	}
	
	.videoSize .vjs-big-play-button {
		/*display: none !important;*/
	}
	
	.videoItem {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
	
	.obMode {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 4000;
	}
</style>
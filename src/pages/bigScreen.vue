<template>
	<section style="box-sizing: border-box;width: 100%;height: 100%;position: relative;" class="bigScreen" ref="bigScreen">
		<el-container style="height: 100%;">
			<el-aside width="200px" style="position: relative;margin-right: 5px;padding-right: 5px;box-sizing: border-box; border: 1px solid #dcdfe6;">
				<el-row>
					<el-input placeholder="输入关键字过滤" size="small" suffix-icon="el-icon-search" v-model="filterText">
					</el-input>
					<el-tree :data="data5"  node-key="id" default-expand-all :expand-on-click-node="false" @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag">
						<span class="custom-tree-node" slot-scope="{ node, data }">
        			<span v-if="node.icon==1" draggable><i :class="Edata.icon.sitemap"></i> {{ node.label }}</span>
						<span v-else draggable><i class="fa fa-video-camera"></i> {{ node.label }}</span>
						</span>
					</el-tree>
				</el-row>
				<el-row style="position: absolute;width: 100%;left: 0;bottom: 0;max-height: 300px;">
					<el-card class="box-card videoParameters" :body-style="{ padding: '15px' }">
						<div slot="header" class="clearfix" @click="visVideoParameters">
							<span>视频参数</span>
							<i class="el-icon-d-arrow-left" :class="showVideoParameters?'VideoParametersOpen':'VideoParametersClose'"></i>
						</div>
						<div class="text item" style="font-size:12px;" v-if="showVideoParameters">
							<div class="block">
								<span class="demonstration">亮度</span>
								<el-slider v-model="value1"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">对比度</span>
								<el-slider v-model="value1"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">饱和度</span>
								<el-slider v-model="value1"></el-slider>
							</div>
							<el-row>
								<el-button type="success" style="width: 100%;">
									默认值
								</el-button>
							</el-row>
						</div>
					</el-card>

				</el-row>
			</el-aside>
			<el-container style="height: 100%;" :class="allScreen?'all':''" >
				<el-main style="padding: 0;height: 100%;">
					<!--<div class="operateWin">
			<el-tooltip class="item" effect="light" content="返回" placement="bottom-end">
      			<i class="el-icon-back" @click="goBack" style="font-size: 30px;"></i>
    		</el-tooltip>
			<el-tooltip class="item" effect="light" content="大屏设置" placement="bottom-end">
      			<i class="el-icon-setting" @click="showSet" style="font-size: 30px;"></i>
    		</el-tooltip>
		</div>-->

					<!--<p>Current Stream: <span class="badge badge-success">{{ currentStream }}</span></p>
    <p>Current Tech: <span class="badge badge-info">{{ currentTech }}</span></p>-->

					<div v-for="(i,index) in bigNum" @dragover="dragenter($event)" @drop="drop(index)" class="screenItem" :data-index='i' :key="index" :class="'part'+num" @mouseenter="showInfo" @mouseleave="hideInfo">
						<div class="topInfo">
							编号:{{listInfo[i-1].number}}&nbsp;&nbsp; 名称:{{listInfo[i-1].name}}
						</div>
						<video-player style='width: 100%;height: 100%;' class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
						</video-player>
					</div>

					<!--<el-dialog title="大屏配置" :visible.sync="dialogFormVisible" top='2vh' width="500px">
						<el-form>
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-form-item label="请选择方阵" label-width="100px">
										<el-select v-model="bigScreenSet" placeholder="请选择方阵" @change="changeNum">
											<el-option label="1 × 1" :value=1></el-option>
											<el-option label="2 × 2" :value=4></el-option>
											<el-option label="3 × 3" :value=9></el-option>
										</el-select>
									</el-form-item>

								</div>
								<el-form-item v-for="item in Number(bigScreenSet) " :key="item" :label="'第'+(item)+'个'" label-width="100px">
									<el-select v-model="bigScreenSet" placeholder="请选择监控探头">
										<el-option label="001" value="shanghai"></el-option>
										<el-option label="002" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-card>

						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submit">确 定</el-button>
						</div>
					</el-dialog>-->
				</el-main>
				<el-footer height="40px">
					<div class="btn_pic" style="margin: 3px 0;float: right;">
						<img :src="1==btn_H?pic.pic_1_h:pic.pic_1" @click="selectNum(1)" />
						<img :src="4==btn_H?pic.pic_4_h:pic.pic_4" @click="selectNum(4)" />
						<img :src="9==btn_H?pic.pic_9_h:pic.pic_9" @click="selectNum(9)" />
						<img :src="16==btn_H?pic.pic_16_h:pic.pic_16" @click="selectNum(16)" />
						<img :src="pic.pic_zoom" @click="selectNum('big')" />
					</div>
				</el-footer>
			</el-container>
		</el-container>

	</section>
</template>
<script>
	import {Edata} from '../js/Edata';
	export default {
		name: 'live',
		data() {
			const data = [{
				id: 1,
				label: '一级 1',
				icon: 1,
				children: [{
					id: 4,
					label: '二级 1-1',
					icon: 2,
				}]
			}, {
				id: 2,
				label: '一级 2',
				icon: 1,
				children: [{
					id: 5,
					label: '二级 2-1',
					icon: 2,
				}, {
					id: 6,
					label: '二级 2-2',
					icon: 2,
				}]
			}, {
				id: 3,
				label: '一级 3',
				icon: 1,
				children: [{
					id: 7,
					label: '二级 3-1',
					icon: 2,
				}, {
					id: 8,
					label: '二级 3-2',
					icon: 2,
				}]
			}];
			return {
				Edata:Edata,
				dialogFormVisible: false,
				bigScreenSet: 4,
				bigNum: [1, 2, 3, 4],
				allScreen: false,
				num: 4,
				initialized: false,
				currentTech: '',
				btn_H: 4,
				outBorder: 1,
				playerOptions: {
					overNative: true,
					autoplay: true,
					controls: false,
					techOrder: ['flash', 'html5'],
					sourceOrder: true,
					flash: {
						hls: {
							withCredentials: false
						}
					},
					html5: {
						hls: {
							withCredentials: false
						}
					},
					sources: [{
						type: 'rtmp/mp4',
						src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
					}, {
						withCredentials: false,
						type: 'application/x-mpegURL',
						src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
					}],
					fullscreenToggle: true, // 全屏
					controlBar: {
						//           timeDivider: false, // 时间分割线
						//           durationDisplay: false, // 总时间
						//           progressControl: true, // 进度条
						//           customControlSpacer: true, // 未知
						//						           fullscreenToggle: true // 全屏
					},
				},
				pic: {
					pic_1: "static/img/1_1.png",
					pic_4: "static/img/4_1.png",
					pic_9: "static/img/9_1.png",
					pic_16: "static/img/16_1.png",
					pic_zoom: "static/img/zoom_out.png",
					pic_1_h: "static/img/1_2.png",
					pic_4_h: "static/img/4_2.png",
					pic_9_h: "static/img/9_2.png",
					pic_16_h: "static/img/16_2.png",
					pic_zoom_h: "static/img/zoom_in.png"
				},
				listInfo: [{
						number: '001',
						name: '监控1',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '002',
						name: '监控2',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '003',
						name: '监控3',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '004',
						name: '监控4',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '005',
						name: '监控5',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '006',
						name: '监控6',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '007',
						name: '监控7',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '008',
						name: '监控8',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '009',
						name: '监控9',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '010',
						name: '监控10',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '011',
						name: '监控11',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '012',
						name: '监控12',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '013',
						name: '监控13',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '014',
						name: '监控14',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '015',
						name: '监控15',
						lng: 123.456,
						lat: 456.789
					},
					{
						number: '016',
						name: '监控16',
						lng: 123.456,
						lat: 456.789
					},

				],

				filterText: '',
				data2: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				data5: JSON.parse(JSON.stringify(data)),
				showVideoParameters: true,
				value1:'',

			}
		},
		computed: {
			//			bigNum(){
			//				return this.num;
			//			},
			player() {
				return this.$refs.videoPlayer.player
			},
			currentStream() {
				return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
			}
		},
		methods: {
			visVideoParameters() {
				this.showVideoParameters = !this.showVideoParameters;
			},
			onPlayerReadied() {
				if(!this.initialized) {
					this.initialized = true
					//      this.currentTech = this.player.techName
				}
			},
			// record current time
			onTimeupdate(e) {
				//    console.log('currentTime', e.cache_.currentTime)
			},
			changeTech() {
				if(this.currentTech === 'Html5') {
					this.playerOptions.techOrder = ['html5']
				} else if(this.currentTech === 'Flash') {
					this.playerOptions.techOrder = ['flash']
				}
				this.playerOptions.autoplay = true
			},

			showInfo(even) {
				//				even.currentTarget.firstElementChild.style.display = 'block'
			},
			hideInfo(even) {
				//				even.currentTarget.firstElementChild.style.display = 'none'
			},
			selectNum(arg) {
				if(arg == "big") {
					this.allScreen = !this.allScreen;

					console.log(window.event.currentTarget);
//					this.allScreen ? window.event.currentTarget.src = './../../static/img/zoom_in.png' : window.event.currentTarget.src = './../../static/img/zoom_out.png'
					if(this.allScreen) {
						window.event.currentTarget.src = this.pic.pic_zoom_h;

						var docElm = document.documentElement;
						//W3C  
						if(docElm.requestFullscreen) {
							docElm.requestFullscreen();
						}
						//FireFox  
						else if(docElm.mozRequestFullScreen) {
							docElm.mozRequestFullScreen();
						}
						//Chrome等  
						else if(docElm.webkitRequestFullScreen) {
							docElm.webkitRequestFullScreen();
						}
						//IE11
						else if(elem.msRequestFullscreen) {
							elem.msRequestFullscreen();
						}
					} else {
						window.event.currentTarget.src = this.pic.pic_zoom;

						if(document.exitFullscreen) {
							document.exitFullscreen();
						} else if(document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else if(document.webkitCancelFullScreen) {
							document.webkitCancelFullScreen();
						} else if(document.msExitFullscreen) {
							document.msExitFullscreen();
						}
					}
				} else {
					this.btn_H = arg;
					this.bigNum = [];
					this.num = arg;
					for(var i = 1; i <= arg; i++) {
						console.log('大屏', i);
						this.bigNum.push(i);
					}
				}

			},
			//显示配置页面
			showSet() {
				console.log(123)
				this.dialogFormVisible = true;

			},
			//返回
			goBack() {
				this.$router.go(-1);
			},
			//改变大屏显示个数
			changeNum(val) {
				console.log(val);
			},
			//提交大屏设置信息
			submit() {
				this.dialogFormVisible = false;
				this.bigNum = [];
				this.num = this.bigScreenSet;
				for(var i = 1; i <= this.bigScreenSet; i++) {
					console.log('大屏', i);
					this.bigNum.push(i);
				}

				console.log('大屏', this.bigNum);

			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			drop(index) {
				console.log(index);
			},
			dragenter(ev) {
				console.log(1111);
				ev.preventDefault();
			},
			selectItem(index) {
				console.log(111);
			},

			//拖拽相关
			handleDragStart(node, ev) {
				console.log('drag start', node);
			},
			handleDragEnter(draggingNode, dropNode, ev) {
				console.log('tree drag enter: ', dropNode.label);
			},
			handleDragLeave(draggingNode, dropNode, ev) {
				console.log('tree drag leave: ', dropNode.label);
			},
			handleDragOver(draggingNode, dropNode, ev) {
				console.log('tree drag over: ', dropNode.label);
			},
			handleDragEnd(draggingNode, dropNode, dropType, ev) {
				console.log('tree drag end: ', dropNode && dropNode.label, dropType);
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				console.log('tree drop: ', dropNode.label, dropType);
			},
			allowDrop(draggingNode, dropNode) {
				return dropNode.data.label !== '二级 3-1';
			},
			allowDrag(draggingNode) {
				return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
			}

		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		mounted() {
			$(".screenItem").on('click', '.vjs-tech', function() {
				alert($(this).html());
			});
			
			

			
		},
	}
</script>

<style>
	liveView {
		position: relative;
	}
	
	.selectWrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		line-height: 30px;
		margin: 20px;
		vertical-align: baseline;
	}
	
	.inputWrapper {
		width: 500px;
		margin: 0 auto;
	}
	
	.buttonWrapper {
		text-align: center;
	}
	
	.part1 {
		height: 100%;
		width: 100%;
	}
	
	.part4 {
		height: 50%;
		width: 50%;
	}
	
	.part9 {
		height: 33.333%;
		width: 33.333%;
	}
	
	.part16 {
		height: 25%;
		width: 25%;
	}
	
	.bigScreen .video-js {
		height: 100% !important;
	}
	
	.topInfo {
		position: absolute;
		top: 5px;
		right: 5px;
		/*width: 100%;*/
		z-index: 100;
		/*opacity: 0.7;*/
		/*background: #fff;*/
		text-align: center;
		/*display: none;*/
	}
	
	.operateWin {
		position: absolute;
		/*top：0;*/
		left: 0;
		background: #fff;
		z-index: 1003;
		height: 35px;
		width: 100px;
		border-bottom-right-radius: 35px;
		cursor: pointer;
	}
	
	.operateWin i {
		margin: 0 5px;
	}
	
	.el-footer {
		background-color: #B3C0D1;
	}
	
	.video-js .vjs-control {
		height: 30px;
	}
	
	.btn_pic:hover {
		cursor: pointer;
	}
	
	.all {
		position: fixed !important;
		top: 0;
		left: 0;
		background: #fff;
		width: 100%;
		height: 100%;
		z-index: 1100;
	}
	
	.screenItem {
		float: left;
		border: 2px solid #fff;
		box-sizing: border-box;
		position: relative;
	}
	
	.screenItem:first-child {
		border: 2px solid #00ff00;
	}
	
	.videoParameters .el-card__header {
		padding: 5px;
	}
	
	.videoParameters .el-card__header:hover {
		cursor: pointer;
	}
	
	.VideoParametersOpen {
		transform: rotate(-90deg);
		float: right;
	}
	
	.VideoParametersClose {
		transform: rotate(90deg);
		float: right;
	}
</style>
<template>
	<section style="box-sizing: border-box;width: 100%;height: 100%;position: relative;" class="bigScreen"ref="bigScreen">
		<el-container style="height: 100%;">
			<el-aside width="150px">
				<el-input placeholder="输入关键字搜索" v-model="filterText">
				</el-input>

				<!--<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  default-expand-all
  :filter-node-method="filterNode"
  ref="tree2">
</el-tree>-->
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-submenu index="1-1">
						<template slot="title">
							<span>分类一</span>
						</template>
						<el-menu-item draggable="true" @dragstart="drag($event)" index="1-1">001（一号监控）</el-menu-item>
						<el-menu-item draggable="true" index="1-2">002（二号监控）</el-menu-item>
					</el-submenu>
					<el-submenu index="2-1">
						<template slot="title">
							<span>分类二</span>
						</template>
						<el-menu-item draggable="true" @dragstart="drag($event)" index="1-1">003（三号监控）</el-menu-item>
						<el-menu-item draggable="true" index="1-2">004（四号监控）</el-menu-item>
					</el-submenu>
					<el-submenu index="3-1">
						<template slot="title">
							<span>分类三</span>
						</template>
						<el-menu-item draggable="true" @dragstart="drag($event)" index="1-1">005（五号监控）</el-menu-item>
						<el-menu-item draggable="true" index="1-2">006（六号监控）</el-menu-item>
					</el-submenu>
					<!--<el-menu-item index="3">
        <span slot="title" draggable="true" >分类三</span>
      </el-menu-item>-->
				</el-menu>

			</el-aside>
			<el-container style="height: 100%;"  :class="allScreen?'all':''" >
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

					<div v-for="(i,index) in bigNum" @dragover="dragenter($event)" @drop="drop(index)" class="screenItem" :data-index='i' :key="index" :class="'part'+num"  @click.native="selectItem(i)" @mouseenter="showInfo" @mouseleave="hideInfo">
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
						<img :src="1==btn_H?pic.pic_1_h:pic.pic_1" @click="selectNum(1)"/>
						<img :src="4==btn_H?pic.pic_4_h:pic.pic_4"  @click="selectNum(4)"/>
						<img :src="9==btn_H?pic.pic_9_h:pic.pic_9"  @click="selectNum(9)"/>
						<img :src="16==btn_H?pic.pic_16_h:pic.pic_16"  @click="selectNum(16)"/>
						<img :src="pic.pic_zoom"  @click="selectNum('big')"/>
					</div>
				</el-footer>
			</el-container>
		</el-container>

	</section>
</template>
<script>
	export default {
		name: 'live',
		data() {
			return {
				dialogFormVisible: false,
				bigScreenSet: 4,
				bigNum: [1, 2, 3, 4],
				allScreen:false,				
				num: 4,
				initialized: false,
				currentTech: '',
				btn_H:4,
				outBorder:1,
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
				pic:{
					pic_1:"./../../static/img/1_1.png",
					pic_4:"./../../static/img/4_1.png",
					pic_9:"./../../static/img/9_1.png",
					pic_16:"./../../static/img/16_1.png",
					pic_zoom:"./../../static/img/zoom_out.png",
					
					
					
					pic_1_h:"./../../static/img/1_2.png",
					pic_4_h:"./../../static/img/4_2.png",
					pic_9_h:"./../../static/img/9_2.png",
					pic_16_h:"./../../static/img/16_2.png",
					pic_zoom_h:"./../../static/img/zoom_in.png"
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
				}

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
			selectNum(arg){
				
				if(arg=="big"){
					this.allScreen=!this.allScreen;
					console.log(window.event.currentTarget);
					this.allScreen?window.event.currentTarget.src='./../../static/img/zoom_in.png':window.event.currentTarget.src='./../../static/img/zoom_out.png'
				}else{
					this.btn_H=arg;
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
			selectItem(index){
				console.log(index);
			},
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
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
		z-index: 999;
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
	.video-js .vjs-control{
		height: 30px;
	}
	.btn_pic:hover{
		cursor: pointer;
	}
	
	
	.all{
		position: fixed !important;
		top: 0;
		left: 0;
		background: #fff;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.screenItem{
		float: left;
		border: 2px solid #fff;
		box-sizing: border-box;
		position: relative;
	}
	.screenItem:first-child{
		border: 2px solid #00ff00;
	}
</style>
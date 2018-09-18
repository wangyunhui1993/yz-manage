<template>
	<section style="box-sizing: border-box;width: 100%;height: 100%;position: relative;" class="bigScreen" ref="bigScreen">
		<el-container style="height: 100%;">
			<el-aside width="300px">
				<el-row>
					<el-input placeholder="输入关键字过滤" size="small" suffix-icon="el-icon-search" v-model="filterText">
					</el-input>
				</el-row>
				<div style="flex-grow:1;flex-shrink:1;overflow-y:scroll;">
					<el-tree :data="groupAndEqu"  class="qwertyuuiio" node-key="id"  :filter-node-method="filterNode"   default-expand-all draggable :expand-on-click-node="false"  ref="tree2"   @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag">
						<span class="custom-tree-node" slot-scope="{ node, data }" >
	       				 <span v-if="data.type==='group'"><i class="fa fa-sitemap"></i> {{ data.title }}</span>
						<span v-else-if="data.type==='0'"  @dblclick="dblclickBtn(data)" ><i  :class="Edata.icon.cameravideo"></i> {{ data.title }}</span>
						<span v-else-if="data.type==='1'"  @dblclick="dblclickBtn(data)" ><i  :class="Edata.icon.domecamera"></i> {{ data.title }}</span>
						<span v-else-if="data.type==='2'"  @dblclick="dblclickBtn(data)" ><i  :class="Edata.icon.hawkeye"></i> {{ data.title }}</span>
						</span>
					</el-tree>
				</div>
				<div style="flex-grow:0;flex-shrink:0;position: relative;">
					<i class="el-icon-d-arrow-left"  @click="visVideoParameters" :class="showVideoParameters?'VideoParametersOpen':'VideoParametersClose'"></i>
					<el-card class="box-card videoParameters" :body-style="{ padding: '10px'}">
						<el-tabs v-model="activeOp" type="card" @tab-click="handleClick">
    <el-tab-pane label="视频参数" name="first">
    	<div style="height: 250px;padding: 5px 12px;"  v-show="showVideoParameters">
    		<div class="block">
								<span class="demonstration">亮度</span>
								<el-slider v-model="videoParameters.brightness" @change="arametersChange" :max="200"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">对比度</span>
								<el-slider v-model="videoParameters.contrast" @change="contrastChange" :max="200"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">饱和度</span>
								<el-slider v-model="videoParameters.saturation" @change="saturationChange" :max="200"></el-slider>
							</div>
							<el-row>
								<el-button type="success" style="width: 100%;" @click="defaultParameters">
									默认值
								</el-button>
							</el-row>
    	</div>
    	
    </el-tab-pane>
    <el-tab-pane label="云镜控制" name="second" v-if="controlModule">
    	<div class="ptzCtrl" style="height: 250px;"  v-show="showVideoParameters">
			<div class="ptzCircle" style="background-position: 0px 0px;">
				<div><span class="ptzC1" title="1" @click="controlSpeed($event)"></span><span class="ptzC2" title="2"  @click="controlSpeed($event)"></span><span class="ptzC3" title="3"  @click="controlSpeed($event)"></span><span class="ptzC4" title="4"  @click="controlSpeed($event)"></span><span class="ptzC5" title="5"  @click="controlSpeed($event)"></span><span class="ptzC6" title="6"  @click="controlSpeed($event)"></span><span class="ptzC7" title="7"  @click="controlSpeed($event)"></span></div>
				<a href="javascript:void(0)" ctrlcmd="21" class="ptzT1" title="上移" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"></a>
				<a href="javascript:void(0)" ctrlcmd="24" class="ptzT2" title="右移" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"></a>
				<a href="javascript:void(0)" ctrlcmd="22" class="ptzT3" title="下移" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"></a>
				<a href="javascript:void(0)" ctrlcmd="23" class="ptzT4" title="左移" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"></a>
				<!--<a href="javascript:void(0)" class="ptzB1"><span ctrlcmd="25" title="左上移动"></span></a>
				<a href="javascript:void(0)" class="ptzB2"><span ctrlcmd="26" title="右上移动"></span></a>
				<a href="javascript:void(0)" class="ptzB3"><span ctrlcmd="28" title="右下移动"></span></a>
				<a href="javascript:void(0)" class="ptzB4"><span ctrlcmd="27" title="左下移动"></span></a>-->
				<a href="javascript:void(0)" ctrlcmd="29" class="ptzBtn ptzAutoScanMark" title="自动扫描" @click="automaticScanning($event)"></a>
			</div>
			<ul class="ptzHandle" style="margin-left: 30px;">
				<li class="ptzM1">
					<a ctrlcmd="12" href="javascript:void(0)" title="变小焦距" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"><i ctrlcmd="12"></i></a>
					<a href="javascript:void(0)" ctrlcmd="11" title="变大焦距" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"><i ctrlcmd="11"></i></a>
				</li>
				<li class="ptzM2">
					<a href="javascript:void(0)" ctrlcmd="13" title="前调焦点" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup="mouseupControlDirection($event)"><i ctrlcmd="13"></i></a>
					<a href="javascript:void(0)" ctrlcmd="14" title="后调焦点" @click="controlDirection($event)" @mousedown="mousedownControlDirection($event)"  @mouseup.native="mouseupControlDirection($event)"><i ctrlcmd="14"></i></a>
				</li>
				<!--<li class="ptzM3">
					<a href="javascript:void(0)" ctrlcmd="16" title="扩大光圈"><i></i></a>
					<a href="javascript:void(0)" ctrlcmd="15" title="缩小光圈"><i></i></a>
				</li>-->
			</ul>
			<div class="ptzConfig"></div>
		</div>
    </el-tab-pane>
  </el-tabs>
						<!--<div slot="header" class="clearfix" @click="visVideoParameters">
							<span>视频参数</span>
							<i class="el-icon-d-arrow-left" :class="showVideoParameters?'VideoParametersOpen':'VideoParametersClose'"></i>
						</div>
						<div class="text item" style="font-size:12px;" v-if="showVideoParameters">
							<div class="block">
								<span class="demonstration">亮度</span>
								<el-slider v-model="videoParameters.brightness" @change="arametersChange" :max="200"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">对比度</span>
								<el-slider v-model="videoParameters.contrast" @change="contrastChange" :max="200"></el-slider>
							</div>
							<div class="block">
								<span class="demonstration">饱和度</span>
								<el-slider v-model="videoParameters.saturation" @change="saturationChange" :max="200"></el-slider>
							</div>
							<el-row>
								<el-button type="success" style="width: 100%;" @click="defaultParameters">
									默认值
								</el-button>
							</el-row>
						</div>-->
					</el-card>
				</div>
			</el-aside>
			<el-container style="height: 100%; width:500px !important" id="dashboard_id">
				<el-main style="padding: 0;height: 100%;">
					<div v-for="(i,index) in bigNum" @dragover="dragenter($event)" @drop="drop(index)" class="screenItem" :data-index='i' :key="index" :class="'part'+btn_H">
						<!--<div class="selectScreenItem" :class="index==radio?'screenItemIndex':''"  @mouseenter="showInfo" @mouseleave="hideInfo">
						<div class="selectRadio">
							<el-radio v-model="radio" :label="index"></el-radio>
						</div>
						<div class="topInfo">
							编号:{{listInfo[i-1].number}}&nbsp;&nbsp; 名称:{{listInfo[i-1].name}}
						</div>
						
						 
						<video-player style='width: 100%;height: 100%;' class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
						</video-player>
						<div class="mask"></div>
						</div>-->
						<Vplayer  :VOptions="options[index]" :VIndex="index" :VParameters="videoParameters" @Cparameters="Pparameters" @CIndex="indexFn" type="bigScreen"></Vplayer>
					</div>
				</el-main>
				<el-footer height="40px">
					<div class="btn_pic" style="margin: 3px 0;float: right;">
						<img :src="1==btn_H?pic.pic_1_h:pic.pic_1" @click="selectNum(1)" />
						<img :src="4==btn_H?pic.pic_4_h:pic.pic_4" @click="selectNum(4)" />
						<img :src="9==btn_H?pic.pic_9_h:pic.pic_9" @click="selectNum(9)" />
						<img :src="16==btn_H?pic.pic_16_h:pic.pic_16" @click="selectNum(16)" />
						<img :src="'3a'==btn_H?pic.pic_3a_h:pic.pic_3a" @click="selectNum('3a')" />
						<img :src="'3b'==btn_H?pic.pic_3b_h:pic.pic_3b" @click="selectNum('3b')" />
						<img :src="pic.pic_zoom" ref="bigScreeen" @click="selectNum('big')" />
					</div>
				</el-footer>
			</el-container>
		</el-container>

	</section>
</template>
<script>
	import '../../static/css/traffic.min.css'
	import { formatTreeData } from '../js/formatTreeData';
	import {Edata} from '../js/Edata';
	import { selectGroup, selectRoad, selectAllEquipment ,insertPlayVideo,ptzControl,jButtonAutoActionPerformed} from '../js/api';
	import  Vplayer  from './components/videoPlayer';
	
	var timeStart,timeEnd,timer;
	
	export default {
		components:{
			Vplayer
		},
		data() {
			return {
				Edata:Edata,
				controlModule:false,
				activeOp:"first",
				index:0,
				dragUrl:{},
				radio: 0,
				groupAndEqu: [],
				dialogFormVisible: false,
				bigNum: [1, 2, 3, 4],
				allScreen: false,
				num: 4,    //窗口个数
				btn_H: 4,  //设置的窗口的个数
				outBorder: 1,
				options:[
					{id:"",serial:"",title:""},
					{id:"",serial:"",title:""},
					{id:"",serial:"",title:""},
					{id:"",serial:"",title:""}
				],
				pic: {
					pic_1: "static/img/1_1.png",
					pic_3a: "static/img/3a_1.png",
					pic_3b: "static/img/3b_1.png",
					pic_4: "static/img/4_1.png",
					pic_9: "static/img/9_1.png",
					pic_16: "static/img/16_1.png",
					pic_zoom: "static/img/zoom_out.png",
					pic_1_h: "static/img/1_2.png",
					pic_3a_h: "static/img/3a_2.png",
					pic_3b_h: "static/img/3b_2.png",
					pic_4_h: "static/img/4_2.png",
					pic_9_h: "static/img/9_2.png",
					pic_16_h: "static/img/16_2.png",
					pic_zoom_h: "static/img/zoom_in.png"
				},
				listInfo: [],

				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				showVideoParameters: true,
				videoParameters: {
					brightness: 100,
					contrast: 100,
					saturation: 100,
				},
				
				videoParametersArr:[],
				movingSpeed:10,
				isAuto:false,
				
				//方向控制相关
				control:{
					cycle:500,    	//多长时间运行一次（毫秒）
					state:false,    //防止频繁点击响应
				},
			}
		},
		computed: {
		},
		methods: {
			//自动扫描
			automaticScanning(){
				if(this.options[this.index].id){
					this.isAuto=!this.isAuto;
				let info={id:this.options[this.index].id,dwSpeed:this.movingSpeed,isAuto:this.isAuto,lChannel:"1"};
				console.log('自动扫描',info);
				jButtonAutoActionPerformed(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(errMsg);
					} else {
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
			});
				}else{
					this.$message({
							message: '请先选中播放中的设备',
							type: 'warning'
						});
				}
				
				
				
			},
			//控制摄像头
			controlMonitoring(id,dwSpeed,direction,lChannel,action){
				let info={id:id,dwSpeed:dwSpeed,direction:direction,lChannel:lChannel,action:action};
				ptzControl(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(errMsg);
					} else {
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
			});
			},
			//控制方向
			controlDirection(event){
				
//				let obj = event.srcElement ? event.srcElement : event.target;
//				let dir=obj.getAttribute('ctrlcmd');
//				if(this.options[this.index].id){
//					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir);
//				}else{
//					this.$message({
//							message: '请先选中播放中的设备',
//							type: 'warning'
//						});
//				}
				
			},
			//连续控制方向
			mousedownControlDirection(event){
				timeStart=new Date();
				if(this.control.state) return false;
				let obj = event.srcElement ? event.srcElement : event.target;
				console.log("dir",obj);
				let dir=obj.getAttribute('ctrlcmd');
				
				if(this.options[this.index].id){
					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir,"1","0");
				}else{
					this.$message({
							message: '请先选中播放中的设备',
							type: 'warning'
						});
				}
				
				
				
//				if(this.control.state) return false;
//				let obj = event.srcElement ? event.srcElement : event.target;
//				let dir=obj.getAttribute('ctrlcmd');
//				if(this.options[this.index].id){
//					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir);
//					console.log(111111);
//					timer=setInterval(()=>{
//						console.log(2222222);
//					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir);
//				},this.control.cycle);
//				}else{
//					this.$message({
//							message: '请先选中播放中的设备',
//							type: 'warning'
//						});
//				}
//				this.control.state=true;
//				var timeSate=setTimeout(()=>{
//					this.control.state=false;
//					clearTimeout(timeSate);
//				},this.control.cycle);
				
				
				

				
			},
			mouseupControlDirection(event){
				let difference=new Date() - timeStart;
				if(this.options[this.index].id){
				let obj = event.srcElement ? event.srcElement : event.target;
				let dir=obj.getAttribute('ctrlcmd');
				if(difference>this.control.cycle){
					
				
					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir,"1","1");
				
				}else{
				var timeSate=setTimeout(()=>{
					this.control.state=false;
					clearTimeout(timeSate);
					this.controlMonitoring(this.options[this.index].id,this.movingSpeed,dir,"1","1");
				},this.control.cycle-difference);
				}
//				clearInterval(timer);
				}
			},
			//获取当前时间
			getTimeNow(){
				var now=new Date();
                return now.getTime();
			},
			handleClick(){
				
			},
			
			Pparameters(val){
				this.videoParameters=Object.assign({},val);
				console.log(val);
			},
			showControl(index){
				if(this.$store.state.adminUserInfo.roleId==7 && 'type' in this.options[index] && this.options[index].type==1){
					this.controlModule=true;
				}else{
					this.activeOp="first";
					this.controlModule=false;
				}
			},
			indexFn(val){
				this.index=val;
				this.showControl(val);
				
				
				console.log('当前item',val)
				console.log('参数数据',this.videoParametersArr[val]);
				console.log('所有数据',this.videoParametersArr);
				this.videoParameters.brightness=this.videoParametersArr[val].brightness==50?this.videoParametersArr[val].brightness:this.videoParametersArr[val].brightness;
				this.videoParameters.contrast=this.videoParametersArr[val].contrast==50?this.videoParametersArr[val].contrast:this.videoParametersArr[val].contrast;
				this.videoParameters.saturation=this.videoParametersArr[val].saturation==50?this.videoParametersArr[val].saturation:this.videoParametersArr[val].saturation;
//				this.videoParameters=Object.assign({},this.videoParametersArr[val]);
				
			},
			visVideoParameters() {
				this.showVideoParameters = !this.showVideoParameters;
			},
			onPlayerReadied() {
				console.log("onPlayerReadied");
				if(!this.initialized) {
					this.initialized = true
					//      this.currentTech = this.player.techName
				}
			},
			// record current time
			onTimeupdate(e) {
				//				console.log('onTimeupdate');
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
				even.currentTarget.firstElementChild.style.display = 'block'
			},
			hideInfo(even) {
				even.currentTarget.firstElementChild.style.display = 'none'
			},
			selectNum(arg) {
				if(arg == "big") {
					this.allScreen = !this.allScreen;
					//					window.event.currentTarget.src = this.pic.pic_zoom_h;
					//					this.allScreen ? window.event.currentTarget.src = './../../static/img/zoom_in.png' : window.event.currentTarget.src = './../../static/img/zoom_out.png'
					if(this.allScreen) {
						console.log("全屏");
						var elem = document.getElementById("dashboard_id");
						elem.style.width = "100%";
						elem.style.height = "100%";
						elem.style.overflowY = "scroll";
						requestFullScreen(elem); // 某个页面元素
						function requestFullScreen(element) {
							// 判断各种浏览器，找到正确的方法
							var requestMethod = element.requestFullScreen || //W3C
								element.webkitRequestFullScreen || //FireFox
								element.mozRequestFullScreen || //Chrome等
								element.msRequestFullscreen; //IE11
							if(requestMethod) {
								console.log("查到");
								console.log(requestMethod);
								requestMethod.call(element);
							} else if(typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
								console.log("没查到");
								var wscript = new ActiveXObject("WScript.Shell");
								if(wscript !== null) {
									wscript.SendKeys("{F11}");
								}
							}
						}
					} else {
						console.log("退出全屏");
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
				}else if(arg == "3a"){
					this.btn_H = "3a";
					if(this.num>3){
						for(var i=3;i<this.num;i++){
							this.options.pop();
							this.videoParametersArr.pop();
							this.bigNum.pop();
						}
					}else if(this.num<3){
						for(var i=this.num;i<3;i++){
							this.options.push({id:"",serial:"",title:"",type:""});
							this.videoParametersArr.push({brightness: 100,contrast: 100,saturation: 100});
							this.bigNum.push(i+1);
						}
					}
					this.num = 3;
				} else if(arg == "3b"){
					this.btn_H = "3b";
					if(this.num>3){
						for(var i=3;i<this.num;i++){
							this.options.pop();
							this.videoParametersArr.pop();
							this.bigNum.pop();
						}
					}else if(this.num<3){
						for(var i=this.num;i<3;i++){
							this.options.push({id:"",serial:"",title:"",type:""});
							this.videoParametersArr.push({brightness: 100,contrast: 100,saturation: 100});
							this.bigNum.push(i+1);
						}
					}
					this.num = 3;
				} else {
					
					this.btn_H = arg;
					if(this.num>arg){
						for(var i=arg;i<this.num;i++){
							this.options.pop();
							this.videoParametersArr.pop();
							this.bigNum.pop();
						}
					}else if(this.num<arg){
						for(var i=this.num;i<arg;i++){
							this.options.push({id:"",serial:"",title:"",type:""});
							this.videoParametersArr.push({brightness: 100,contrast: 100,saturation: 100});
							this.bigNum.push(i+1);
						}
					}
					this.num = arg;
//					this.bigNum = [];
//					this.options=[];
//					this.videoParametersArr=[];
//					for(var i = 1; i <= arg; i++) {
//						console.log('大屏', i);
//						this.bigNum.push(i);
//						this.options.push({id:"",serial:"",title:"",type:""});
//						this.videoParametersArr.push({brightness: 100,contrast: 100,saturation: 100});
//					}
				}

			},
			/*获取分组*/
			getSelectGroup() {
				let info = {
					type: "2",
					groupName: ""
				};
				selectGroup(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						let attributes = {
							id: 'id',
							parentId: 'parentId',
							name: 'groupName',
							rootId: "0"
						};
						let equArray = value.groupAndEquipmentDtoList;

						function run(chiArr) {
							if(equArray.length !== 0) {
								for(let i = 0; i < chiArr.length; i++) {
									for(let j = 0; j < equArray.length; j++) {
										if(chiArr[i].id == equArray[j].id && chiArr[i].type == 'group' ) {
											let obj = {
												id: equArray[j].eId,
												title: equArray[j].eName,
												children: [],
												type: equArray[j].type,
												serial:equArray[j].serial,
												// serial:"rtmp://dxftech.asuscomm.com/hls/mystream",
											};
											console.log(i%2);
											chiArr[i].children.push(obj);
											equArray.splice(j, 1);
											j--;
										}
									}
									run(chiArr[i].children);
								}
							}
						}
						let originalData = value.videoGroupsList;
						//					for(var index in originalData){
						//						console.log(originalData[index]);
						//						if(originalData[index].type==="1"){
						//							originalData.splice(index,1);
						//						}
						//					}
						let groupArray = formatTreeData(originalData, attributes);

						run(groupArray);
						this.groupAndEqu = groupArray;
						console.log("groupAndEqu",this.groupAndEqu);
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},

			filterNode(value, data) {
				if(!value) return true;
				return data.title.indexOf(value) !== -1;
			},
			//监控播放次数
			insertPlayVideoNum(id){
				let info={id:id}
				insertPlayVideo(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
//					if(success) {
//						console.log("gg");
//					} else {
//						this.$message({
//							message: errMsg,
//							type: 'error'
//						});
//					}
				});
			},
			drop(index) {
				console.log(index);
				console.log(this.index);
				console.log(this.dragUrl);
				// this.dragUrl.index=index;
				this.options.splice(index,1,this.dragUrl);
				this.insertPlayVideoNum(this.dragUrl.id);
				if(index==this.index){
					this.showControl(this.index);
				}
			},
			dblclickBtn(data){
				console.log(data);
				console.log(this.index);
				// data.index=this.index;
				this.options.splice(this.index,1,data);
				if(this.index>=this.num-1){
					this.index=0;
				}else{
					this.index++;
				}
				console.log("index啊index啊",this.index);
				$(".mode").css("border", "none");
				$(".mode")[this.index].style.border = "2px solid #00FF00";
//				this.showControl(this.index);
			},
			dragenter(ev) {
//				console.log(ev);
				ev.preventDefault();
			},
			selectItem(index) {
				console.log(111);
			},

			//拖拽相关
			handleDragStart(node, ev) {
				console.log('drag start', node);
				this.dragUrl={
					id:node.data.id,serial:node.data.serial,title:node.data.title,type:node.data.type,
				};
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
//				return dropNode.data.label !== '二级 3-1';
			},
			allowDrag(draggingNode) {
				return draggingNode.data.type!== "group";
			},
			arametersChange(val) {
				let ele = document.getElementsByClassName("videoItem")[this.index];
				
				this.videoParametersArr[this.index].brightness=val;
				console.log('亮度参数',this.videoParametersArr[this.index].brightness);
				let num = "brightness(" + (val) + "%)";
				ele.style.webkitFilter = num;
			},
			contrastChange(val) {
				let ele = document.getElementsByClassName("videoItem")[this.index];
				this.videoParametersArr[this.index].contrast=val;
				let num = "contrast(" +  val + "%)";
				ele.style.webkitFilter = num;
			},
			saturationChange(val) {
				let ele = document.getElementsByClassName("videoItem")[this.index];
//				let value = 0;
//				value = val >= 50 ? 100 + (val - 50) * 6 : val * 2;
				this.videoParametersArr[this.index].saturation=val;
				let num = "saturate(" + val + "%)";
				ele.style.webkitFilter = num;
			},
			defaultParameters() {
				this.contrastChange(100);
				this.contrastChange(100);
				this.saturationChange(100);
				this.videoParameters.brightness=100;
				this.videoParameters.contrast=100;
				this.videoParameters.saturation=100;
				this.videoParametersArr[this.index].brightness=100;
				this.videoParametersArr[this.index].contrast=100;
				this.videoParametersArr[this.index].saturation=100;
			},
			controlSpeed(event){
				let obj = event.srcElement ? event.srcElement : event.target;
				console.log(obj);
				this.movingSpeed=obj.title * 10;
				let val=(-(obj.title-1)*171)+'px 0px';
				$('.ptzCircle').css('background-position',val);
			},

		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		mounted() {
//			var _this=this;
//			$(".ptzCircle>div>span").click(function(){
//				
//				_this.movingSpeed=this.title * 10;
//				console.log('移动速度',_this.movingSpeed);
//				let val=(-(this.title-1)*171)+'px 0px';
//				$('.ptzCircle').css('background-position',val);
//			});
			
			
//			var objEle=$("object");
//			console.log(objEle);
			$(".el-button").on("click",function(){
				console.log(13465);
//				event.preventDefault();
				
			});
			
			var _this = this;

			window.onresize = function() {
				if(!checkFull()) {
					_this.allScreen = false;
					_this.$refs.bigScreeen.src = _this.pic.pic_zoom;
					// console.log(1234);
					//要执行的动作
					//          $("#dashboard_id").removeClass('expand').addClass('contract');//这里捡个懒，直接用JQ来改className
				} else {
					_this.allScreen = true;
					_this.$refs.bigScreeen.src = _this.pic.pic_zoom_h;
				}
			}

			function checkFull() {
				var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
				//to fix : false || undefined == undefined
				if(isFull === undefined) {
					// console.log("不是全屏");
					isFull = false;
				}
				return isFull;
			}

		},
		created() {
			this.getSelectGroup();
			for(var i =0;i<this.num;i++){
				this.videoParametersArr.push({brightness: 100,contrast: 100,saturation: 100});
			}
		},
	}
</script>

<style>
	.liveView {
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
		background: #000;
	}
	.part3a{
		background: #000;
		height: 50%;
		width: 50%;
	}
	.part3a:nth-child(3){
		width: 50%;
		margin-left: 25%;
	}
	.part3b{
		background: #000;
		height: 33.33%;
		width: 100%;
	}
	.part3b:nth-child(3){
		width: 50%;
		margin-left: 25%;
	}
	.part4 {
		height: 50%;
		width: 50%;
		background: #000;
	}
	
	.part9 {
		height: 33.333%;
		width: 33.333%;
		background: #000;
	}
	
	.part16 {
		height: 25%;
		width: 25%;
		background: #000;
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
	
	.selectScreenItem {
		border: 2px solid #fff;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
	}
	
	.screenItemIndex {
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
		position: absolute;
		right: 5px;
		top: 9px;
		cursor: pointer;
		z-index: 999;
		padding: 5px;
	}
	
	.VideoParametersClose {
		transform: rotate(90deg);
		position: absolute;
		right: 5px;
		top: 9px;
		cursor: pointer;
		z-index: 999;
		padding: 5px;
	}
	
	.bigScreen .el-aside {
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		margin-right: 5px;
		padding-right: 5px;
		box-sizing: border-box;
		border: 1px solid #dcdfe6;
		-webkit-user-select: none;
	}
	/*.mask{
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}*/
	/*.bigScreen .video-js .vjs-fullscreen-control{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}*/
	
	.selectRadio {
		height: 30px;
		width: 30px;
		position: absolute;
		top: 5px;
		left: 5px;
		z-index: 101;
		display: none;
	}
	
	.selectRadio .el-radio__label {
		display: none;
	}
	.selectRadio .el-radio__inner {
		height: 20px;
		width: 20px;
	}
	.bigScreen .el-card__body{
		padding-top: 0 !important;
	}
	/*object{
		min-height: 300px !important;
		min-width: 400px !important;
	}*/
	.ptzCtrl .ptzHandle li a {
    cursor: pointer;
}
</style>
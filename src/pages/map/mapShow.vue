<template>
	<section style="height: 100%;width: 100%;" class="mapShow">
		<div style="height: 100%;margin-top: 5px;box-sizing: border-box;border-top:1px solid #bfcbd9 ;padding-bottom: 5px;">
			<div @click="mobileBtn" class="mobileBtn" :class="openMobile?'aside-150':'aside-0'"><i :class="openMobile?'el-icon-arrow-left':'el-icon-arrow-right'" style="font-size: 20px;line-height: 50px;"></i></div>
			<div :class="openMobile?'left300':'left0'" style="border-right:1px solid #bfcbd9 ;position: fixed;top: 125px;left: 0;z-index: 100;height: 100%;background: #fff;">
				<el-input placeholder="输入关键字过滤" size="small" suffix-icon="el-icon-search" v-model="filterText">
				</el-input>
				<!--<el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2">
				</el-tree>-->
				<el-tree :data="groupAndEqu" :default-checked-keys="defaultCheckedKeys" show-checkbox node-key="id" @check-change="checkChange"  :filter-node-method="filterNode"  default-expand-all :expand-on-click-node="false"  ref="tree2" >
					<span class="custom-tree-node" slot-scope="{ node, data }">
	       				 <span v-if="data.type=='group'"><i :class="Edata.icon.sitemap"></i> {{ data.title }}</span>
						<span v-else-if="data.type=='equ'"><i :class="Edata.icon.camera"></i> {{ data.title }}</span>
						<span v-else></span>
					</span>
				</el-tree>
			</div>
			<div style="height: 100%;padding: 0;">
				<baidu-map class="bm-view" :center="center" :zoom="zoom" @mousewheel.native="mousewheelOp"  @ready="handler">
					<bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
					<bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="offsetCityList"></bm-city-list>
					<bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
					<bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
					<bm-traffic v-if="controlTraffic" :predictDate="trafficData"></bm-traffic>
					<bm-info-window :position="{lng: winInfo.longitude,lat: winInfo.latitude}" :width="250" :closeOnClick="false" :show="show" @clickclose="infoWindowClose">
						<el-row style="margin-top: 5px;">
							<div style="width: 100%;text-align: center;"><img src="./../../../static/img/aaa.png" style="max-width: 300px;max-height: 150px;margin-top: 5px;" /></div>
							<p style="margin-top: 5px;">编号：{{winInfo.serial}}</p>
							<p style="margin-top: 5px;">名称：{{winInfo.name}}</p>
							<div style="margin-top: 5px;">
								<el-button type="primary" size="mini" @click="immediate(winInfo.id)" style="padding: 5px;">实时监控</el-button>
								<el-button type="primary" size="mini" @click="history(winInfo.id)" style="padding: 5px;">历史监控</el-button>
							</div>
						</el-row>

					</bm-info-window>
					<!--<bm-marker v-for=" (item,index) in market" :key="index" :position="item.markerPoint" @click="infoWindowOpen(index)" :offset="{width: 9,height: -11}" :icon="{url: './static/img/map_camera.png', size: {width: 30, height: 25}}">
					</bm-marker>-->
					<bm-marker v-for=" (item,index) in equipmentData" v-if="item.show" :key="index" :position="{lng: item.longitude,lat: item.latitude}" @click="infoWindowOpen(item)" :offset="{width: 9,height: -11}" :icon="{url: './static/img/map_camera.png', size: {width: 30, height: 25}}">
					</bm-marker>
					<bm-polyline v-for="(item,index) in formatAfterLineArr"  v-if="item.show" :path="item.ll" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>
					<!--<bm-polyline :path="market|filterMarket " stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>-->
					<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="offsetControl">
						<div style="position: relative;">
							<div style="float: right;" class="traffic" :class="controlTraffic?'showTraffic':''" @click="traffic">路况</div>
							<div class="dataWin" v-show="showPrediction">
								<i class="el-icon-close closeTraffic" @click="closeTraffic"></i>
								<el-tabs v-model="trafficSelectModel" type="card" @tab-click="trafficSelect">
									<el-tab-pane label="实时路况" name="first">
										更新时间：{{nowTime}}<i class="el-icon-refresh refresh" @click="refreshTime"></i>
									</el-tab-pane>
									<el-tab-pane label="路况预测" name="second">
										<el-form label-width="50px">
											<span style="color: #666;font-size: 14px;">
								星期{{weekdays}}  {{times}}
							</span>
											<el-form-item label="星期">
												<el-button-group class="weekG">
													<el-button size="mini" @click="selectWeeks(1,'一')">一</el-button>
													<el-button size="mini" @click="selectWeeks(2,'二')">二</el-button>
													<el-button size="mini" @click="selectWeeks(3,'三')">三</el-button>
													<el-button size="mini" @click="selectWeeks(4,'四')">四</el-button>
													<el-button size="mini" @click="selectWeeks(5,'五')">五</el-button>
													<el-button size="mini" @click="selectWeeks(6,'六')">六</el-button>
													<el-button size="mini" @click="selectWeeks(7,'日')">日</el-button>
												</el-button-group>
											</el-form-item>
											<el-form-item label="时间">
												<el-slider v-model="trafficData.hour" :format-tooltip="formaTooltip" :step="1" :max="24" show-stops>
												</el-slider>
											</el-form-item>
										</el-form>
									</el-tab-pane>
								</el-tabs>
							</div>
						</div>
					</bm-control>
					<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="offsetW">
						<!--<template>-->
							<div id="tp-weather-widget" v-if="showWeather"></div>
						<!--</template>-->
					</bm-control>
				</baidu-map>

			</div>

		</div>
		<!--实时视频播放窗口-->
		<el-dialog v-if="showWin" :visible.sync="dialogFormVisible" :center="true" :modal-append-to-body="true" :close-on-click-modal="false" top="5vh" width="90%" @close="diaClose">
			<video-player style='width: 100%;height: 100%;' class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied">
			</video-player>
		</el-dialog>

	</section>
</template>
<script>
	import { BmlCurveLine } from 'vue-baidu-map'
	import {Edata} from '../../js/Edata';
	import {formatTreeData} from '../../js/formatTreeData';
	import { selectGroup,selectRoad ,selectAllEquipment} from '../../js/api';
	export default {
		components: {
			BmlCurveLine
		},
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
				groupAndEqu:[],
				equipmentData:[],
				defaultCheckedKeys:[],
				showWeather:true,
				Edata:Edata,
				zoom: 14,
				center: {
					lng: 119.42285,
					lat: 32.37020
				},
				//				center:"杭州",     /*用这个坐中心会出现一个黑条一闪而过的问题*/
				show: false,
				controlTraffic: false,
				trafficData: {
					weekday: NaN,
					hour: NaN
				},
				offsetCityList: {
					width: 90,
					height: 8
				},
				offsetW: {
					width: 217,
					height: 5
				},
				offsetControl: {
					width: 163,
					height: 8
				},
				times: "",
				formatAfterLineArr:[],
				showPrediction: false,
				trafficHour: 0,
				weekdays: '一',
				trafficSelectModel: "first",
				nowTime: "",
				dialogFormVisible: true,
				showWin: false,
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
					fullscreenToggle: true,
					controlBar: {
						//           timeDivider: false, // 时间分割线
						//           durationDisplay: false, // 总时间
						//           progressControl: true, // 进度条
						//           customControlSpacer: true, // 未知
						//           fullscreenToggle: true // 全屏
					},
				},

				market: [{
						markerPoint: {
							lng: 119.47869,
							lat: 32.36312
						},
						num: '001'
					},
					{
						markerPoint: {
							lng: 119.48012,
							lat: 32.36812
						},
						num: '002'
					},
					{
						markerPoint: {
							lng: 119.48084,
							lat: 32.37142
						},
						num: '003'
					},
					{
						markerPoint: {
							lng: 119.48099,
							lat: 32.37910
						},
						num: '004'
					},
					{
						markerPoint: {
							lng: 119.48084,
							lat: 32.38459
						},
						num: '005'
					},
					{
						markerPoint: {
							lng: 119.48314,
							lat: 32.40154
						},
						num: '006'
					},
					{
						markerPoint: {
							lng: 119.48285,
							lat: 32.40020
						},
						num: '007'
					},
					{
						markerPoint: {
							lng: 119.48084,
							lat: 32.38410
						},
						num: '008'
					},
					{
						markerPoint: {
							lng: 119.48099,
							lat: 32.37922
						},
						num: '009'
					},
					{
						markerPoint: {
							lng: 119.47854,
							lat: 32.37934
						},
						num: '010'
					},
					{
						markerPoint: {
							lng: 119.47222,
							lat: 32.37825
						},
						num: '011'
					},
					{
						markerPoint: {
							lng: 119.45411,
							lat: 32.37410
						},
						num: '012'
					},
					{
						markerPoint: {
							lng: 119.45023,
							lat: 32.38337
						},
						num: '013'
					},
					{
						markerPoint: {
							lng: 119.43902,
							lat: 32.38422
						},
						num: '014'
					},
					{
						markerPoint: {
							lng: 119.43672,
							lat: 32.38459
						},
						num: '015'
					},
					{
						markerPoint: {
							lng: 119.43125,
							lat: 32.38312
						},
						num: '016'
					},
					{
						markerPoint: {
							lng: 119.42378,
							lat: 32.37910
						},
						num: '017'
					},
					{
						markerPoint: {
							lng: 119.41243,
							lat: 32.37605
						},
						num: '018'
					},
					{
						markerPoint: {
							lng: 119.40826,
							lat: 32.37385
						},
						num: '019'
					},
					{
						markerPoint: {
							lng: 119.40423,
							lat: 32.37264
						},
						num: '020'
					},
					{
						markerPoint: {
							lng: 119.39619,
							lat: 32.37166
						},
						num: '021'
					},
					{
						markerPoint: {
							lng: 119.37520,
							lat: 32.36483
						},
						num: '022'
					},
					{
						markerPoint: {
							lng: 119.35551,
							lat: 32.34201
						},
						num: '023'
					},
				],
				polylinePath: [],
				markerTitle: "监控探头信息",
				winInfo: {
					
				},
				searchData: {
					serial: "",
					status: "",
					name: "",
					ip: "",
					address: "",
					groupId: "",
					current: 1,
					size: 999,
				},
				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},

				asideWidth: '150px',
				iconClass: 'el-icon-arrow-left',
				openMobile: true,
				data5: JSON.parse(JSON.stringify(data)),

			}
		},
		methods: {
			onPlayerReadied() {
				if(!this.initialized) {
					this.initialized = true
					//      this.currentTech = this.player.techName
				}
			},
			mousewheelOp(val) {
				if(val.deltaY > 0) {
					this.zoom > 3 ? this.zoom-- : "";
				} else {
					this.zoom < 19 ? this.zoom++ : "";
				}
			},
			infoWindowClose() {
				console.log('0');
				console.log(this.show);
				this.show = false;
			},
			infoWindowOpen(item) {
				console.log(this.show);
				this.show = true;
				this.winInfo= item;
				console.log(this.show);
			},
			diaClose() {
				console.log(123456);
				this.showWin = false;
				this.dialogFormVisible = false;
			},
			//即使播放
			immediate(id) {
				//				console.log(id);
				this.showWin = true;
				this.dialogFormVisible = true;

			},
			//历史记录
			history(id) {
				console.log(id);
			},
			//路况预测
			traffic() {
				this.controlTraffic = !this.controlTraffic;
				this.showPrediction = !this.showPrediction;
				if(this.controlTraffic) {
					console.log(new Date().getHours());
					let t = new Date();
					this.times = this.getTime(false);
					this.trafficData.hour = t.getHours();
					this.nowTime = this.getTime(true);
				}
			},
			getTime(h) {
				let t = new Date();
				if(h) {
					return(t.getHours() > 10 ? t.getHours() : '0' + t.getHours()) + ":" + (t.getMinutes() > 10 ? t.getMinutes() : '0' + t.getMinutes());
				} else {
					return(t.getHours() > 10 ? t.getHours() : '0' + t.getHours()) + ":00";
				}
				console.log(h, m);
			},
			//选择星期
			selectWeeks(i, j) {
				this.weekdays = j;
				this.trafficData.weekday = i;

			},
			//格式化小时
			formaTooltip(val) {
				return(val > 10 ? val : '0' + val) + ":00";
			},
			//实时\预测
			trafficSelect(tab, event) {
				console.log(tab, event);
			},
			//刷新时间
			refreshTime() {
				this.nowTime = this.getTime(true);
				console.log(this.nowTime);
			},
			//关闭交通流量预测窗口
			closeTraffic() {
				this.controlTraffic = !this.controlTraffic;
				this.showPrediction = false;
			},
			filterNode(value, data) {
				console.log(data);
				console.log(value);
				if(!value) return true;
				return data.title.indexOf(value) !== -1;
			},
			mobileBtn() {
				this.openMobile = !this.openMobile;
			},

			handler() {
				(function(T, h, i, n, k, P, a, g, e) {
					g = function() {
						P = h.createElement(i);
						a = h.getElementsByTagName(i)[0];
						P.src = k;
						P.charset = "utf-8";
						P.async = 'async';
						a.parentNode.insertBefore(P, a)
					};
					T["ThinkPageWeatherWidgetObject"] = n;
					T[n] || (T[n] = function() {
						(T[n].q = T[n].q || []).push(arguments)
					});
					T[n].l = +new Date();
					g();
//					if(T.attachEvent) {
//						T.attachEvent("onload", g)
//					} else {
//						T.addEventListener("load", g, false)
//					}
				}(window, document, "script", "tpwidget", "//widget.seniverse.com/widget/chameleon.js"));
				tpwidget("init", {
					"flavor": "slim",
					"location": "WTUBM40RTTUB",
					"geolocation": "disabled",
					"language": "auto",
					"unit": "c",
					"theme": "chameleon",
					"container": "tp-weather-widget",
					"bubble": "enabled",
					"alarmType": "circle",
					"uid": "U96951CA27",
					"hash": "d91eaac5d1d8b9097beb363cc8c8605d"
				});
				tpwidget("show");
				
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
						console.log("分组和设备",data);
						let attributes = {
					      id: 'id',
					      parentId: 'parentId',
					      name: 'groupName',
					      rootId: "0"
					  };
					 
					  let equArray=value.groupAndEquipmentDtoList;

					function run(chiArr) {
		if(equArray.length !== 0) {
			for(let i = 0; i < chiArr.length; i++) {
				for(let j = 0; j < equArray.length; j++) {
					if(chiArr[i].id == equArray[j].id && chiArr[i].type=='group') {
						let obj = {
							id: equArray[j].eId,
							title: equArray[j].eName,
							children: [],
							type:"equ"
						};
						chiArr[i].children.push(obj);
						equArray.splice(j, 1);
						j--;
					}
				}
				run(chiArr[i].children);
			}
		}
	}
					let originalData=value.videoGroupsList;
					for(var item of originalData){
					  	this.defaultCheckedKeys.push(item.id);
					  }
					  let groupArray=formatTreeData(originalData,attributes);
					   
					  run(groupArray);
					  this.groupAndEqu=groupArray;
					  console.log("123456789",groupArray);
					  
					  
					  
					  
					  
					  
					  
					  
					  
					  
					  
					  
					  
					  console.log("大街",value.videoGroupsList.length);
					  console.log("大街",JSON.stringify(value.videoGroupsList));
					  console.log(789,formatTreeData(value.videoGroupsList,attributes));
//						this.groupArr = this.formatGroup(value);
//						console.log(this.groupArr);

					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
//			 run(chiArr,equArray) {
//		if(equArray.length !== 0) {
//			for(let i = 0; i < chiArr.length; i++) {
//				for(let j = 0; j < equArray.length; j++) {
//					if(chiArr[i].id == equArray[j].id) {
//						let obj = {
//							id: equArray[j].eId,
//							title: equArray[j].eName,
//							children: [],
//							type:"equ"
//						};
//						chiArr[i].children.push(obj);
//						equArray.splice(j, 1);
//						j--;
//					}
//				}
//				this.run(chiArr[i].children);
//			}
//		}
//	},
			/*查询线路*/
			getSelectLine() {
				let info = {
					current: "1",
					size: "999"
				}
				selectRoad(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
//						console.log(data);
						this.lineArr = value;
						this.formatAfterLineArr=[];
						for(var item of value){
							this.formatAfterLineArr.push({
								show:true,
								id:item.id,
								ll:this.transCoordinate(this.trims(item.ll).split(","))     
							});
						}
						console.log(this.formatAfterLineArr);
					} else {
//						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*去除字符串里的所有空格*/
			trims(val) {
				return val.replace(/[ ]/g, "");
			},
			/*转换成坐标*/
			transCoordinate(arr) {
				let coordinateList = [];
				for(var i = 0; i < arr.length; i += 2) {
					coordinateList.push({
						lng: arr[i],
						lat: arr[i + 1]
					});
				}
				return coordinateList;
			},
			checkChange(obj,state){
				if(obj.type==="equ"){
					for(var index in this.equipmentData){
						if(obj.id==this.equipmentData[index].id){
							let item = this.equipmentData[index];
							item.show=state;
							this.equipmentData.splice(index,1,item);
						}
					}
				}
				console.log(this.equipmentData);
				console.log(obj);
				console.log(state);
			},
			/*获取设备列表*/
			getEquipmentList() {
				selectAllEquipment(this.searchData).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.equipmentData = value;
						for(var item of this.equipmentData){
							item.show=true;
						}
						
					} else {
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},

		},
		//过滤器
		filters: {
			filterMarket(val) {
				var info = [];
				for(var index in val) {
					info.push(val[index].markerPoint);
				}
				return info;
			}
		},
		watch: {
			'trafficData.hour': function(newVal) {
				console.log(newVal);
				this.times = (newVal > 10 ? newVal : '0' + newVal) + ":00";
				//				this.controlTraffic=!this.controlTraffic;
			},
			filterText(val) {
				this.$refs.tree2.filter(val);
			},
		},
		mounted() {
			this.handler();
		},
		created() {
			this.getSelectGroup();
			this.getSelectLine();
			this.getEquipmentList();
		},
		beforeDestroy(){
//			this.showWeather=false;
		},
	}
</script>

<style>
	.bm-view {
		width: 100%;
		height: 100%;
	}
	
	.traffic {
		border: 1px solid #cdcdcd;
		background-color: #fff;
		color: #4c4c4c;
		font-size: 12px;
		-webkit-user-select: none;
		height: 24px;
		line-height: 24px;
		padding: 0 10px;
		text-align: center;
	}
	
	.traffic:hover {
		cursor: pointer;
		color: #579AFC;
	}
	
	.showTraffic {
		color: #579AFC;
		border: 1px solid #579AFC;
	}
	
	.dataWin {
		width: 300px;
		position: absolute;
		top: 30px;
		left: -100px;
		background: #fff;
		font-size: 14px;
		padding: 4px;
		box-sizing: border-box;
	}
	
	.dataWin .el-slider {
		margin-right: 20px;
	}
	
	.dataWin .el-form-item {
		margin-bottom: 0;
	}
	
	.weekG .el-button {
		padding: 4px 8px;
	}
	
	.refresh {
		font-size: 14px;
		font-weight: bold;
		margin-left: 5px;
	}
	
	.refresh:hover {
		cursor: pointer;
	}
	
	.closeTraffic {
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
		z-index: 1000;
	}
	
	.anchorBL {
		/*display: none;*/
	}
	
	.mapShow .video-js {
		height: 80vh;
	}
	
	.mapShow .el-dialog {
		height: 90%;
	}
	
	.mapShow .vjs-button {
		height: auto;
	}
	
	#tp-weather-widget {
		background: #fff;
		/*height: 24px;*/
		border: 1px solid #cdcdcd;
		/*position: absolute;
		top: 0;
		left: 50px;*/
	}
	/*.container__sDy_v_ {display: none;}*/
	/*.textCenter_73kZ5EK {display: none;}*/
	/*.weakText_1XEibmw{display: none;}*/
	/*.baseText_1MW-qdn {display: none;}*/
	
	.copyright_2JjcV5R {
		display: none;
	}
	
	.video-js .vjs-control {
		height: auto;
	}
	
	.mobileBtn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 999;
		width: 20px;
		height: 50px;
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		border-left: none;
	}
	
	.mobileBtn:hover {
		cursor: pointer;
	}
	
	.aside-150 {
		left: 300px
	}
	
	.aside-0 {
		left: 0px
	}
	.left300{
		width: 300px;
		display: block;
	}
	.left0{
		display: none;
	}
</style>
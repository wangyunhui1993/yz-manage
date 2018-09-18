<template>
	<section style="height: 100%;width: 100%;" class="statsScreen">
		<div id="part1" class="part">
			<div class="timerSelect">
				<el-date-picker size="mini" v-model="value1" type="daterange" unlink-panels :picker-options="pickerOptions1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
				</el-date-picker>
			</div>
			<baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
				<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="part1Title">
					<h3 style="color:#333">设备访问热度</h3>
				</bm-control>
				<bm-polyline v-for="(item,index) in formatAfterLineArr"  :path="item.ll"  stroke-color="#0066FF" :stroke-opacity="1"  :stroke-weight="5"></bm-polyline>
				<bml-heatmap v-if="heatData.length"  :data="heatData" :max="hotMax" :radius="20"></bml-heatmap>
			</baidu-map>
		</div>
		<div class="part">
			<div class="timerSelect">
				<el-date-picker size="mini" v-model="value2" :picker-options="pickerOptions2" type="week" format="yyyy 第 WW 周" placeholder="选择某个周">
				</el-date-picker>
			</div>
			<div id="part2" style="width: 100%;height: 100%;"></div>
		</div>
		<div class="part">
			<div class="timerSelect">
				<el-date-picker size="mini" v-model="value3" type="date" placeholder="选择某一天">
				</el-date-picker>
			</div>
			<div id="part3" style="width: 100%;height: 100%;"></div>
		</div>
		<div class="part">
			<div class="timerSelect">
				<el-date-picker size="mini" v-model="value4" type="month" placeholder="选择某个月">
				</el-date-picker>
			</div>
			<div id="part4" style="width: 100%;height: 100%;"></div>
		</div>
	</section>
</template>

<script>
	import echarts from 'echarts'
	import { BmlHeatmap } from 'vue-baidu-map'
	import { selectEquipmentHot, selectUserLogByTime, selectLogByLastWeek, selectSuccessLog, selectRoad } from '../js/api';
	import jiangsu from 'echarts/map/js/province/jiangsu'
	import { formatTime } from '../js/formatTime';
	require('echarts/extension/bmap/bmap') //引入地图文件
	var myChartPart2 = "";
	var myChartPart3 = "";
	var myChartPart4 = "";
	var dataAxisPart3 = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
	var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
	var dataPart1 = [];
	var geoCoordMap = {};
	var newdate = new Date();
	var y = newdate.getFullYear();
	var m = newdate.getMonth() + 1;
	m=m>9?m:"0"+m;
	console.log(m);
	export default {
		components: {
			BmlHeatmap
		},
		data() {
			return {
				hotMax:10,
				days: [],
				day: [],
				formatAfterLineArr: [],
				part1Title: {
					width: 20,
					height: 0
				},
				pickerOptions1: {
					shortcuts: [{
						text: '本月',
						onClick(picker) {
							const end = new Date();
							const start = new Date(y + '-' + m);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '上个月',
						onClick(picker) {
							var start = "";
							if(m == 1) {
								start = new Date((y - 1) + '-' + '12');
							} else {
								start = new Date(y + '-' + (m - 1));
							}
							const end = new Date(y + '-' + m);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}, 
//					{
//						text: '本年',
//						onClick(picker) {
//							const end = new Date();
//							const start = new Date(y + "-" + "01-01 00:00:00");
//							picker.$emit('pick', [start, end]);
//						}
//					}, {
//						text: '去年',
//						onClick(picker) {
//							const end = new Date(y + "-" + "01-01 00:00:00");
//							const start = new Date((y - 1) + "-" + "01-01 00:00:00");
//							picker.$emit('pick', [start, end]);
//						}
//					}, {
//						text: '近三年',
//						onClick(picker) {
//							const end = new Date();
//							const start = new Date();
//							start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
//							picker.$emit('pick', [start, end]);
//						}
//					}, {
//						text: '近七年',
//						onClick(picker) {
//							const end = new Date();
//							const start = new Date();
//							start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 7);
//							picker.$emit('pick', [start, end]);
//						}
//					}, 
					]
				},
				pickerOptions2: {
					firstDayOfWeek: 1
				},
				value1: [new Date(y + '-' + m + "-01"), newdate],
				value2: "",
				value3: newdate,
				value4: newdate,
				zoom: 13,
				center: {
					lng: 119.42285,
					lat: 32.37020
				},
				heatData: [],
				dataPart2: [],
				dataPart3: [],
				percentdata4: [],
				successdata4: [],
				errordata4: [],
				x4List: [],
			}
		},
		watch: {
			value1: function(val) {
				console.log(val);
				this.getSelectEquipmentHot(val);
			},
			value2: function(val) {
				console.log(val);
				var info = {
					sTime: new Date(val - 3600 * 1000 * 24),
					eTime: new Date(val.getTime() + 3600 * 1000 * 24 * 5)
				};

				this.getSelectLogByLastWeek(info);
			},
			value3: function(val) {
				console.log(val);
				this.getSelectUserLogByTime(val);
			},
			value4: function(val) {
				console.log(val);
				this.getSelectSuccessLog(val);
			},
		},
		methods: {
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
						this.formatAfterLineArr = [];
						for(var item of value) {
							this.formatAfterLineArr.push({
								id: item.id,
								ll: this.transCoordinate(this.trims(item.ll).split(","))
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
			//			mousewheelOp(val) {
			//				if(val.deltaY > 0) {
			//					this.zoom > 3 ? this.zoom-- : "";
			//				} else {
			//					this.zoom < 19 ? this.zoom++ : "";
			//				}
			//			},

			/*获取设备访问热度*/
			getSelectEquipmentHot(val) {
				if(!val) return;
				let info = {
					sTime: val[0],
					eTime: val[1]
				}
				selectEquipmentHot(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.heatData.splice(0,this.heatData.length);
						this.hotMax=10;
						for(var item of value) {
							this.heatData.push({
								lng: item.longitude,
								lat: item.latitude,
								count: parseInt(item.coun),
							});
							console.log(item);
							if(this.hotMax<parseInt(item.coun)){
								this.hotMax=parseInt(item.coun);
							}
							
						}
						console.log('最大的次数',this.hotMax);
						console.log(this.heatData);
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*获取用户访问系统的事件分布*/
			getSelectUserLogByTime(val) {
				let info = {
					sTime: val
				}
				selectUserLogByTime(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						var arr = [];
						for(var item in value) {
							if(item != "daytime") {
								arr.push(value[item]);
							}
						}

						this.dataPart3.splice(0, this.dataPart3.length, ...arr);
						this.getPart3();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*获取设备访问时间分布*/
			getSelectLogByLastWeek(val) {
				selectLogByLastWeek(val).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.days = [];
						this.dataPart2 = [];
						var timeTep = val.eTime.getTime();
						for(var i = 0; i < 7; i++) {
							var timeTepItem = timeTep - 3600 * 1000 * 24 * i;
							this.days.push(formatTime(new Date(timeTepItem), true));
						}
						this.day = [];
						for(var item of this.days) {
							this.day.push(item.substring(5));
						}
						console.log(this.day);
						for(var j = 0; j < 7; j++) {
							var has = true;
							for(var item of value) {
								if(item.daytime == this.days[j]) {
									has = false;
									var indexNum = 0;
									for(var key in item) {
										if(key != 'daytime') this.dataPart2.push([j, indexNum++, item[key]]);
									}
								}
							}
							if(has) {
								for(var n = 0; n < 24; n++) {
									this.dataPart2.push([j, 0, 0]);
								}
							}
						}
						this.getPart2();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*获取系统正常服务率分布*/
			getSelectSuccessLog(val) {
				let tiem4 = new Date(val);
				let y4 = tiem4.getFullYear();
				let m4 = tiem4.getMonth() + 1;
				m4 = m4 < 10 ? ('0' + m4) : m4;
				let info = {
					sTime: y4 + "-" + m4
				}
				this.x4List = [];
				let days4 = this.getCountDays(info.sTime);
				for(var ii = 1; ii <= days4; ii++) {
					this.x4List.push(ii + "日");
				}

				selectSuccessLog(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						let errorList = [];
						let seccessList = [];
						this.successdata4 = [];
						this.errordata4 = [];
						for(var item of value) {
							if(item.success === "0") {
								seccessList.push(item);
							} else if(item.success === "1") {
								errorList.push(item);
							}
						}
						for(var ii = 1; ii <= days4; ii++) {
							let successType = true;
							let errorType = true;
							for(var successItem of seccessList) {
								let successIndex = ii < 10 ? ('0' + ii) : ii;
								let successDays = info.sTime + "-" + successIndex;
								if(successItem.daytime == successDays) {
									this.successdata4.push(parseInt(successItem.num));
									successType = false;
								}
							}
							if(successType) {
								this.successdata4.push(0);
							}

							for(var errorItem of errorList) {
								let errorIndex = ii < 10 ? ('0' + ii) : ii;
								let errorDays = info.sTime + "-" + errorIndex;
								if(errorItem.daytime == errorDays) {
									this.errordata4.push(parseInt(errorItem.num));
									errorType = false;
								}
							}
							if(errorType) {
								this.errordata4.push(0);
							}
						}

						console.log("this.successdata4", this.successdata4);
						console.log("this.errordata4", this.errordata4);
						this.percentdata4 = [];
						for(var jj = 0; jj < days4; jj++) {
							if(this.errordata4[jj] === 0) {
								this.percentdata4.push(100);
								console.log(jj);
								console.log(this.percentdata4[jj]);
							} else if(this.successdata4[jj] === 0) {
								this.percentdata4.push(0);
								console.log(jj);
								console.log(this.percentdata4[jj]);
							} else {

								let percentNum = (this.successdata4[jj] / (this.successdata4[jj] + this.errordata4[jj])).toFixed(2) * 100;
								this.percentdata4.push(percentNum);
								console.log("运行了吗？");
								console.log(this.percentdata4[jj]);
							}
						}

						this.getPart4();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*判断某年某月有多少天*/
			getCountDays(ym) {
				var curDate = new Date(ym);
				/* 获取当前月份 */
				var curMonth = curDate.getMonth();
				/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
				curDate.setMonth(curMonth + 1);
				/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
				curDate.setDate(0);
				/* 返回当月的天数 */
				return curDate.getDate();
			},

			initEchart(el, options) {
				echarts.init(document.getElementById(el)).setOption(options, true);
			},
			getPart2() {
				this.dataPart2 = this.dataPart2.map(function(item) {
					return [item[1], item[0], item[2] || '-'];
				});
				var optionPart2 = {
					title: {
						text: '设备访问时间分布',
						x: 'center',
					},
					tooltip: {
						position: 'bottom',
						padding: 5
					},
					animation: false,
					grid: {
						height: '50%',
						y: '10%',
						tooltip: {
							show: true,
							formatter: function(params) {
								console.log(params);

								var relVal = "访问次数：<br/>";
								relVal += "&nbsp;&nbsp;" + params.data[2] + "次"
								return relVal;
							}
						},
					},
					xAxis: {
						type: 'category',
						data: hours,
						splitArea: {
							show: true
						}
					},
					yAxis: {
						type: 'category',
						data: this.day,
						splitArea: {
							show: true
						}
					},
					visualMap: {
						min: 0,
						max: 10,
						calculable: true,
						orient: 'horizontal',
						left: 'center',
						bottom: '15%'
					},
					series: [{
						name: 'Punch Card',
						type: 'heatmap',
						data: this.dataPart2,
						label: {
							normal: {
								show: true
							}
						},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				myChartPart2 = echarts.init(document.getElementById('part2'));
				this.initEchart('part2', optionPart2);
			},
			getPart3() {
				//this.dataPart3 = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220, 334, 198, 123, 125];
				var yMax = Math.max.apply(Math, this.dataPart3);
				if(yMax < 5) {
					yMax = 5;
				} else {
					yMax = Math.ceil(yMax * 1.2);
					yMax = yMax % 5 === 0 ? yMax : Math.ceil(yMax/5)*5;
				}
				//				var dataShadow = [];
				//				for(var i = 0; i < this.dataPart3.length; i++) {
				//					dataShadow.push(yMax);
				//				}
				var optionPart3 = {
					title: {
						text: '系统访问时间分布',
						x: 'center',
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) //数据格式
						{
							console.log(params);
							var relVal = "访问次数:<br/>";
							relVal += "&nbsp;&nbsp;" + params[0].data + "次";
							return relVal;
						}
					},
					xAxis: [{
							type: 'category',
							data: dataAxisPart3,
							axisTick: {
								alignWithLabel: true
							}
						}

						//						data: dataAxisPart3,
						//						axisLabel: {
						//							inside: true,
						//							textStyle: {
						//								color: '#333'
						//							}
						//						},
						//						axisTick: {
						//							show: false
						//						},
						//						axisLine: {
						//							show: false
						//						},
						//						z: 10
					],
					yAxis: [{
							type: 'value',
							max: yMax,
						}
						//						axisLine: {
						//							show: false
						//						},
						//						axisTick: {
						//							show: false
						//						},
						//						axisLabel: {
						//							textStyle: {
						//								color: '#999'
						//							}
						//						}
					],
					//					dataZoom: [{
					//						type: 'inside'
					//					}],
					series: [{ // For shadow
							type: 'bar',
							//							itemStyle: {
							//								normal: {
							//									color: 'rgba(0,0,0,0.05)'
							//								}
							//							},
							//							barGap: '-100%',
							//							barCategoryGap: '40%',
							data: this.dataPart3,
							barWidth: '60%',
							animation: false
						},
						//						{
						//							type: 'bar',
						//							itemStyle: {
						//								normal: {
						//									color: new echarts.graphic.LinearGradient(
						//										0, 0, 0, 1, [{
						//												offset: 0,
						//												color: '#83bff6'
						//											},
						//											{
						//												offset: 0.5,
						//												color: '#188df0'
						//											},
						//											{
						//												offset: 1,
						//												color: '#188df0'
						//											}
						//										]
						//									)
						//								},
						//								emphasis: {
						//									color: new echarts.graphic.LinearGradient(
						//										0, 0, 0, 1, [{
						//												offset: 0,
						//												color: '#2378f7'
						//											},
						//											{
						//												offset: 0.7,
						//												color: '#2378f7'
						//											},
						//											{
						//												offset: 1,
						//												color: '#83bff6'
						//											}
						//										]
						//									)
						//								}
						//							},
						//							data: this.dataPart3
						//						}
					]
				};
				myChartPart3 = echarts.init(document.getElementById('part3'));
				//			 if(this.dataPart3.length>0){
				//			var zoomSize = 6;
				//			myChartPart3.on('click', function(params) {
				//				myChartPart3.dispatchAction({
				//					type: 'dataZoom',
				//					startValue: dataAxisPart3[Math.max(params.dataIndex - zoomSize / 2, 0)],
				//					endValue: dataAxisPart3[Math.min(params.dataIndex + zoomSize / 2, this.dataPart3.length - 1)]
				//				});
				//			});
				//}
				myChartPart3.setOption(optionPart3, true);
			},
			getPart4() {
				var SMax = Math.max.apply(Math, this.successdata4);
				var RMax = Math.max.apply(Math, this.errordata4);
				var YMax = SMax > RMax ? SMax : RMax;
				YMax = YMax < 5 ? 5 : YMax;
				var optionPart4 = {
					title: {
						text: '系统正常服务率分布',
						x: 'center',
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					toolbox: {
						//      feature: {
						//          dataView: {show: true, readOnly: false},
						//          magicType: {show: true, type: ['line', 'bar']},
						//          restore: {show: true},
						//          saveAsImage: {show: true}
						//      }
					},
					legend: {
						data: ['失败次数', '成功次数', '成功率'],
						x: 'right',
					},
					xAxis: [{
						type: 'category',
						data: this.x4List,
						//					data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
							type: 'value',
							name: '次数',
							min: 0,
							//						max: YMax,
							//						interval: 50,
							axisLabel: {
								formatter: '{value} '
							}
						},
						{
							type: 'value',
							name: '成功率',
							min: 0,
							max: 100,
							interval: 10,
							axisLabel: {
								formatter: '{value} %'
							}
						}
					],
					series: [{
							name: '失败次数',
							type: 'bar',
							//						data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
							data: this.errordata4
						},
						{
							name: '成功次数',
							type: 'bar',
							//						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							data: this.successdata4
						},
						{
							name: '成功率',
							type: 'line',
							yAxisIndex: 1,
							//						data: [98, 96, 99, 100, 98, 99, 97, 94, 100, 95, 98, 96]
							data: this.percentdata4
						}
					]
				};
				myChartPart4 = echarts.init(document.getElementById('part4'));
				this.initEchart('part4', optionPart4);
			},
		},
		//过滤器
		filters: {

		},
		mounted() {
			this.getPart3();
			this.getPart2();
			this.getPart4();

			var convertData = function(data) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if(geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value)
						});
					}
				}
				return res;
			};

			function renderItem(params, api) {
				var color = api.visual('color');
				return {
					type: 'polygon',

					style: api.style({
						fill: color,
						stroke: echarts.color.lift(color)
					})
				};
			}
			var optionPart1 = {
				//	backgroundColor: 'rgba(0,0,0,0.5)',
				//	backgroundColor: '#404a59',
				title: {
					text: '设备访问频率',
					left: 'center',
					textStyle: {
						color: '#000'
					},
					backgroundColor: 'rgba(128, 128, 128, 0.5)',
				},
				tooltip: {
					trigger: 'item'
				},
				bmap: {
					center: [119.47285, 32.37020],
					zoom: 14,
					roam: true,

				},
				series: [
					/* {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(dataPart1),
            symbolSize: function (val) {
                return val[2] / 10;
            },
//          label: {
//              normal: {
//                  formatter: '{b}',
//                  position: 'right',
//                  show: false
//              },
//              emphasis: {
//                  show: true
//              }
//          },
//          itemStyle: {
//              normal: {
//                  color: '#ddb926'
//              }
//          }
        },*/
					{
						name: '设备信息',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						data: convertData(dataPart1.sort(function(a, b) {
							return b.value - a.value;
						}).slice(0, 6)),
						symbolSize: function(val) {
							return val[2] / 10;
						},
						showEffectOn: 'emphasis',
						rippleEffect: {
							brushType: 'stroke'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							}
						},
						//          itemStyle: {
						//              normal: {
						//                  color: '#000033',
						//                  shadowBlur: 10,
						//                  shadowColor: '#333'
						//              }
						//          },
						zlevel: 1
					},
					//      {
					//          type: 'custom',
					//          coordinateSystem: 'bmap',
					//          renderItem: renderItem,
					//          itemStyle: {
					//              normal: {
					//                  opacity: 0.5
					//              }
					//          },
					//          animation: false,
					//          silent: true,
					//          data: [0],
					//          z: -10
					//      }
				]
			};

			//			var zoomSize = 6;
			//			 myChartPart2 = echarts.init(document.getElementById('part2'));
			//			myChartPart2.on('click', function(params) {
			//				myChartPart2.dispatchAction({
			//					type: 'dataZoom',
			//					startValue: dataAxisPart2[Math.max(params.dataIndex - zoomSize / 2, 0)],
			//					endValue: dataAxisPart2[Math.min(params.dataIndex + zoomSize / 2, this.dataPart2.length - 1)]
			//				});
			//			});

			//			 myChartPart3 = echarts.init(document.getElementById('part3'));
			//			myChartPart3.on('click', function(params) {
			//				myChartPart3.dispatchAction({
			//					type: 'dataZoom',
			//					startValue: dataAxisPart2[Math.max(params.dataIndex - zoomSize / 2, 0)],
			//					endValue: dataAxisPart2[Math.min(params.dataIndex + zoomSize / 2, this.dataPart3.length - 1)]
			//				});
			//			});
			//			 myChartPart4 = echarts.init(document.getElementById('part4'));
			$(document).ready(() => {
				//				this.initEchart('part2', optionPart2);
				//				myChartPart3.setOption(optionPart3, true);
				//				this.initEchart('part4', optionPart4);
			});

			window.addEventListener("resize", function() {
				setTimeout(function() {
					myChartPart2.resize();
					myChartPart3.resize();
					myChartPart4.resize();
				}, 100)
			});

		},
		created() {
			this.getSelectLine();
			/*获取设备访问热度*/
			this.getSelectEquipmentHot(this.value1);

			var weeks = newdate.getDay();
			if(weeks == 0) {
				this.value2 = new Date(formatTime(newdate, true).getTime() - 3600 * 1000 * 24 * 5);
			} else {
				this.value2 = new Date(new Date(formatTime(newdate, true)).getTime() - 3600 * 1000 * 24 * (weeks - 2));
			}
			/*获取用户访问系统的事件分布*/
			this.getSelectUserLogByTime(this.value3);
			/*获取系统正常服务率分布*/

			this.getSelectSuccessLog(this.value4);
		}
	}
</script>

<style>
	.bm-view {
		width: 100%;
		height: 100%;
	}
	
	.statsScreen>div {
		width: 50%;
		height: 50%;
		float: left;
		box-sizing: border-box;
	}
	
	.statsScreen>div:nth-child(2n+1) {
		border-right: 1px solid rgb(235, 238, 245);
	}
	
	.statsScreen>div:nth-child(1),
	.statsScreen>div:nth-child(2) {
		border-bottom: 1px solid rgb(235, 238, 245);
	}
	
	.part {
		position: relative;
	}
	
	.timerSelect {
		position: absolute;
		margin-top: 2px;
		margin-left: 2px;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	.statsScreen .el-range__close-icon {
		display: none !important;
	}
	
	.statsScreen .el-input__suffix {
		display: none !important;
	}
</style>
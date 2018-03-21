<template>
	<section style="height: 100%;width: 100%;">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @mousewheel.native="mousewheelOp">

			<bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
			<bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
			<bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="offsetCityList"></bm-city-list>
			<bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>

			<bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>

			<bm-traffic v-if="controlTraffic" :predictDate="trafficData"></bm-traffic>
			<bm-info-window :position="winInfo.markerPoint" :closeOnClick="false" :title="markerTitle" :show="show" @clickclose="infoWindowClose">
				<p>编号：{{winInfo.num}}</p>
				<p>经度：{{winInfo.markerPoint.lng}}</p>
				<p>纬度：{{winInfo.markerPoint.lat}}</p>
				<el-button type="primary" size="mini" @click="immediate(winInfo.num)">实时监控</el-button>
				<el-button type="primary" size="mini" @click="history(winInfo.num)">历史监控</el-button>
			</bm-info-window>
			
			
			
			<bm-marker v-for=" (item,index) in market" :key="index" :position="item.markerPoint" @click="infoWindowOpen(index)" :offset="{width: 9,height: -11}" :icon="{url: './static/img/map_camera.png', size: {width: 30, height: 25}}">
			</bm-marker>
			
			
			
			<bm-polyline :path="market|filterMarket " stroke-color="red" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>

			<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width:170,height:8}">
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
									<el-button  size="mini" @click="selectWeeks(1,'一')">一</el-button>
									<el-button  size="mini"  @click="selectWeeks(2,'二')">二</el-button>
									<el-button  size="mini"  @click="selectWeeks(3,'三')">三</el-button>
									<el-button  size="mini"  @click="selectWeeks(4,'四')">四</el-button>
									<el-button  size="mini"  @click="selectWeeks(5,'五')">五</el-button>
									<el-button  size="mini"  @click="selectWeeks(6,'六')">六</el-button>
									<el-button  size="mini"  @click="selectWeeks(7,'日')">日</el-button>
								</el-button-group>
							</el-form-item>
							<el-form-item label="时间">
								<el-slider v-model="trafficData.hour" :format-tooltip="formaTooltip" :step="1" :max="24"  show-stops>
								</el-slider>
							</el-form-item>
						</el-form>
						    </el-tab-pane>
						  </el-tabs>
						
					</div>
				</div>

			</bm-control>
			<!--<bml-curve-line :points="market|filterMarket"></bml-curve-line>-->
		</baidu-map>
	</section>
</template>
<script>
	import { BmlCurveLine } from 'vue-baidu-map'
	export default {
		components: {
			BmlCurveLine
		},
		data() {
			return {
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
				times:"",
				showPrediction:false,
				trafficHour: 0,
				weekdays: '一',
				trafficSelectModel:"first",
				nowTime:"",
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

				//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

				polylinePath: [],
				markerTitle: "监控探头信息",
				winInfo: {
					markerPoint: {
						lng: "",
						lat: ""
					},
					num: ""
				}
			}
		},
		methods: {
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
			infoWindowOpen(index) {
				console.log(this.show);
				this.show = true;
				this.winInfo.num = this.market[index].num;
				this.winInfo.markerPoint.lng = this.market[index].markerPoint.lng;
				this.winInfo.markerPoint.lat = this.market[index].markerPoint.lat;
//				this.winInfo = this.market[index];
				console.log(this.show);
			},
			//即使播放
			immediate(id) {
				console.log(id);
			},
			//历史记录
			history(id) {
				console.log(id);
			},
			//路况预测
			traffic() {
				this.controlTraffic = !this.controlTraffic;
				this.showPrediction=!this.showPrediction;
				if(this.controlTraffic){
					console.log(new Date().getHours());
					let t=new Date();
					this.times=this.getTime(false);
					this.trafficData.hour=t.getHours();
					this.nowTime=this.getTime(true);
				}
			},
			getTime(h){
				let t=new Date();
				if(h){
					return (t.getHours()>10?t.getHours():'0'+t.getHours())+":"+(t.getMinutes()>10?t.getMinutes():'0'+t.getMinutes());
				}else{
					return (t.getHours()>10?t.getHours():'0'+t.getHours())+":00";
				}
				console.log(h,m);
			},
			//选择星期
			selectWeeks(i,j){
				this.weekdays=j;
				this.trafficData.weekday=i;
				
			},
			//格式化小时
			formaTooltip(val){
				return (val>10?val:'0'+val)+":00";
			},
			//实时\预测
			trafficSelect(tab, event){
				console.log(tab, event);
			},
			//刷新时间
			refreshTime(){
				this.nowTime=this.getTime(true);
				console.log(this.nowTime);
			},
			//关闭交通流量预测窗口
			closeTraffic(){
				this.controlTraffic = !this.controlTraffic;
				this.showPrediction=false;
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
			'trafficData.hour':function(newVal){
				console.log(newVal);
				this.times=(newVal>10?newVal:'0'+newVal)+":00";
//				this.controlTraffic=!this.controlTraffic;
			}
		},
		mounted() {},
		created() {

		}
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
		.dataWin .el-slider{
			margin-right: 20px;
		}
	
	.dataWin .el-form-item {
		margin-bottom: 0;
	}
	.weekG .el-button{
		padding: 4px 8px;
	}
.refresh{
		font-size: 14px;
		font-weight: bold;
		margin-left: 5px;
	}
	.refresh:hover{
		cursor: pointer;
	}
	.closeTraffic{
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
		z-index: 1000;
	}
	
	
	
	
	
	
	
	
	
	
	.anchorBL{
		/*display: none;*/
	}
</style>
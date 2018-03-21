<template>
	<section style="height: 100%;width: 100%;">
		<div id="allmap" class="allmap">
		</div>

		<!--<img src="../../../static/images/map.png" alt=""  style="width: 100%;"/>-->
		<!--<el-popover ref="popover4" placement="right"  trigger="click">
  <div style="font-size: 16px;">状态：<span style="display: inline-block;background: green;width: 10px;height: 10px;border-radius: 5px;"></span></div>
  <div  style="font-size: 16px;">编号：102</div>
  <div style="font-size: 16px;">经度：100</div>
  <div style="font-size: 16px;">维度：100</div>
  <div>
  	<el-button type="primary" size="mini">实时监控</el-button>
  	<el-button type="primary" size="mini">历史监控</el-button>
  </div>
</el-popover>

	 <img  v-popover:popover4 src="../../../static/images/map_camera.png" alt=""  style="position: absolute;top: 500px;left: 500px;z-index: 100;"/>-->
	</section>
</template>
<script>
</script>

<script>
	import { SStorage } from "../../js/LStorage"
	import { formatTime } from "../../js/formatTime"
	import { depNameData } from "../../js/evaluationData"
	import { exportExcel } from "../../js/headInfo"
		function aa(){
			console.log('aa');
		}
	export default {
		data() {
			function aa(){
			console.log('aa');
		}

//			$("#allmap").on('click', '.timelyBtn', function() {
//				console.log('123456789');
//			});


			return {

			}
		},
		methods: {

			getMonitorList(map) {

				map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 15);
				var data_info = [
					[119.417, 32.402, "地址：北京市东城区王府井大街88号乐天银泰百货八层", '123'],
					[119.415, 32.401, "地址：北京市东城区东华门大街", '456'],
					[119.413, 32.402, "地址：北京市东城区正义路甲5号", '789']
				];
				var opts = {
					width: 250, // 信息窗口宽度
					height: 80, // 信息窗口高度
					title: "信息窗口", // 信息窗口标题
					enableMessage: true //设置允许信息窗发送短息
				};
				var myIcon = new BMap.Icon("../../../static/images/map_camera.png", new BMap.Size(30, 25), {
					// 指定定位位置
					//          offset: new BMap.Size(10, 25),
					// 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置   
					//          imageOffset: new BMap.Size(0, 0 - i * 25) // 设置图片偏移  
				});
				for(var i = 0; i < data_info.length; i++) {
					console.log('1111111111');
					var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]), {
						icon: myIcon
					}); // 创建标注
					var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0;text-align:center;'>摄像头" + data_info[i][2] + "</h4>" +
						"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>编号：" + i + "</p>" +
						"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>经度：" + data_info[i][0] + "</p>" +
						"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>维度：" + data_info[i][1] + "</p>" +
						"<div style=''><button type='button' onclick='(function(){console.log(this)})()' class='timelyBtn' data-index="+data_info[i][3]+">Click Me!</button></div>";
							
					map.addOverlay(marker); // 将标注添加到地图中
					addClickHandler(content, marker);
				}

				function addClickHandler(content, marker) {
					marker.addEventListener("click", function(e) {
						openInfo(content, e)
					});
//					$("#allmap").on('click', '.timelyBtn', function() {
//				console.log('123456789');
//			});

				}

				function openInfo(content, e) {
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象 
					map.openInfoWindow(infoWindow, point); //开启信息窗口
//					$("button[data-index]").on("click", function() {
//						console.log(123);
//					});

				}
			}

		},
		//过滤器
		filters: {

		},
		watch: {

		},
		mounted() {

			// 百度地图API功能
			var map = new BMap.Map("allmap"); // 创建Map实例
			//	map.centerAndZoom(new BMap.Point(119.417, 32.402), 11);  // 初始化地图,设置中心点坐标和地图级别
			map.centerAndZoom("扬州", 17); // 设置地图显示的城市 此项是必须设置的
			//添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes: [
					BMAP_NORMAL_MAP,
					BMAP_HYBRID_MAP
				]
			}));

			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

			var bottom_right_control = new BMap.ScaleControl({
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT
			}); // 左上角，添加比例尺
			var bottom_right_navigation = new BMap.NavigationControl({
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT
			}); //左上角，添加默认缩放平移控件
			//	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
			/*缩放控件type有四种类型:
			BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

			//添加控件和比例尺
			(function add_control() {
				map.addControl(bottom_right_control);
				map.addControl(bottom_right_navigation);
				//		map.addControl(top_right_navigation);    
			})();

			/*添加摄像头图标*/
			this.getMonitorList(map);

		},
		created() {}
	}
</script>

<style>
	.allmap {
		width: 100%;
		height: 100%;
	}
	
	.anchorBL {
		display: none;
	}
</style>
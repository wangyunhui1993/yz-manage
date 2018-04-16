<template>
	<section style="height: 100%;width: 100%;" class="statsScreen">
		<div id="part1">

		</div>
		<div id="part2">

		</div>
		<div id="part3">

		</div>
		<div id="part4">

		</div>
	</section>
</template>

<script>
	import echarts from 'echarts'
	import jiangsu from 'echarts/map/js/province/jiangsu'
	require('echarts/extension/bmap/bmap')  //引入地图文件
	var dataPart1 = [{
			name: '设备一',
			value: 200
		},
		{
			name: '设备二',
			value: 150
		},
		{
			name: '设备三',
			value: 100
		},
		{
			name: '设备四',
			value: 50
		},
		{
			name: '设备五',
			value: 40
		},
		{
			name: '设备六',
			value: 35
		},

	];
	var geoCoordMap = {
		'设备一': [119.47869, 32.36312],
		'设备二': [119.48012, 32.36812],
		'设备三': [119.48084, 32.37142],
		'设备四': [119.48099, 32.37910],
		'设备五': [119.48084, 32.38459],
		'设备六': [119.48084, 32.39459],

	};

	export default {
		data() {
			return {

			}
		},
		methods: {
			initEchart(el, options) {
				echarts.init(document.getElementById(el)).setOption(options, true);
			},
		},
		//过滤器
		filters: {

		},
		watch: {

		},
		mounted() {

//			var convertData = function(data) {
//				var res = [];
//				for(var i = 0; i < data.length; i++) {
//					var geoCoord = geoCoordMap[data[i].name];
//					if(geoCoord) {
//						res.push({
//							name: data[i].name,
//							value: geoCoord.concat(data[i].value)
//						});
//					}
//				}
//				return res;
//			};
//			var optionPart1 = {
////				backgroundColor: '#404a59',
//				title: {
//					text: '设备访问频率',
//					x: 'center',
//					textStyle: {
//						color: '#fff'
//					}
//				},
//				tooltip: {
//					trigger: 'item',
//					position: 'bottom',
//					formatter: function(params) {
//						return params.name + ' : ' + params.value[2];
//					}
//				},
//				legend: {
//					orient: 'vertical',
//					y: 'bottom',
//					x: 'right',
//					data: [' '],
//					textStyle: {
//						color: '#fff'
//					}
//				},
//				visualMap: {
//					min: 0,
//					max: 200,
//					calculable: true,
//					inRange: {
//						color: ['#50a3ba', '#eac736', '#d94e5d']
//					},
//					textStyle: {
//						color: '#fff'
//					}
//				},
//				geo: {
//					map: '江苏',
//					roam: true,
//					center: [119.42285, 32.37020],
//					zoom: 20,
//					label: {
//						emphasis: {
//							show: false
//						}
//					},
//					itemStyle: {
//						normal: {
//							areaColor: '#323c48',
//							borderColor: '#111'
//						},
//						emphasis: {
//							areaColor: '#2a333d'
//						}
//					}
//				},
//
//bmap: {
//      center: [116.46, 39.92],
//      zoom: 11.8,
//      roam: true,
//      mapStyle: {
//          styleJson: []
//      }
// },
//				series: [{
//					name: ' ',
//					type: 'scatter',
//					coordinateSystem: 'geo',
//					data: convertData(dataPart1),
//					symbolSize: 12,
//					label: {
//						normal: {
//							show: false
//						},
//						emphasis: {
//							show: false
//						}
//					},
//					itemStyle: {
//						emphasis: {
//							borderColor: '#fff',
//							borderWidth: 1
//						}
//					}
//				}]
//			};

	
	var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
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
        backgroundColor:'rgba(128, 128, 128, 0.5)',
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
       center: [119.47285, 32.37020],
         zoom: 14,
        roam: true,
        
    },
    series : [
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
            data: convertData(dataPart1.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
			
			
			
			
			
			
			
			var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

var dataPart2 = [[0,0,5],[0,1,1],[0,2,99],[0,3,99],[0,4,99],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

dataPart2 = dataPart2.map(function (item) {
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
        y: '10%'
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
        data: days,
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
        data: dataPart2,
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
			
			
			
			
			
		var dataAxisPart3 = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
			var dataPart3 = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220, 334, 198, 123, 125];
			var yMax = 500;
			var dataShadow = [];
			for(var i = 0; i < dataPart3.length; i++) {
				dataShadow.push(yMax);
			}	
			
			var optionPart3 = {
				title: {
					text: '系统访问时间分布',
					x: 'center',
				},
				xAxis: {
					data: dataAxisPart3,
					axisLabel: {
						inside: true,
						textStyle: {
							color: '#fff'
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					z: 10
				},
				yAxis: {
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#999'
						}
					}
				},
				dataZoom: [{
					type: 'inside'
				}],
				series: [{ // For shadow
						type: 'bar',
						itemStyle: {
							normal: {
								color: 'rgba(0,0,0,0.05)'
							}
						},
						barGap: '-100%',
						barCategoryGap: '40%',
						data: dataShadow,
						animation: false
					},
					{
						type: 'bar',
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [{
											offset: 0,
											color: '#83bff6'
										},
										{
											offset: 0.5,
											color: '#188df0'
										},
										{
											offset: 1,
											color: '#188df0'
										}
									]
								)
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [{
											offset: 0,
											color: '#2378f7'
										},
										{
											offset: 0.7,
											color: '#2378f7'
										},
										{
											offset: 1,
											color: '#83bff6'
										}
									]
								)
							}
						},
						data: dataPart3
					}
				]
			};
			
			
			
			
			
			
			
	var	optionPart4 = {
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
        data:['失败次数','成功次数','成功率'],
        x: 'right',
    },
    xAxis: [
        {
            type: 'category',
            data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '次数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} 次'
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
    series: [
        {
            name:'失败次数',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'成功次数',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'成功率',
            type:'line',
            yAxisIndex: 1,
            data:[98, 96, 99, 100, 98, 99, 97, 94, 100, 95, 98, 96]
        }
    ]
};
			
			
			

			var zoomSize = 6;

			var myChartPart2 = echarts.init(document.getElementById('part2'));
			myChartPart2.on('click', function(params) {
				myChartPart2.dispatchAction({
					type: 'dataZoom',
					startValue: dataAxisPart2[Math.max(params.dataIndex - zoomSize / 2, 0)],
					endValue: dataAxisPart2[Math.min(params.dataIndex + zoomSize / 2, dataPart2.length - 1)]
				});
			});
			
			
			
			
			
			var myChartPart3 = echarts.init(document.getElementById('part3'));
			myChartPart3.on('click', function(params) {
				myChartPart3.dispatchAction({
					type: 'dataZoom',
					startValue: dataAxisPart2[Math.max(params.dataIndex - zoomSize / 2, 0)],
					endValue: dataAxisPart2[Math.min(params.dataIndex + zoomSize / 2, dataPart3.length - 1)]
				});
			});
			
			
			

			$(document).ready(() => {
				this.initEchart('part1', optionPart1);
				this.initEchart('part2', optionPart2);
				myChartPart3.setOption(optionPart3, true);
				this.initEchart('part4', optionPart4);
			});

		},
		created() {

		}
	}
</script>

<style>
	.statsScreen>div {
		width: 50%;
		height: 50%;
		float: left;
		box-sizing: border-box;
	}
	
	.statsScreen div:nth-child(2n+1) {
		border-right: 1px solid rgb(235, 238, 245);
	}
	
	.statsScreen div:nth-child(1),
	.statsScreen div:nth-child(2) {
		border-bottom: 1px solid rgb(235, 238, 245);
	}
</style>
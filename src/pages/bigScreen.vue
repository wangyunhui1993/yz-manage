<template>
	<section style="box-sizing: border-box;width: 100%;height: 100%;position: relative;">
		<div class="operateWin">
			<el-tooltip class="item" effect="light" content="返回" placement="bottom-end">
      			<i class="el-icon-back" @click="goBack" style="font-size: 30px;"></i>
    		</el-tooltip>
			<el-tooltip class="item" effect="light" content="大屏设置" placement="bottom-end">
      			<i class="el-icon-setting" @click="showSet" style="font-size: 30px;"></i>
    		</el-tooltip>
		</div>
		<!--<p>Current Stream: <span class="badge badge-success">{{ currentStream }}</span></p>
    <p>Current Tech: <span class="badge badge-info">{{ currentTech }}</span></p>-->

		<div v-for="(i,index) in bigNum" :data-index='i' :key="index" :class="'part'+num" style="float: left;padding: 5px;box-sizing: border-box;position: relative;" @mouseenter="showInfo" @mouseleave="hideInfo">
			<div class="topInfo">
				编号:{{listInfo[i-1].number}}&nbsp;&nbsp; 名称:{{listInfo[i-1].name}}&nbsp;&nbsp; 经度:{{listInfo[i-1].lng}}&nbsp;&nbsp; 纬度:{{listInfo[i-1].lat}}
			</div>
			<video-player style='width: 100%;height: 100%;' class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
			</video-player>
		</div>

		<!--<div class="selectWrapper">
      Switch Tech：
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tech" id="html5" value="Html5" v-model="currentTech" @change="changeTech">
        <label class="form-check-label" for="html5">
          Html5
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tech" id="flash" value="Flash" v-model="currentTech" @change="changeTech">
        <label class="form-check-label" for="flash">
          Flash
        </label>
      </div>
    </div>-->

		<el-dialog title="大屏配置" :visible.sync="dialogFormVisible" top='2vh' width="500px">
  <el-form>
  	<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-form-item label="请选择方阵" label-width="100px">
      <el-select v-model="bigScreenSet" placeholder="请选择活动区域" @change="changeNum">
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
</el-dialog>

	</section>
</template>
<script>
	export default {
		name: 'live',
		data() {
			return {
				dialogFormVisible:false,
				bigScreenSet:4,
				bigNum:[1,2,3,4],
				
				
				
				
				
				num: 4,
				initialized: false,
				currentTech: '',
				playerOptions: {
					overNative: true,
					autoplay: true,
					controls: true,
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
					controlBar: {
						//           timeDivider: false, // 时间分割线
						//           durationDisplay: false, // 总时间
						//           progressControl: true, // 进度条
						//           customControlSpacer: true, // 未知
						//           fullscreenToggle: true // 全屏
					},
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
						number: '008',
						name: '监控9',
						lng: 123.456,
						lat: 456.789
					},
				]
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
				even.currentTarget.firstElementChild.style.display = 'block'
			},
			hideInfo(even) {
				even.currentTarget.firstElementChild.style.display = 'none'
			},
			//显示配置页面
			showSet() {
				console.log(123)
				this.dialogFormVisible=true;

			},
			//返回
			goBack() {
				this.$router.go(-1);
			},
			//改变大屏显示个数
			changeNum(val){
				console.log(val);
			},
			//提交大屏设置信息
			submit(){
				this.dialogFormVisible=false;
				this.bigNum=[];
				this.num=this.bigScreenSet;
				for(var i =1;i<=this.bigScreenSet;i++){
					console.log('大屏',i);
					this.bigNum.push(i);
				}
				
				
				
				console.log('大屏',this.bigNum);
				
			},
		}
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
	
	.video-js {
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
		display: none;
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
</style>
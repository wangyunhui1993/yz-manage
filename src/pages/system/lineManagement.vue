<template>
	<section class="lineMan">
		<el-container style="height: 100%;width: 100%;">
			<el-aside width="300px" class="asideLine">
				<el-card class="box-card" :body-style="{ padding: '5px' }">
					<div slot="header" class="clearfix">
						<span>线路信息</span>
						<div class="opList">
							<i class="el-icon-plus" @click="showAddWin"></i>
							<!--<i class="el-icon-delete" @click="deleteGroup"></i>-->
							<!--<i class="el-icon-refresh" @click="refreshGroup"></i>-->
						</div>
					</div>
					<div class="text item">
						<el-tree :data="lineArr" @check-change="checkChange" show-checkbox node-key="id" :default-checked-keys="defaultCheckedKeys" highlight-current default-expand-all :props="defaultProps"  @node-click="selectGroup" :expand-on-click-node="false" class="filter-tree groupTree" ref="tree2">
							<span class="custom-tree-node" slot-scope="{ node, data }">
							<span><i class="fa fa-line-chart"></i> {{ node.label }}</span>
							<span style="color: #1D8CE0;">
							 	 <i class="el-icon-delete" @click="deleteGroup(data)"  style="font-size: 17px;float: right;margin:0 5px;"></i>
							 	 <i class="el-icon-edit-outline" @click="showEditWin(data)" style="font-size: 17px;float: right;margin:0 5px;"></i>
       					 	</span>
							</span>
						</el-tree>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<!--<el-card class="box-card" style="width: 100%;height: 100%;box-sizing: border-box;">
					<div slot="header" class="clearfix">
						<el-row>
							<el-input type="textarea" v-model="formJson.jsonInfo" :rows="3"></el-input>
						</el-row>
					</div>
				</el-card>-->
				<baidu-map class="bm-view" :center="center" :zoom="zoom1" @mousewheel.native="mousewheelOp('zoom1')">
					<bm-polyline v-for="item in formatAfterLineArr" :key="item.id" v-if="item.show" :path="item.ll" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>
				</baidu-map>
			</el-main>
		</el-container>
		<el-dialog title="新增路线" :visible.sync="dialogAddLineVisible" :close-on-click-modal="false" top="5vh" class="addLine">
			<el-form ref="addLineForm" :model="addLineForm">
				<el-form-item label="线路名称" prop="roadName" :rules="[{ required: true, message: '请输入线路名称'}]">
					<el-input v-model="addLineForm.roadName"></el-input>
				</el-form-item>
				<el-form-item label="经纬度坐标" prop="ll" :rules="[{ required: true, message: '请输入线路坐标'}]">
					<el-input type="textarea" v-model="addLineForm.ll" :rows="3" :placeholder="placeholderText"></el-input>
				</el-form-item>
			</el-form>
			<el-row>
			</el-row>
			<el-row style="margin: 10px 0;">
				<el-button type="primary" @click="addPreviewLine">预 览</el-button>
				<el-button type="primary" style="float: right;" @click="subAddLine">确 定</el-button>
				<el-button @click="dialogAddLineVisible = false" style="float: right;">取 消</el-button>
			</el-row>
			<el-row class="lineReview">
				<baidu-map class="bm-view" :center="center" :zoom="zoom2" @mousewheel.native="mousewheelOp('zoom2')">
					<bm-polyline :path="addPolylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>
				</baidu-map>
			</el-row>
		</el-dialog>

		<el-dialog title="编辑路线" :visible.sync="dialogEditLineVisible" :close-on-click-modal="false" top="5vh" class="addLine">
			<el-form ref="editLineForm" :model="editLineForm">
				<el-form-item label="线路名称" prop="roadName" :rules="[{ required: true, message: '请输入线路名称'}]">
					<el-input v-model="editLineForm.roadName"></el-input>
				</el-form-item>
				<el-form-item label="经纬度坐标" prop="ll" :rules="[{ required: true, message: '请输入线路坐标'}]">
					<el-input type="textarea" v-model="editLineForm.ll" :rows="3" :placeholder="placeholderText"></el-input>
				</el-form-item>
			</el-form>
			<el-row>
			</el-row>
			<el-row style="margin: 10px 0;">
				<el-button type="primary" @click="editPreviewLine">预 览</el-button>
				<el-button type="primary" style="float: right;" @click="subEditLine">确 定</el-button>
				<el-button @click="dialogEditLineVisible = false" style="float: right;">取 消</el-button>
			</el-row>
			<el-row class="lineReview">
				<baidu-map class="bm-view" :center="center" :zoom="zoom3" @mousewheel.native="mousewheelOp('zoom3')">
					
					<bm-polyline :path="editPolylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="5"></bm-polyline>
				</baidu-map>
			</el-row>
		</el-dialog>

	</section>
</template>
<script>
	import { BmlCurveLine } from 'vue-baidu-map'
	import { insertRoad, updateRoad, deleteRoad, selectRoad } from '../../js/api';
	export default {
		components: {
			BmlCurveLine
		},
		data() {
			return {
				zoom1: 14,
				zoom2: 14,
				zoom3: 14,
				center: {
					lng: 119.42285,
					lat: 32.37020
				},
				showPreview: false,
				dialogAddLineVisible: false,
				dialogEditLineVisible: false,
				addLineForm: {
					roadName: "",
					ll: "",
				},
				editLineForm: {
					id: "",
					roadName: "",
					ll: "",
				},
				placeholderText: "请输入经纬度，经纬度之间用逗号隔开，至少两个点。例：119.48099,32.37910,119.48084,32.38459",
				lineArr: [],
				formatAfterLineArr:[],
				defaultProps: {
					children: 'children',
					label: 'roadName'
				},
				PolylinePath:[],
				addPolylinePath: [],
				editPolylinePath: [],
				defaultCheckedKeys:[],
				pathData: [{
						lng: 119.48099,
						lat: 32.37910,
						count: 50
					},
					{
						lng: 119.48084,
						lat: 32.38459,
						count: 51
					},
					{
						lng: 119.48084,
						lat: 32.39459,
						count: 15
					}
				],
				formJson: {
					jsonInfo: ""
				},
				pageSizes: [15, 100, 200, 500],
				pageSize: 15,
				total: 400,
				currentPage: 2,
				searchData: {},
				tableData: [{
					roleName: '系统管理员',
					roleDescription: '系统管理员是系统的最高级，拥有所有权限',
				}, {
					roleName: '用户',
					roleDescription: '用户拥有局部权限',
				}, ],
			}
		},
		methods: {
			mousewheelOp(val) {
				if(event.deltaY > 0) {
					this[val] > 3 ? this[val]-- : "";
				} else {
					this[val] < 19 ? this[val]++ : "";
				}
			},
			/*添加路线*/
			getAddLine() {
				let info = {
					road: this.addLineForm,
					man: this.$store.state.adminUserInfo.id,
				}
				insertRoad(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						this.dialogAddLineVisible = false;
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.getSelectLine();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
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
						console.log(data);
						this.lineArr = value;
						this.formatAfterLineArr=[];
						this.defaultCheckedKeys=[];
						for(var item of value){
							this.defaultCheckedKeys.push(item.id);
							this.formatAfterLineArr.push({
								show:true,
								id:item.id,
								ll:this.transCoordinate(this.trims(item.ll).split(","))     
							});
						}
						console.log(this.formatAfterLineArr);
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*删除线路*/
			getDeleteLine(id) {
				let info = {
					road: {
						id: id
					},
					man: this.$store.state.adminUserInfo.id,
				}
				deleteRoad(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.getSelectLine();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*修改线路*/
			getEditLine() {
				let info = {
					road: this.editLineForm,
					man: this.$store.state.adminUserInfo.id,
				}
				updateRoad(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.dialogEditLineVisible = false;
						this.getSelectLine();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*提交添加*/
			subAddLine() {
				this.$refs.addLineForm.validate((valid) => {
					if(valid) {
						let data1 = this.trims(this.addLineForm.ll);
				data1 = data1.split(",");
				if(this.allNumber(data1)){
					this.getAddLine();
				}else{
					 this.$message({
		          message: '经纬度坐标格式错误，请调整后再添加',
		          type: 'warning'
		        });
				}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
				
				
				
				
				
				
				
				

			},
			/*判断是否是数字*/
			isNumber(val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if(regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			/*判断一个数组里的元素是否都是数字*/
			allNumber(arr){
				for(var item of arr){
					if(!this.isNumber(item)){
						return false; 
					}
				}
				return true; 
			},
			/*提交修改*/
			subEditLine() {
				this.$refs.editLineForm.validate((valid) => {
					if(valid) {
						let data1 = this.trims(this.editLineForm.ll);
				data1 = data1.split(",");
				if(this.allNumber(data1)){
					this.getEditLine();
				}else{
					 this.$message({
		          message: '经纬度坐标格式错误，请调整后再保存修改',
		          type: 'warning'
		        });
				}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				
				
				
				
			},
			//查询
			search() {

			},
			//显示添加窗口
			showAddWin() {
				this.dialogAddLineVisible = true;
			},
			//显示编辑窗口
			showEditWin(data) {
				this.dialogEditLineVisible = true;
				console.log(data);
				this.editLineForm.roadName = data.roadName;
				this.editLineForm.ll = data.ll;
				this.editLineForm.id = data.id;
			},
			//显示删除页面
			showDeleteWin(row) {
				console.log(row);
			},
			//每页显示的条数改变时
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			//当前页
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			/*添加线路分组*/
			addGroup() {

			},
			/*删除线路分组*/
			deleteGroup(node) {
				this.$confirm('此操作将删除此线路, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getDeleteLine(node.id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				
			},
			/*点击线路*/
			selectGroup(obj, node, self) {},
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
			/*预览*/
			addPreviewLine() {
				let data1 = this.trims(this.addLineForm.ll);
				data1 = data1.split(",");
				if(this.allNumber(data1)){
					data1 = this.transCoordinate(data1).slice(0);
				this.addPolylinePath = data1;
				}else{
					 this.$message({
		          message: '经纬度坐标格式错误，请调整后再预览',
		          type: 'warning'
		        });
				}
				
			},
			editPreviewLine() {
				let data1 = this.trims(this.editLineForm.ll);
				data1 = data1.split(",");
				if(this.allNumber(data1)){
					data1 = this.transCoordinate(data1).slice(0);
				this.editPolylinePath = data1;
				}else{
					 this.$message({
		          message: '经纬度坐标格式错误，请调整后再预览',
		          type: 'warning'
		        });
				}
			},
			/*勾选改变时*/
			checkChange(obj,check){
				for(var index in this.formatAfterLineArr){
					if(obj.id==this.formatAfterLineArr[index].id){
						this.formatAfterLineArr[index].show=check;
					}
				}
				console.log(obj)
				console.log(check)
			},
			handler({
				BMap,
				map
			}) {
				console.log(BMap, map)
			}
		},
		mounted() {

		},
		created() {
			this.getSelectLine();
		},
		beforeCreate(){
			if(this.$store.state.adminUserInfo.roleId!=7){
				this.$router.push("/map/mapShow");
			}
		},
	}
</script>
<style>
	.asideLine {
		padding-right: 5px;
		border-right: 1px solid rgb(220, 223, 230);
	}
	
	.lineMan {
		padding: 10px 0 0 10px;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
	}
	
	.lineMan .el-main .el-card {
		display: -webkit-flex;
		/* Safari */
		display: flex;
		flex-direction: column;
	}
	
	.lineMan .el-main .el-card .el-card__header {
		flex-grow: 0;
		box-sizing: border-box;
		height: 150px;
		position: relative;
	}
	
	.lineMan .el-main .el-card .el-card__body {
		flex-grow: 1;
		display: -webkit-flex;
		/* Safari */
		display: flex;
	}
	
	.lineMan .el-main .el-card .el-card__body .bm-view {
		flex-grow: 1;
	}
	/*.lineMan .el-card .el-card__header{
		height: 200px;
	}*/
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	.lineMan textarea {
		resize: none;
	}
	
	.lineMan .opBtn {
		/*position: absolute;*/
		bottom: 0;
		width: 100%;
		padding: 5px;
		background: #fff;
		box-sizing: border-box;
	}
	
	.asideLine {
		padding-right: 5px;
		border-right: 1px solid rgb(220, 223, 230);
	}
	
	.asideLine .el-card__header {
		padding: 5px;
	}
	
	.asideLine .opList {
		float: right;
		padding: 3px 0;
	}
	
	.asideLine .opList i {
		margin-left: 5px;
		font-size: 18px;
		cursor: pointer;
	}
	
	.bm-view {
		width: 100%;
		height: 100%;
	}
	
	.lineReview {
		height: 50vh;
	}
	
	.addLine .el-dialog__body {
		padding-top: 0;
	}
</style>
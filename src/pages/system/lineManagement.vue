<template>
	<section class="lineMan">
		<el-container style="height: 100%;width: 100%;">
			<el-aside width="200px" class="asideLine">
				<el-card class="box-card" :body-style="{ padding: '5px' }">
					<div slot="header" class="clearfix">
						<span>线路信息</span>
						<div class="opList">
							<i class="el-icon-plus" @click="addGroup"></i>
							<i class="el-icon-delete" @click="deleteGroup"></i>
							<!--<i class="el-icon-refresh" @click="refreshGroup"></i>-->
						</div>
					</div>
					<div class="text item">
						<el-tree :data="groupArr" node-key="id" highlight-current default-expand-all @node-click="selectGroup" :expand-on-click-node="false" class="filter-tree groupTree" ref="tree2">
							<span class="custom-tree-node" slot-scope="{ node, data }">
							<span><i class="el-icon-tickets"></i>{{ node.label }}</span>
							</span>
						</el-tree>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<el-card class="box-card" style="width: 100%;height: 100%;box-sizing: border-box;">
					<div slot="header" class="clearfix">
						<el-row>
							<el-input type="textarea" v-model="formJson.jsonInfo" :rows="3"></el-input>
						</el-row>
						<el-row class="opBtn">
							<el-button type="primary">保存</el-button>
							<el-button type="primary" @click="preview">预览</el-button>
						</el-row>
					</div>
					<baidu-map v-if="showPreview" class="bm-view" :center="center" :zoom="zoom" @mousewheel.native="mousewheelOp"  @ready="handler">
					</baidu-map>
				</el-card>
			</el-main>

		</el-container>

	</section>
</template>
<script>
	import { BmlCurveLine } from 'vue-baidu-map'
	import {} from '../../js/api';
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
				groupArr: [],
				showPreview: false,

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
				if(val.deltaY > 0) {
					this.zoom > 3 ? this.zoom-- : "";
				} else {
					this.zoom < 19 ? this.zoom++ : "";
				}
			},
			//查询
			search() {

			},
			//显示添加窗口
			showAddWin() {

			},
			//显示编辑窗口
			showEditWin() {

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
			deleteGroup() {

			},
			/*点击线路*/
			selectGroup(obj, node, self) {},
			/*预览*/
			preview() {
				this.showPreview = true;
				console.log(123);
			},
			 handler ({BMap, map}) {
      console.log(BMap, map)
    }
		},
		mounted() {

		}
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
	
	.lineMan .clearfix textarea {
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
</style>
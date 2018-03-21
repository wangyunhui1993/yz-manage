<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;position: relative;height: 100%;">
		<div style="margin-right: 200px;">
			<el-row>
				<el-form :inline="true" :model="searchData" class="demo-form-inline">
					<el-form-item label="编号">
						<el-input v-model="searchData.number" placeholder="编号"></el-input>
					</el-form-item>
					<el-form-item label="名称">
						<el-input v-model="searchData.name" placeholder="编号"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="searchData.state" placeholder="状态">
							<el-option label="在线" value="1"></el-option>
							<el-option label="离线" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分组">
						<el-select v-model="searchData.group" placeholder="分组">
							<el-option label="1" value="1"></el-option>
							<el-option label="2" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="安装位置">
						<el-input v-model="searchData.position" placeholder="安装位置"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<!--<el-row style="margin-bottom: 10px;">
			<el-button type="primary" @click="showAddWin" icon="el-icon-plus">添加设备</el-button>
		</el-row>-->
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="number" label="编号">
					</el-table-column>
					<el-table-column prop="name" label="名称">
					</el-table-column>
					<el-table-column prop="lng" label="经度">
					</el-table-column>
					<el-table-column prop="lat" label="纬度">
					</el-table-column>
					<el-table-column prop="state" label="状态" width="120">
						<template slot-scope="scope">
							<span v-text="scope.row.state=='1'?'在线':'离线'" style="display: inline-block;vertical-align: middle;"></span>
							<span :class="scope.row.state=='1'?'stateGre':'stateRed'"></span>
						</template>
					</el-table-column>
					<el-table-column prop="group" label="分组">
					</el-table-column>
					<el-table-column prop="position" label="安装位置">
					</el-table-column>
					<el-table-column label="操作" width="160">
						<template slot-scope="scope">
							<el-button @click="showTime(scope.row)" style="padding:7px 5px;" type="primary" size="mini">实时监控</el-button>
							<el-button type="primary" size="mini" style="padding:7px 5px;" @click="showHistory(scope.row)">历史监控</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row style="margin-top: 10px;">
					<el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-row>
			</el-row>
		</div>
		<div style="float: right;position: absolute;top: 0;right: 0;width: 200px;height:100%;border-left: 1px solid #ebeef5;">
			<p style="height: 50px;text-align: center;line-height: 50px;background: #999;font-weight: bold;">分组列表</p>
			<el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
		</div>
	</section>
</template>
<script>
	export default {
		data() {

			return {
				data: [{
					label: '分组一',
					children: [{
						label: '001（一号监控）'
					}]
				}, {
					label: '分组二',
					children: [{
						label: '002（二号监控）'
					}]
				}, {
					label: '分组三',
					children: [{
						label: '003（三号监控）'
					},]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},

				pageSizes: [15, 100, 200, 500],
				pageSize: 15,
				total: 400,
				currentPage: 2,
				tableData: [{
						number: '001',
						name: '一号监控',
						lng: '119.417',
						lat: '32.402',
						state: '1',
						group: '分组一',
						position: '扬州市快速路口'
					}, {
						number: '002',
						name: '二号监控',
						lng: '119.417',
						lat: '32.402',
						state: '1',
						group: '分组二',
						position: '扬州市快速路口'
					},
					{
						number: '003',
						name: '三号监控',
						lng: '119.417',
						lat: '32.402',
						state: '0',
						group: '分组三',
						position: '扬州市快速路口'
					},
				],
				searchData: {
				},
			}
		},
		methods: {
			//查询
			search() {

			},
			//显示添加窗口
			//			showAddWin() {
			//
			//			},
			//显示实时监控
			showTime(row) {
				console.log(row);
			},
			//显示历史监控
			showHistory(row) {
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

			handleNodeClick(data) {
				console.log(data);
			}

		},
		//过滤器
		filters: {

		},
		watch: {

		},
		mounted() {

		},
		created() {

		}
	}
</script>

<style>
	.stateGre{
		width: 16px;
		height: 16px;
		display: inline-block;
		border-radius: 8px;
		background: green;
		vertical-align: middle;
	}
	.stateRed{
		width: 16px;
		height: 16px;
		display: inline-block;
		border-radius: 8px;
		background: red;
		vertical-align: middle;
	}
</style>
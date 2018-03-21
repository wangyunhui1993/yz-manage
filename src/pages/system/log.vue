<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;">
		<el-row>
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
				<el-form-item label="用户名">
					<el-input v-model="searchData.userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="操作时间">
					<el-input v-model="searchData.operateTime" placeholder="操作时间"></el-input>
				</el-form-item>
				<el-form-item label="操作IP">
					<el-input v-model="searchData.IPaddress" placeholder="IP地址"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row>
			<el-table :data="tableData" border>
				<el-table-column prop="userName" label="用户名" width="150">
				</el-table-column>
				<el-table-column prop="operateTime" label="操作时间">
				</el-table-column>
				<el-table-column prop="IPaddress" label="操作IP">
				</el-table-column>
				<el-table-column prop="operateObj" label="操作对象">
				</el-table-column>
				<el-table-column prop="operateCon" label="操作内容" >
				</el-table-column>
			</el-table>
			<el-row style="margin-top: 10px;">
			<el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-row>
		</el-row>
		
	</section>
</template>
<script>
	export default {
		data() {
			return {
				pageSizes: [15, 100, 200, 500],
				pageSize: 15,
				total:400,
				currentPage:2,
				tableData: [{
						userName: 'zhangsan',
						operateTime: '2018-03-16 11:16:40',
						IPaddress: '119.417.123.456',
						operateObj: 'object',
						operateCon: '查看设备列表',
					}, {
						userName: 'zhangsan',
						operateTime: '2018-03-16 11:16:40',
						IPaddress: '119.417.123.456',
						operateObj: 'object',
						operateCon: '查看设备列表',
					},
					{
						userName: 'zhangsan',
						operateTime: '2018-03-16 11:16:40',
						IPaddress: '119.417.123.456',
						operateObj: 'object',
						operateCon: '查看设备列表',
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
			showAddWin() {

			},
			//显示编辑页面
			showEditWin(row) {
				console.log(row);
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

</style>
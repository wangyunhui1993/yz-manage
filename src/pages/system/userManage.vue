<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;">
		<el-row>
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
				<el-form-item label="ID">
					<el-input v-model="searchData.number" placeholder="工号"></el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="searchData.userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="searchData.reallyName" placeholder="真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-input v-model="searchData.role" placeholder="角色"></el-input>
				</el-form-item>
				<!--<el-form-item label="状态">
					<el-select v-model="searchData.state" placeholder="状态">
						<el-option label="正常" value="1"></el-option>
						<el-option label="异常" value="0"></el-option>
					</el-select>
				</el-form-item>-->
				<!--<el-form-item label="安装位置">
					<el-input v-model="searchData.position" placeholder="安装位置"></el-input>
				</el-form-item>-->
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row style="margin-bottom: 10px;">
			<el-button type="primary" @click="showAddWin" icon="el-icon-plus">添加用户</el-button>
		</el-row>
		<el-row style="width: 751px;">
			<el-table :data="tableData" border>
				<el-table-column prop="number" label="ID" width="150">
				</el-table-column>
				<el-table-column prop="userName" label="用户名" width="150">
				</el-table-column>
				<el-table-column prop="reallyName" label="真实姓名" width="150">
				</el-table-column>
				<el-table-column prop="role" label="角色" width="150">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="showEditWin(scope.row)" type="primary" size="mini">编辑</el-button>
						<el-button type="danger" size="mini" @click="showDeleteWin(scope.row)">删除</el-button>
					</template>
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
	import {} from '../../js/api';
	
	export default {
		data() {
			return {
				pageSizes: [15, 100, 200, 500],
				pageSize: 15,
				total:400,
				currentPage:2,
				searchData:{},
				tableData: [{
						number: '001',
						userName: 'admin',
						reallyName: '小明',
						role: '系统管理员',
					}, {
						number: '001',
						userName: 'zhangsan',
						reallyName: '张三',
						role: '用户',
					},{
						number: '001',
						userName: 'lisi',
						reallyName: '李四',
						role: '用户',
					},
				],
			}
		},
		methods: {
			//查询
			search() {

			},
			//显示添加窗口
			showAddWin() {

			},
			//显示编辑窗口
			showEditWin(){
				
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
		mounted() {

		}
	}
</script>
<style>

</style>
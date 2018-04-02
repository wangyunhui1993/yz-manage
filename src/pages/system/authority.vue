<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;">
		<el-row style="margin-bottom: 10px;">
			<el-button type="primary" @click="showAddWin" icon="el-icon-plus">添加角色</el-button>
		</el-row>
		<el-row style="width: 551px;">
			<el-table :data="tableData" border>
				<el-table-column prop="roleName" label="角色名称" width="150">
				</el-table-column>
				<el-table-column prop="roleDescription" label="角色描述" width="300">
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="showEditWin(scope.row)" type="text" size="small">编辑</el-button>
						<el-button type="text" size="small" style="color: #f56c6c;" @click="showDeleteWin(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
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
						roleName: '系统管理员',
						roleDescription: '系统管理员是系统的最高级，拥有所有权限',
					}, {
						roleName: '用户',
						roleDescription: '用户拥有局部权限',
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
<style  scoped>

</style>
<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;height: 100%;overflow-y: scroll;">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row>
					<el-form :inline="true" :model="searchData" class="demo-form-inline">
						<el-form-item label="用户名">
							<el-input v-model="searchData.username" placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item label="操作时间">
							<el-date-picker v-model="searchData.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" placeholder="操作时间">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="操作IP">
							<el-input v-model="searchData.ip" placeholder="IP地址"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="search">查询</el-button>
						</el-form-item>
					</el-form>
				</el-row>
				<el-row>
					<el-button type="primary" @click="importBtn">导出日志</el-button>
				</el-row>
			</div>
			<el-row v-loading="tableDataLoading">
				<el-table :data="tableData" border>
					<el-table-column prop="username" label="用户名" width="150">
					</el-table-column>
					<el-table-column prop="time" label="操作时间">
					</el-table-column>
					<el-table-column prop="ip" label="操作IP">
					</el-table-column>
					<el-table-column prop="type" label="操作对象">
					</el-table-column>
					<el-table-column prop="info" label="操作内容">
					</el-table-column>
				</el-table>
				<el-row style="margin-top: 10px;">
					<el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.current" :page-sizes="pageSizes" :page-size="searchData.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-row>
			</el-row>
		</el-card>
	</section>
</template>
<script>
	import { selectLog } from '../../js/api';
	export default {
		data() {
			return {
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},

				tableDataLoading: false,
				pageSizes: [15, 100, 200, 500],
				total: 0,
				currentPage: 2,
				tableData: [],
				searchData: {
					username: "",
					ip: "",
					time: [],
					current: 1,
					size: 15,
				},
			}
		},
		methods: {
			/*改变查询串*/
			changeSearch() {

				this.$router.push({
					path: "/system/log",
					query: {
						keywords: JSON.stringify(this.searchData)
					}
				});
			},
			//导出日志
			importBtn() {
				this.$confirm('此操作将导出全部日志, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let info = {
						username: "",
						ip: "",
						time: [],
						current: 1,
						size: this.total,
					}
					selectLog(info).then(data => {
						let {
							errMsg,
							errCode,
							value,
							extraInfo,
							success
						} = data;
						if(success) {
							console.log(data);
							//兼容ie10哦！
							require.ensure([], () => {　　　　　　　　
								const {
									export_json_to_excel
								} = require('../../vendor/Export2Excel');　　 //引入文件　　　　　　
								const tHeader = ['用户名', '操作时间', '操作IP', '对象', '操作内容']; //将对应的属性名转换成中文
								const filterVal = ['username', 'time', 'ip', 'type', 'info']; //table表格中对应的属性名　　　　　 　　　
								const list = value;　　　　　　　　
								const data1 = this.formatJson(filterVal, list);　　　　　　　　
								export_json_to_excel(tHeader, data1, '日志');　　　　　　
							})
						} else {
							console.log(data);
							this.$message({
								message: errMsg,
								type: 'error'
							});
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消导出'
					});

				});

				　

			},
			formatJson(filterVal, jsonData) {　　　　　　
				return jsonData.map(v => filterVal.map(j => v[j]))　　　　
			},
			//查询
			search() {
				this.searchData.current = 1;
				this.tableDataLoading = true;
				this.changeSearch();
				this.getLog();
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
				this.tableDataLoading = true;
				this.searchData.size = val;
				this.changeSearch();
				this.getLog();
			},
			//当前页
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.tableDataLoading = true;
				this.searchData.current = val;
				this.changeSearch();
				this.getLog();
			},
			getLog() {
				selectLog(this.searchData).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.tableDataLoading = false;
						this.tableData = value;
						this.total = parseInt(extraInfo);
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
						this.tableDataLoading = false;
					}
				});
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
			this.tableDataLoading = true;
			try {
				if(this.$route.query.keywords) {
					this.searchData = JSON.parse(this.$route.query.keywords);
				}
			} finally {}
			this.getLog();
			window.onpopstate = function() {
				history.go(0);
			}
		}
	}
</script>

<style scoped>

</style>
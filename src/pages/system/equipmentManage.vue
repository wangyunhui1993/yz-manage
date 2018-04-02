<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;position: relative;height: 100%;">
		<div style="margin-right: 210px;">
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
							<el-option label="分组一" value="1"></el-option>
							<el-option label="分组二" value="2"></el-option>
							<el-option label="分组三" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="IP地址">
						<el-input v-model="searchData.IPaddress" placeholder="IP地址"></el-input>
					</el-form-item>
					<el-form-item label="安装位置">
						<el-input v-model="searchData.position" placeholder="安装位置"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row style="margin-bottom: 10px;">
				<el-button type="primary" @click="showAddWin" icon="el-icon-plus">添加设备</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="number" label="编号" width="150">
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
					<el-table-column prop="group" label="分组" width="150">

					</el-table-column>
					<el-table-column prop="IPaddress" label="IP地址">
					</el-table-column>
					<el-table-column prop="position" label="安装位置">
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

		</div>
		<div style="float: right;position: absolute;top: 0;right: 0;width: 210px;height:100%;border-left: 1px solid #ebeef5;">
			<p style="height: 50px;text-align: center;line-height: 50px;background: #999;font-weight: bold;">分组列表</p>
			<el-tree :data="data5" node-key="id" default-expand-all :expand-on-click-node="false">
				<span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
				<span>
          <el-button
          	v-show="data.type=='p'"
            type="text"
            size="mini"
            @click="() => append(data)">
            	添加设备
          </el-button>
           <el-button
          	v-show="data.type=='c'"
            type="text"
            size="mini"
            @click="() => append(data)">
            	编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            	删除
          </el-button>
          
        </span>
				</span>
			</el-tree>
		</div>

		<el-dialog :title="opTitle" :visible.sync="dialogFormVisible" width="600px" top="5vh" @close="closeWin">
			<el-form :model="formInfo" label-width="100px">
				<el-form-item label="编号">
					<el-input v-model="formInfo.id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="formInfo.reallyName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度">
					<el-input v-model="formInfo.reallyName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度">
					<el-input v-model="formInfo.reallyName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="formInfo.state" placeholder="状态">
						<el-option label="在线" value="1"></el-option>
						<el-option label="离线" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分组">
					<el-select v-model="formInfo.group" placeholder="分组">
						<el-option label="分组一" value="1"></el-option>
						<el-option label="分组二" value="2"></el-option>
						<el-option label="分组三" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="IP地址">
					<el-input v-model="formInfo.reallyName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="安装位置">
					<el-input v-model="formInfo.reallyName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="subAddInfo">确 定</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
	export default {
		data() {

			const data = [{
				id: 1,
				label: '分组一',
				type: 'p',
				children: [{
					id: 4,
					type: 'c',
					label: '001（一号监控）'
				}]
			}, {
				id: 2,
				label: '分组二',
				type: 'p',
				children: [{
					id: 5,
					type: 'c',
					label: '002（二号监控）'
				}]
			}, {
				id: 3,
				type: 'p',
				label: '分组三',
				children: [{
					id: 6,
					type: 'c',
					label: '003（三号监控）'
				}]
			}];

			return {
				opTitle: "",
				dialogFormVisible: false,
				formInfo: {},

				data5: JSON.parse(JSON.stringify(data)),
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
						IPaddress: '192.068.1.199',
						position: '扬州市快速路口'
					}, {
						number: '002',
						name: '二号监控',
						lng: '119.417',
						lat: '32.402',
						state: '1',
						group: '分组二',
						IPaddress: '192.068.1.199',
						position: '扬州市快速路口'
					},
					{
						number: '003',
						name: '三号监控',
						lng: '119.417',
						lat: '32.402',
						state: '0',
						group: '分组三',
						IPaddress: '192.068.1.199',
						position: '扬州市快速路口'
					},
				],
				searchData: {

				},

				append(data) {
					//      const newChild = { id: id++, label: 'testtest', children: [] };
					//      if (!data.children) {
					//        this.$set(data, 'children', []);
					//      }
					//      data.children.push(newChild);
				},

				remove(node, data) {
					//      const parent = node.parent;
					//      const children = parent.data.children || parent.data;
					//      const index = children.findIndex(d => d.id === data.id);
					//      children.splice(index, 1);
				},

			}
		},
		methods: {
			//查询
			search() {

			},
			//显示添加窗口
			showAddWin() {
				this.opTitle = "添加设备";
				this.dialogFormVisible = true;
			},
			//显示编辑页面
			showEditWin(row) {
				console.log(row);
				this.opTitle = "编辑设备";
				this.dialogFormVisible = true;
			},
			//关闭窗口
			closeWin() {

			},
			//显示删除页面
			showDeleteWin(row) {
				console.log(row);
				this.$confirm('此操作将删除此设备, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

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

<style scoped>
	.stateGre {
		width: 16px;
		height: 16px;
		display: inline-block;
		border-radius: 8px;
		background: green;
		vertical-align: middle;
	}
	
	.stateRed {
		width: 16px;
		height: 16px;
		display: inline-block;
		border-radius: 8px;
		background: red;
		vertical-align: middle;
	}
</style>
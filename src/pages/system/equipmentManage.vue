<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;position: relative;height: 100%;">
		<el-container style="height: 100%;">
			<el-aside width="200px" class="groupInfo">
				<el-card class="box-card" :body-style="{ padding: '5px' }">
					<div slot="header" class="clearfix">
						<span>分组信息</span>
						<div class="opList">
							<i class="el-icon-plus" @click="addGroup"></i>
							<i class="el-icon-edit-outline" @click="editGroup"></i>
							<i class="el-icon-delete" @click="deleteGroup"></i>
							<!--<i class="el-icon-refresh" @click="refreshGroup"></i>-->
						</div>

						<!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
					</div>
					<div class="text item">
						<el-input placeholder="输入关键字过滤" size="small" v-model="filterText"></el-input>
						<el-tree :data="groupArr" node-key="id" highlight-current default-expand-all @node-click="selectGroup" :expand-on-click-node="false" class="filter-tree groupTree" :filter-node-method="filterNode" ref="tree2" :props="defaultProps">
							<span class="custom-tree-node" slot-scope="{ node, data }">
       						 <span><i :class="Edata.icon.sitemap"></i> {{ data.title }}</span>

							<!--<span v-if="data.type=='p'" draggable><i :class="Edata.icon.sitemap"></i> {{ node.label }}</span>
							<span v-else-if="data.type=='t'" draggable><i :class="Edata.icon.sitemap"></i> {{ node.label }}</span>
							<span v-else draggable><i :class="Edata.icon.sitemap"></i> {{ node.label }}</span>-->
							</span>
						</el-tree>
					</div>
				</el-card>

			</el-aside>
			<el-main>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<el-row>
							<el-form :inline="true" :model="searchData" class="demo-form-inline">
								<el-form-item label="序列号">
									<el-input v-model="searchData.serial" placeholder="序列号"></el-input>
								</el-form-item>
								<el-form-item label="名称">
									<el-input v-model="searchData.name" placeholder="名称"></el-input>
								</el-form-item>
								<el-form-item label="状态">
									<el-select v-model="searchData.status" placeholder="状态">
										<el-option label="全部" value=""></el-option>
										<el-option label="在线" value="0"></el-option>
										<el-option label="离线" value="1"></el-option>
									</el-select>
								</el-form-item>
								<!--<el-form-item label="分组">
						<el-select v-model="searchData.group" placeholder="分组">
							<el-option label="分组一" value="1"></el-option>
							<el-option label="分组二" value="2"></el-option>
							<el-option label="分组三" value="3"></el-option>
						</el-select>
					</el-form-item>-->
								<!--<el-form-item label="IP地址">
									<el-input v-model="searchData.ip" placeholder="IP地址"></el-input>
								</el-form-item>-->
								<!--<el-form-item label="安装位置">
						<el-input v-model="searchData.address" placeholder="安装位置"></el-input>
					</el-form-item>-->
								<el-form-item>
									<el-button type="primary" @click="search">查询</el-button>
								</el-form-item>
							</el-form>
						</el-row>
						<el-row>
							<el-button type="primary" @click="showAddEquWin" icon="el-icon-plus">添加设备</el-button>
						</el-row>
					</div>
					<el-row v-loading="tableDataLoading">
						<el-table :data="tableData" border>
							<el-table-column prop="serial" label="序列号" width="150">
							</el-table-column>
							<el-table-column prop="name" label="名称">
							</el-table-column>
							<el-table-column prop="groupName" label="分组">
							</el-table-column>
							<el-table-column prop="longitude" label="经度">
							</el-table-column>
							<el-table-column prop="latitude" label="纬度">
							</el-table-column>
							<el-table-column prop="status" label="状态" width="120">
								<template slot-scope="scope">
									<span v-text="scope.row.status==='0'?'在线':'离线'" style="display: inline-block;vertical-align: middle;"></span>
									<span :class="scope.row.status==='0'?'stateGre':'stateRed'"></span>
								</template>
							</el-table-column>
							<el-table-column prop="type" :formatter="formatEquType" label="设备类型" width="150">

							</el-table-column>
							<el-table-column prop="ip" label="IP地址">
							</el-table-column>
							<el-table-column prop="port" label="端口号">
							</el-table-column>
							<!--<el-table-column prop="address" label="安装位置">
					</el-table-column>-->
							<el-table-column label="操作" width="150">
								<template slot-scope="scope">
									<el-button @click="showEditWin(scope.row)" type="primary" size="mini">编辑</el-button>
									<el-button type="danger" size="mini" @click="showDeleteWin(scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-row style="margin-top: 10px;">
							<el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchData.current" :page-sizes="pageSizes" :page-size="searchData.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
							</el-pagination>
						</el-row>
					</el-row>

				</el-card>
			</el-main>

		</el-container>
		<el-dialog title="添加设备" :visible.sync="dialogFormAddVisible"  top="5vh" @close="closeAddWin" :close-on-click-modal="false">
			<el-form :model="formInfo" status-icon label-width="100px" ref="formInfo"  :inline="true" class="demo-form-inline">
				<el-rwo>
					<el-form-item label="设备类型" prop="type">
					<el-select v-model="formInfo.type" placeholder="请选择设备类型">
							<el-option v-for="(item,index) in equType" :key="index" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
				</el-rwo>
				<el-row>
					<el-form-item label="分组" prop="groupArr" :rules="[{ required: true, message: '请选择分组', trigger: 'change'}]">
					<el-cascader placeholder="选择分组" v-model="formInfo.groupArr" :options="groupArr" :props="{value:'id',label:'title',children:'children'}" filterable change-on-select></el-cascader>
				</el-form-item>
				</el-row>
				<el-form-item label="序列号" prop="serial" :rules="[{ required: true, message: '序列号不能为空', trigger: 'blur'}]">
					<el-input v-model="formInfo.serial" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空', trigger: 'blur'}]">
					<el-input v-model="formInfo.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="formInfo.longitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="formInfo.latitude" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="IP地址" prop="ip">
					<el-input v-model="formInfo.ip" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="端口号" prop="port">
					<el-input v-model="formInfo.port" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="account">
					<el-input v-model="formInfo.account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formInfo.password"  type="password"  auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="subAddEquInfo">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑设备" :visible.sync="dialogFormEditVisible"  top="5vh" @close="closeEditWin" :close-on-click-modal="false">
			<el-form :model="formEditInfo" status-icon label-width="100px" ref="formEditInfo"  :inline="true" class="demo-form-inline">
				<el-row>
					<el-form-item label="设备类型：">
					{{formEditInfo.type|filterEquType}}
					<!--<el-input v-model="formEditInfo.type" disabled auto-complete="off"></el-input>-->
				</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="分组" prop="groupArr" clearable :rules="[{ required: true, message: '请选择分组', trigger: 'change'}]">
					<el-cascader placeholder="选择分组" v-model="formEditInfo.groupArr" :options="groupArr" :props="{value:'id',label:'title',children:'children'}" filterable change-on-select></el-cascader>
				</el-form-item>
				</el-row>
				<el-form-item label="序列号" prop="serial" :rules="[{ required: true, message: '序列号不能为空', trigger: 'blur'}]">
					<el-input v-model="formEditInfo.serial" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空', trigger: 'blur'}]">
					<el-input v-model="formEditInfo.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="formEditInfo.longitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="formEditInfo.latitude" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="IP地址" prop="ip" >
					<el-input v-model="formEditInfo.ip" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="端口号" prop="port">
					<el-input v-model="formEditInfo.port" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="account">
					<el-input v-model="formEditInfo.account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formEditInfo.password"  type="password"   auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="subEditEquInfo">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="添加分组" :visible.sync="dialogGroupAddVisible" width="400px" top="5vh" @close="closeAddGroupWin" :close-on-click-modal="false">
			<el-form :model="addGroupInfo" label-width="100px" ref="addGroupInfo">
				<el-form-item label="上级" prop="groupArr">
					<el-cascader placeholder="选择分组" v-model="addGroupInfo.groupArr" clearable :options="groupArr" :props="{value:'id',label:'title',children:'children'}" filterable change-on-select></el-cascader>
				</el-form-item>
				<el-form-item label="名称"  prop="groupName" :rules="[{ required: true, message: '请填写名称', trigger: 'blur'}]">
					<el-input v-model="addGroupInfo.groupName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogGroupAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="subAddGroupInfo">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑分组" :visible.sync="dialogGroupEditVisible" width="400px" top="5vh" @close="closeEditGroupWin" :close-on-click-modal="false">
			<el-form :model="editGroupInfo" label-width="100px">
				<el-form-item label="上级" prop="groupArr" >    <!--:rules="[{ required: true, message: '请选择分组', trigger: 'change'}]"-->
					<el-cascader disabled placeholder="选择分组" v-model="editGroupInfo.groupArr" :options="groupArr" :props="{value:'id',label:'title',children:'children'}" filterable change-on-select></el-cascader>
				</el-form-item>
				<el-form-item label="名称" :rules="[{ required: true, message: '请填写名称', trigger: 'blur'}]">
					<el-input v-model="editGroupInfo.groupName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogGroupEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="subEditGroupInfo">确 定</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
	import { selectAllEquipment, selectGroup, insertEquipment, deleteEquipment, updateEquipment, insertGroup, deleteGroup, updateGroupName } from '../../js/api';
	import { Edata } from '../../js/Edata';
	import { formatTreeData } from '../../js/formatTreeData';
	var equType=[
					{type:"0",name:"枪机"},
					{type:"1",name:"球机"},
					// {type:"2",name:"鹰眼"}
				];
	export default {
		data() {
			return {
				Edata: Edata,
				tableDataLoading: false,
				filterText: "",
				opTitle: "",
				dialogFormAddVisible: false,
				dialogGroupAddVisible: false,
				dialogFormEditVisible: false,
				dialogGroupEditVisible: false,
				formInfo: {
					type:"",
					serial: "",
					name: "",
					longitude: "",
					latitude: "",
					type: "0",
					ip: "",
					port:"",
					account:"",
					password:"",
					groupId: "",
					groupArr: [],
					man: this.$store.state.adminUserInfo.id,
				},
				equType:equType,
				formEditInfo: {
					serial: "",
					name: "",
					longitude: "",
					latitude: "",
					type: "",
					ip: "",
					groupArr: [],
					oldgId: "",
					gId: "",
					groupId: "",
					man: this.$store.state.adminUserInfo.id,
				},
				addGroupInfo: {
					groupName: "",
					man: this.$store.state.adminUserInfo.id,
					parentId: "",
					groupArr: [],
				},
				editGroupInfo: {
					id: "",
					groupArr: [],
					groupName: "",
					man: this.$store.state.adminUserInfo.id,
				},
				groupArr: [],
				pageSizes: [15, 100, 200, 500],
				pageSize: 15,
				total: 0,
				currentPage: 2,
				tableData: [],
				searchData: {
					serial: "",
					status: "",
					name: "",
					ip: "",
					address: "",
					groupId: "",
					current: 1,
					size: 15,
				},
				
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				originalGroupList: [],
				selectGroupListId: [],
				selectGroupInfo: {},
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
			
			/*格式化groupId*/
			stransGroupId(arr) {
				if(arr.length === []) return "";
				return arr[arr.length - 1];
			},
			/*改变查询串*/
			changeSearch() {
				this.$router.push({
					path: "/system/equipmentManage",
					query: {
						keywords: JSON.stringify(this.searchData)
					}
				});
			},
			//查询
			search() {
				this.tableDataLoading = true;
				this.changeSearch();
				this.getEquipmentList();
			},
			//显示添加设备窗口
			showAddEquWin() {
				this.dialogFormAddVisible = true;
			},
			//显示编辑页面
			showEditWin(row) {
				console.log(row);
				this.dialogFormEditVisible = true;

				this.formEditInfo = Object.assign(this.formEditInfo, row);
				this.formEditInfo.oldgId = row.groupId;
				this.selectGroupListId = [];
				this.findGroupId(this.originalGroupList, row.groupId);
				this.formEditInfo.groupArr = this.selectGroupListId;
//				console.log(this.formEditInfo);
			},
			//关闭窗口
			closeAddWin() {
				this.$refs.formInfo.clearValidate();
				this.$refs.formInfo.resetFields();
			},
			//关闭窗口
			closeEditWin() {

			},
			/*关闭添加分组窗口*/
			closeAddGroupWin() {
				this.$refs.addGroupInfo.clearValidate();
				this.$refs.addGroupInfo.resetFields();
			},
			/*关闭修改分组窗口*/
			closeEditGroupWin() {

			},
			//显示删除页面
			showDeleteWin(row) {
				console.log(row);
				this.$confirm('此操作将删除此设备, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(123);
					let info = {
						id: row.id,
						man: this.$store.state.adminUserInfo.id,
					}
					deleteEquipment(info).then(data => {
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
							this.getEquipmentList();
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
						message: '已取消删除'
					});
				});

			},
			//每页显示的条数改变时
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.tableDataLoading = true;
				this.searchData.size = val;
				this.changeSearch();
				this.getEquipmentList();
			},
			//当前页
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.tableDataLoading = true;
				this.searchData.current = val;
				this.changeSearch();
				this.getEquipmentList();
			},
			subAddEquInfo() {
				this.$refs.formInfo.validate((valid) => {
					if(valid) {
						console.log(valid)
						this.formInfo.groupId = this.stransGroupId(this.formInfo.groupArr);
						this.addEqu();
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			/*提交设备修改信息*/
			subEditEquInfo() {
				this.$refs.formEditInfo.validate((valid) => {
					if(valid) {
						console.log(valid)

						this.formEditInfo.gId = this.stransGroupId(this.formEditInfo.groupArr);

						this.EditEqu();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			/*修改设备信息*/
			EditEqu() {
				updateEquipment(this.formEditInfo).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						this.dialogFormEditVisible = false;
						this.tableDataLoading = false;
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.getEquipmentList();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
						this.tableDataLoading = false;
					}
				});
			},
			/*提价添加分组信息*/
			subAddGroupInfo() {
				this.$refs.addGroupInfo.validate((valid) => {
					if(valid) {
						console.log(valid)
						if(this.addGroupInfo.groupArr.length) {
							this.addGroupInfo.parentId = this.stransGroupId(this.addGroupInfo.groupArr);
						} else {
							this.addGroupInfo.parentId = 0;
						}

						this.addGro();
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			/*添加分组*/
			addGro() {
				insertGroup(this.addGroupInfo).then(data => {
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
						this.dialogGroupAddVisible = false;
						this.getSelectGroup();
					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			/*提交分组修改信息*/
			subEditGroupInfo() {
				console.log(this.editGroupInfo);
				var info = Object.assign({}, this.editGroupInfo);
				if(info.groupArr.length == 1) {
					info.id = info.groupArr[0];
					info.parentId = 0;
				} else if(info.groupArr.length > 1) {
					info.id = info.groupArr[info.groupArr.length - 1];
					info.parentId = info.groupArr[info.groupArr.length - 1];
				}
				console.log(333333333, info);
				this.getUpdateGroupName(info);
				this.changeSearch();
				this.getEquipmentList();
			},
			/*修改分组信息*/
			getUpdateGroupName(info) {
				updateGroupName(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						this.dialogGroupEditVisible = false;
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.getSelectGroup();

					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
						this.tableDataLoading = false;
					}
				});
			},
			/*过滤设备*/
			formatEquType(row, column, cellValue, index){
				console.log(cellValue);
				for(var item of this.equType){
					if(item.type===cellValue){
						return item.name;
					}
				}
			},
			/*添加设备*/
			addEqu() {
				console.log(this.formInfo);
				insertEquipment(this.formInfo).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						this.dialogFormAddVisible = false;
						this.tableDataLoading = false;
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'success'
						});

						this.getEquipmentList();

					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
						this.tableDataLoading = false;
					}
				});
			},
			/*获取设备列表*/
			getEquipmentList() {
				selectAllEquipment(this.searchData).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						console.log(data);
						this.tableData = value;
						this.total = parseInt(extraInfo);
						//								this.$message({
						//									message: errMsg,
						//									type: 'success'
						//								});
						this.tableDataLoading = false;
					} else {
						//						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
						this.tableDataLoading = false;
					}
				});
			},
			/*获取分组*/
			getSelectGroup() {
				let info = {
					type: "1",
					groupName: ""
				};
				selectGroup(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {

						//						let groupTitle = [];
						//						groupTitle.push({
						//							id: "",
						//							label: "扬州交通局",
						//							type: 't',
						//							children: []
						//						});
						//						groupTitle[0].children = this.formatGroup(value);
						//						this.groupArr = groupTitle;
						let attributes = {
							id: 'id',
							parentId: 'parentId',
							name: 'groupName',
							rootId: "0"
						};
						//						formatTreeData(value,attributes)
						//						this.groupArr = this.formatGroup(value);
						this.originalGroupList=[];
						this.originalGroupList = JSON.parse(JSON.stringify(value));
						this.groupArr = formatTreeData(value, attributes);
						console.log(this.originalGroupList);

					} else {
						console.log(data);
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});
			},
			findGroupId(arr, id) {
				for(var item of arr) {
					if(item.id == id) {
						this.selectGroupListId.unshift(parseInt(id));
////						console.log("idid", item);
////						console.log("arr", this.selectGroupListId);
						if(item.parentId == "0") {
							console.log("stop", this.selectGroupListId);
							return this.selectGroupListId;
						}
						this.findGroupId(arr, item.parentId);
					}
				}
			},
			/*格式化分组*/
			formatGroup(val) {
				var arr = [];
				for(var item of val) {
					if(item.parentId === '0') {
						arr.push({
							id: item.id,
							label: item.groupName,
							type: 'p',
							children: []
						});
					}
				}
				for(var itema of arr) {
					for(var itemb of val) {
						if(itema.id == itemb.parentId) {
							itema.children.push({
								id: itemb.id,
								label: itemb.groupName,
								type: 'c',
							});
						}
					}
				}

				return arr;
			},
			filterNode(value, data) {
				console.log(data);
				console.log(value);
				if(!value) return true;
				return data.title.indexOf(value) !== -1;
			},
			/*分组查看设备*/
			selectGroup(obj, node, self) {
				console.log(obj);
				this.searchData.groupId = obj.id;
				this.selectGroupInfo = obj;
				this.editGroupInfo.groupName = obj.title;
				this.tableDataLoading = true;
				this.changeSearch();
				this.getEquipmentList();
			},
			/*添加分组*/
			addGroup() {
				this.selectGroupListId = [];
				this.findGroupId(this.originalGroupList, this.selectGroupInfo.id);
				this.addGroupInfo.groupArr = this.selectGroupListId;
				this.dialogGroupAddVisible = true;
			},
			/*修改分组*/
			editGroup() {
				if(this.selectGroupInfo.id) {
					this.selectGroupListId = [];
					this.findGroupId(this.originalGroupList, this.selectGroupInfo.id);
					this.editGroupInfo.groupArr = this.selectGroupListId;
					this.dialogGroupEditVisible = true;

				} else {
					this.$message({
						type: 'warning',
						message: '请先选择分组'
					});
				}

			},
			/*删除分组*/
			deleteGroup() {
				if(this.selectGroupInfo.id) {
					if(this.selectGroupInfo.children.length > 0) {
						this.$alert('该分组里有子分组，暂无法删除！', '提示', {
							confirmButtonText: '确定',
						});
					} else {

						selectAllEquipment(this.searchData).then(data => {
							let {
								errMsg,
								errCode,
								value,
								extraInfo,
								success
							} = data;
							if(success) {
								console.log(data);
								if(value.length === 0) {
									this.$confirm('此操作将删除此分组, 是否继续?', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {

										this.getDeleteGroup(this.selectGroupInfo.id);
									}).catch(() => {
										this.$message({
											type: 'info',
											message: '已取消删除'
										});

									});
								} else {
									this.$alert('该分组里有设备，暂无法删除！', '提示', {
										confirmButtonText: '确定',
									});
								}
							} else {
								this.$message({
									message: errMsg,
									type: 'error'
								});
							}
						});
					}
					console.log(this.selectGroupInfo);

				} else {
					this.$message({
						type: 'warning',
						message: '请先选择分组'
					});
				}

			},
			getDeleteGroup(id) {
				let info = {
					id: id,
					man: this.$store.state.adminUserInfo.id,
				}
				deleteGroup(info).then(data => {
					let {
						errMsg,
						errCode,
						value,
						extraInfo,
						success
					} = data;
					if(success) {
						this.$message({
							message: errMsg,
							type: 'success'
						});
						this.getSelectGroup();
					} else {
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
				});

			},
			/*刷新分组*/
			refreshGroup() {

			},
		},
		//过滤器
		filters: {
			filterEquType:val=>{
				if(val){
					for(var item of equType){
					if(item.type===val){
						return item.name;
					}
				}
				}
				
			},
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
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
			this.getSelectGroup();
			this.getEquipmentList();
			window.onpopstate = function() {
				history.go(0);
			}
		},
		beforeCreate(){
			if(this.$store.state.adminUserInfo.roleId!=7){
				this.$router.push("/map/mapShow");
			}
		},
	}
</script>

<style>
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
	
	.groupInfo {
		padding-right: 5px;
		border-right: 1px solid rgb(220, 223, 230);
	}
	
	.groupInfo .el-card__header {
		padding: 5px;
	}
	
	.opList {
		float: right;
		padding: 3px 0;
	}
	
	.opList i {
		margin-left: 5px;
		font-size: 18px;
		cursor: pointer;
	}
	/*.activeItem{
		display: inline-block;
		width: 100%;
		background: red;
	}*/
	/*.groupTree .is-current>.el-tree-node__content{
		background-color: #f5f7fa;
	}*/
</style>
<template>
	<section style="padding: 10px 0 0 10px;box-sizing: border-box;height: 100%;overflow-y: scroll;">
		<el-card class="box-card">
  <div slot="header" class="clearfix">
		<el-row>
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
				<!--<el-form-item label="ID">
					<el-input v-model="searchData.id" placeholder="工号"></el-input>
				</el-form-item>-->
				<el-form-item label="用户名">
					<el-input v-model="searchData.userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="searchData.realName" placeholder="真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-select v-model="searchData.roleId" placeholder="请选择角色">
						<el-option  key="item.id" label="不选择" value=""></el-option>
						<el-option v-for="item in Edata.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row>
			<el-button type="primary" @click="showAddWin" icon="el-icon-plus">添加用户</el-button>
		</el-row>
		</div>
		<el-row width="100%" v-loading="tableDataLoading">
			<el-table :data="tableData" border>
				<el-table-column prop="id" label="ID" width="80">
				</el-table-column>
				<el-table-column prop="userName" label="用户名" width="150">
				</el-table-column>
				<el-table-column prop="realName" label="真实姓名" width="150">
				</el-table-column>
				<el-table-column prop="roleName" label="角色" width="150">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column prop="lastLogin" label="最后登陆时间">
				</el-table-column>
				<el-table-column prop="lastIp" label="最后登陆IP">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间">
				</el-table-column>
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

		<el-dialog title="添加用户" :visible.sync="dialogFormAddVisible" width="600px" @close='winAddClose'>
			<el-form :model="formAddInfo" label-width="100px"  status-icon :rules="rulesAdd" ref="formAddInfo" >
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="formAddInfo.userName" auto-complete="off" :suffix-icon="transIcon"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
					<el-input v-model="formAddInfo.password" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="真实姓名"  prop="realName" :rules="[{ required: true, message: '真实姓名不能为空'}]">
					<el-input v-model="formAddInfo.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色"   prop="roleId"  :rules="[{ required: true, message: '请选择角色',trigger: 'change' }]">
					<el-select v-model="formAddInfo.roleId" placeholder="请选择角色">
						<el-option v-for="item in Edata.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号"   prop="mobile" >
					<el-input v-model="formAddInfo.mobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱"  prop="email" >
					<el-input v-model="formAddInfo.email" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="subAddInfo()">确 定</el-button>
			</div>
		</el-dialog>
		
		
		
		<el-dialog title="编辑用户" :visible.sync="dialogFormEditVisible" width="600px" @close='winEditClose'>
			<el-form :model="formEditInfo" label-width="100px"  status-icon :rules="rulesEdit" ref="formEditInfo" >
				<el-form-item label="用户名：" prop="username">
					{{formEditInfo.username}}
					<!--<el-input v-model="formEditInfo.username" auto-complete="off" :suffix-icon="transIcon"></el-input>-->
				</el-form-item>
				<el-form-item label="真实姓名："  prop="realName" :rules="[{ required: true, message: '真实姓名不能为空'}]">
					<el-input v-model="formEditInfo.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色："   prop="roleId"  :rules="[{ required: true, message: '请选择角色',trigger: 'change' }]">
					<el-select v-model="formEditInfo.roleId" placeholder="请选择角色">
						<el-option v-for="item in Edata.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号"  prop="mobile" >
					<el-input v-model="formEditInfo.mobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email" >
					<el-input v-model="formEditInfo.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="" >
					<el-button type="text" @click="resetPwd">重置密码</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormEditVisible = false">取 消</el-button>
				<el-button type="primary" @click="subEditInfo()">确 定</el-button>
			</div>
		</el-dialog>
		
		
		<el-dialog title="重置密码" :visible.sync="dialogResetPwdVisible" width="500px" @close='winResetPwdClose'>
			<el-form :model="formResetPwdInfo" label-width="100px"  status-icon ref="formResetPwdInfo">
				<el-form-item label="新密码："  prop="newPassword" :rules="[{ required: true, message: '请输入新密码', trigger: 'blur'}]">
					<el-input  type="password"  placeholder="请输入新密码" v-model="formResetPwdInfo.newPassword" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogResetPwdVisible = false">取 消</el-button>
				<el-button type="primary" @click="subResetPwdInfo()">确 定</el-button>
			</div>
		</el-dialog>
		
		
		
		
		
		
		
		
		
		
</el-card>
	</section>
</template>
<script>
	import {newUser,selectAllUser,selectUsername,updateUser,delectUser,updatePassword} from '../../js/api';
	import {Edata} from '../../js/Edata';
	export default {
		data() {
		var validateAddUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
        	this.transIcon='el-icon-loading';
          let info={username:this.formAddInfo.userName}
          selectUsername(info).then(data=>{
							let { errMsg, errCode, value, extraInfo,success} = data;
							if (success) {
								this.transIcon='';
								callback();
							} else {
								this.transIcon='';
								if(errCode===2){
									console.log(errCode);
									 callback(new Error('该用户名已被占用，请重新输入！'));
								}
						}
				});
        }
      };
      var validateEditUserName = (rule, value, callback) => {
      	console.log(1);
        if (value === '') {
        	console.log(2);
          callback(new Error('请输入用户名'));
        } else if(value !== this.editUserName){
        	console.log(3);
        	this.transIcon='el-icon-loading';
          let info={username:this.formEditInfo.userName}
          selectUsername(info).then(data=>{
							let { errMsg, errCode, value, extraInfo,success} = data;
							if (success) {
								this.transIcon='';
								callback();
							} else {
								this.transIcon='';
								if(errCode===2){
									console.log(errCode);
									 callback(new Error('该用户名已被占用，请重新输入！'));
								}
						}
				});
        }else{
        	console.log(this.formEditInfo.userName);
        	callback();
        }
      };
			return {
				transIcon:"",
				tableDataLoading:false,
				Edata:Edata,
				operateType:'',
				pageSizes: [15, 100, 200, 500],
				total: 0,
				searchData: {
					id:"",
					userName:"",
					realName:"",
					roleId:"",
					current:1,
					size:15,
				},
				dialogFormAddVisible: false,
				dialogFormEditVisible: false,
				dialogResetPwdVisible:false,
				editUserName:"",
				formAddInfo: {
					userName:"",
					realName:"",
					roleId:"",
					password:"",
					mobile:"",
					email:"",
				},
				formEditInfo: {
					username:"",
					realName:"",
					roleId:"",
					mobile:"",
					email:"",
				},
				formResetPwdInfo:{
					type:"2",
					username:"",
					newPassword:"",
					man:this.$store.state.adminUserInfo.id,
					roleId:this.$store.state.adminUserInfo.roleId,
				},
				tableData: [],
				 rulesAdd: {
				 	userName:[
				 		 { validator: validateAddUserName, trigger: 'changes' },
				 		   { required: true, message: '请输入用户名', trigger: 'blur' },
				 	],
				 },
				 rulesEdit: {
				 	userName:[
				 		 { validator: validateEditUserName, trigger: 'changes' },
				 		   { required: true, message: '请输入用户名', trigger: 'blur' },
				 	],
				 }
			}
		},
		methods: {
			/*改变查询串*/
			changeSearch(){
				this.$router.push({
					path:"/system/userManage",
					query:{
						keywords:JSON.stringify(this.searchData)
					}
				});
			},
			/*重置密码*/
			resetPwd(){
				this.dialogResetPwdVisible=true;
			},
			/*提交重置密码信息*/
			subResetPwdInfo(){
			this.$refs.formResetPwdInfo.validate((valid) => {
          if (valid) {
				this.editPwd();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			/*修改密码*/
			editPwd(){
				updatePassword(this.formResetPwdInfo).then(data => {
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
							this.dialogResetPwdVisible=false;
						} else {
							console.log(data);
							this.$message({
								message: errMsg,
								type: 'error'
							});
						}
					});
			},
			/*关闭重置密码窗口*/
			winResetPwdClose(){
				
			},
			//查询
			search() {
				this.tableDataLoading=true;
				this.changeSearch();
				this.getUserList();
			},
			winAddClose(){
				console.log('窗口关闭');
				this.$refs.formAddInfo.clearValidate();
				this.$refs.formAddInfo.resetFields();
				
			},
			winEditClose(){
				console.log('窗口关闭');
				this.$refs.formEditInfo.clearValidate();
				this.$refs.formEditInfo.resetFields();
				
			},
			//显示添加窗口
			showAddWin() {
				this.dialogFormAddVisible = true;
			},
			//显示编辑窗口
			showEditWin(row) {
				this.dialogFormEditVisible = true;
				this.formResetPwdInfo.username=row.userName;
				this.editUserName=row.userName;
				this.formEditInfo=Object.assign(this.formEditInfo,row);
				this.formEditInfo.username=row.userName;
//				this.formEditInfo= {
//					username:row.userName,
//					realName:row.realName,
//					roleId:row.roleId,
//					
//				};
//				this.formEditInfo.userId=row.id;
				this.formEditInfo.man=this.$store.state.adminUserInfo.id;
			},
			//显示删除页面
			showDeleteWin(row) {
				console.log(row);
				this.$confirm('此操作将删除此用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let info={id:row.id,man:this.$store.state.adminUserInfo.id}
					delectUser(info).then(data=>{
							let { errMsg, errCode, value, extralInfo,success} = data;
							if (success) {
								console.log(data);
								this.$message({
									message: errMsg,
									type: 'success'
								});
								this.tableDataLoading=true;
								this.getUserList();
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
				this.tableDataLoading=true;
				this.searchData.size=val;
				this.changeSearch();
				this.getUserList();
			},
			//当前页
			handleCurrentChange(val) {
				this.tableDataLoading=true;
				this.searchData.current=val;
				this.changeSearch();
				this.getUserList();
			},
			//提交添加的信息
			subAddInfo(type) {
				this.addUser();
			},
			//提交修改的信息
			subEditInfo(){
				this.getUpdateUser();
			},
			/*获取用户列表*/
			getUserList(){
				selectAllUser(this.searchData).then(data=>{
							let { errMsg, errCode, value, extraInfo,success} = data;
							if (success) {
								console.log(data);
								this.tableData=value;
								this.total=parseInt(extraInfo);
								this.tableDataLoading=false;
							} else {
								this.tableDataLoading=false;
								console.log(data);
								this.$message({
									message: errMsg,
									type: 'error'
								});
						}
				});
			},
			/*修改用户信息*/
			getUpdateUser(){
				updateUser(this.formEditInfo).then(data=>{
							let { errMsg, errCode, value, extralInfo,success} = data;
							if (success) {
								console.log(data);
								this.$message({
									message: errMsg,
									type: 'success'
								});
								this.dialogFormEditVisible=false;
								this.tableDataLoading=true;
								this.getUserList();
							} else {
								console.log(data);
								this.$message({
									message: errMsg,
									type: 'error'
								});
								this.dialogFormEditVisible=false;
						}
				});
			},
			/*创建用户*/
			addUser(){
				 this.$refs.formAddInfo.validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(this.formAddInfo));
				newUser(this.formAddInfo).then(data=>{
							let { errMsg, errCode, value, extralInfo,success} = data;
							if (success) {
								console.log(data);
								
								this.$message({
									message: errMsg,
									type: 'success'
								});
								this.dialogFormAddVisible=false;
								this.tableDataLoading=true;
								this.getUserList();
							} else {
								console.log(data);
								this.$message({
									message: errMsg,
									type: 'error'
								});
								this.dialogFormAddVisible=false;
						}
				});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
				
				
			},

		},
		mounted() {
			
		},
		created(){
			this.tableDataLoading=true;
			try{
				if(this.$route.query.keywords){
					this.searchData=JSON.parse(this.$route.query.keywords);
				}
			}finally{}
			this.getUserList();
			window.onpopstate=function (){
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
<style scoped>

</style>
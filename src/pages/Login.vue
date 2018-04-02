<template >
	<el-row class="bg login">
		<el-row>
			<el-col :span="24"><div class="grid-content" style="text-align:center;margin-top:5%;font-size:40px;">{{title}}</div></el-col>
		</el-row>
		<el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"	class="demo-ruleForm login-container">
			<h3 class="title">系统登录</h3>
			<el-form-item prop="adminName">
				<el-input type="text" v-model="account.adminName" auto-complete="off" placeholder="账号"  @keyup.native="show($event)"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码"  @keyup.native="show($event)"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin('account')" :loading="logining">登录</el-button>
			</el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import {requestLogin} from '../js/api'
	import { LStorage ,SStorage} from "../js/LStorage"
	export default {
		data() {
			return {
				logining: false,
				account: {
					adminName: '',
					password: ''
				},
				title:window.g.netName,
				rules: {
					adminName: [
					{required: true, message: '请输入账号', trigger: 'blur'},
					],
					password: [
					{required: true, message: '请输入密码', trigger: 'blur'},
					]
				},
				checked: true
			};
		},
		methods: {
			handleLogin(formVal) {
				this.$router.push({ path: '/map/mapShow' });
//				var  _this=this;
//				this.$refs.account.validate(function(valid){
//					if (valid) {
//						_this.logining = true;
//						var loginParams = { adminName: _this.account.adminName, password: _this.account.password };
//
//						requestLogin(loginParams).then(function(data){
//							_this.logining = false;
//							let { errMsg, errCode, adminUserInfo } = data;
//							if (errCode != 0) {
//								_this.$message({
//									message: errMsg,
//									type: 'error'
//								});
//							} else {
//								SStorage.setItem('access-user', adminUserInfo);
//								_this.$store.commit('keepAdminUserInfo',adminUserInfo);
//								let info={
//									adminId:adminUserInfo.adminId
//								}
//								_this.$store.commit('setGeneralInfo',info);
//								console.log(_this.$store.state);
//								//是否保存密码
//								if(_this.checked){
//									LStorage.setItem('localaccess-user', _this.account);
//								}else{
//									LStorage.removeItem('localaccess-user');
//								}
//								_this.$router.push({ path: '/' });
//							}
//						});
//					} else {
//						console.log('error submit!!');
//						return false;
//					}
//				});
			},
			 show: function (ev) {
            if(ev.keyCode==13){
              this.handleLogin('account');
            }
          }
		},
		mounted: function () {
			let LocalUserInfo=LStorage.getItem("localaccess-user");
			console.log(LocalUserInfo);
			if(LocalUserInfo!=null){
				this.account.adminName=LocalUserInfo.adminName;
				this.account.password=LocalUserInfo.password;
			}
		}
	}
</script>


<style  scoped>
	.bg{
		height: 100%;
		background-size: cover;
		background-image:url(../assets/images/background.png);
		background-repeat:no-repeat;
		background-position:center;
		background-attachment:fixed;
	}
	.login .el-form{
		width: 350px;
		height: 295px;
		margin: 5% auto 0;
		background: #fff;
		padding: 35px 35px 15px;
	}
	.title{
		height: 25px;
		margin-bottom: 40px;
		text-align: center;
	}
	.remember{margin-bottom: 35px;}
</style>


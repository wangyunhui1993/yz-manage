<template>
	<div id="app">
		<el-row class="container" style="height:100%;overflow: hidden;">
			<!--头部-->
			<el-row style='z-index: 1;'>
				<el-col :span="24">
					<div class="grid-content bg-dark-blue">
						<div class="net-title">{{netName}} - {{groupName}}{{(this.roleName)}}</div>
						<div class="login-info">
							<div class="exit">
								<!-- <router-link to="/perInfo" style="color:whitesmoke;">个人信息</router-link> -->
								<a class="exit-ico" href="javascript:void(0);" style="color:whitesmoke;" v-on:click="logout"><i class="el-icon-upload2"></i>退出</a>
							</div>
							<ul class="">
								<li style="font-size: 14px; color: whitesmoke;line-height: 60px;">{{preTime}}</li>
							</ul>
							<ul class="">
								<li style="margin-right:15px;">
									<a href="#" style="color: whitesmoke; font-weight: bold;">
										<div style="height: 60px;font-size: 20px; color: rgb(60, 60, 60); font-weight: bold; line-height:60px;"><label style="font-size: 16px; color: rgb(244, 244, 244); font-style: italic; font-weight: normal;">
							欢迎您
						</label>
											<!-- <a href="/perInfo">{{sysUserName}}</a> -->
											<router-link to='/perInfo' style='color:#324057;'>{{sysUserName}}</router-link>
											<label style="font-size: 16px; color: rgb(244, 244, 244); font-weight: normal;">  </label></div>
									</a>
								</li>
							</ul>

							<!-- <div class="notice">
								<el-dropdown>
									<span class="el-dropdown-link">
									<el-badge :value="200" :max="99" class="item">
										
										<icon name="bell-o" style="color:rgb(244, 244, 244);" scale="1.2"></icon>
										
									</el-badge>
								</span>
									<el-dropdown-menu slot="dropdown" class='dropdownlist'>
										<el-dropdown-item class="clearfix">评论
											<el-badge class="mark" :value="12" /></el-dropdown-item>
										<el-dropdown-item class="clearfix">评论
											<el-badge class="mark" :value="12" /></el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div> -->
						</div>
					</div>
				</el-col>
			</el-row>
			<!-- 一级导航 -->
			<div class="nav navbar-nav firstNav" style="width:1000; position: absolute;z-index: 1;width: 100%;">
				<template v-for="child in $router.options.routes" v-if="child.menuShow">
					<el-menu theme="dark" :default-active="$route.path | filterParentPath" class="el-menu-demo" mode="horizontal" @select='single'>
						<el-menu-item style="font-size: 17px;" v-for="(item,index) in child.children" v-if="item.menuShow" :index="item.path" :key='index'>
							{{item.name}}
						</el-menu-item>
					</el-menu>
				</template>

				<!--<ul class="nav navbar-nav" >
        <el-menu mode="horizontal"  :default-active="$route.path | filterParentPath" @select="handleSelect"
                 style="height: 100%" theme="dark">
			<template v-for="item in $router.options.routes" v-if="!item.hidden">
				<el-menu-item
						v-for="child in item.children"
						:index="child.path"
						v-show="!child.hidden && hasChildren(child.path) "
						style="font-size: 17px">
					{{child.meta}}
				</el-menu-item>
			</template>
        </el-menu >
      </ul >-->

			</div>
			<router-view></router-view>

		</el-row>
	</div>

</template>

<script>
	import { bus } from '../bus.js'
	import { Nav } from './Nav/Nav'
	import { netName } from '../js/api'
	import {formatTime} from '../js/formatTime'
	export default {
		name: 'home',

		created() {},
		data() {
			return {
				// activeIndex: '',
				sysUserName: '',
				sysUserAvatar: '',
				collapsed: false,
				preTime: '',
				groupName: '',
				roleName: '',
				netName: netName
			}
		},
		methods: {
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'info'
				}).then(() => {
					sessionStorage.removeItem('access-user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},

			single(key, keyPath) {
				this.$router.push(key)
				//            this.$router.go(0);
			}
		},

		mounted() {
			console.log(this.$route.path);
			var user = sessionStorage.getItem('access-user');
			if(user) {
				user = JSON.parse(user);
				this.sysUserName = user.adminName || '';
				this.groupName = user.groupName || '';
				this.roleName=user.roleName || '';
			}
			var _this = this;

			setInterval(function() {
//				var date = new Date();
//				var seperator1 = "-";
//				var seperator2 = ":";
//				var month = date.getMonth() + 1;
//				var strDate = date.getDate();
//				var sec = date.getSeconds();
//				var min = date.getMinutes();
//				var hou = date.getHours();
//				if(month >= 1 && month <= 9) {
//					month = "0" + month;
//				}
//				if(strDate >= 0 && strDate <= 9) {
//					strDate = "0" + strDate;
//				}
//				if(sec >= 0 && sec <= 9) {
//					sec = "0" + sec;
//				}
//				if(min >= 0 && min <= 9) {
//					min = "0" + min;
//				}
//				if(hou >= 0 && hou <= 9) {
//					hou = "0" + hou;
//				}
//				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hou + seperator2 + min + seperator2 + sec;
				_this.preTime = formatTime(new Date());
			}, 1000);
		},
		computed: {
			onRoutes() {
				//              return this.$route.path.replace('/login','');
			}
		},
		filters: {
			//		  //根据子路径找到父路径
			filterParentPath(childPath) {
				let parentPath = "/" + childPath.match(/\/(\S*)\//)[1];
				return parentPath;
				//		  	let _this=this;
				//			  let path = "/home";//default
				//			  for(let i=0; i < _this.$router.options.routes.length; i++) {
				//				  if(_this.$router.options.routes[i].menuShow && _this.$router.options.routes[i].children.length > 0) {
				//					for(let j=0; j< _this.$router.options.routes[i].children.length; j++) {
				//						if(childPath.indexOf(_this.$router.options.routes[i].children[j].path) != -1) {
				//							path = _this.$router.options.routes[i].children[j].path;
				//							break;
				//						}
				//					}
				//				  }
				//			  }
				//			  return path;
			},
		}

	}
</script>

<style>
	.el-row {
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.bg-dark-blue {
		background: #1D8CE0;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		min-height: 60px;
		padding: 0 20px;
		height: 100%;
		overflow: hidden;
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	
	.el-menu {
		border-radius: 0;
	}
	
	.net-title {
		font-size: large;
		font-weight: bolder;
		color: whitesmoke;
		line-height: 60px;
		float: left;
	}
	
	.login-info {
		float: right;
		height: 60px;
	}
	
	.login-info ul {
		list-style: none;
		float: right;
	}
	
	.exit {
		/*position:absolute;right:0;top:60px;z-index:1;*/
		height: 60px;
		line-height: 60px;
		font-size: 14px;
		margin-right: 10px;
		float: right;
	}
	
	.exit a {
		padding: 0 15px;
	}
	
	.exit-ico i {
		transform: rotate(90deg);
		margin-right: 5px;
	}
	
	aside {
		height: 100%;
		width: 160px;
		position: absolute;
		top: 0;
		background: #324057;
		padding-top: 120px;
		box-sizing: border-box;
	}
	
	aside .el-menu-item {
		background: #324057;
		color: #bfcbd9;
	}
	
	aside .el-menu-item:hover {
		background: #48576a;
	}
	
	.content-container {
		position: absolute;
		top: 0;
		padding-top: 120px;
		box-sizing: border-box;
		background-color: #f1f2f7;
		border-width: 2px;
		right: 0;
		left: 160px;
		height: 100%;
		overflow: hidden;
	}
	
	a:-webkit-any-link {
		color: inherit;
		cursor: auto;
		text-decoration: none;
	}
	
	.main {
		height: 100%;
	}
	
	.content-wrapper {
		overflow-y: scroll;
		height: 100%;
	}
	
	.el-table .cell {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.notice {
		height: 60px;
		float: right;
		width: 45px;
	}
	
	.el-dropdown {
		line-height: 60px;
	}
	
	.el-badge .el-badge__content {
		top: 10px;
	}
	
	.dropdownlist {
		/*left: 744px !important;
		top: 55px!important;*/
		border-radius: 5px;
	}
</style>
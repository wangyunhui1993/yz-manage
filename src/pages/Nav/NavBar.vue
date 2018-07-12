<template>
	<el-col :span="24" class="main">
		<!--左侧导航-->
		<aside :key="$route.path" style="z-index: 100;position: absolute;width: 100%;">
			<!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select='secPath'>
				<el-menu-item v-for="(item,index) in secnav" v-if='(item.menuShow==true)' :index="item.path" :key='index'>
					{{item.name}}
				</el-menu-item>
			</el-menu>-->
			<template v-for="(child, index) in $router.options.routes" v-if="child.menuShow">
				<el-menu :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor" :default-active="$route.path" unique-opened class="el-menu-vertical-demo" menu-trigger="hover" mode="horizontal"  @select='secPath' :collapse="isCollapse">
					<el-submenu v-for="children in child.children" v-if="children.menuShow && children.children.length>1 && systemShow" :index='children.path' :key='children.path'>
						<template slot="title">
							<i :class="children.iconCls" v-if="enableMenuIcon"></i>
							<span slot="title">{{children.name}}</span>
							<!--<iframe id='iframebar' src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;background:green;filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'"></iframe>-->
						</template>
						<iframe id='iframebar' src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;opacity:0;left:0px;height:100%;width:100%; z-index:-1;background:rgba(0,255,0,0);filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'"></iframe>
						<el-menu-item v-for="secNav in children.children" v-if="secNav.menuShow" :index='secNav.path' :key='secNav.path' style='padding-left:20px;'>{{secNav.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else-if='children.menuShow && children.children.length==1' :index='children.children[0].path' :key='children.children[0].path'>
						<i :class="children.iconCls" v-if="enableMenuIcon"></i>
						<span slot="title">{{children.name}}</span>
						<!--<iframe id='iframebar' src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:200px;width:100px;z-index:-1;background:green;filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'"></iframe>-->
					</el-menu-item>
					
				</el-menu>
			</template>
			
			
			
			
			
			
		</aside>

		<!--右侧内容区-->
		<section class="content-container" style="height: 100%;padding-top: 121px;box-sizing: border-box;position: absolute;top: 0;left: 0;width: 100%;">
			<div class="grid-content bg-purple-light" style="height: 100%;width: 100%;">
				<el-col :span="24" class="content-wrapper" style="overflow: inherit;">
					<!--<el-breadcrumb separator="/" style='font-weight: 700; font-size:14px;'>
						<el-breadcrumb-item :to="{ path: bNav.path }">{{bNav.name}}</el-breadcrumb-item>
						<el-breadcrumb-item v-for='item in bNav.children' v-if='item.path==$route.path' :key='item.path'>{{item.name}}</el-breadcrumb-item>
					</el-breadcrumb>-->
					<transition name="fade" mode="out-in">

						<section class="rightcontent">
							<router-view></router-view>
						</section>
					</transition>
				</el-col>
			</div>
		</section>
	</el-col>
</template>

<script>
	export default {
		data() {
			return {
				systemShow:true,
				secnav: [],
				bNav: '',
				isCollapse: false,
				enableMenuIcon: false,
//				backgroundColor:"#fff",
//				textColor:"#333333",
//				activeTextColor:"#0f67cc",
				
				
				backgroundColor:"#1D8CE0",
				textColor:"#fff",
				activeTextColor:"#ccc",
			};
		},

		beforeRouteEnter(to, from, next) {

			next(vm => {
				var vmRouter = vm.$router.options.routes;
				for(var i = 0; i < vmRouter.length; i++) {
					if(vmRouter[i].menuShow == true) {
						for(var j = 0; j < vmRouter[i].children.length; j++) {
							//							console.log(vmRouter[i].children[j])
							var firPath = vmRouter[i].children[j];
							if(to.path.indexOf(firPath.path) == 0) {
								vm.secnav = vmRouter[i].children[j].children;
								vm.bNav = firPath;
								break;
							}

						}

						break;
					}
				}
			})

		},
		mounted() {
			console.log("111111",this.$store.state.adminUserInfo.roleId);
			if(this.$store.state.adminUserInfo.roleId!=='7'){
				this.systemShow=false;
			}
			//			console.log('当前路径', this.$router.path);
		},
		methods: {
			secPath: function(key, keyPath) {
				this.$router.push(key)

			}
		}
	}
</script>
<style>
	.el-breadcrumb {
		line-height: 50px;
		padding-left: 15px;
	}
	
	.rightcontent {
		width: 100%;
		height: 100%;
		background: #fff;
		margin: 0;
		box-sizing: border-box;
	}
	
	.rightcontent:after {
		content: '.';
		height: 0;
		width: 0;
		clear: both;
		visibility: hidden;
	}
	
	.rightcontent {
		zoom: 1
	}
	
	.grid-content {
		padding-left: 0;
	}
	.main {
		height: 100%;
		padding-top: 60px;
		box-sizing: border-box;
		position: absolute;top: 0;;left: 0;
	}
</style>
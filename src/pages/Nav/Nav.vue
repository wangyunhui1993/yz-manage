<template>
	<el-col :span="24" class="main">
		<!--左侧导航-->
		<aside :key="$route.path">
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select='secPath'>
				<el-menu-item v-for="(item,index) in secnav" v-if='(item.menuShow==true)' :index="item.path" :key='index'>
					{{item.name}}
				</el-menu-item>
			</el-menu>
		</aside>

		<!--右侧内容区-->
		<section class="content-container">
			<div class="grid-content bg-purple-light">
				<el-col :span="24" class="content-wrapper">
					<el-breadcrumb separator="/" style='font-weight: 700; font-size:14px;'>
						<el-breadcrumb-item :to="{ path: bNav.path }">{{bNav.name}}</el-breadcrumb-item>
						<el-breadcrumb-item v-for='item in bNav.children' v-if='item.path==$route.path' :key='item.path'>{{item.name}}</el-breadcrumb-item>
					</el-breadcrumb>
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
				secnav: [],
				bNav: ''
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
		background: #fff;
		margin: 0;
		padding: 10px;
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
</style>
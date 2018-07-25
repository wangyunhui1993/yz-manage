	import Vue from 'vue'
	import Router from 'vue-router'
	import store from './../store'
	
	Vue.use(Router)
	// 懒加载方式，当路由被访问的时候才加载对应组件
	const Home = resolve => require(['@/pages/Home1'], resolve)
	const Nav = resolve => require(['@/pages/Nav/Nav'], resolve)
	const Login = resolve => require(['@/pages/Login'], resolve)
	
	
	
	
	const MapShow = resolve => require(['@/pages/map/mapShow'], resolve)
	const EquipmentList = resolve => require(['@/pages/equipmentList'], resolve)
	const QueryStats = resolve => require(['@/pages/queryStats'], resolve)
//	const BigScreen = resolve => require(['@/pages/bigScreen'], resolve)
	import BigScreen from '@/pages/bigScreen';
	const UserManage = resolve => require(['@/pages/system/userManage'], resolve)
	const EquipmentManage = resolve => require(['@/pages/system/equipmentManage'], resolve)
	const Authority = resolve => require(['@/pages/system/authority'], resolve)
	const Log = resolve => require(['@/pages/system/log'], resolve)
	const LineManagement = resolve => require(['@/pages/system/lineManagement'], resolve)
	
	const NotFind = resolve => require(['@/pages/notFind'], resolve)




	import { SStorage } from "../js/LStorage"
	import {opCookie} from './../js/cookie'
	// 定义并实例化路由
	let router = new Router({
		/*mode: 'history',*/
		base: __dirname,
//		base: '/vuethink/',
		routes: [
		{
				path: '/',
				menuShow: false,
				redirect:"/map/mapShow",
		},
		{
				path: '/login',
				name: '登录',
				menuShow: false,
				component: Login
		},
		
//		{
//				path: '/bigScreen',
//				name: '大屏',
//				menuShow: false,
//				component: BigScreen
//		},
		
		
			{
				path: '/',
				component: Home,
				menuShow: true,
				children: [
					{
						path: '/map',
						name: 'Gis信息展示',
						component: Nav,
						menuShow: true,
						iconCls:"el-icon-location",
						children: [
							{ path: '/map/mapShow', component: MapShow, name: 'Gis信息 展示', menuShow: true },
						]
					},
//					{
//						path: '/equipmentList',
//						name: '设备列表',
//						component: Nav,
//						menuShow: true,
//						iconCls:"el-icon-tickets",
//						children: [
//							{ path: '/equipmentList', component: EquipmentList, menuShow: true },
//						]
//					},
					
					{
						path: '/big',
						name: '大屏展示',
						component: Nav,
						menuShow: true,
						iconCls:"el-icon-menu",
						children: [
							{ path: '/big',  component: BigScreen, menuShow: true },
						]
					},
					{
						path: '/queryStats',
						name: '查询统计',
						component: Nav,
						menuShow: true,
						iconCls:"el-icon-setting",
						children: [
							{ path: '/queryStats', component: QueryStats, menuShow: true },
						]
					},
					{
						path: '/system',
						name: '系统管理',
						component: Nav,
						menuShow: true,
						iconCls:"el-icon-setting",
						children: [
							{ path: '/system/userManage', component: UserManage,  name: '用户管理', menuShow: true },
//							{ path: '/system/authority', component: Authority,  name: '角色权限管理', menuShow: true },
							{ path: '/system/equipmentManage', component: EquipmentManage,  name: '设备管理', menuShow: true },
							{ path: '/system/lineManagement', component: LineManagement,  name: '线路管理', menuShow: true },
							{ path: '/system/log', component: Log,  name: '系统日志', menuShow: true },
						]
					},
					
				]
			},
			
			
			
			
			{ path: '*', menuShow: false, component: NotFind }
		]
	});
	
	router.beforeEach((to, from, next) => {
		console.log(to);
		console.log(from);
		if(to.path == '/login') {
			
			next();
		} else {
			/*if(router.app.$store.state.adminUserInfo.userName){  //判断$store是否有登录信息
					next();
			}else{
				if(opCookie.getCookie('id') && opCookie.getCookie('roleId')!==undefined && opCookie.getCookie('userName')!==undefined){ //判断本地是否有登录信息
					router.app.$store.commit('keepAdminUserInfo',{
						id:opCookie.getCookie('id'),
						roleId:opCookie.getCookie('roleId'),
						userName:opCookie.getCookie('userName')
					});
					next();
				}else{
					next("/login");
				}
				
			}*/
			
			if(opCookie.getCookie('id') && opCookie.getCookie('userName')!=undefined  && opCookie.getCookie('roleId')!=undefined){ //判断cookie是否有登录信息
					router.app.$store.commit('keepAdminUserInfo',{
					id:opCookie.getCookie('id'),
					roleId:opCookie.getCookie('roleId'),
					userName:opCookie.getCookie('userName')
					});
					next();
				}else{
					next("/login");
				}

			
			
			
			
			
			
		}
	});
	export default router
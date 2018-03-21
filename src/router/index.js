	import Vue from 'vue'
	import Router from 'vue-router'
	Vue.use(Router)
	// 懒加载方式，当路由被访问的时候才加载对应组件
	const Home = resolve => require(['@/pages/Home1'], resolve)
	const Nav = resolve => require(['@/pages/Nav/Nav1'], resolve)
	const Login = resolve => require(['@/pages/Login'], resolve)
	
	
	
	
	const MapShow = resolve => require(['@/pages/map/mapShow'], resolve)
	const EquipmentList = resolve => require(['@/pages/equipmentList'], resolve)
	const QueryStats = resolve => require(['@/pages/queryStats'], resolve)
	const BigScreen = resolve => require(['@/pages/bigScreen'], resolve)
	
	const UserManage = resolve => require(['@/pages/system/userManage'], resolve)
	const EquipmentManage = resolve => require(['@/pages/system/equipmentManage'], resolve)
	const Authority = resolve => require(['@/pages/system/authority'], resolve)
	const Log = resolve => require(['@/pages/system/log'], resolve)
	
	
	
	const NotFind = resolve => require(['@/pages/notFind'], resolve)

	import { SStorage } from "../js/LStorage"
	// 定义并实例化路由
	let router = new Router({
		/*mode: 'history',*/
		base: __dirname,
//		base: '/vuethink/',
		routes: [
		{
				path: '/',
				menuShow: false,
				component: Login
		},
		{
				path: '/login',
				name: '登录',
				menuShow: false,
				component: Login
		},
		
		{
				path: '/bigScreen',
				name: '大屏',
				menuShow: false,
				component: BigScreen
		},
		
		
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
						children: [
							{ path: '/map/mapShow', component: MapShow, menuShow: true },
						]
					},
					{
						path: '/equipmentList',
						name: '设备列表',
						component: Nav,
						menuShow: true,
						children: [
							{ path: '/equipmentList', component: EquipmentList, menuShow: true },
						]
					},
					{
						path: '/queryStats',
						name: '查询统计',
						component: Nav,
						menuShow: true,
						children: [
							{ path: '/queryStats', component: QueryStats, menuShow: true },
						]
					},
					{
						path: '/big',
						name: '大屏展示',
						component: Nav,
						menuShow: true,
						children: [
							{ path: '/big', redirect:'/bigScreen', menuShow: true },
						]
					},
					{
						path: '/system',
						name: '系统管理',
						component: Nav,
						menuShow: true,
						children: [
							{ path: '/system/userManage', component: UserManage,  name: '用户管理', menuShow: true },
//							{ path: '/system/authority', component: Authority,  name: '角色权限管理', menuShow: true },
							{ path: '/system/equipmentManage', component: EquipmentManage,  name: '设备管理', menuShow: true },
							{ path: '/system/log', component: Log,  name: '系统日志', menuShow: true },
						]
					},
					
				]
			},
			
			
			
			
			{ path: '*', menuShow: false, component: NotFind }
		]
	});
	router.beforeEach((to, from, next) => {
//		if(to.path == '/login') {
//			window.sessionStorage.removeItem('access-user');
//			router.app.$store.commit('keepAdminUserInfo',{});
//			router.app.$store.commit('setGeneralInfo',{});
//			next();
//		} else {
//			if(router.app.$store.state.adminUserInfo.adminId){
//				next();
//			}else{
//				if(!SStorage.getItem('access-user')){
//					next({path: '/login'});
//				}else{
//					router.app.$store.commit('keepAdminUserInfo',SStorage.getItem('access-user'));
//					router.app.$store.commit('setGeneralInfo',{adminId:SStorage.getItem('access-user').adminId});
//					next();
//				}
//			}
			
			
			
//			let user = SStorage.getItem('access-user');
////			let user = JSON.parse(window.sessionStorage.getItem('access-user'));
//			if(!user) {
//				next({
//					path: '/login'
//				});
//			} else {
////				router.app.$store.commit('keepAdminUserInfo',SStorage.getItem('access-user'));
//				next();
//			}
			next();
			
			
			
			
			
			
//		}
	});
	export default router
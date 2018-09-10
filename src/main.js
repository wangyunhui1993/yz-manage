// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
//引入富文本编辑
//import '../static/UE/ueditor.config.js'
//import '../static/UE/ueditor.all.min.js'
//import '../static/UE/lang/zh-cn/zh-cn.js'
//import '../static/UE/ueditor.parse.min.js'


import store from './store'
 
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
 
/* Register component with one of 2 methods */
 
 //引入百度地图插件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'MEBiZk1g1whGxGor9XZdUnyb4L2ZD9Hh'
})
console.log(BaiduMap.init);
 //引入视屏播放插件
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
//import 'videojs-contrib-hls/dist/videojs-contrib-hls'
Vue.use(VueVideoPlayer)



 
import Icon from 'vue-awesome/components/Icon'
 import $ from 'jquery'
// globally (in your main .js file)
   Vue.component('icon', Icon)

import '@/assets/iconfont/iconfont.css'
import router from './router'
import Validator from 'vue-validator'
Vue.use(Validator)
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Fontawesome)
/* eslint-disable no-new */
// 创建和挂载根实例




new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

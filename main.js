import App from './App'
// import store from './store'
import store from '@/store/store.js'

//导入网络请求的包
import {$http} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'

//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '正在加载中...'
	})
	
	//判断当前请求url是否为有权限的接口
	if(options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}

//响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}


//封装弹框的方法
uni.$showMsg = function(title = '数据请求失败',duration=1500) {
	uni.showToast({
		title: title,
		duration: duration,
		icon: 'none'
	})
}


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}
// #endif

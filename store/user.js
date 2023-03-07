export default {
	namespaced: true,
	
	state: ()=> ({
		address: JSON.parse(uni.getStorageSync('address')|| '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		//重定向object对象 {openType,from}
		redirectInfo: null
	}),
	
	mutations: {
		
		//更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddress')
		},
		
		saveAddress(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		//更新用户基本信息
		updateUserInfo(state,userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfo')
		},
		//保存用户基本信息
		saveUserInfo(state) {
			uni.setStorageSync('userInfo',JSON.stringify(state.userinfo))
		},
		
		updateToken(state,token) {
			state.token = token
			this.commit('m_user/saveToken')
		},
		saveToken(state) {
			uni.setStorageSync('token',state.token)
		},
		
		//更新重定向对象
		updateRedirectInfo(state,info) {
			state.redirectInfo = info
			//console.log(state.redirectInfo)
		}
	},
	
	getters: {
		addstr(state) {
			if(!state.address.provinceName) return ''
			return state.address.provinceName + 
					state.address.cityName +
					state.address.countyName +
					state.address.detailInfo + ''
		}
	}
}
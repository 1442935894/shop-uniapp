export default {
	namespaced: true,
	
	state: ()=> ({
		//存放商品信息对象
		//{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		addCart(state, goods) {
			//console.log(goods)
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			//console.log(findResult)
			if(!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveCart')
		},
		
		saveCart(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveCart')
			}
		},
		
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveCart')
		},
		
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveCart')
			}
		},
		
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			console.log(state.cart)
			this.commit('m_cart/saveCart')
		},
		
		
	},
	
	getters: {
		//统计购物车中商品的总数量
		total(state) {
			// let c = 0;
			// state.cart.forEach(x => c += x.goods_count);
			// return c;
			return state.cart.reduce((total, item)=> total += item.goods_count,0)
		},
		checkCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item)=> total += item.goods_count,0)
		},
		
		checkGoodsAmount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
			// reduce() 的返回值就是已勾选的商品的总价
			// 最后调用 toFixed(2) 方法，保留两位小款
			return state.cart.filter(x => x.goods_state)
			.reduce((total,item)=> total += item.goods_count * item.goods_price,0)
			.toFixed(2)
		}
	}
}
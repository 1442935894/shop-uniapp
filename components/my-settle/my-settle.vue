<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="ischeckAll" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计:<text>￥{{checkGoodsAmount}}</text>
		</view>
		<view class="btn-settle" @click="settlement">结算:({{checkCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				//倒计时秒表
				second: 3,
				//定时器
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkCount', 'total', 'checkGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart',['cart']),
			
			ischeckAll() {
				return this.total === this.checkCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			
			changeAllState() {
				this.updateAllGoodsState(!this.ischeckAll)
			},

			//用户点击结算按钮
			settlement() {
				//1.判断是否勾选商品
				if (!this.checkCount) return uni.$showMsg('请选择要结算的商品!')
				//2.判断是否选择地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址!')
				//3.判断是否登录
				// if(!this.token) return uni.$showMsg('请登录!')
				if (!this.token) return this.delayNavigate()
				
				
				this.payOrder()
			},
			
			//微信支付
			async payOrder() {
				//1.创建订单
				const orderInfo = {
					//order_price: this.checkGoodsAmount
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state)
					.map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				
				const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败')
				const orderNumber = res.message.order_number
				console.log(res)
				
				
				//2.订单预支付
				const {data: res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number: orderNumber})
				if(res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败')
				const payInfo = res2.message.pay
				
				
				
				//3.发起微信支付
				const [err,succ] = await uni.requestPayment(payInfo)
				if(err) return uni.$showMsg('订单未完成支付')
				const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number: orderNumber})
				if(res3.meta.status !== 200) return uni.$showMsg('订单未支付')
				uni.showToast({
					title:'支付完成！',
					icon:'success'
				})
			},

			//倒计时跳转登录页
			delayNavigate() {
				this.second = 3
				this.showTips(this.second)

				this.timer = setInterval(() => {
					this.second--
					if (this.second <= 0) {
						clearInterval(this.timer)

						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.second)

				}, 1000)
			},

			//倒计时提示
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后自动跳转登录页',
					mask: true, //遮罩层
					duration: 1500 //1.5秒后消失

				})
			}

		}
	}
</script>

<style lang="scss">
	.settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			text {
				color: #c00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;

		}
	}
</style>

<template>
	<view class="cart-container" v-if="cart.length!==0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" :size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="goodsItemHandleDel(goods)">
					<my-goods :goods="goods" :showNumBox="true" :showRadio="true" @radio-change="radioChange"
						@num-change="NumChange"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<!-- <view class="cart-item" v-for="(item, index) in cart" :key="index">
				<view class="select"></view>
				<view class="cart-item-img">
					<image :src="item.goods_small_logo"></image>
				</view>
				<view class="cart-item-body">
					<text class="cart-item-name">{{item.goods_name}}</text>
					<view class="cart-item-bottom">
						<text class="cart-item-price">￥{{item.goods_price}}</text>
						<input :value="item.goods_count" type="number"/>
					</view>
				</view>
			</view> -->

		<view class="cart-pay">
			<my-settle></my-settle>
		</view>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png"></image>
		<text>空空如也~</text>
	</view>


</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				//cartList:[]
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		computed: {
			...mapState('m_cart', ['cart']),

		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChange(e) {
				//console.log(e)
				this.updateGoodsState(e)
			},

			NumChange(e) {
				//console.log(e)
				this.updateGoodsCount(e)
			},

			goodsItemHandleDel(e) {
				//console.log(e)
				this.removeGoodsById(e.goods_id)
			}
		}


	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
		margin-left: 5px;
		border-bottom: 1px solid #e3e3e3;

		.cart-title-text {
			margin-left: 5px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		image{
			height: 90px;
			width: 90px;
		}
		text {
			font-size: 12px;
			color: grey;
			margin-top: 15px;
		}
	}

	// .cart-item {
	// 	display: flex;
	// 	padding: 10px 0;
	// 	border-bottom: 1px solid #e3e3e3;

	// 	.cart-item-img {
	// 		margin: 0 5px;
	// 		image {
	// 			width: 100px;
	// 			height: 100px;
	// 		}
	// 	}

	// 	.cart-item-body {
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: space-between;

	// 		.cart-item-name {
	// 			font-size: 13px;
	// 		}

	// 		.cart-item-bottom {
	// 			display: flex;
	// 			flex-direction: row;
	// 			justify-content: space-between;

	// 			.cart-item-price {
	// 				font-size: 16px;
	// 				color: #c00000;
	// 			}
	// 		}
	// 	}
	// }
</style>

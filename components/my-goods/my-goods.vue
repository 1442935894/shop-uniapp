<template>
	<view class="goods-item">
		<view class="goods-left">
			<image :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				defaultPic: ''
			};
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #e6e6e6;
	
	.goods-left {
		margin-right: 5px;
		
		image {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.goods-name {
			font-size: 12px;
		}
		
		.goods-info-box {
			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
		
	}
}
</style>
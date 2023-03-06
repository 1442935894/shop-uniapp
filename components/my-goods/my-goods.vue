<template>
	<view class="goods-item">
		<view class="goods-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioChange"></radio>
			<image :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNumBox" @change="NumChange"></uni-number-box>
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
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumBox: {
				type: Boolean,
				default: false
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
		},
		
		methods: {
			radioChange() {
				this.$emit('radio-change',{
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			NumChange(value) {
				//console.log(typeof(value))
				this.$emit('num-change', {
					goods_count: +value,
					goods_id: this.goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #e6e6e6;
	width: 750rpx;
	box-sizing: border-box;
	
	.goods-left {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			display: flex;
			//flex: 1;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px;
			
			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
		
	}
}
</style>
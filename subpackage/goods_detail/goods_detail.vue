<template>
	<view v-if="goods_info.goods_name" class="goods-container">
		<swiper :autoplay="true" :indicator-dots="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" mode="widthFix" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<view class="goods-info-box">
			<view class="price">￥{{goods_info.goods_price}}</view>
			<view class="center">
				<view class="title">{{goods_info.goods_name}}</view>
				<view class="favorive">
					<uni-icons type="star" size="18" color="grey"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">快递：免运费</view>
		</view>

		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: [],
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			};
		},
		onLoad(option) {
			const goods_id = option.goods_id;
			this.getGoodsInfo(goods_id)
		},
		methods: {
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goods_info = res.message;
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg');

			},

			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},

			onClick(e) {
				console.log(e)
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				console.log(e)

			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;

		.price {
			font-size: 18px;
			margin: 10px 0;
			color: #c00000
		}

		.center {
			display: flex;
			justify-content: space-between;

			.title {
				font-size: 12px;
				border-right: 1px solid #e8e8e8;
			}

			.favorive {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 80rpx;
				padding: 0 10px;

				text {
					font-size: 12px;
					color: grey;
				}
			}
		}

		.express {
			font-size: 12px;
			color: grey;
			margin: 10px 0;
		}
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	.goods-container {
		padding-bottom: 50px;
	}
</style>

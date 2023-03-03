<template>
	<view>
		<swiper :indicator-dots="true" autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpackage/goods_detail/goods_detail?goods_id=` + item.goods_id"><image :src="item.image_src"></image></navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				
				<view class="floor-img-box">
					<navigator class="img-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="img-right">
						<navigator v-for="(item2, index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src" v-if="index2 !== 0" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数组列表
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList(),
			this.getNavList(),
			this.getFloorList()
		},
		methods: {
			//获取数组轮播图的方法
			async getSwiperList() {
				console.log("11111")
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message;
				
			},
			
			//获取导航栏数据
			async getNavList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message;
			},
			
			navClickHandler(item) {
				console.log(item);
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			
			//获取楼层数据
			async getFloorList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				
				//对数据进行处理
				res.message.forEach((item) => {
					item.product_list.forEach((prod) => {
						prod.url = '/subpackage/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
			
			
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
		.swiper-item, image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 15px 0;
		 image {
		 	width: 128rpx;
			height: 140rpx;
		 }
	 }
	 
	 .floor-list {
		 .floor-item {
			 .floor-title {
			 			 height: 60rpx;
			 			 width: 100%;
			 }
			 .floor-img-box {
				 display: flex;
				 padding-left: 10rpx;
				 .img-right {
					 display: flex;
					 flex-wrap: wrap;
					 justify-content: space-around;
				 }
			 }
		 }
		 
	 }
</style>

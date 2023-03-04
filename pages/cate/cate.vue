<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<!-- <my-search :bgcolor="'#000000'"></my-search> -->
		<my-search @click="goToSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="scroll-left" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['scroll-left-item', index===active ? 'active' : '']" @click="activeChange(index)">{{item.cat_name}}</view>
				</block>
				
				
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view class="scroll-right" scroll-y="true" :scroll-top="scrollTop" :style="{height: wh + 'px'}">
				<view class="cateLv2" v-for="(child, ind) in cateLevel2" :key="ind">
					<view class="cateLv2-title">/{{child.cat_name}}/</view>
					<view class="cateLv2-child">
						<view class="cateLv2-child-item" v-for="(child2, ind2) in child.children" :key="ind2" @click="goToGoodsList(child2)">
							<image :src="child2.cat_icon.replace('dev','web')"></image>
							<text>{{child2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前设备可用高度
				wh: 0,
				//分类数据列表
				cateList: [],
				//二级分类列表
				cateLevel2: [],
				//选中
				active: 0,
				
				//滚动条距离滚动的距离
				scrollTop: 0
			};
		},
		
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo)
			this.wh = sysInfo.windowHeight - 50;
			
			//获取分类列表数据
			this.getCateList()
		},
		
		methods: {
			//获取分类列表数据
			async getCateList() {
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message;
				//二级分类赋值
				this.cateLevel2 = res.message[0].children;
			},
			
			//active
			activeChange(index) {
				console.log(index)
				this.active = index;
				
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children;
				
				this.scrollTop = this.scrollTop===0 ? 0.1 : 0;
			},
			
			
			//跳转商品列表
			goToGoodsList(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpackage/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			
			
			//跳转搜索页面
			goToSearch() {
				uni.navigateTo({
					url: '/subpackage/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		
		.scroll-left {
			width: 120px;
			
			
			.scroll-left-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				
				&.active {
				background-color: #ffffff;
				position: relative;
				
					&::before {
						content: "";
						display: block;
						height: 30px;
						width: 3px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
		
		.scroll-right {
			
			.cateLv2 {
				
				.cateLv2-title {
					font-size: 12px;
					font-weight: bold;
					text-align: center;
					padding: 15px 0;
				}
				.cateLv2-child {
					display: flex;
					flex-wrap: wrap;
					
					
					
					.cateLv2-child-item {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-bottom: 10px;
						
						
						 image{
							height: 60px;
							width: 60px;
						}
						text {
							font-size: 12px;
							
						}
					}
					
				}
			}
		}
	}
</style>

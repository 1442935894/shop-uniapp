<template>
	<view @click="searchHandler" class="search-container" :style="{'background-color' : bgcolor}">
		<view class="search-box" :style="{'border-radius' : radius + 'px'}">
			<uni-icons class="search-icon" type="search" size="17"></uni-icons>
			<text class="search-text">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			//背景颜色
			bgcolor: {
				type: String,
				default: '#c00000' 
			},
			//圆角尺寸
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			searchHandler() {
				console.log('111')
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-container{
	// background-color: #c00000;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.search-box {
		background-color: white;
		width: 100%;
		height: 36px;
		// border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		
		// .search-icon {
		// 	height: 1em;
		// 	vertical-align: -0.15em;
		// }
		
		.search-text {
			margin-left: 5px;
			line-height: 15px;
		}
	}
}
</style>
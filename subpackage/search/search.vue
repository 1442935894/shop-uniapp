<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" :cancelButton="none"></uni-search-bar>
		</view>
		
		<view class="sugg-list"  v-if="searchList.length !== 0">
			<view class="sugg-item" v-for="(item, index) in searchList" :key="index" @click="goToDetail(item)">
				<view class="goods_name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" :size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="histoty-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" :size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item"  v-for="(item, index) in histories" :key="index" @click="goToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				//搜索建议列表
				searchList: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('keyword') || '[]') 
		},
		computed:{
			histories() {
				return [...this.historyList].reverse()
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					console.log(e);
					this.keyword = e;
					this.getSearchList()
				},500)
			},
			
			
			//获取搜索列表
			async getSearchList() {
				//判断搜索建议词是否为空
				if(this.keyword.length === 0) {
					this.searchList = [];
					return
				}
				
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', {query: this.keyword})
				if(res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				this.searchList = res.message.goods;
				
				this.SaveHistory()
			},
			
			//
			SaveHistory(){
				// this.historyList.push(this.keyword);
				const set = new Set(this.historyList);
				set.delete(this.keyword);
				set.add(this.keyword);
				// console.log(set)
				this.historyList = Array.from(set);
				uni.setStorageSync('keyword', JSON.stringify(this.historyList));
			},
			
			clearHistory() {
				this.historyList = [];
				uni.removeStorageSync('keyword')
			},
			
			//点击搜索历史跳转商品页面
			goToGoodsList(item) {
				uni.navigateTo({
					url: '/subpackage/goods_list/goods_list?query=' + item
				})
			},
			
			//跳转商品详情页
			goToDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list {
	padding: 0 5px;
	
	.sugg-item {
		font-size: 12px;
		padding: 13px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		
		.goods_name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

.histoty-box {
	padding: 0 5px;
	
	.history-title {
		display: flex;
		justify-content: space-between;
		height: 40px;
		font-size: 13px;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	
	.history-list {
		uni-tag{
			padding: 0 5px;
		}
	}
}
</style>

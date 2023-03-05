<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" @click="goToDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryobj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10,
				},
				goodsList: [],
				total: 0,
				isLoading: false
				
			};
		},
		
		onLoad(option) {
			this.queryobj.query = option.query || '';
			this.queryobj.cid = option.cid || '';
			console.log(this.queryobj);
			
			this.getGoodsList()
		},
		
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true;
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search',this.queryobj)
				this.isLoading = false;
				console.log(cb)
				cb && cb()
				
				if(res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods];
				this.total = res.message.total;
				
			},
			
			
			//跳转商品详情页面
			goToDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		
		onReachBottom() {
			if(this.queryobj.pagenum * this.queryobj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			if(this.isLoading) return
			this.queryobj.pagenum++;
			this.getGoodsList()
		},
		
		onPullDownRefresh() {
			this.queryobj.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>

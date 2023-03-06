<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="ischeckAll" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计:<text>￥{{checkGoodsAmount}}</text>
		</view>
		<view class="btn-settle">结算:({{checkCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart',['checkCount','total','checkGoodsAmount']),
			ischeckAll() {
				return this.total === this.checkCount
			}
		},
		methods: {
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.ischeckAll)
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
	
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		text {
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
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
<template>
	<view class="userinfo-container">
		<view class="avator-box">
			<image :src="userinfo.avatarUrl"></image>
			<text>{{userinfo.nickName}}</text>
		</view>
		
		<view class="panel-list">
			<view class="favorive">
				<view class="favorive-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="favorive-item">
					<text>5</text>
					<text>收藏的商品</text>
				</view>
				<view class="favorive-item">
					<text>6</text>
					<text>关注的商品</text>
				</view>
				<view class="favorive-item">
					<text>8</text>
					<text>足迹</text>
				</view>
			</view>
			
			<view class="order">
				<view class="order-title">
					<text>我的订单</text>
				</view>
				<view class="order-list">
					<view class="order-list-item">
						<image src="/static/my-icons/icon4.png"></image>
						<text>待付款</text>
					</view>
					<view class="order-list-item">
						<image src="/static/my-icons/icon2.png"></image>
						<text>待收货</text>
					</view>
					<view class="order-list-item">
						<image src="/static/my-icons/icon3.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="order-list-item">
						<image  src="/static/my-icons/icon1.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="setting-list">
				<view class="setting-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="setting-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="setting-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-info",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user',['userinfo'])
		},
		
		methods: {
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				if(succ && succ.confirm) {
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
					
				}
			}
		}
	}
</script>

<style lang="scss">
.userinfo-container {
	height: 100%;
	background-color: #f4f4f4;
	
	.avator-box {
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		image {
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		text {
			color: white;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	
	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;
		
		.favorive {
			display: flex;
			justify-content: space-around;
			background-color: #ffffff;
			border-radius: 5px;
			
			.favorive-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 10px 0;
				font-size: 13px;
			}
		}
		
		.order {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			padding: 5px 5px;
			background-color: #ffffff;
			
			.order-title{
				margin-left: 5px;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #efefef;
			}
			.order-list {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;
				
				.order-list-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 20%;
					
					image {
						width: 30px;
						height: 30px;
					}
				}
			}
		}
		
		.setting-list {
			width: 100%;
			margin-top: 10px;
			background-color: #ffffff;
			
			.setting-list-item {
				display: flex;
				justify-content: space-between;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #efefef;
				
				
				text {
					padding-left: 10px;
				}
			}
		}
	}
}
</style>
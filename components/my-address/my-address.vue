<template>
	<view>
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="addressBtn" @click="chooseAddressBtn">请选择收货地址+</button>
		</view>

		<view class="address-info-box" @click="chooseAddressBtn()" v-else>
			<view class="row1">
				<view class="row1-left">
					<text class="username">收货人：{{address.userName}}</text>
				</view>
				<view class="row1-right">
					<text class="phone">电话：{{address.telNumber}}</text>
					<uni-icons type="arrowright" :size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>

		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				//address: {}
			};
		},
		computed: {
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			
			async chooseAddressBtn() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if(err === null && succ.errMsg === 'chooseAddress:ok') {
					console.log(succ)
					// this.address = succ
					this.updateAddress(succ)
				}
				
				// if(err & err.errMsg === 'chooseAddress: fail auth deny' || err.errMsg === 'chooseAddress: fail authorize no response') {
				// 	//重新授权
				// 	this.reAuth()
				// }
			},
			
			// async reAuth(){
			// 	const [err2,confirm] = await uni.showModal({
			// 		content: '检测到您没有打开地址，是否去设置打开？',
			// 		confirmText: '确认',
			// 		cancelText: '取消'
			// 	})
				
			// 	if(err2) return
			// 	if(confirm.cancel) return uni.$showMsg('您取消了地址授权！')
			// 	if(confirm.confirm) return uni.openSetting({
			// 		success:(settingResult) => {
			// 			console.log(settingResult)
			// 			if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
			// 			if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权')
			// 		}
			// 	})
			// 	console.log(confirm)
			// }
		}
	}
</script>

<style lang="scss">
	.address-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90px;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;
			
			.row1-right {
				display: flex;
				justify-content: center;
			}
		}

		.row2 {
			display: flex;
			//justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}

	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}
</style>

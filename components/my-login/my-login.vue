<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" :size="100" color="#afafaf"></uni-icons>
			<!-- <button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
			<button class="login-btn" @click="getUserInfo">一键登录</button>
			<text>登录后享受更多权益</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user',['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo() {
				uni.getUserProfile({
					desc: '您的授权信息',
					success:(res) => {
						console.log(res)
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					},
					fail: (err) => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
			
			async getToken(item) {
				const [err,res] =  await uni.login().catch(err => err)
				//console.log(res)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				let params = {
					code: res.code,
					encryptedData: item.encryptedData,
					iv: item.iv,
					rawData: JSON.stringify(item.rawData),
					signature: item.signature
				}
				//<<<-------------------------------
				// const {data: response} = await uni.$http.post('/api/public/v1/users/wxlogin',params)
				// console.log(response)
				// if(response.meta.status !== 200) return uni.$showMsg('登录失败')
				// uni.$showMsg('登录成功')
				// this.updateToken(response.message.token)
				//------------------------------->>>>
				//测试用token
				let token = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
				this.updateToken(token)
				
				//登陆成功后返回之前页面
				this.navigateBack()
			},
			
			navigateBack() {
				//console.log('nav',this.redirectInfo.from)
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	
	&::after {
		content: "";
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
		
	}
	
	.login-btn {
		background-color: #c00000;
		border-radius: 100px;
		width: 300px;
		height: 40px;
		line-height: 40px;
		margin: 10px 0;
		color: white;
	}
	
	text {
		font-size: 12px;
		color: grey;
	}
}
</style>
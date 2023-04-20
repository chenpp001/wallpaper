<template>
	<view class="login-modal">
		<view  class="modal-bg" :style="{zIndex:zindex}"></view>
		<view class="modal-box animated fast" :style="{zIndex:zindex+1,background:bg}" :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">{{step == 0 ? '授权登录请求' : '授权手机号码'}}</view>
				<view v-if="step == 0" class="mt60">
						<view class="text-center ft14 cl-main">
							点击登录 享受更多会员特惠？
						</view>
						<view class="mt40 flex alcenter center">
							<button class="btn-mid" @click="closed()" :style="{color:tempColor,background:'#F5F6FA'}" style="width: 300rpx;">拒绝</button>
							<button class="btn-mid" @click="getUserInfo" :style="{background:tempColor}" style="margin-left: 30rpx;width: 300rpx; color: #FFFFFF;">登录</button>
						</view>
				</view>
				<view v-if="step == 1" class="mt60">
						<view class="text-center ft14 cl-main">
							点击登录 享受更多会员特惠
						</view>
						
						<view class="plr30 mt40">
							<button class="btn-big" :style="getBtnStyle">
								<text class="iconfont iconicon_weixin mr10 ft20"></text>订阅消息
							</button>
						</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export  default{
		props:{
			zindex:{
				type:Number,
				default:402,
			},
			bg:{
				type:String,
				default:'#ffffff',
			},
			
		},
		data(){
			return {
				show:false,
				code:'',
				mdata:'',
				miv:'',
				step:0, // 1
			}
		},
		created(){
			this.show = true;
			// uni.login({
			//   provider: 'weixin',
			//   success: (loginRes)=> {
			// 	  console.log(loginRes);
			// 	this.code = loginRes.code;
			//   },
			//   fail:()=>{
			// 	  uni.showToast({
			// 	  	icon:'none',
			// 		title:'小程序登录失败'
			// 	  });
			// 	  this.show = false;
			//   }
			// });
		},
		methods:{
			getUserInfo(e){
				// if(!e.detail.userInfo){
				// 	this.closed();
				// }else{
				// 	this.mdata = e.detail.encryptedData;
				// 	this.miv = e.detail.iv;
				// 	this.step = 1;
				// }
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed');
				},400);
			}
		}
	}
</script>

<style>
	.login-modal{
		position: relative;
		z-index: 400;
	}
	.login-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.login-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#FFFFFF;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.login-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		min-height: 800rpx;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.login-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	
</style>
<template>
	<view class="payment-modal">
		<view  class="modal-bg"></view>
		<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">支付订单</view>
				
				
				<view class=" pd16_15">
					
					<radio-group @change="changeType">
					<view class="box pd16_15 flex alcenter space">
						<view class="flex alcenter">
							<text class="iconfont iconicon_pay_balance ft32" style="color: #FFBD1E;"></text>
							<text class="ml15 ft14 ftw500 cl-main">余额支付</text>
							<text class="ml10 ft12 cl-notice">余额为0，不可用</text>
						</view>
						<view>
							<radio value="money" :checked="payType ==  'money'" :disabled="false" :color="tempColor"  />
						</view>
					</view>
	
					<view class="box pd16_15 mt16  flex alcenter space">
						<view class="flex alcenter">
							<text class="iconfont iconicon_pay_balance ft32 cl-green"></text>
							<text class="ml15 ft14 ftw500 cl-main">微信支付</text>
						</view>
						<view>
							<radio value="weixin" :checked="payType ==  'weixin'" :color="tempColor"  />
						</view>
					</view>
					</radio-group>
				</view>
				
			</view>
			<view class="bg-w mt16 pd10_15" style="box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.04);">
				<button class="btn-big" :style="getBtnStyle">确定支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export  default{
		props:{
			
		},
		data(){
			return {
				payType:'weixin',
				show:false,
			}
		},
		created(){
			this.show = true;
		},
		methods:{
			changeType(e){
				this.payType = e.detail.value;
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
	.payment-modal{
		position: relative;
		z-index: 400;
	}
	.payment-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.payment-modal .modal-box{
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
	.payment-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
	}
	.payment-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
</style>
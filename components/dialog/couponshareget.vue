<template>
	<view  class="couponshareget-modal-middle">
		<view  class="bg"></view>
		<view class="couponshareget-modal-middle-main" :class=" show ? 'animated fast zoomInUp' :'animated fast  zoomOutDown'">
			<view class="middle-main">
				<view @click="closed" class="middle-closed">
					<text class="iconfont  iconbtn_close  ft20"></text>
				</view>
				<view class="pd20_15">
					<view class="flex alcenter"><image :src="statics.defaultFace" class="coupon-share-get-face"></image> <text class="ml10 ft14 cl-w">张华邀请您</text></view>
					<view class="ft16 ftw500 cl-yellow mt8">一起领取优惠券</view>
				</view>
				<view class="text-center">
					<image :src="statics.couponAlert[1]" style="width: 240rpx; height: 240rpx;"></image>
				</view>
				<image :src="statics.couponAlert[2]" class="footer-bg"></image>
				<view class="footer-act-main">
					<button @click="getAct" class="share-btn">立即领取</button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		props:{
			
		},
		data(){
			return {
				show:false,
			}
		},
		created(){
			this.show = true;
		},
		methods:{
			getAct(){
				this.$emit('loginAct');
			},
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed',true);
				},400)
			}	
		}
	}
</script>

<style>
	.couponshareget-modal-middle{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 200;
		left: 0;
		top: 0;
		
	}
	.couponshareget-modal-middle .bg{
		position: fixed;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 201;
		left: 0;
		top: 0;
	}
	.couponshareget-modal-middle-main{
		width: 630rpx;
		background: #FD4E4A;
		border-radius: 32rpx;
		position: fixed;
		top: 50%;
		left: calc(50% - 315rpx);
		transform:translateY(-50%);
		z-index: 202;
		overflow: hidden;
	}
	.couponshareget-modal-middle-main .middle-main{
		position: relative;
		height: 576rpx;
		width: 100%;
	}
	.couponshareget-modal-middle-main .middle-closed{
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		right:0rpx;
		top: 0rpx;
		text-align: center;
		line-height: 80rpx;
		text-align: center;
		background: rgba(0,0,0,0.5);
		color:#FFFFFF;
		border-radius: 0rpx 0rpx 0rpx 32rpx;
	}
	.couponshareget-modal-middle-main .footer-bg{
		width: 100%;
		height: 160rpx;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.couponshareget-modal-middle-main .footer-act-main{
		width: 100%;
		height: 160rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.couponshareget-modal-middle-main .footer-act-main .share-btn{
		width: 330rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #FFF6D6 0%, #FFE388 100%);
		box-shadow: 0rpx 8rpx 24rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 40rpx;
		color:#F14844;
		font-size: 32rpx;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
	}
	.couponshareget-modal-middle-main .coupon-share-get-face{
		width: 48rpx;
		height: 48rpx;
		border-radius: 24rpx;
	}
</style>
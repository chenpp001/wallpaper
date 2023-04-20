<template>
	<view  class="couponshare-modal-middle">
		<view  class="bg"></view>
		<view class="couponshare-modal-middle-main" :class=" show ? 'animated fast zoomInUp' :'animated fast  zoomOutDown'">
			<view class="middle-main">
				<view @click="closed" class="middle-closed">
					<text class="iconfont  iconbtn_close  ft20"></text>
				</view>
				<view class="pd20_15">
					<view class="ft14 cl-w">恭喜您！支付成功</view>
					<view class="ft16 ftw500 cl-yellow mt8">分享好友一起领券吧</view>
				</view>
				<view class="text-center">
					<image :src="statics.couponAlert[0]" style="width: 260rpx; height: 260rpx;"></image>
				</view>
				<image :src="statics.couponAlert[2]" class="footer-bg"></image>
				<view class="footer-act-main">
					<button open-type="share" class="share-btn">邀好友领券</button>
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
	.couponshare-modal-middle{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 200;
		left: 0;
		top: 0;
		
	}
	.couponshare-modal-middle .bg{
		position: fixed;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 201;
		left: 0;
		top: 0;
	}
	.couponshare-modal-middle-main{
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
	.couponshare-modal-middle-main .middle-main{
		position: relative;
		height: 576rpx;
		width: 100%;
	}
	.couponshare-modal-middle-main .middle-closed{
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
	.couponshare-modal-middle-main .footer-bg{
		width: 100%;
		height: 160rpx;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.couponshare-modal-middle-main .footer-act-main{
		width: 100%;
		height: 160rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.couponshare-modal-middle-main .footer-act-main .share-btn{
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
</style>
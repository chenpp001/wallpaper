<template>
	<view>
		<view v-if="userinfo.isLogin" class="box pd16_15">
			 <navigator url="/pages/client/vipcard/index">	
				 <view class="home-vip-tag-box">
					 <image class="bg" v-if="userinfo.group_id == 1" :src="statics.vipbg"></image>
					 <image  class="bg" v-else :src="statics.vipBgHas"></image>
					 <view v-if="userinfo.group_id == 1" class="main plr15 flex alcenter space">
						 <view class="tag-no-vip">普通用户</view>
						 <view class="flex alcenter">
							 <text class="ft12 cl-default mr15 ftw500">升级VIP，省更多钱</text>
							 <image class="right-icon" :src="statics.rightIcon"></image>
						 </view>
					 </view>
					 
					 <view v-else class="main plr15 flex alcenter space">
						 <view class="tag-has-vip flex alcenter center">
							 <image class="vip-level-icon" :src="statics.vipLevelImg[0]"></image>
							 <text class="vip-level-means">VIP会员</text>
						 </view>
						 <view class="flex alcenter">
							 <view v-if="userinfo.dqts<0" class="ft12 cl-default mr15 ftw500">您好！尊敬的VIP<br>您的会员已经到期{{-userinfo.dqts}}天</view>
							 <view v-if="userinfo.dqts>=0" class="ft12 cl-default mr15 ftw500">您好！尊敬的VIP<br>您的会员{{userinfo.dqts}}天后到期</view>
							 <image class="right-icon" :src="statics.rightIcon"></image>
						 </view>
					 </view>
				 </view>
			 </navigator>
			 <view class="mt24 flex space">
				 <view class="col3 text-center">
					 <navigator url="/pages/client/vipcard/moneylog">
					 <view class="cl-notice ft12">积分</view>
					 <view class="mt8 ft20 ftw600 cl-default">{{userinfo.money}}</view>
					 </navigator>
				 </view>
				 
				 <view class="col3 text-center" style="display: none;">
					 <!-- <navigator url="/pages/client/coupon/mine/index"> -->
					 <view class="cl-notice ft12">积分</view>
					 <view class="mt8 ft20 ftw600 cl-default">{{userinfo.score}}</view>
					<!-- </navigator> -->
				 </view>
				 
				 <view class="col3 text-center">
					 <!-- <navigator url="/pages/client/vipcard/integrallog"> -->
						 <view class="cl-notice ft12">优惠券</view>
						 <view class="mt8 ft20 ftw600 cl-default">0</view>
					 <!-- </navigator> -->
				 </view>
			 </view>
			 <!-- #ifndef MP-WEIXIN -->
			 <view class="flex space alcenter  mt24" style="padding-bottom: 16rpx;">
				 <view class="flex alcenter">
					 <navigator url="/pages/client/vipcard/recharge">
						<view class="btn-vip-money" :style="getBtnStyle">充值</view>
					 </navigator>
					 <navigator url="/pages/client/member/tx">
						<view class="btn-vip-adviser ml15" :style="getBtnPlanStyle">提现</view>
					 </navigator>
				 </view>
				 <!-- #ifdef MP-WEIXIN -->
				 <view @click="showQrcodeAct" v-if="userinfo.config.iskq==1" class="vip-qrcode-tag" :style="getBtnStyle">
				 	<text class="iconfont iconbtn_card_ma-copy ft20 cl-w"></text>
				 </view>
				 <!-- #endif -->
				 <!-- #ifdef APP-PLUS -->
				 <view @click="wdfxm" v-if="userinfo.config.iskq==1" class="vip-qrcode-tag" :style="getBtnStyle">
				 	<text class="iconfont iconbtn_card_ma-copy ft20 cl-w"></text>
				 </view>
				 <!-- #endif -->
			 </view>
			 <!-- #endif -->
		</view>
		<view v-else class="box pd24_15">
			<view class="text-center ft14 cl-info2">您还没登录，登录后即可体验VIP会员</view>
			<view class="flex center mt24">
				<button class="btn-mid" @click="loginAct" :style="getBtnStyle">立即登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['userinfo'],
		data(){
			return {
				isLogin:true,
				vipLevel:0,//普通用户
			}
		},
		methods:{
			loginAct(){
				this.$emit('loginAct');
			},
			showQrcodeAct(){
				this.$emit('qrcode');
			},
			wdfxm(){
				uni.navigateTo({
					url:'/pages/client/member/qrshare'
				})
			}
		}
	}
</script>

<style>
	.home-vip-tag-box{
		height: 100rpx;
		width: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 8rpx;
	}
	.home-vip-tag-box .main{
		width: 100%;
		height: 100rpx;
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
	}
	.home-vip-tag-box .bg{
		width: 100%;
		height: 100rpx;
	}
	.tag-no-vip{
		width: 128rpx;
		height: 40rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-weight: 600;
		color:#8A8D99;
		text-align: center;
		line-height: 40rpx;
	}
	.tag-has-vip{
		width: 200rpx;
		height: 40rpx;
		background: linear-gradient(180deg, #333333 0%, #000000 100%);
		border-radius: 20rpx;
	}
	.tag-has-vip .vip-level-icon{
		width: 36rpx;
		height: 36rpx;
	}
	.tag-has-vip .vip-level-means{
		font-size: 24rpx;
		margin-left: 8rpx;
		font-weight: 500;
		background: linear-gradient(180deg, #F2DCA9 0%, #C79556 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.home-vip-tag-box .main .right-icon{
		width: 40rpx;
		height: 40rpx;
	}
	.vip-qrcode-tag{
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn-vip-money,.btn-vip-adviser{
		width: 208rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color:#FFFFFF;
	}
</style>

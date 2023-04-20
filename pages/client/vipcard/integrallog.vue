<template>
	<view>
		<view class="integral-log-header">
			<image class="bg" :src="statics.integralLogHeader"></image>
			<view class="main pd24_20">
				<view class="flex alcenter space">
					<view>
						<view class="flex alcenter">
							<text class="ft14 cl-w">当前积分</text>
							<navigator open-type="redirect" url="/pages/client/integral/role">
								<text class="ml5 iconfont iconbtn_question cl-w ft20"></text>
							</navigator>
						</view>
						<view class="mt16 flex alcenter">
							<image :src="statics.integralImg01" style="width: 40rpx; height: 40rpx;"></image>
							<text class="ml10 ft20 cl-w ftw600">200</text>
						</view>
					</view>
					<navigator open-type="redirect" url="/pages/client/integral/index">
					<view class="btn-integral">积分兑换</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="integral-log-main">
			<view class="pd16_15 bd-bottom flex alcenter">
				<text class="iconfont iconicon_integral_des ft20 cl-main"></text>
				<text class="ml10 ft16 ftw600 cl-main">积分明细</text>
			</view>
			<view class="pd16_15">
				<view class="pb16 mb16 bd-bottom flex alcenter space">
					<view>
						<view class="ft14 cl-main">积分兑换10元优惠券</view>
						<view class="mt8 ft12 cl-notice">04-12 12:00</view>
					</view>
					<view class="ft18 ftw600 cl-main">-100</view>
				</view>
				<view class="pb16 mb16 bd-bottom flex alcenter space">
					<view>
						<view class="ft14 cl-main">邀请新用户注册奖励</view>
						<view class="mt8 ft12 cl-notice">04-12 12:00</view>
					</view>
					<view class="ft18 ftw600 cl-main">+100</view>
				</view>
			</view>
			
			<com-empty title="暂无积分记录"></com-empty>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.integral-log-header{
		position: relative;
		height: 252rpx;
	}
	.integral-log-header .bg{
		width: 100%;
		height: 252rpx;
	}
	.integral-log-header .main{
		height: 252rpx;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.btn-integral{
		width: 192rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color:#6687EF;
		font-size: 28rpx;
		font-weight: 500;
	}
	.integral-log-main{
		background: #FFFFFF;
		min-height: 1400rpx;
		position: relative;
		margin-top: -32rpx;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
	}
</style>
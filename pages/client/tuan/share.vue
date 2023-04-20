<template>
	<view class="pd16_15">
		<view class="box noshadow pd16_15">
			<view class="flex alcenter">
				<image class="adviser-face-big" :src="statics.defaultFace"></image>
				<view style="width: calc(100% - 160rpx);" class=" pl15">
					<view class="ft16 cl-main ftw600">张顾问</view>
					<view class="flex alcenter mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_weixin ft14"></text>
							<text class="ft14 ml5">ffy1203605498</text>
						</view>
						<view class="copy-tag ml10" :style="{background:tempColor}">复制</view>
					</view>
					<view class="flex alcenter space mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_call ft14"></text>
							<text class="ft14 ml5">13515608638</text>
						</view>
						
						<text class="iconfont iconicon_bottom_call ft20" :style="{color:tempColor}"></text>
					</view>
				</view>
			</view>
			<view class="mt24">
				<button class="btn-mid plan" style="width: 100%;" :style="getBtnPlanStyle">
					绑定顾问
				</button>
			</view>
		</view>
		
		<navigator url="/pages/client/tuan/detail">
		<view class="box pd16_15 flex alcenter mt24">
			<image class="tuan-product-l"></image>
			<view class="tuan-product-r pl15">
				<view class="ft14 ftw600 cl-main text-over2">洗剪吹加护理一次套餐 会员只需5…</view>
				<view class="mt16">
					<text class="ft12 cl-orange">会员价</text>
					<text class="ft12 cl-orange">¥</text>
					<text class="ft16 cl-orange ftw600">58</text>
					<text class="ml15 ft12 cl-notice text-line">¥88</text>
				</view>
				<view class="mt16 flex space alcenter">
					<view class="ft12 cl-notice">已售868</view>
					<view class="btn-mini" :style="getBtnStyle">购买</view>
				</view>
			</view>
		</view>
		</navigator>
		
		<view class="mt24">
			<button class="btn-big" :style="{color:tempColor,background:'#fff'}">查看更多特惠 <text class="iconfont iconicon_arrow_small ft14 ml10"></text></button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.adviser-face-big{
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		background: #FFFFFF;
	}
	.copy-tag{
		width: 96rpx;
		height: 40rpx;
		color:#FFFFFF;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
	}
	.tuan-product-l{
		width: 320rpx;
		height: 240rpx;
		border-radius: 16rpx;
		background: #F2F2F2;
	}
	.tuan-product-r{
		width: calc(100% - 320rpx);
	}
</style>
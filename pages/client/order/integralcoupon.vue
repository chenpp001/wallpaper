<template>
	<view>
		<view v-if="detail.status == -1" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status07 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已取消</text>
			</view>
		</view>
		
		<view v-if="detail.status == 0" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status01 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待付款</text>
			</view>
			<view class="flex alcenter">
				<text class="ft14 cl-main mr10"></text>
				<countdown-time :t="900"></countdown-time>
			</view>
		</view>
		<view v-if="detail.status  == 1" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status02 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待使用</text>
			</view>
		</view>
		<view v-if="detail.status  == 4" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status07 ft24 cl-notice"></text>
				<text class="ml10 ft16 ftw600">已过期</text>
			</view>
		</view>
		<view v-if="detail.status  == 8" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status06 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已使用</text>
			</view>
		</view>
		
	<view class="pd16_15">
		
		<view class="box pd16_15 ">
			<view class="flex alcenter">
				<view class="cl-orange" style="width: 96rpx;">
					<text class="ft12">¥</text>
					<text class="ft24 ftw600 ml4">20</text>
				</view>
				<view class="ml15">
					<view class="ft14 ftw600 cl-main">普通洗剪吹优惠券</view>
					<view class="mt8 ft12 cl-info2">2020-04-05 12:00下单</view>
					<view class="flex alcenter cl-orange mt8" >
						<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx; margin-right: 8rpx;"></image>
						<text class="ft16 ftw600">3000 + ¥10</text>
					</view>
				</view>
			</view>
		</view>
	
		
		<view class="box mt16 pd16_15">
			<view class="ft16 ftw600 cl-main">订单详情</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">订单编号：</text>
				<text class="ft14 cl-main">1034568888</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">手机号码：</text>
				<text class="ft14 cl-main">13515608638</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">下单时间：</text>
				<text class="ft14 cl-main">2020-10-23 15:10:10</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">订单状态：</text>
				<text class="ft14 cl-main">未支付</text>
			</view>
			<view class="flex mt16">
				<text class="ft14 cl-info2">支付时间：</text>
				<text class="ft14 cl-main">2020-10-23 15:10:10</text>
			</view>	
		</view>
		
	
	</view>
	<dialog-payment v-if="showPayment" @closed="showPayment = false;"></dialog-payment>
	
	<view v-if="detail.status == 0" class="form-footer-h">
		<view class="form-footer form-footer-h">
			<view class="form-footer-main pd10_15 flex alcenter space">
				<button class="btn-big plan" style="width: 330rpx;">取消订单</button>
				<button class="btn-big" @click="showPayment = true" :style="getBtnStyle" style="width: 330rpx;">立即支付</button>
			</view>
		</view>
	</view>
	
	</view>
</template>

<script>
	import  QR   from '../../../static/js/wxqrcode.js';
	export default{
		data(){
			return {
				showPayment:false,
				detail:{
					status:1,//status  0,待付款  1待使用   -1订单取消   4已过期  8已完成
					
				},
				qrcodeImg:'',
			}
		},
		onLoad(){
			let img = QR.createQrCodeImg('youge', {
			     size: 300//二维码大小  
			})
			this.qrcodeImg = img;
		},
		methods:{
			
		}
	}
</script>

<style>
	
</style>
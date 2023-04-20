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
				<text class="iconfont iconicon_order_status04 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待发货</text>
			</view>
		</view>
		<view v-if="detail.status  == 2" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status08 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待门店自提</text>
			</view>
		</view>
		<view v-if="detail.status  == 6" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status05 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">待收货</text>
			</view>
		</view>
		
		<view v-if="detail.status  == 8" class="flex alcenter space bg-w pd16_15">
			<view>
				<text class="iconfont iconicon_order_status06 ft24" :style="{color:tempColor}"></text>
				<text class="ml10 ft16 ftw600">已完成</text>
			</view>
		</view>
		
	<view class="pd16_15">
		
		<view v-if="detail.delivery_type == 2" class="box pd16_15 ">
			<view class="flex alcenter space">
				<text class="ft16 ftw600 cl-main">极享奶茶[包河万达店]</text>
				<text class="cl-orange ft12">距您 0.6km</text>
			</view>
			<view class="mt16 flex alcenter space">
				<view class="flex cl-notice" style="width: calc(100% - 80rpx);">
					<text class="iconfont iconicon_location01 ft12" style="line-height: 36rpx;"></text>
					<view class="ml5 ft12" style="width: calc(100% - 40rpx); line-height: 36rpx;">
						合肥市包河区滨湖时代广场1楼1001室
					</view>
				</view>
				<text class="iconfont iconbtn_nav ft20 cl-blue"></text>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="mt16 flex alcenter space">
				<view class="flex cl-notice" style="width: calc(100% - 80rpx);">
					<text class="iconfont iconicon_bottom_call ft12" style="line-height: 36rpx;"></text>
					<view class="ml5 ft12" style="width: calc(100% - 40rpx); line-height: 36rpx;">
						0551-65560407
					</view>
				</view>
				<text class="iconfont iconbtn_call ft20 cl-green"></text>
			</view>
			
		</view>
		
		<view v-if="detail.delivery_type == 1" class="box pd16_15 flex">
			<text class="iconfont iconicon_location02 ft18" :style="{color:tempColor}"></text>
			<view class="pl10" style="width: calc(100% - 40rpx);">
				<view  class="ft14 cl-main ftw600 text-over">合肥市包河区万达临湖苑A区16栋1602室</view>
				<view  class="ft12 mt12 cl-info2">张华 13515608638</view>
			</view>
		</view>
		
		<view class="box  mt16 pd16_15 flex">
			<image class="tuan-buy-l"></image>
			<view class="tuan-buy-r pl15">
				<view class="ft14 ftw600 cl-main">单人精致洗剪吹1次，国庆3折…</view>
				<view class="mt8 ft12 cl-notice">
					下单时间：2020-04-05 12:00
				</view>
				<view class="flex alcenter cl-orange mt8" >
						<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx; margin-right: 8rpx;"></image>
						<text class="ft16 ftw600">3000 + ¥10</text>
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
					status:0,//status  0,待付款  1待发货  2 待自提    6已发货   -1订单取消    8已完成
					delivery_type:1,
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
	.tuan-buy-l{
		width: 200rpx;
		height: 150rpx;
		background: #F2F2F2;
	}
	.tuan-buy-r{
		width: calc(100% - 200rpx);
	}
</style>
<template>
	<view>
		
		<view class="order-list-item-tit">
			<view class="flex  space" >
				<text class="ft14 cl-main">积分兑换优惠券</text>
				<text class="ft14 ftw500" :style="{color:tempColor}">{{datas.status_means}}</text>
			</view>
			<image class="order-type" :src="statics.orderType[2]"></image>
		</view>
			<navigator url="/pages/client/order/integralcoupon">
		<view class="box mt16 pd16_15">
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
			<view v-if="datas.status == 0"  class="flex alcenter space mt16">
					<view>
						<countdown-time :t="900" size="small"></countdown-time>
					</view>
					<view  class="btn-small" :style="getBtnStyle">去支付</view>
			</view>
		</view>
		</navigator> 
	</view>
</template>

<script>
	//status  0,待付款  1待使用    4已过期  8已完成  -1取消订单
	export default{
		props:{
			datas:{
				type:Object,
				default:function(){
					return new Object;
				}
			}
		},
		computed:{
			getColor(){
				if(this.datas.status != 0){
					return  '#000000';
				}
				return this.tempColor;
			}
		},
		data(){
			return {
				
			}
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	
</style>
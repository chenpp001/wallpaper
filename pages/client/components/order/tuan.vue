<template>
	<view>
		<view class="order-list-item-tit">
			<view class="flex  space" >
				<text class="ft14 cl-main">特惠套餐订单</text>
				<text class="ft14 ftw500" :style="{color:getColor}">{{datas.status_means}}</text>
			</view>
			<image class="order-type" :src="statics.orderType[1]"></image>
		</view>
		<view class="box mt16 pd16_15">
			<view class="flex">
				<image class="order-list-item-l"></image>
				<view class="order-list-item-r">
					<view class="ft14 ftw600 cl-main text-over">洗剪吹加护理一次套餐 …</view>
					<view class="mt8 ft12 cl-notice">2020-04-05 12:00下单</view>
					<view class="flex alcenter space mt8">
						<view class="cl-orange">
							<text class="ft12">¥</text>
							<text class="ft16 ftw600">58</text>
						</view>
						<view class="ft12 cl-notice">x1</view>
					</view>
				</view>
			</view>
			<view class="flex alcenter space mt16">
				<view>
					<countdown-time v-if="datas.status == 0" :t="900" size="small"></countdown-time>
				</view>
				<navigator url="/pages/client/order/tuan">
					<view v-if="datas.status == 0" class="btn-small" :style="getBtnStyle">去支付</view>
				
					<view v-if="datas.status == 2" class="btn-small plan" :style="getBtnPlanStyle">评价订单</view>
					
					<view v-if="datas.status != 0 && datas.status != 2" class="btn-small plan">查看订单</view>
				</navigator>
			</view>
		</view>
		
	
		
	</view>
</template>

<script>
	//status  0,待付款  1待使用   2待评价  4已过期  8已完成  -1取消
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
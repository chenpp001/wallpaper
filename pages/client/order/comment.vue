<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		
		<view class="box pd16_15">
			<view class="flex">
				<image class="tuan-buy-l"></image>
				<view class="tuan-buy-r pl15">
					<view class="ft14 ftw600 cl-main">单人精致洗剪吹1次，国庆3折…</view>
					<view class="mt8 ft12 cl-notice">
						下单时间：2020-04-05 12:00
					</view>
					<view class="mt12 flex alcenter space">
						
						<text class="ft16 cl-orange ftw600">¥68</text>
						
						<text class="ft12 cl-notice">x1</text>
					</view>
				<!-- 	<view class="mt12 flex alcenter cl-orange">
						<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx; margin-right: 8rpx;"></image>
						<text class="ft16 ftw600">3000 + ¥10</text>
					</view> -->
				</view>
			</view>
		</view>
		
		
		<view class="box mt16 pd24_15">
			<view class="flex alcenter center">
				<select-star v-model="star"></select-star>
			</view>
			<view class="text-center ft12 cl-notice mt12">给本次消费评星</view>
			
			<view class="pd20_15 mt16" style="border:2rpx solid #C5CADB;border-radius: 24rpx;">
				
				<textarea v-model="content" placeholder="请给本次消费提出建议，即可获得10个积分:" placeholder-class="cl-notice" class="ft14" style="height: 300rpx; width: 100%;" :maxlength="300"></textarea>
				<view class="mt12 text-right ft12 cl-notice">
					{{content.length}}/300
				</view>
			</view>
			
			<view class="flex alcenter mt16">
				<text class="ft14 cl-main">添加图片</text>
				<text class="ft12 cl-notice ml10">最多上传9张</text>
			</view>
			<view class="mt16">
				<upload-list v-model="photos"></upload-list>
			</view>
			
		</view>
		
		
		<view class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15">
					<button class="btn-big" :style="getBtnDisStyle">评星立得10个积分</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				star:0,
				content:'',
				photos:[]
			}
		},
		onLoad(){
			
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
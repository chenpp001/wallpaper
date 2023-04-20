<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		
		<view class="box pd16_15">
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
			<view class="mt16 flex alcenter space mb16">
				<view class="flex cl-notice" style="width: calc(100% - 80rpx);">
					<text class="iconfont iconicon_bottom_call ft12" style="line-height: 36rpx;"></text>
					<view class="ml5 ft12" style="width: calc(100% - 40rpx); line-height: 36rpx;">
						0551-65560407
					</view>
				</view>
				<text class="iconfont iconbtn_call ft20 cl-green"></text>
			</view>
			
			<view class="btn-mid plan " :style="getBtnPlanStyle" style="width: 100%;"><text class="iconfont iconduihao mr5 ft14"></text>当前已选择</view>
			
		</view>
		
		
		<view class="box pd16_15 mt16">
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
				<view class="mt16 flex alcenter space mb16">
					<view class="flex cl-notice" style="width: calc(100% - 80rpx);">
						<text class="iconfont iconicon_bottom_call ft12" style="line-height: 36rpx;"></text>
						<view class="ml5 ft12" style="width: calc(100% - 40rpx); line-height: 36rpx;">
							0551-65560407
						</view>
					</view>
					<text class="iconfont iconbtn_call ft20 cl-green"></text>
				</view>
				
				<view class="btn-mid" @click="selectMendian" :style="getBtnStyle" style="width: 100%;">确定选择</view>
				
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(e){
			
		},
		methods:{
			selectMendian(){
				uni.navigateBack({
					delta:1,
				})
			},
		}
	}
</script>

<style>
	
</style>
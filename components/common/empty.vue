<template>
	<view class="empty-box">
		<image :src="statics.emptyImg" style="width: 296rpx; height: 296rpx;"></image>
		<view class="ft14 cl-notice mt20">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'暂无普通用户优惠券',
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.empty-box{
		padding: 60rpx;
		text-align: center;
	}
</style>

<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		
		<view class="box" style="padding: 64rpx 30rpx 30rpx 30rpx;">
			<view class="flex center">
				<image class="member-info-face" :src="statics.defaultFace"></image>
			</view>
			<view class="text-center ft16 ftw600 mt16">董小姐</view>
			
			<view class="mt24  box-form-item plr15 flex alcenter space">
				<text class="ft14">生日</text>
				<select-birthday v-model="birthday"></select-birthday>
			</view>
			<view class="mt16 flex alcenter">
				<image style="width: 64rpx; height: 64rpx;" :src="statics.birthdayGift"></image>
				<view  class="ft12 pl15 lh20 cl-main" style="width: calc(100% - 64rpx);">
					填写生日后，符合要求的VIP会员将于每年生日当月<text class="ft12" :style="{color:tempColor}">获赠生日礼包～</text>
				</view>
			</view>
		</view>
		
		<view class="mt24">
			<button class="btn-big" :style="isSelect == false ? getBtnDisStyle : getBtnStyle">确定保存</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				birthday:[],
			}
		},
		computed:{
			isSelect(){
				let select = false;
				if(this.birthday.length > 0) {
					select = true;
				}
				return select;
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.member-info-face{
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
	}
	.box-form-item{
		height: 100rpx;
		width: 100%;
		border-radius: 50rpx;
		background: #F5F6FA;
		color:#5C5E66;
	}
</style>
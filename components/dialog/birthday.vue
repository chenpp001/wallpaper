<template>
	<view  class="birthday-modal-middle">
		<view  class="bg"></view>
		<view class="birthday-modal-middle-main" :class=" show ? 'animated fast zoomInUp' :'animated fast  zoomOutDown'">
			<view class="middle-main">
				<view @click="closed" class="middle-closed">
					<text class="iconfont  iconbtn_close cl-notice ft20"></text>
				</view>
				<view class="text-center">
					<text class="ft16 ftw600 cl-main">{{title}}</text>
				</view>
				<view class="text-center mt24">
					<image :src="statics.birthdayPic" style="width: 412rpx; height: 296rpx;"></image>
				</view>
				<view class="mt24" style="max-height: 400rpx; overflow-y: scroll;">
					<view class="birthday-gift-box pd16_15">
						<view class="flex alcenter space">
							<text class="ft14 cl-main">专业洗剪吹3次</text>
							<text class="ft12 cl-notice">x1</text>
						</view>
						<view class="mt8 ft12 cl-orange">价值¥188</view>
					</view>
					
					<view class="birthday-gift-box pd16_15 mt8">
						<view class="flex alcenter space">
							<text class="ft14 cl-main">专业洗剪吹3次</text>
							<text class="ft12 cl-notice">x1</text>
						</view>
						<view class="mt8 ft12 cl-orange">价值¥188</view>
					</view>
					<view class="birthday-gift-box pd16_15 mt8">
						<view class="flex alcenter space">
							<text class="ft14 cl-main">专业洗剪吹3次</text>
							<text class="ft12 cl-notice">x1</text>
						</view>
						<view class="mt8 ft12 cl-orange">价值¥188</view>
					</view>
				</view>
			</view>
			<view v-if="showOnly ==  false" class="birthday-get-btn" :style="{background:tempColor}">确定领取</view>
		</view>	
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'祝你生日快乐'
			},
			datas:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			showOnly:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				show:false,
			}
		},
		created(){
			this.show = true;
		},
		methods:{
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed',true);
				},400)
			}	
		}
	}
</script>

<style>
	.birthday-modal-middle{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		
	}
	.birthday-modal-middle .bg{
		position: fixed;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 401;
		left: 0;
		top: 0;
	}
	.birthday-modal-middle-main{
		width: 690rpx;
		background: #F5F6FA;
		border-radius: 32rpx;
		position: fixed;
		top: 50%;
		left: calc(50% - 345rpx);
		transform:translateY(-50%);
		z-index: 402;
		overflow: hidden;
	}
	.birthday-modal-middle-main .middle-main{
		position: relative;
		padding: 64rpx 30rpx 30rpx 30rpx;
	}
	.birthday-modal-middle-main .middle-closed{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: 50rpx;
		top: 50rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.birthday-gift-box{
		width: 100%;
		height: 148rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}
	.birthday-get-btn{
		width: 100%;
		height: 96rpx;
		text-align: center;
		font-size: 32rpx;
		color:#FFFFFF;
		font-weight: 500;
		line-height: 96rpx;
	}
</style>
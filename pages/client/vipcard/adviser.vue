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
							<text class="ft14 ml5">{{weixin}}</text>
						</view>
						<view @click="onddtel(weixin)" class="copy-tag ml10" :style="{background:tempColor}">复制</view>
					</view>
					<view class="flex alcenter space mt8">
						<view class="flex alcenter cl-notice">
							<text class="iconfont iconicon_call ft14"></text>
							<text class="ft14 ml5">{{tel}}</text>
						</view>
						<text  @click="ontel(tel)" class="iconfont iconicon_bottom_call ft20" :style="{color:tempColor}"></text>
					</view>
				</view>
			</view>
			<view class="mt24">
				<navigator url="/pages/client/vipcard/adviserchange">
				<button class="btn-mid plan" style="width: 100%;" :style="getBtnPlanStyle">
					<text class="iconfont iconicon_huan mr10"></text>更换顾问
				</button>
				</navigator>
			</view>
		</view>
		
		<!-- <view class="box noshadow pd16_15 mt16">
			<textarea v-model="content" placeholder="我有问题要跟顾问反馈:" placeholder-class="cl-notice" class="ft14" style="height: 300rpx; width: 100%;" :maxlength="300"></textarea>
			<view class="mt12 text-right ft12 cl-notice">
				{{content.length}}/300
			</view>
		</view>
		<view class="mt16">
			<button class="btn-big" :style="getBtnStyle">立即提交</button>
		</view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:'',
				tel:'',
				weixin:''
			}
		},
		onShow() {
			this.tel= uni.getStorageSync("config").tels
			this.weixin= uni.getStorageSync("config").weixin
		},
		methods:{
			ontel(tel){
				uni.makePhoneCall({
				    phoneNumber: tel //仅为示例
				});
			},
			onddtel(tel){
				uni.setClipboardData({
				 data: tel,  
				 success() {  
				  publicFun.showtip('已经复制')  
				 },  
				 fail(res) {  
				  console.log(res)  
				  publicFun.showtip('复制失败')  
				 }  
				
				})

			},
			
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
</style>
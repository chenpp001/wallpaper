<template>
	<view>
		<view class="pd16_15" style="margin-bottom: 80upx;">	
			<view class="flex alcenter space" style="margin-bottom: 30upx;">
				<view class="flex alcenter">
					<image style="width: 40rpx;height: 40rpx;" :src="statics.zhuico[3]"></image>
					<text class="ft16 ftw600 cl-main ml15">热门推荐</text>
				</view>
				<navigator url="/pages/client/tuan/ss">
				<view class="ft14 cl-notice">更多</view>
				</navigator>
			</view>
				<block v-for="(value,key) in datasa" :key="key">
				<view @click="detail(value.id,value.lx)" style="position: relative;" class="box pd16_15 flex alcenter mb16">
					<image mode="aspectFill" class="tuan-product-l" :src="value.img"></image>
					<view class="btn-mini" style="position: absolute; top: 40upx; left: 280upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx;" :style="getBtnStyle">{{value.lxname}}</view>
					<view class="tuan-product-r pl15">
						<view class="ft14 ftw600 cl-main text-over2">{{value.name}}</view>
						<view class="mt16">
							<text class="ft12 cl-orange">会员价</text>
							<text class="ft12 cl-orange">¥</text>
							<text class="ft16 cl-orange ftw600">{{value.vipprice*1}}</text>
							<text class="ml15 ft12 cl-notice text-line">¥{{value.price*1}}</text>
						</view>
						<view class="mt16 flex space alcenter">
							<view class="ft12 cl-notice">{{value.updatetime}}</view>
						</view>
					</view>
				</view>
				</block>
		</view>
		<view class="home-main">
			<com-copyright></com-copyright>
		</view>
		<dialog-birthday v-if="showBirthday" @closed="showBirthday = false"></dialog-birthday>
		<dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login>
		<dialog-qrcode v-if="showQrcode" @closed="showQrcode = false"></dialog-qrcode>
		<dialog-couponshareget @loginAct="showLoginCouponShareGet" v-if="showCouponShareGet" @closed="showCouponShareGet = false"></dialog-couponshareget>
	</view>
</template>

<script>
	export default{
		props: ['datasa'],
		data(){
			return {
				isLogin:false,
				showBirthday:false,
				showLogin:false,
				showQrcode:false,
				showCouponShareGet:false,
			}
		},

		created(){
			
			// uni.setNavigationBarTitle({
			//     title: '夜趣小视频'
			// });
			
			// setTimeout(()=>{
			// 	this.showCouponShareGet = true;	
			// },1000);
		},
		methods:{
			//'/pages/client/tuan/detail?id='+value.id
			detail(id,lx){
				console.log(lx);
				if(lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/detail?id='+id
					})
				}else if(lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else if(lx==3){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else if(lx==4){
					uni.navigateTo({
						url:'/pages/client/tuan/infotp?id='+id
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/tuan/list?id='+id
					})
				}
			},
			showLoginAct(){
				this.showLogin = true;
			},
			showLoginCouponShareGet(){
				this.showLogin = true;
			},
			loginYes(){
				
			}
		}
	}
</script>

<style>
	.home-header{
		height: 304rpx;
		width: 100%;
		position: relative;
		background: #363B4D;
		border-radius: 0rpx 0rpx 48rpx 48rpx;
	}
	.home-main{
		width: 100%;
		position: relative;
		margin-top: -156rpx;
		padding: 0 30rpx;
	}
	.home-mendian{
		width: 100%;
		height: 84rpx;
		background:rgba(255,255,255,0.1);
		border-radius: 42rpx;
	}
	.tuan-product-l{
		width: 320rpx;
		height: 240rpx;
		border-radius: 16rpx;
		background: #F2F2F2;
	}
	.tuan-product-r{
		width: calc(100% - 320rpx);
	}
	
</style>

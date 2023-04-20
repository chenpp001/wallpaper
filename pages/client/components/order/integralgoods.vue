<template>
	<view>
		<view class="box mt16 pd16_15">
			<view class="order-list-item-tit" style="margin-bottom: 20upx;">
				<view class="flex alcenter space" >
					<view class="flex alcenter">
						<text class="ft14 cl-main">{{datas.out_trade_no}}</text>
					</view>
					<text class="ft14 ftw500" :style="{color:getColor}">{{datas.status_means}}</text>
				</view>
			</view>
			<view class="flex">
				<image mode="aspectFill" class="order-list-item-l" :src="datas.img" style="width: 45%; height: auto; margin-right: 5%; border-radius: 5px;"></image>
				<view class="order-list-item-r">
					<view style="width: 300upx;" class="ft14 ftw600 cl-main text-over">{{datas.name}}</view>
					<view class="mt8 ft12 cl-notice">{{datas.time}}下单</view>
					<view class="flex alcenter cl-orange mt8" >
							<text class="ft16 ftw600"> ¥{{datas.price}}</text>
					</view>
				</view>
			</view>
			<view class="flex alcenter space mt16" style="padding-top: 20upx;">
				<view v-if="datas.lx==1"  class="btn-small plan">全集购买</view>
				<view v-if="datas.lx==2"  class="btn-small plan">单集购买</view>
				<view>
					<countdown-time v-if="datas.status == 0" :t="900" size="small"></countdown-time>
				</view>
				<view v-if="datas.splx==3" @click="opuer(datas.sid,datas.smid,datas.splx,datas.lx)">
					<view v-if="datas.type == 1" class="btn-small" :style="getBtnStyle">去支付</view>
					<view v-if="datas.type == 2" class="btn-small" :style="getBtnStyle">阅读</view>
				</view>
				<view v-if="datas.splx==1 || datas.splx==2" @click="opuer(datas.sid,datas.smid,datas.splx,datas.lx)">
					<view v-if="datas.type == 1" class="btn-small" :style="getBtnStyle">去支付</view>
					<view v-if="datas.type == 2" class="btn-small" :style="getBtnStyle">播放</view>
				</view>
				<view v-if="datas.splx==4" @click="opuer(datas.sid,datas.smid,datas.splx,datas.lx)">
					<view v-if="datas.type == 1" class="btn-small" :style="getBtnStyle">去支付</view>
					<view v-if="datas.type == 2" class="btn-small" :style="getBtnStyle">下载图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//status  0,待付款  1待使用    4已过期  8已完成
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
			opuer(sid,smid,splx,lx){
				console.log(splx)
				if(splx==1){ //视频
					uni.navigateTo({
						url:'/pages/client/tuan/detail?id='+sid+'&mid='+smid
					})
				}
				if(splx==2 && lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+sid+'&mid='+smid //音频全集
					})
				}
				if(splx==2 && lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/audio?id='+sid+'&mid='+smid //音频单集
					})
				}
				if(splx==3 && lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+sid+'&mid='+smid //文字全集
					})
				}
				if(splx==3 && lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/text?id='+sid+'&mid='+smid //文字单集
					})
				}
				if(splx==4 && lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/infotp?id='+sid+'&mid='+0 //文字全集
					})
				}
			}
		}
	}
</script>

<style>
	.delivery-type{
		width: 128rpx;
		height: 36rpx;
		background: #FFFFFF;
		border-radius: 18rpx;
		font-size: 24rpx;
		color:#8A8D99;
		line-height: 36rpx;
		text-align: center;
		font-weight: 500;
		margin-left: 0rpx;
	}
	.mt16{
		margin-top: 0px;
	}
</style>
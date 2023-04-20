<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		
		
		<view class="tuan-detail-header">
			<swiper v-if="info.lx==1" :indicator-dots="true" indicator-color="rgba(255,255,255,.3)" indicator-active-color="#ffffff" class="tuan-detail-swiper" :autoplay="true"  :interval="3000" :duration="400">
				 <swiper-item style="text-align: center;">
					<video  id="myVideo" :poster="info.img" :show-center-play-btn="playbtn" :autoplay="autoplay"  style="width: 100%;" @timeupdate="timeupdate"  :src="info.videourl"></video>
				 </swiper-item>
			</swiper>
		</view>
		<view class="row" style="margin-bottom: 40upx;">
			<block v-for="(value,key) in info.video" :key="key">
				<button @click="op(info.id,value.id,value.lx)" class="mini-btn ft12" :type="info.pid==value.id?'warn':'primary'" size="mini">{{value.name}}</button>
			</block>
		</view>
		<view class="tuan-detail-tit pd20_15">
			<view class="ft18 cl-main ftw600">{{info.name}}</view>
			<view class="flex alcenter space mt12">
				<view class="flex alcenter">
					<text class="ft14 cl-orange">会员价：</text>
					<text class="ft16 cl-orange ftw600">¥{{info.vipprice}}</text>
					<text class="ml10 ft12 cl-notice">普通价：</text>
					<text class="ft12 cl-notice text-line">¥{{info.price}}</text>
				</view>
				<view class="cl-notice ft12">{{info.updatetime}}</view>
			</view>

		</view>
		<view class="mt24" style="margin:30upx 30upx 0 30upx;box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);">
			<home-banner :banners="banners"></home-banner>
		</view>
		<home-default :datasa="datasa"></home-default>
		<view class="form-footer-h">
			<view class="form-footer-h form-footer">
				<view class="form-footer-main pd10_15 flex alcenter space">
						
						<view class="flex alcenter space" style="width: calc(100% - 400rpx);">
							<navigator open-type="reLaunch" url="/pages/client/index">
								<view class="form-footer-item text-center">
									<view class="iconfont iconicon_bottom_home ft22"></view>
									<view class="ft12 mt8">首页</view>
								</view>
							</navigator>
							
							<view @click="contactAct" class="form-footer-item text-center ">
								<view class="iconfont iconicon_bottom_call ft22"></view>
								<view class="ft12 mt8">联系</view>
							</view>
							<button @click="vipcard" class="form-footer-item text-center ">
								<view class="iconfont icontabbar01 ft22"></view>
								<view class="ft12 mt8">开通VIP</view>
							</button>
						</view>
						<button v-if="info.isplay==0" @click="buyAct" class="btn-big" style="width: 288rpx;" :style="getBtnStyle">¥{{price}}购买</button>
						<button v-if="info.isplay==1" class="btn-big" style="width: 288rpx; color: #ffffff; background: #C0C0C0!important;">{{isplaytext}}</button>
						
				</view>
			</view>
		</view>
		
		<dialog-login v-if="showLogin" @loginYes="loginYes" @closed="showLogin = false"></dialog-login>
		<!-- #endif -->
	</view>
</template>

<script>
import zaudio from '@/components/uniapp-zaudio/zaudio';
// import zaudio from 'uniapp-zaudio/zaudio'
export default {
	components: { zaudio: zaudio },
		data(){
			return {
				isLogin:false,
				showLogin:false,
				autoplay:false,
				playbtn:true,
				selectIndex:0,
				tabs:['详情'],
				nextStep:'',
				datasa:[],
				dataconfig:[],
				id:'',
				mid:0,
				info:[],
				dda:'',
				price:'',
				banners:[],
				isplaytext:'已经购买',
				audioAction: {
				    method: 'pause'
				}
			}
		},
		onLoad(option){
			this.dda=uni.createVideoContext('myVideo')
			if(option.id){
				this.id=option.id
			}
			if(option.mid){
				this.mid=option.mid
			}
			this.getList();
		},
		onShow() {
			this.$zaudio.stop();
			this.getinfo(this.id);
			if(uni.getStorageSync("userinfo").token){
				this.isLogin = true
				this.showLogin = false
			}
			this.banners=uni.getStorageSync("config").banner
		},
		onHide() {
			this.dda.pause()
		},
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		methods:{
			timeupdate(event){
					let _this=this;
					let currentTime = event.detail.currentTime 
					if(currentTime>this.info.mrseek && this.info.isplay==0){
						 //dda.exitFullScreen()
						 this.dda.seek(this.info.mrseek)
						 this.dda.pause()
						 this.dda.stop()
						 uni.showModal({
							title: '温馨提示',
							content: '没权限观看当前视频',
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									
								} else if (res.cancel) {
									
								}
							}
						 });
					}
			},
			getinfo(id) {
				let data = {};
				data.id=id
				data.mid=this.mid
				if(uni.getStorageSync("userinfo").token){
					data.token=uni.getStorageSync("userinfo").token
					this.isLogin = true
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/info',
					data: data,
					success: data => {
							if(uni.getStorageSync("userinfo").token){
								if(data.data.isvip>1){
									this.price=data.data.vipprice
								}else{
									this.price=data.data.price
								}
							}else{
								this.price=data.data.price
							}
							data.data.pricebuy=this.price
							this.info=[];
							this.info=data.data
							
							if(data.data.isvip>1){
								if(data.data.vipprice*1==0){
									this.isplaytext='VIP免费'
								}
							}else{
								if(data.data.price*1==0){
									this.isplaytext='免费视频'
								}
							}
							uni.setNavigationBarTitle({
							    title: this.info.name
							});
					},
					fail: (data, code) => {
					}
				});
			},
			getList() {
				let data = {
					//column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				var limit=10;
				data.limit=limit
				data.ishot=2
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						if (data.data.total>0) {
							this.dataconfig=data.data.config
							this.datasa=data.data.rows
						}
					},
					fail: (data, code) => {
					}
				});
			},
			contactAct(){
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'contact';
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			},
			vipcard(){
				uni.navigateTo({
					url:'/pages/client/vipcard/index'
				})
			},
			op(id,mid,lx){
				if(lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/detail?id='+id+'&mid='+mid
					})
				}else if(lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/audio?id='+id+'&mid='+mid
					})
				}else if(lx==3){
					uni.navigateTo({
						url:'/pages/client/tuan/text?id='+id+'&mid='+mid
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/tuan/list?id='+id+'&mid='+mid
					})
				}
			},
			buyAct(){
				if(this.price*1==0){
					uni.showToast({ title: '免费视频不需要购买',icon:"none" });
					return false; 
				}
				if(this.isLogin == false){
					this.showLogin = true;
					this.nextStep = 'buy';
				}else{
					uni.setStorage({//缓存配置信息
						key: 'buydata',  
						data: this.info
					})
					uni.navigateTo({
						url:'/pages/client/tuan/buy?id='+this.id
					})
				}
			},
			loginYes(){
				if(this.nextStep == 'buy'){
					uni.navigateTo({
						url:'/pages/client/tuan/buy'
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/vipcard/adviser'
					})
				}
			},
			changeIndex(index){
				this.selectIndex = index;
			}
		}
	}
</script>

<style>
	.user-not-vip{
		width: 100%;
		height: 80rpx;
		background: #FDF6EC;
		border-radius: 40rpx;
		border: 2rpx solid #EFC381;
		text-align: center;
		line-height: 76rpx;
		font-size: 24rpx;
		color:#000000;
		font-weight: bold;
	}
	
	.tuan-detail-header{
		position: relative;
	}
	.tuan-detail-swiper{
		height: 500rpx;
	}
	.tuan-detail-swiper image{
		width: 100%;
		height: 500rpx;
		background: #F2F2F2;
	}
	.tuan-detail-tit{
		width: 100%;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		position: relative;
		margin-top: -32rpx;
	}
	.tuan-detail-content-tab{
		height: 102rpx;
	}
	.tuan-detail-content{
		min-height: calc(100vh - 600rpx);
		background: #FFFFFF;
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
	.cl-orange1{
		margin-right: 10upx;
		padding: 15upx;
		border: 1px solid #CCCCCC;
	}
	.mini-btn{
		margin-left: 10upx;
		margin-bottom: 10upx;
	}
</style>
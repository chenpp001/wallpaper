<template>
	<view class="">
		<view class="" @touchmove.stop.prevent="a = false" @catchtouchmove="a = false" v-show="!loadFlag">
			<view class="" style="">
				<swiper v-if="detail.types==104 || detail.types==107" style="height: 100vh; width: 100vw; background: #cccccc;" :circular="true" @change="swiperChange" :current="activeCurrent">
					<swiper-item v-for="(item,index) in detail.images" :key="index">
						<image :src="item" @click="cssClick" class="picbqb" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<swiper v-else style="height: 100vh; width: 100vw;" :circular="true" @change="swiperChange" :current="activeCurrent">
					<swiper-item v-for="(item,index) in detail.images" :key="index">
						<image :src="item" @click="cssClick" style="height: 100vh; width: 100vw; display: flex;" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="bottom" :class="cssTran ? 'closeCss' : 'openCss'" v-if="!loadFlag">
				<view class="num">{{indexCurrent}} / {{detail.imageslength}}</view>
				<view class="nav-box">
					<view class="nav-tab" @click="backClick()">
						<image style="width: 50upx; height: 50upx;" :src="staticUrl+'back.png'"></image>
						<text style="font-size: 24upx;">{{fhlj}}</text>
					</view>
					<view class="nav-tab" @click="collectClick()">
						<image style="width: 50upx; height: 50upx;" :src="isColl?staticUrl+'coll_art.png':staticUrl+'coll.png'"></image>
						<text style="font-size: 24upx;">{{isColl?'已收藏':'收藏'}}</text>
					</view>
					<view class="nav-tab" @click="winClick(detail._id)">
						<image style="width: 50upx; height: 50upx;" :src="staticUrl+'duihuan.png'"></image>
						<text style="font-size: 24upx;">下载</text>
					</view>
					<view class="nav-tab" @click="zanClick()">
						<image style="width: 50upx; height: 50upx;" :src="isZan?staticUrl+'zan_art.png':staticUrl+'zan.png'"></image>
						<text style="font-size: 24upx;">{{isZan?'已点赞':'点赞'}}</text>
					</view>
					<view open-type="share" class="nav-tab">
						<image style="width: 50upx; height: 50upx;" :src="staticUrl+'shares.png'"></image>
						<text style="font-size: 24upx;">分享</text>
						<button open-type="share" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
					</view>
				</view>
			</view>
			<!-- <view v-if="tipsShow" style="position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 11;" @click="tipsClick">
				<image src="../../static/tips.png" style="width: 100%;height: 100%;display: flex;" mode="aspectFill"></image>
			</view> -->
		</view>
		<view class="loading_page" v-show="loadFlag"></view>
		<pop  
		    ref="pop" 
		    direction="center" 
		    :is_close="true" 
		    :is_mask="true" 
		    :width="90"  
		    height="fit-content" 
		    :maskFun="true" 
		    @watchOpen="watchOpen" 
		    @watchClose="watchClose"
		>
		<view>
			
			<text class="ffdfgg" v-if="detail.isplay>0" @click="opdownloadFile()">高清下载</text>
			<text class="ffdfgg" v-else @click="duihss()">{{price*1}}积分兑换下载</text>
			<!-- #ifdef MP-WEIXIN -->
			<text class="ffdfgg" @click="adClick()">看广告获取积分</text>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<text class="ffdfgg" @click="adClick()">看广告获取积分</text>
			<!-- #endif -->
			<view class="mt16">
				<!-- #ifdef MP-WEIXIN -->
				<ad v-if="BannerAd" :unit-id="BannerAd"></ad>
				<home-banner v-else :banners="banners"></home-banner>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<home-banner :banners="banners"></home-banner>
				<!-- #endif -->
			</view>
		</view>
		</pop>
		<!-- #ifdef APP-PLUS -->
		<ad-rewarded-video ref="adRewardedVideo" :adpid="adpid" :preload="false" :loadnext="false" :disabled="true"
		    v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
		    <view class="ad-error" v-if="error">{{error}}</view>
		</ad-rewarded-video>
		<!-- #endif -->
	</view>
</template>
<script>
import pop from "@/components/ming-pop/ming-pop.vue";
let videoAd = null;
var w = uni.getSystemInfoSync().windowWidth;
var h = uni.getSystemInfoSync().windowHeight;
export default {
	components: {
		pop
	},
	data() {
		return {
			fhlj:'返回',
			loadFlag: true,
			loginShow: false,
			detail: {},
			staticUrl:'',
			adIntegral: 0,
			downShow: false,
			downIntegral: 0,
			downTitle: '',
			downBtn: '',
			adShow: false,
			
			isColl: false,
			isZan: false,
			zanStatus: true,
			collStatus: true,
			
			cssTran: false,
			indexCurrent: 1,
			activeCurrent: 0,
			videoids:'',
			adpid:'',
			mrcs:5,
			mrcsjrk:0,
			mrcsjr:1,
			id: 0,
			mid: 0,
			isplaytext:'',
			price:0,
			uid:1,
			isfx:0,
			signShow: false,
			signTitle: '',
			w: w,
			h: h,
			banners:[],
			group_id:0,
			BannerAd:'',
		}
	},
	onLoad(e) {
		if(e.fxid){
			uni.setStorage({
				key: 'fxid',  
				data: e.fxid
			})
		}
		if(e.isfx){
			this.isfx=e.isfx
			if(this.isfx==1){
				this.fhlj='首页'
			}
		}
		this.staticUrl=this.configs.staticUrl
		var that = this
		var index =0
		that.indexCurrent = parseInt(index)+1
		that.activeCurrent = parseInt(index)
		that.loadFlag = false
		if(e.id){
			this.id=e.id
			this.getinfo(this.id)
		}
		if(uni.getStorageSync("userinfo")){
			this.uid=uni.getStorageSync("userinfo").id
		}
		// #ifdef MP-WEIXIN
		if(uni.getStorageSync("userinfo")){
			this.group_id=uni.getStorageSync("userinfo").group_id
		}
		if(uni.getStorageSync("config")){
			this.BannerAd=uni.getStorageSync("config").site.weixinxcx.BannerAd
		}
		// #endif
		this.ongrzlTap()
	},
	onShow() {
		this.banners=uni.getStorageSync("config").banner
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(true); 
		// #endif
	},
	onHide() {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(false); 
		// #endif 
	},
	onUnload(){
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(false); 
		// #endif 
	},
	onShareAppMessage(res) {
		var this_=this
	    if (res.from === 'menu') {// 来自页面内分享按钮
	      console.log(res.target)
	    }
	    return {
	      title: '唯美清纯壁纸',
		  channel:true,
	      path: '/pages/client/tuan/infotp?fxid='+this_.uid+'&id='+this_.id+'&isfx=1'
	    }
	},
	methods: {
		async ongrzlTap(){
			let data = {};
			data.token = uni.getStorageSync("userinfo").token;
			data.uid = uni.getStorageSync("userinfo").id;
			uni.request({
				url: this.configs.webUrl+'/api/index/index',
				data: data,
				success: res =>{
					//console.log(res.data.data.config.site.weixinxcx.videoAd)
					// #ifdef APP-PLUS
					this.adpid=res.data.data.config.site.appapi.adpid;//app奖励广告adpid
					// #endif
					// #ifdef MP-WEIXIN
					this.videoids=res.data.data.config.site.weixinxcx.videoAd//微信激励广告videoAd
					// #endif
					var mrcs=res.data.data.config.mrcs
					var mrcsjr=res.data.data.config.mrcsjr
					this.mrcs=mrcs
					if(this.videoids || this.adpid){
						this.mrcsjr=mrcsjr
					}
					this.mrcsjrk=mrcs-mrcsjr
					// #ifdef MP-WEIXIN
					this.adLoad();//加载微信激励广告
					// #endif
					// #ifdef APP-PLUS
					this.$refs.adRewardedVideo.load();//加载app激励广告
					// #endif
				},
				fail: (data, code) => {
					//console.log('fail' + JSON.stringify(data));
				}
			});		
		},
		getinfo(id) {
			uni.showLoading({
			    title: '加载中'
			});
			let data = {};
			data.id=id
			data.mid=this.mid
			if(uni.getStorageSync("userinfo").token){
				data.token=uni.getStorageSync("userinfo").token
				this.isLogin = true
			}
			uni.request({
				url: this.configs.webUrl+'/api/video/infotp',
				data: data,
				success: data => {
						uni.hideLoading();
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
						//this.info=[];
						
						//this.info=data.data
						this.detail = data.data
						if(data.data.isvip>1){
							if(data.data.vipprice*1==0){
								this.isplaytext='VIP免费'
							}
						}else{
							if(data.data.price*1==0){
								this.isplaytext='免费视频'
							}
						}
				},
				fail: (data, code) => {
					uni.hideLoading();
				}
			});
		},

		opdownloadFile(){
			var that=this
			uni.showLoading({
				title: '正在保存图片'
			});
			// 获取图片信息
			var url = that.detail.images[that.indexCurrent-1]
			var extension = url.substring(url.lastIndexOf('.') + 1)
			let fileName = new Date().valueOf();
			console.log(url)
			uni.downloadFile({
				url: url,
				//filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.' + extension,
				success: (res) => {
					var benUrl = res.tempFilePath
					console.log(res)
					//图片保存到本地相册
					uni.saveImageToPhotosAlbum({
						filePath: benUrl,
						//授权成功，保存图片
						success: function(data) {
							uni.hideLoading()
							uni.showModal({
								title: '温馨提示',
								content: '保存成功',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										
									}
								}
							});
						},
						//授权失败
						fail: function(err) {
							if (err.errMsg) {
								console.log(err.errMsg)
								//重新授权弹框确认
								uni.showModal({
									title: '提示',
									content: '无权限，请打开下载权限后再试！',
									showCancel: false,
									success(res) {
										if (res.confirm) {
											//重新授权弹框用户点击了确定
											uni.openSetting({
												//进入小程序授权设置页面
												success(settingdata) {
													if (settingdata.authSetting['scope.writePhotosAlbum']) {
														//用户打开了保存图片授权开关
														uni.saveImageToPhotosAlbum({
															filePath: benUrl,
															success: function(data) {
																uni.hideLoading()
																that.adShow = true
															}
														});
													} else {
														//用户未打开保存图片到相册的授权开关
														uni.showModal({
															title: '温馨提示',
															content: '授权失败，请稍后重新获取',
															showCancel: false
														});
													}
												}
											});
										}
									}
								});
							}
							uni.hideLoading()
						}
					});
				},
				fail: (error) => {
					console.log(error)
				}
			})
		},
		winClick(){
			if(uni.getStorageSync("userinfo").id){
				
			}else{
				uni.showModal({
					title: '温馨提示',
					content: '请先登后下载',
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login'
							})
						} else if (res.cancel) {
							
						}
					}
				});
				return false;
			} 
			var that = this
			var downIntegral=2
			this.$refs.pop.show();
		},
		backClick(){
			console.log(this.isfx)
			if(this.isfx==1){
				uni.switchTab({
					url:'/pages/client/indexpic'
				})
			}else{
				uni.navigateBack()
			}
		},
		collectClick() {
			this.isColl=true
			uni.showToast({
				icon: 'none',
				title: '收藏成功',
				mask: true,
				duration: 1000
			})
		},
		zanClick(){
			this.isZan=true
			uni.showToast({
				icon: 'none',
				title: '点赞成功',
				mask: true,
				duration: 1000
			})
		},
		cssClick() {
			this.cssTran = !this.cssTran
		},
		swiperChange(e){
			this.indexCurrent = e.detail.current + 1
		},
		// 微信激励广告相关代码开始
		// #ifdef MP-WEIXIN
		adLoad(){
			console.log(this.detail.videoids);
			var that = this
			if (wx.createRewardedVideoAd) {
				// 加载激励视频广告
				// #ifdef MP-QQ
				videoAd = wx.createRewardedVideoAd({
					adUnitId: "cbe2baa6cdb9b4f2c75269d000476ee6"
				});
				// #endif
				// #ifdef MP-WEIXIN
				videoAd = wx.createRewardedVideoAd({
					adUnitId: that.videoids//微信广告ID
				});
				// #endif
				//捕捉错误
				videoAd.onError(err => {
					// 进行适当的提示
					console.log('videoAd onError', err);
				});
				// 监听关闭
				videoAd.onClose(status => {
					that.downShow = false
					if ((status && status.isEnded) || status === undefined) {
						// 正常播放结束，下发奖励
						that.admoney()
						console.log('看完广告')
					} else {
						uni.showToast({
							icon: 'none',
							title: '播放中途退出，获取失败',
							mask: true,
							duration: 1000
						})
						// 播放中途退出，进行提示
						console.log('中途退出')
					}
				});
			}
		},
		// #endif
		// 微信激励广告相关代码结束
		adClick(){
			var mrcs=this.mrcs
			if(this.mrcsjrk<=0){
				uni.showModal({
					title: '温馨提示',
					content: '每日只能看'+mrcs+'次',
					showCancel: false,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							//_this.dyxx()
							//uni.navigateBack();
						} else if (res.cancel) {
							
						}
					}
				});
				return false;
			}
			var that = this
			// #ifdef MP-WEIXIN
			if(!that.videoids){
				uni.showToast({ title: 'adUnitId获取失败',icon:"none" });
				return
			}
			if (videoAd) {
				videoAd.show().catch(err => {
				// 失败重试
				// console.log("广告拉去失败")
					videoAd.load().then(() => videoAd.show())
				})
			}
			// #endif
			// #ifdef APP-PLUS
			if(!that.adpid){
				uni.showToast({ title: 'adpid获取失败',icon:"none" });
				return
			}
			if(that.adpid){
				that.$refs.adRewardedVideo.show();
			}
			// #endif
		},
		// app激励广告相关代码开始
		// #ifdef APP-PLUS
		onadload(e) {
		        //this.isLoading = false;
		        console.log('广告数据加载成功');
		      },
		onadclose(e) {
		        const detail = e.detail
		        // 用户点击了【关闭广告】按钮
		        if (detail && detail.isEnded) {
		          // 正常播放结束
				  this.admoney()
		          console.log("onClose " + detail.isEnded);
		        } else {
		          // 播放中途退出
		          console.log("onClose " + detail.isEnded);
		        }
		        //this.isLoading = true;
		        //this.$refs.adRewardedVideo.load();
		},
		onaderror(e) {
		    // 广告加载失败
		    console.log(e.detail);
		    //this.isLoading = false;
		},
		// #endif
		// app激励广告相关代码结束
		async userIntegral(){
			var that = this
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			let data = await uniCloud.callFunction({
				name: 'user_integral',
				data: {
					userId: that.vuex_user._id
				},
			})
			uni.hideLoading()
			if(data.result.success){
				that.getUser()
				that.signTitle = "<p style='font-weight: 550;font-size: 16px;'>观看成功</p><p style='padding-top: 10px;'>获得<span class='num'>"+data.result.integral+"</span>积分</p>"
				that.signShow = true
			}
		},
		watchOpen(){},
		watchClose(){},
		async admoney(){
			var this_=this
			let data = {};
			if(uni.getStorageSync("userinfo").token){
				data.token=uni.getStorageSync("userinfo").token
			}
			let [err,res] =await this.$httpas.get('/api/user/admoney',data);
			if (!this.$httpas.errorCheck(err,res)) return;
			if(res.data.code === 1){
				uni.setStorage({//缓存配置信息
					key: 'config',  
					data: res.data.data
				})
				this.ongrzlTap()
				uni.showModal({
					title: '温馨提示',
					content: '获取成功 是否马上兑换',
					showCancel: true,
					confirmText: "兑换",
					success: function (ress) {
						if (ress.confirm) {
							this_.duihss()
						} else if (ress.cancel) {
							
						}
					}
				});
			}else{
				uni.showToast({ title: '获取失败',icon:"none" });
			}
		},
		duihss(){
			if(this.mrcsjr==0){
				this.adClick()
			}else{
				var this_=this
				let data=this.detail;
				data.sum=1;
				data.buytype='余额';
				data.lx=1;//1 全章购买 2单集购买
				data.smid=0;
				data.namet=data.name
				data.pricebuy=data.price
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id; 
				console.log(data);
				//return false;
				uni.request({
					url: this.configs.webUrl+'/api/pay/videopay',
					data: data,
					success: resa =>{
						//console.log(resa.data);
						if(data.buytype=='微信'){
							if(this.wxlx=='wxxcx' && resa.data.code==1){
								//console.log(resa.data.code);
								this.wxxcx(resa.data.data);
							}else{
								// #ifdef APP-PLUS
								
								uni.navigateTo({
									url:'/pages/client/webva?url='+resa.data.data
								})
								//plus.runtime.openURL(res.data.data);
								// #endif  
								// #ifdef H5
								window.open(resa.data.data, "_self")
								// #endif 
							}
						}else if(data.buytype=='余额'){
							if(resa.data.code==1){
								//pages/user/task/task
								uni.showModal({
									title: '提示',
									content: '兑换成功',
									showCancel: false,
									success: res => {
										this_.getinfo(this.id)
										this_.$refs.pop.close(); 
										this_.opdownloadFile()
										
									}
								});
							}else{
								if(resa.data.msg=='余额不足'){
									uni.showModal({
										title: '提示',
										content: '积分不足，看广告可以获取',
										showCancel: true,
										confirmText: "看广告",
										success: res => {
											this_.adClick()
										}
									});
								}else{
									uni.showModal({
										title: '提示',
										content: resa.data.msg,
										showCancel: false,
										success: res => {
											uni.navigateBack();	
										}
									});
								}
							}
						}
						//thia.okPay(resa)
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			}
		},
	}
}
</script>
<style lang="scss">
	.picbqb{
			width: 200px;
		    height: 200px;
		    
		    display: flex;
		    /* text-align: center; */
		    margin: auto;
		    margin-top: 50%;
		    background: #ffffff;
	}
	.bottom {
		position: fixed;
		left: 4%;
		right: 0;
		width: 92%;
		height: 52px;
		box-shadow: 0 0px 8px rgba(0, 0, 0, 0.06);
		background: rgba(0, 0, 0, 0.94);
		border-radius: 49px;
		z-index: 10;
		opacity: 0.8;
		.num{
			position: absolute;
			top: -20rpx;
			top: -70rpx;
			left: 44%;
			background: rgba(0,0,0,0.6);
			color: #FFF;
			padding: 4rpx 20rpx;
			font-size: 12px;
			border-radius: 36px;
		}
	}

	.nav-tab {
		position: relative;
		width: 100%;
		height: 52px;
		font-size: 12px;
		color: #D8D8D8;
		font-weight: 400;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nav-box {
		/* position: absolute; */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		box-sizing: border-box;
	}

	.openCss {
		animation-name: openLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: 40px;
	}

	@keyframes openLinear {
		0% {
			transform: translateY(92px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	.closeCss {
		animation-name: closeLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: -52px;
	}
	.ffdfgg{
		font-size: 28upx; 
		text-align: center; 
		height: 100upx; 
		line-height: 100upx; 
		display: block;
		background: #f44336;
		color: #fff;
		border-radius: 10upx;
		margin-top: 20upx;
	}
	@keyframes closeLinear {
		0% {
			transform: translateY(-92px);
		}
		100% {
			transform: translateY(0px);
		}
	}
	
	.u-indicator-item-number {
		padding: 6rpx 16rpx;
		line-height: 1;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 100rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}
</style>
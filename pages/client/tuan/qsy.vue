<template>
	<view class="pd16_15">	
		<view>
			<view class="ft14" style="font-weight: 400; height:60upx;">@粘贴分享网址，进行解析，点击下载保存到手机;</view>
			<view class="ft14" style="font-weight: 400; height:60upx;">@图片点开预览长按保存到手机;</view>
			<view class="ft14" style="font-weight: 400; height:60upx;">@支持全网100多家主流平台;</view>
			<view class="ft14" @click="linkTo"  data-link="/pages/client/vipcard/adviser" style="font-weight: 400; height:60upx;">@如遇到问题联系我客服微信: {{weixin}}</view>
		</view>
		<view>
			<!-- #ifdef MP-WEIXIN -->
			<ad v-if="BannerAd" :unit-id="BannerAd"></ad>
			<home-banner v-else :banners="banners"></home-banner>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<home-banner :banners="banners"></home-banner>
			<!-- #endif -->
		</view>
		<view class="uni-searchbar mt16" style="background: #fff; border-radius: 12upx; border: 1px solid #B3B3B3;">
			<view class="uni-searchbar__box"  @click="setzd()">
				<input class="uni-searchbar__box-search-input" type="text" placeholder="请粘贴分享网址点击解析" v-model="jxurl" />
			</view>
			<button class="btn-small" style="width: 120rpx;" @click="duihss()" :style="getBtnStyle">解析</button>
		</view>
		<view class="mt16">
			<video v-if="videosrc && lx==1" class="videoqw" :src="videosrc"></video>
			<view v-else class="flex space" style="display:flex; flex-wrap:wrap;">
				<block v-for="(value,key) in pics" :key="key">
				<view class="box mb15" style="width: 49%; text-align: center; position: relative;">
					<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
					<image class="integral-mall-goods" mode="aspectFit" @tap="onPreviewImage(value)" :src="value"></image>
				</view>
				</block>
			</view>
		</view>
		<view class="mt2">
			<view class="integal-mall-menu flex pt16 pb16">
				<view v-if="videosrc && lx==1" class="col2 text-center" @click="opdownloadFilesp(videosrc)">
					<view>
						<image style="width: 80rpx; height: 80rpx; border-radius: 10upx;"  :src="statics.zsyioc[0]"></image>
					</view>
					<view class="ft14 ftw200 mt6" style="color: #444;">下载视频</view>
				</view>
				<view v-if="lx>0" class="col2 text-center bd-left"  @click="opdownloadFile(photo)">
					<view>
						<image style="width: 80rpx; height: 80rpx; border-radius: 10upx;"  :src="statics.zsyioc[1]"></image>
					</view>
					<view class="ft14 ftw200 mt6" style="color: #444;">下载封面</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/integral/role">
					<view>
						<image style="width: 80rpx; height: 80rpx; border-radius: 10upx;"   :src="statics.zsyioc[2]"></image>
					</view>
					<view class="ft14 ftw200 mt6" style="color: #444;">领取积分</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/vipcard/adviser">
					<view>
						<image style="width: 80rpx; height: 80rpx; border-radius: 10upx;"  :src="statics.zsyioc[3]"></image>
					</view>
					<view class="ft14 ftw200 mt6" style="color: #444;">联系客服</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let videoAd = null;
	export default{
		data(){
			return {
				payType:'weixin',
				num:1,
				coupon_id:0,
				buydata:[],
				buytype:'微信',
				dataList:[],
				money:0,
				mid:0,
				openid:'',
				wxlx:'wxh5',
				weixin:'',
				jxurl:'',
				banners:[],
				group_id:0,
				BannerAd:'',
				videoids:'',
				adpid:'',
				mrcs:5,
				mrcsjrk:0,
				mrcsjr:1,
				id: 0,
				jxjf:0,
				videosrc:'',
				lx:0,
				photo:'',
				pics:[],
				coupons:[
					{coupon_id:1,num:20},
					{coupon_id:2,num:30},
					{coupon_id:3,num:40},
				],
			}
		},
		onLoad(option){
			this.banners=uni.getStorageSync("config").banner
			this.weixin= uni.getStorageSync("config").weixin
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
		
		},
		methods:{
			setzd(){
				var this_=this
				uni.getClipboardData({
					success: function (res) {
						//console.log(res.data);
						this_.jxurl=res.data
					}
				});
			},
			onPreviewImage (source) {
				//if(!this.previewImage) return;
				uni.previewImage({
					current: source,
					urls: this.pics.map(item => (item))
				})
			},
			onPreviewImages (source) {
				//if(!this.previewImage) return;
				uni.previewImage({
					current: source,
					urls: source
				})
			},
			async ongrzlTap(){
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				uni.request({
					url: this.configs.webUrl+'/api/index/index',
					data: data,
					success: res =>{
						//console.log(res.data.data.config.site.weixinxcx.videoAd)
						this.jxjf=res.data.data.config.site.jxjf
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
			linkTo(e){
				if(this.isLogin == false){
					this.showLogin = true;
				}else{
					let link = e.currentTarget.dataset.link;
					uni.navigateTo({
						url:link
					})
				}
			},
			// 微信激励广告相关代码开始
			// #ifdef MP-WEIXIN
			adLoad(){
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
						content: '获取成功 是否马上解析',
						showCancel: true,
						confirmText: "解析",
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
				uni.showLoading({
					title: '解析中'
				});
				if(uni.getStorageSync("userinfo")){
					
				}else{
					uni.showModal({
						title: '温馨提示',
						content: '请先登后下载',
						showCancel: true,
						confirmText: "确定",
						success: function (res) {
							if (res.confirm) {
								uni.hideLoading()
								uni.navigateTo({
									url:'/pages/login/login'
								})
							} else if (res.cancel) {
								
							}
						}
					});
					return false;
				}
				if(!this.jxurl){
					uni.hideLoading()
					uni.showToast({ title: '请粘贴分享网址',icon:"none" });
					return false
				}
				if(this.mrcsjr==0){
					uni.hideLoading()
					this.adClick()
				}else{
					if(this.jxjf==0){
						uni.hideLoading()
						uni.showToast({ title: '解析积分不对',icon:"none" });
						return false
					}
					var this_=this
					let data=[];
					data.price=this.jxjf
					data.jxurl=this.jxurl
					data.token = uni.getStorageSync("userinfo").token;
					data.uid = uni.getStorageSync("userinfo").id; 
					//console.log(data);
					//return false;
					uni.request({
						url: this.configs.webUrl+'/api/user/jxpay',
						data: data,
						success: resa =>{
							uni.hideLoading()
							if(resa.data.code==1){
								this_.lx=resa.data.data.lx
								
								if(resa.data.data.lx==1){
									var str =resa.data.data.voideurl
									if(str.indexOf("http") != -1){
										var voideurl=str;
									}else{
										var voideurl=this.configs.imgUrl+str;
									}
									this_.videosrc=voideurl
								}
								if(resa.data.data.lx==2){
									this_.pics=resa.data.data.pics
								}
								var photod =resa.data.data.photo
								if(photod.indexOf("http") != -1){
									var photo=photod;
								}else{
									var photo=this.configs.imgUrl+photod;
								}
								this_.photo=photo
								uni.showModal({
									title: '提示',
									content: resa.data.msg,
									showCancel: false,
									success: res => {
									}
								});
							}else{
								console.log('fail' + JSON.stringify(data));
							}
							
						},
						fail: (data, code) => {
							uni.hideLoading()
							console.log('fail' + JSON.stringify(data));
						}
					});
				}
			},
			opdownloadFile(url){
				if(!url){
					uni.showToast({ title: '下载地址不对',icon:"none" });
					return false
				}
				var that=this
				uni.showLoading({
					title: '正在保存'
				});
				// 获取图片信息
				//var url = this.videosrc
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
			opdownloadFilesp(url){
				if(!url){
					uni.showToast({ title: '下载地址不对',icon:"none" });
					return false
				}
				var that=this
				uni.showLoading({
					title: '正在保存'
				});
				// 获取图片信息
				//var url = this.videosrc
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
						uni.saveVideoToPhotosAlbum({
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
		}
	}
</script>
<style>
	.videoqw{
		width:100%; height:400upx;
		border-radius: 20upx;
	}
	.videoqwzw{
		width:100%; height:400upx;
		background: #000;
		border-radius: 20upx;
	}
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 5px 10px;
		// background-color: #fff;
	}
	.integral-mall-goods{
		width: 100%;
		height: 350rpx;
		background: #F2F2F2;
		border-radius: 16upx;
	}
	.uni-searchbar__box {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		overflow: hidden;
		position: relative;
		flex: 1;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		height: $uni-searchbar-height;
		padding: 5px 8px 5px 0px;
	}
	
	.uni-searchbar__box-icon-search {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// width: 32px;
		padding: 0 8px;
		justify-content: center;
		align-items: center;
		color: #B3B3B3;
	}
	
	.uni-searchbar__box-search-input {
		flex: 1;
		font-size: 14px;
		color: #333;
	}
	
	.uni-searchbar__box-icon-clear {
		align-items: center;
		line-height: 24px;
		padding-left: 8px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	
	.uni-searchbar__text-placeholder {
		font-size: 14px;
		color: #B3B3B3;
		margin-left: 5px;
	}
	
	.uni-searchbar__cancel {
		padding-left: 10px;
		line-height: $uni-searchbar-height;
		font-size: 14px;
		color: #333333;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
</style>
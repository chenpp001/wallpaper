<template>
	<view>
		<image class="integral-role-header" :src="statics.integralRoleHeader"></image>
		<view class="integral-role-main pd16_15">
			<view class="box pd16_15">
				<!-- #ifdef MP-WEIXIN -->
				<view class="mb16" v-if="BannerAd">
					<ad  :unit-id="BannerAd"></ad>
				</view>
				<!-- #endif -->
				<view class="flex alcenter space pb16 bd-bottom mb16">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[0]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">注册完善资料</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">奖励{{zczsjf}}积分</view>
							</view>
						</view>
					</view>
					<view class="btn-small" :style="getBtnDisStyle" style="width: 148rpx;">已赚到</view>
				</view>
				<view class="flex alcenter space pb16 bd-bottom mb16">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[1]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">邀请好友注册</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">奖励{{yqzc}}积分</view>
							</view>
						</view>
					</view>
					<button open-type="share" class="btn-small" :style="getBtnRoleStyle" style="width: 148rpx;">邀请</button>
				</view>
				<view class="flex alcenter space pb16 bd-bottom mb16">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[2]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">看广告赚积分</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">今日还能看{{mrcsjrk}}次</view>
							</view>
						</view>
					</view>
					<view @click="adClick()" v-if="mrcsjrk>0" class="btn-small" :style="getBtnRoleStyle" style="width: 148rpx;">看广告</view>
					<view @click="adClick()" v-else class="btn-small" :style="getBtnDisStyle" style="width: 148rpx;">已完成</view>
					
				</view>
				<view class="flex alcenter space pb16 bd-bottom mb16">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[3]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">签到奖励积分</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">今日还能签到{{mrqdjrk}}次</view>
							</view>
						</view>
					</view>
					<view @click="qinddao()" v-if="mrqdjrk>0" class="btn-small" :style="getBtnRoleStyle" style="width: 148rpx;">签到</view>
					<view class="btn-small" v-else :style="getBtnDisStyle" style="width: 148rpx;">已完成</view>
					
				</view>
				<!-- <view class="flex alcenter space pb16 bd-bottom mb16">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[4]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">购买特惠套餐</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">奖励对应消费积分</view>
							</view>
						</view>
					</view>
					<navigator url="/pages/client/tuan/index">
					<view class="btn-small" :style="getBtnRoleStyle" style="width: 148rpx;">赚积分</view>
					</navigator>
				</view> -->
				<!-- <view class="flex alcenter space pb16 ">
					<view class="flex alcenter">
						<image :src="statics.integralRoleImg[5]" style="width: 100rpx;height: 100rpx;"></image>
						<view class="ml15">
							<view class="ft14 ftw600">订单评价</view>
							<view class="flex alcenter mt12">
								<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
								<view class="ft12 cl-notice ml5">奖励10积分</view>
							</view>
						</view>
					</view>
					<navigator url="/pages/client/order/index">
					<view class="btn-small" :style="getBtnRoleStyle" style="width: 148rpx;">赚积分</view>
					</navigator>
				</view> -->
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<ad-rewarded-video ref="adRewardedVideo" :adpid="adpid" :preload="false" :loadnext="false" :disabled="true"
		    v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
		    <view class="ad-error" v-if="error">{{error}}</view>
		</ad-rewarded-video>
		<!-- #endif -->
	</view>
</template>

<script>
	let videoAd = null;
	var w = uni.getSystemInfoSync().windowWidth;
	var h = uni.getSystemInfoSync().windowHeight;
	export default{
		data(){
			return {
				group_id:0,
				BannerAd:'',
				adpid:'',
				uid:'',
				videoids:'',
				mrcsjrk:0,
				mrcs:0,
				mrqdjrk:0,
				mrqd:0,
				zczsjf:0,
				yqzc:0
			}
		},
		computed:{
			getBtnRoleStyle(){
				let style = 'background: linear-gradient(135deg, #FFBB00 0%, #FF4D00 100%);color:#ffffff;';
				return  style;
			}
		},
		onLoad(){
			if(uni.getStorageSync("userinfo").id){
				this.uid=uni.getStorageSync("userinfo").id
			}
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("userinfo").group_id){
				this.group_id=uni.getStorageSync("userinfo").group_id
			}
			if(uni.getStorageSync("config").site.weixinxcx.BannerAd){
				this.BannerAd=uni.getStorageSync("config").site.weixinxcx.BannerAd
			}
			if(uni.getStorageSync("config").site.weixinxcx.tanchuAd){
				this.tanchuAd=uni.getStorageSync("config").site.weixinxcx.tanchuAd
			}
			// #endif
			this.ongrzlTap()
		},
		
		onShareAppMessage(res) {
			var this_=this
		    if (res.from === 'menu') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '海量高清手机壁纸，美女帅哥壁纸、头像、表情包',
			  channel:true,
		      path: '/pages/client/indexpic?fxid='+this_.uid
		    }
		},
		methods:{
			async qinddao(){
				if(this.mrqdjrk<=0){
					var mrqd=this.mrqd
					uni.showModal({
						title: '温馨提示',
						content: '每日只能签到'+mrqd+'次',
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
				var this_=this
				let data = {};
				if(uni.getStorageSync("userinfo").token){
					data.token=uni.getStorageSync("userinfo").token
				}
				let [err,res] =await this.$httpas.get('/api/user/qinddao',data);
				if (!this.$httpas.errorCheck(err,res)) return;
				if(res.data.code === 1){
					uni.setStorage({//缓存配置信息
						key: 'config',  
						data: res.data.data
					})
					uni.showModal({
						title: '温馨提示',
						content: '签到成功',
						showCancel: true,
						confirmText: "确定",
						success: function (ress) {
							if (ress.confirm) {
								this_.ongrzlTap()
							} else if (ress.cancel) {
								
							}
						}
					});
				}else{
					uni.showToast({ title: '获取失败',icon:"none" });
				}
			},
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
					uni.showModal({
						title: '温馨提示',
						content: '获取成功',
						showCancel: true,
						confirmText: "确定",
						success: function (ress) {
							if (ress.confirm) {
								this_.ongrzlTap()
							} else if (ress.cancel) {
								
							}
						}
					});
				}else{
					uni.showToast({ title: '获取失败',icon:"none" });
				}
			},
			adClick(){
				if(this.mrcsjrk<=0){
					var mrcs=this.mrcs
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
			// 微信激励广告相关代码开始
			// #ifdef MP-WEIXIN
			adLoad(){
				console.log(this.videoids);
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
						this.zczsjf=res.data.data.config.site.zczsjf
						this.yqzc=res.data.data.config.site.yqzc
						
						var mrcs=res.data.data.config.mrcs
						var mrcsjr=res.data.data.config.mrcsjr
						this.mrcs=mrcs
						this.mrcsjrk=mrcs-mrcsjr
						
						var mrqd=res.data.data.config.mrqd
						var mrqdjr=res.data.data.config.mrqdjr
						this.mrqd=mrqd
						this.mrqdjrk=mrqd-mrqdjr
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
		}
	}
</script>

<style>
	.integral-role-header{
		position: relative;
		width: 100%;
		height: 400rpx;
	}
	.integral-role-main{
		position: relative;
		width: 100%;
		margin-top: -192rpx;
	}
</style>
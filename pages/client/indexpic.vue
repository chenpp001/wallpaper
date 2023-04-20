<template>
	<view>
		<!-- 标题栏和状态栏占位符 -->
		<!-- <view class="titleNview-placing"> </view> -->
		<view class="home-header pd5_15" :style="'background: '+mbgColor+';'">
				<view class="home-mendian flex alcenter space plr15 cl-w9">
					<navigator style="width: calc(100% - 80rpx);" url="/pages/client/tuan/sstp?selectIndex=4">
					<view  class="flex alcenter" style="width: calc(100% - 80rpx);">
						<text class="iconfont  iconsousuo ft14 mr10"></text>
						<text class="text-over ft14" style="width: calc(100% - 60rpx);">请输入搜索内容</text>
					</view>
					</navigator>
					<!-- <text @click="saoma()" class="iconfont iconicon_saoma ft24"></text> -->
				</view>
			<view class="mt10">
				<home-banner :banners="banners"></home-banner>
			</view>
		</view>
		<view class="integral-mall-main plr15" style="margin-top: 140upx;">	
			<view class="integal-mall-menu flex pt16 pb16">
				<view class="col2 text-center" @click="linkTo" data-link="/pages/client/tuan/sstp?selectIndex=4&typeids=98">
					<view>
						<image style="width: 140rpx; height: 80rpx; border-radius: 10upx;" mode="aspectFill" :src="statics.zhuicotp[0]"></image>
					</view>
					<view class="ft14 ftw600 mt6" style="color: #444;">小姐姐</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/sstp?selectIndex=4&typeids=101">
					<view>
						<image style="width: 140rpx; height: 80rpx; border-radius: 10upx;" mode="aspectFill"  :src="statics.zhuicotp[1]"></image>
					</view>
					<view class="ft14 ftw600 mt6" style="color: #444;">小哥哥</view>
				</view>
				<!-- /pages/client/integral/role -->
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/sstp?selectIndex=4&typeids=104">
					<view>
						<image style="width: 140rpx; height: 80rpx; border-radius: 10upx;" mode="aspectFill"  :src="statics.zhuicotp[2]"></image>
					</view>
					<view class="ft14 ftw600 mt6" style="color: #444;">精品头像</view>
				</view>
				<view class="col2 text-center bd-left"  @click="linkTo"  data-link="/pages/client/tuan/sstp?selectIndex=4">
					<view>
						<image style="width: 140rpx; height: 80rpx; border-radius: 10upx;" mode="aspectFill"  :src="statics.zhuicotp[3]"></image>
					</view>
					<view class="ft14 ftw600 mt6" style="color: #444;">全部壁纸</view>
				</view>
			</view>
			
			<view class="mt24" v-if="dataindex[4]">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.zhuico[5]"></image>
						<text class="ft16 ftw600 cl-main ml15">推荐壁纸</text>
					</view>
					<navigator url="/pages/client/tuan/sstp?selectIndex=4">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				
				<view class="mt16 flex space">
					<block v-for="(value,key) in dataindex[4]" :key="key" v-if="key<3">
					<view class="box" style="width: 32%; position: relative;" @click="detail(value.id,value.lx)">
						<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
						<image class="integral-mall-goods" mode="aspectFill" :src="value.img"></image>
					</view>
					</block>	
					
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="ad-view" ad-width="100%">
			<ad :adpid="xxladpid"></ad>
		</view>
		<!-- #endif -->
		<view class="integral-mall-main plr15" style="margin-top: 20upx;">
			<view class="mt24 mb20">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" :src="statics.zhuico[2]"></image>
						<text class="ft16 ftw600 cl-main ml15">最新壁纸</text>
					</view>
					<navigator url="/pages/client/tuan/sstp?selectIndex=4">
					<view class="ft14 cl-notice">更多</view>
					</navigator>
				</view>
				<sub-tabvsw class="pt5" v-if="type4tab[1]" :tabs="type4tab" @change="changetype4" :selectIndex="selecttype4"></sub-tabvsw>
				<view class="mt20 flex space" style="display:flex; flex-wrap:wrap;">
					<block v-for="(value,key) in listData" :key="key">
					<!-- #ifdef MP-WEIXIN -->
					<view class="mb10" v-if="key==6 && BannerAd" style="width: 100%;">
						<ad :unit-id="BannerAd"></ad>
					</view>	
					<!-- #endif -->
					<view class="box pic-item" v-if="type4id==104 || type4id==107"  @click="detail(value.id,value.lx)">
						<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
						<image class="integral-mall-goodstx" mode="aspectFill" :src="value.img"></image>
					</view>
					<view class="box pic-item" v-else  @click="detail(value.id,value.lx)">
						<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
						<image class="integral-mall-goods" mode="aspectFill" :src="value.img"></image>
					</view>
					</block>
				</view>
				<uni-load-more :status="status" :content-text="contentText" />
			</view>
		</view>	
		<!-- <home-default :datasa="datasa"></home-default>
		<!-- <com-footer model="index"></com-footer> --> -->
	</view>
</template>
<script>
	export default{
		data(){
			return {
				group_id:0,
				BannerAd:'',
				tanchuAd:'',
				interstitialAd:'',
				xxladpid:'',//banner信息流
				navLock:false,
				datasa:[],
				showdyxx:true,
				dataconfig:[],
				banners:[],
				datainfo:[],
				dataindex:[],
				
				type4tab:[],
				selecttype4:0,
				type4id:'',
				
				mbgColor:this.$mbgColor,
				uid:'',
				listData:[],
				total:0,
				pageSize:10,
				last_id: 0,
				reload: true,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有数据了'
				}
			}
		},
		computed:{
			
		},
		onPageScroll(e){
			if(e.scrollTop > 44){
				if(this.navLock == false){
					this.navLock = true;
					uni.setNavigationBarColor({
						frontColor:"#000000",
						backgroundColor:"#FFFFFF",
						complete:()=>{
							this.navLock = false;
						}
					});
				}
			}else{
				if(this.navLock == false){
					this.navLock = true;
					let this_=this
					uni.setNavigationBarColor({
						frontColor:"#ffffff",
						backgroundColor:this_.mbgColor,
						complete:()=>{
							this.navLock = false;
						}
					});
				}
			}
		},
		onReachBottom() {
			var this_=this
			this.status = 'loading';
			if(this.last_id>0){
				setTimeout(function() {
				    this_.getList1();
				},500)
			}
		},
		onLoad(e){
			if(e.fxid){
				uni.setStorage({
					key: 'fxid',  
					data: e.fxid
				})
			}
			if(uni.getStorageSync("userinfo")){
				this.uid=uni.getStorageSync("userinfo").id
				this.group_id=uni.getStorageSync("userinfo").group_id
			}
			this.getList(4,2);
			this.getList1();
		},
		onShow() {
			
		},
		onPullDownRefresh(){
			uni.showLoading({
			    title: '加载中'
			});
			this.listData=[]
			this.last_id=0
			this.reload=true
			this.getList1()
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
			getList(lx,ishot) {
				let this_=this
				let data = {};
				var limit=15;
				if(lx){
					data.limit=4
					data.lx=lx
					if(lx==5){
						data.limit=30	
						data.lx=4
					}
				}else{
					data.limit=limit
				}
				if(ishot>0){
					data.ishot=ishot
				}
				if(this.type4id){
					data.typeid=this.type4id
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						//console.log(data.data)
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						this.banners=data.data.config.banner
						if(data.data.config.name){
							uni.setNavigationBarTitle({
							    title: data.data.config.name
							});
						}
						//广告开始
						// #ifdef MP-WEIXIN
						if(data.data.config.site.weixinxcx.BannerAd){
							this.BannerAd=data.data.config.site.weixinxcx.BannerAd
						}
						if(data.data.config.site.weixinxcx.tanchuAd){
							this.tanchuAd=data.data.config.site.weixinxcx.tanchuAd
						}
						if(this.tanchuAd){
							this.interstitialAd=wx.createInterstitialAd({
							    adUnitId: this.tanchuAd
							})
							this.interstitialAd.show().catch((err) => {
							    console.error(err)
							})
						}
						// #endif
						// #ifndef MP-WEIXIN
						if(data.data.config.site.appapi.xxladpid){
							this.xxladpid=data.data.config.site.appapi.xxladpid
							console.log(this.xxladpid)
						}
						// #endif
						//广告结束
						
						if(data.data.config.mbgColor){
							this.mbgColor=data.data.config.mbgColor
							uni.setNavigationBarColor({
								frontColor:"#ffffff",
								backgroundColor:this_.mbgColor,
								complete:()=>{
									this.navLock = false;
								}
							});
						}
						this.type4tab=data.data.typedata.type4
						console.log(this.type4tab)
						if (data.data.total>0) {
							this.dataconfig=data.data.config
							if(lx){
								this.dataindex[lx]=data.data.rows
							}else{
								this.datasa=data.data.rows
							}
						}
					},
					fail: (data, code) => {
					}
				});
			},
			getList1() {
				// #ifdef MP-WEIXIN
				console.log(this.last_id)
				if(this.last_id>0 && this.last_id%5==0){
					if(this.tanchuAd && this.interstitialAd){
						this.interstitialAd.show().catch((err) => {
						    console.error(err)
						})
					}
				}
				// #endif
				var lx=4
				let this_=this
				let data = {};
				var limit=15;
				if (this.last_id>0) {//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.offset = this.last_id*limit;
					data._ = new Date().getTime() + '';
				}
				data.limit=limit
				data.lx=lx
				if(this.type4id){
					data.typeid=this.type4id
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						setTimeout(function() {
						    uni.hideLoading();  
						},150)
						//console.log(data.data)
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						this.banners=data.data.config.banner
						this.type4tab=data.data.typedata.type4
						//console.log(this.type4tab)
						if (data.data.total>0) {
							let list = data.data.rows;
							this.listData = this.reload ? list : this.listData.concat(list);
							this.reload = false;
							this.last_id = this.last_id+1;
							if(data.data.total<this.last_id*limit){
								this.status = '';
							}
						}else{
							this.listData=[];
							this.contentText.contentdown='没有数据'
							this.status=''
							
						}
					},
					fail: (data, code) => {
						uni.stopPullDownRefresh();
						setTimeout(function() {
						    uni.hideLoading();  
						},150)
					}
				});
			},
			changetype4(index){
				this.selecttype4 = index;
				this.type4id=this.type4tab[index].id
				this.listData=[]
				this.last_id=0
				this.reload=true
				this.getList1()
			},
			saoma(){
				//#ifdef APP-PLUS  
				uni.scanCode({
				    success: function (res) {
						if(res.result.indexOf("uid") != -1){
							var obj = JSON.parse(res.result); 
							if(obj.uid){
								uni.navigateTo({
									url:'/pages/login/reg?uid='+obj.uid
								})
							}	
						}else{
							uni.showToast({ title: res.result,icon:"none" });	
						}	
				    }
				});
				//#endif
				
			},
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
			onadload(e) {
			      console.log('广告数据加载成功');
			    },
			    onadclose(e) {
					 console.log("onadclose",e);
			    },
			    onaderror(e) {
			      // 广告加载失败
			      console.log("onaderror: ", e.detail);
			    },
			exchange(e){
				if(this.isLogin == false){
					this.showLogin = true;
				}else{
					let id = e.currentTarget.dataset.id;
					uni.navigateTo({
						url:'/pages/client/integral/exchange?id='+id
					})
				}
			},
		},
	}
</script>

<style>
	.home-header{
		height: 200rpx;
		width: 100%;
		position: relative;
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
	.integral-mall-header{
		position: relative;
		height: 320rpx;
	}
	.integral-mall-header .bg{
		width: 100%;
		height: 320rpx;
	}
	.integral-mall-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 320rpx;
	}
	.swiper-integral{
		height: 32rpx;
		width: 100%;
	}
	.integral-mall-main{
		position: relative;
		margin-top: -104rpx;
	}
	.integal-mall-menu{
		width: 100%;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
		border-radius: 16rpx;
	}
	
	
	.integral-mall-coupon{
		height: 408rpx;
		width: 330rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.integral-mall-coupon  .top{
		padding: 0rpx 0rpx 24rpx 0rpx;
		border-bottom: 2rpx dashed #FEC675;
	}
	.integral-mall-coupon  .y-l,.integral-mall-coupon  .y-r{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background: #F5F6FA;
		position: absolute;
		z-index: 2;
		top: 284rpx;
	}
	.integral-mall-coupon  .y-l{
		left: -10rpx;
	}
	.integral-mall-coupon  .y-r{
		right: -10rpx;
	}
	.integral-mall-coupon   .coupon-value{
		width: 100%;
		height: 250rpx;
		position: relative;
	}
	.integral-mall-coupon  .coupon-value image{
		width: 100%;
		height: 180rpx;
	}
	.integral-mall-coupon  .coupon-value .num{
		width: 100%;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	.integral-mall-goods{
		width: 100%;
		height: 350rpx;
		background: #F2F2F2;
		border-radius: 16upx;
	}
	.integral-mall-goodstx{
		width: 100%;
		height: 230rpx;
		background: #ffffff;
		border-radius: 16upx;
	}
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}
	/* 商品列表 */
	.pic-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;

	}
	.pic-item{
		display:flex;
		flex-direction: column;
		width: 32%;
		margin-bottom: 20upx;
	}
</style>
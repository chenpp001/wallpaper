<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		<view class="box over-hide">
			<view class="recharge-header">
				<image :src="statics.moneyRecharge"></image>
				<view class="main pd24_20">
					<view class="ft16 cl-w9">当前余额</view>
					<view class="mt16 ftw600 ft32 cl-w">{{userinfo.money}}</view>
				</view>
			</view>
			<navigator url="/pages/client/vipcard/moneylog">
				<view class="pd16_15 flex alcenter space">
					<text class="ft14 ftw600 cl-main">余额明细 </text>
					<text class="iconfont iconicon_arrow_circle ft20" :style="{color:tempColor}"></text>
				</view>
			</navigator>
		</view>
		
		<radio-group  @change="changeNum">
			<view class="flex wrap space mt16">
				<view v-for="(item,index) in moneyList" :key="index"  :class="index > 1 ? 'mt16' : ''" class="box pd20_15 flex alcenter space" style="width: 330rpx;">
					<text class="ft16 cl-main ftw600">¥{{item.num}}</text>
					<radio :value="item.num" :checked="num == item.num"  :color="tempColor" />
				</view>
			</view>
		</radio-group>
		<radio-group  @change="changetd" style="display: none;">
			<view class="mt16">
				<view v-for="(item,index) in tdList" :key="index"  :class="index >= 1 ? 'mt16' : ''" class="box pd20_15 flex alcenter space">
					<text class="ft16 cl-main ftw600">{{item.name}}</text>
					<radio :value="item.num" :checked="tdnum == item.num"  :color="tempColor" />
				</view>
			</view>
		</radio-group>
		<view v-if="getCoupon > 0" class="mt16 tag-coupon" :style="getTagStyle">
			送价值{{getCoupon}}元优惠券
		</view>
		<view class="list-call" style="margin-top: 40upx;">
		  <input class="sl-input tdadf" v-model="num" type="number" placeholder="自定义金额" />
		</view>
		<view class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15">
					<!-- <button style="width: 49%; float: left;" @click="paykami" class="btn-big">卡密充值</button> -->
					<button style="width: 100%; float: right;" @click="paySuccess" class="btn-big" :style="getBtnStyle">支付 {{num>0?'¥'+num:''}}</button>
				</view>
			</view>
		</view>
		<hFormAlert v-if="cancelShow" title="卡密充值"  name="cancel_desc" placeholder="请输入卡密卡号" @confirm="confirm" @cancel="cancel"></hFormAlert>
		<dialog-couponshare v-if="showCouponInvite" @closed="closedInvite"></dialog-couponshare>
		<!-- #endif -->
	</view>
</template>

<script>
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
	export default{
		components: {hFormAlert},
		data(){
			return {
				num:'',
				moneyList:[
					{num:'30',coupon:0},
					{num:'50',coupon:0},
					{num:'100',coupon:0},
					{num:'200',coupon:0},
				],
				tdnum:'901',
				openid:'',
				tdList:[
					{num:'901',name:'微信H5(50-100-200)'},
					{num:'904',name:'支付宝H5(30-50-100-200)'},
				],
				numa:'',
				userinfo:'',
				showCouponInvite:false,
				cancelShow:false,
			}
		},
		computed:{
			getCoupon(){
				for(var  a in this.moneyList){
					if(this.moneyList[a].num == this.num){
						return this.moneyList[a].coupon;
					}
				}
				return 0;
			}
		},
		onLoad(e){
			if(e.price){
				this.num=e.price
			}
			//#ifdef MP-WEIXIN
			this.wxlogin()
			//#endif
		},
		onShow() {
			this.ongrzlTap();
		},
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		methods:{
			changeNum(e){
				this.num = parseInt(e.detail.value);
			},
			changetd(e){
				this.tdnum = e.detail.value;
			},
			
			paykami(){
				this.cancelShow=true
			},
			cancel(){
				this.cancelShow=false
			},
			confirm(e){
				console.log(e.cancel_desc);
				if(!e.cancel_desc){
					this.cancelShow=false
					uni.showToast({ title: '请输入卡密',icon:"none" });
					return false
				}
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				data.crd = e.cancel_desc;
				
				uni.request({
					url: this.configs.webUrl+'/api/user/kami',
					data: data,
					success: res =>{
						if(res.data.code==1){
							this.userinfo.money=res.data.data.userinfo.money
							uni.showToast({ title: res.data.msg,icon:"none" });
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});	
				this.cancelShow=false
			},
			paySuccess(){
				//#ifdef MP-WEIXIN
				this.paywxxcx()
				//#endif
				//#ifndef MP-WEIXIN
				this.paySuccessa()
				//#endif
			},
			paywxxcx(){
				if(!this.num){
					uni.showToast({ title:'金额不对',icon:"none" });
					return false
				}
				if(!this.openid){
					uni.showToast({ title:'Openid味加载',icon:"none" });
					return false
				}
				uni.showLoading({
				    title: 'Loading'
				});
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.total = this.num;
				data.tdnum = this.tdnum;
				data.openid = this.openid;
				uni.request({
					url: this.configs.webUrl+'/api/paywx/paywxxcx',
					data: data,
					success: res =>{
						console.log(res.data);
						if(res.data.code==1){
							uni.hideLoading();
							uni.requestPayment({
							    "provider": 'wxpay',
								"appId": res.data.data.appId,
								"timeStamp": res.data.data.timeStamp+'',
								"nonceStr": res.data.data.nonceStr,
								"package": res.data.data.package,
								"signType": 'MD5',
								"paySign": res.data.data.sign,
								success: function (res1) {
									uni.showModal({
										title: '温馨提示',
										content: '支付成功',
										showCancel: false,
										confirmText: "确定",
										success: function (res) {
											if (res.confirm) {
												this.ongrzlTap();
											} else if (res.cancel) {
												
											}
										}
									});
									//uni.showToast({ title: '支付成功',icon:"none" });
									console.log('success:' + JSON.stringify(res1));
								},
								fail: function (err1) {
									uni.showModal({
										title: '支付失败',
										content: JSON.stringify(err1),
										showCancel: false,
										confirmText: "确定",
										success: function (res) {
											if (res.confirm) {
												//uni.navigateBack();
											} else if (res.cancel) {
												
											}
										}
									});
									//uni.showToast({ title: JSON.stringify(err1),icon:"none" });
									console.log('fail:' + JSON.stringify(err1));
								}
							});
						}else{
							uni.hideLoading();
							uni.showModal({
								title: '温馨提示',
								content: JSON.stringify(res.data),
								showCancel: false,
								confirmText: "确定",
								success: function (res) {
									if (res.confirm) {
										uni.navigateBack();
									} else if (res.cancel) {
										
									}
								}
							});
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			paySuccessa(){
				if(!this.num){
					uni.showToast({ title:'金额不对',icon:"none" });
					return false
				}
				uni.showLoading({
				    title: 'Loading'
				});
				let data = {};
				data.iswx = '';
				//#ifdef H5
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
					data.iswx = 'wxgzh';
				}
				//#endif
				data.token = uni.getStorageSync("userinfo").token;
				data.total = this.num;
				data.tdnum = this.tdnum;
				// uni.showToast({ title:data.iswx,icon:"none" });
				// return false
				uni.request({
					url: this.configs.webUrl+'/api/paywx/paywxh5',
					data: data,
					success: res =>{
						console.log(res);
						if(res.data.code==1){
							uni.hideLoading();
							console.log(res.data.data);
							// #ifdef APP-PLUS  
							
							uni.navigateTo({
								url:'/pages/client/webva?url='+res.data.data
							})
							//plus.runtime.openURL(res.data.data);
							// #endif  
							// #ifdef H5
							window.open(res.data.data, "_self")
							// #endif 
							///index/paydsf?out_trade_no=2206131027251
							//uni.showToast({ title: res.data.msg,icon:"none" });
						}else{
							uni.hideLoading();
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			async ongrzlTap(){
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				uni.request({
					url: this.configs.webUrl+'/api/user/index',
					data: data,
					success: res =>{
						if(res.data.code==1){
							let ionfo=res.data.data
							ionfo.isLogin=true
							this.userinfo=ionfo
							this.jfdt=ionfo.config.jfdt?ionfo.config.jfdt:''
							uni.setStorage({//缓存配置信息
								key: 'userinfo',  
								data: res.data.data
							})
							if(res.data.data.avatar){
									var str = res.data.data.avatar;
									if(str.indexOf("data:image") != -1){
										this.avatar='';
									}else{
										if(str.indexOf("http") != -1){
											this.avatar=res.data.data.avatar;
										}else{
											this.avatar=this.configs.imgUrl+res.data.data.avatar;
										}
									}
								}else{
									this.avatar='';
								}
								uni.setStorage({//缓存配置信息
									key: 'avatar',  
									data: this.avatar
								})
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});		
			},
			closedInvite(){
				this.showCouponInvite = false;
				let pages = getCurrentPages();
				uni.navigateBack({
					delta:pages.length
				});
			},
			wxlogin(){
				var this_=this
					  uni.login({
					       timeout: 10000,
					        provider: 'weixin',  //如果是uniapp，在这里需要标明平台的类型，支持的参数请查阅uniapp官网的uni.login()文档
					        success: (res) => {
								console.log(res);
					  			//登陆成功的回调
								uni.request({  
								      url: this.configs.webUrl+'/api/user/getOpenid',  
								      method:'GET',  
								      data: {   
								          token: uni.getStorageSync("userinfo").token,       //你的小程序的secret,  
								          code: res.code                                      //wx.login 登录成功后的code  
								      },  
								      success: (cts) => {  
								          console.log(cts.data.code);
										  if(cts.data.code==1){
											  this_.openid=cts.data.data.openid
										  }else{
											  uni.showModal({
											  	title: '温馨提示',
											  	content: JSON.stringify(cts.data),
											  	showCancel: false,
											  	confirmText: "确定",
											  	success: function (res) {
											  		if (res.confirm) {
											  			uni.navigateBack();
											  		} else if (res.cancel) {
											  			
											  		}
											  	}
											  });
										  }
								      },
									  fail: (err1) => {
									  	console.log(err1);
									     	//失败的回调
									  }
								});  
			
					  	  },
					        fail: (err) => {
								console.log(err);
					           	//登陆失败的回调
					        }
					  })
			}
		}
	}
</script>

<style>
	.tag-coupon{
		width: 100%;
		height: 80rpx;
		border-radius: 16rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.recharge-header{
		height: 240rpx;
		width: 100%;
		position: relative;
	}
	.recharge-header image{
		width: 100%;
		height: 240rpx;
	}
	.recharge-header .main{
		position: absolute;
		width: 100%;
		height: 240rpx;
		left: 0;
		top: 0;
	}
	.tdadf{
		border: 1px solid #f8f8f8; 
		padding: 10px 10px; 
		text-align: center;
		height: 80upx;
		background: #ffffff; 
		border-radius: 8px; 
		box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);
		font-size: 30upx;
		color: #666;
	}
</style>
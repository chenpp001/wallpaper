<template>
	<view class="pd16_15">	
	<!-- #ifndef MP-WEIXIN -->
		<view class="box pd16_15 flex">
			<image class="tuan-buy-l" :src="buydata.img" mode="aspectFill"></image>
			<view class="tuan-buy-r pl15">
				<view v-if="mid>0" class="ft14 ftw600 cl-main">{{buydata.name}}【单集购买】【{{buydata.ji}}ID：{{mid}} 】</view>
				<view v-else class="ft14 ftw600 cl-main">{{buydata.name}}</view>
				<view v-if="mid>0" class="mt12 alcenter">
					<view>
						<text class="ft14 cl-orange">单集会员价：</text>
						<text class="ft16 cl-orange ftw600">¥{{buydata.vippriced}}</text>
					</view>
					<view>
						<text class="ft14 cl-notice">单集普通价：</text>
						<text class="ft14 cl-notice text-line">¥{{buydata.priced}}</text>
					</view>
				</view>
				<view v-else class="mt12 alcenter">
					<view>
						<text class="ft14 cl-orange">全集会员价：</text>
						<text class="ft16 cl-orange ftw600">¥{{buydata.vipprice}}</text>
					</view>
					<view>
						<text class="ft14 cl-notice">全集普通价：</text>
						<text class="ft14 cl-notice text-line">¥{{buydata.price}}</text>
					</view>
					
				</view>
			</view>
		</view>
		<view class="box mt16 pd16_15">
			<!-- <view class="flex alcenter center">
				<text class="iconfont iconbtn_plus ft32" @click="jianAct" style="color: #5C5E66;"></text>
				<view class="ft16 ftw600 cl-main" style="width: 100rpx; text-align: center;">{{num}}</view>
				<text class="iconfont iconbtn_add ft32"   @click="jiaAct"  :style="{color:tempColor}"></text>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info2">优惠券</text>
				<view>
					<select-coupon v-model="coupon_id" :coupons="coupons"></select-coupon>
				</view>
			</view>
			<view class="bd-line mt16 mb16"></view>
			<view class="flex alcenter space">
				<text class="ft14 cl-info2">会员优惠</text>
				<text class="ft16 cl-main ftw600">-¥20</text>
			</view>
			<view class="bd-line mt16 mb16"></view> -->
			<view class="flex alcenter space">
				<text class="ft14 cl-info2">需支付</text>
				<text v-if="mid>0" class="ft16 cl-main ftw600 cl-orange">¥{{buydata.pricedbuy}}</text>
				<text v-else class="ft16 cl-main ftw600 cl-orange">¥{{buydata.pricebuy}}</text>
				
			</view>
		</view>
	
		<view class="box mt16 pd16_15">
			<view class="ft16 pb16 ftw600 cl-main">支付方式</view>
			<view class="bd-line mt16"></view>
			<radio-group @change="changeType">
				<view class="pt16 pb16 flex alcenter space">
					<view class="flex alcenter">
						<text class="iconfont iconicon_pay_balance ft32 cl-green"></text>
						<text class="ml15 ft14 ftw500 cl-main">微信支付</text>
					</view>
					<view>
						<radio value="weixin" :checked="payType ==  'weixin'" :color="tempColor"  />
					</view>
				</view>
				<view class="bd-line"></view>
			<view class="pt16 flex alcenter space">
				<view class="flex alcenter">
					<text class="iconfont iconicon_pay_balance ft32" style="color: #FFBD1E;"></text>
					<text class="ml15 ft14 ftw500 cl-main">余额支付</text>
					<!-- <text class="ml10 ft12 cl-notice">余额为0，不可用</text> -->
				</view>
				<view>
					<radio value="money" :checked="payType ==  'money'" :disabled="false" :color="tempColor"  />
				</view>
			</view>
			
			
			</radio-group>
		</view>	
		<view class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15">
					<button v-if="mid>0" class="btn-big" @click="okTap" :style="getBtnStyle">支付 ¥{{buydata.pricedbuy}}</button>
					<button v-else class="btn-big" @click="okTap" :style="getBtnStyle">支付 ¥{{buydata.pricebuy}}</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
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
				coupons:[
					{coupon_id:1,num:20},
					{coupon_id:2,num:30},
					{coupon_id:3,num:40},
				],
			}
		},
		onLoad(option){
			if(option.mid){
				this.mid=option.mid
			}
			this.buydata=uni.getStorageSync("buydata") 
			//#ifdef MP-WEIXIN
			this.wxlx='wxxcx'
			this.wxlogin()
			//#endif
			//#ifdef H5
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
					this.wxlx = 'wxgzh';
				}
			//#endif
		},
		onShow() {
			if(uni.getStorageSync("userinfo").token){
				this.ongrzlTap()
				this.money=uni.getStorageSync("userinfo").money
			}else{
				uni.showModal({
					title: '温馨提示',
					content: '请先登录',
					showCancel: true,
					confirmText: "登录",
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login'
							})						
						} else if (res.cancel) {
							uni.navigateBack();						
						}
					}
				});
			}
		},
		computed:{
			getCouponMoney(){
				if(this.coupons.length > 0){
					for(var a  in this.coupons){
						if(this.coupons[a].coupon_id == this.coupon_id){
							return this.coupons[a].num;
						}
					}
				}
				return 0;
			}
		},
		methods:{
			okTap(){
				var thia=this
				this.dataList=this.buydata;
				this.dataList.sum=1;
				this.dataList.buytype=this.buytype;
				//https://rw.gzzsw.cn/api/pay/index?token=a69720a4-6c4c-4baf-b269-d5260b821c7a
				let data = this.dataList;
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id; 
				if(this.mid>0){
					data.lx=2;//1 全章购买 2单集购买
					data.smid=this.mid;
					data.namet=data.name+'【单集购买】'+data.ji+'【ID：'+this.mid+' 】';
				}else{
					data.lx=1;//1 全章购买 2单集购买
					data.smid=0;
					data.namet=data.name
				}
				data.wxlx=this.wxlx;
				data.openid=this.openid;
				data.info=[];
				console.log(data)
				uni.request({
					url: this.configs.webUrl+'/api/pay/videopay',
					data: data,
					success: resa =>{
						//console.log(resa.data);
						if(thia.dataList.buytype=='微信'){
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
						}else if(thia.dataList.buytype=='余额'){
							if(resa.data.code==1){
								//pages/user/task/task
								uni.showModal({
									title: '提示',
									content: resa.data.msg,
									showCancel: false,
									success: res => {
										uni.navigateBack();	
									}
								});
							}else{
								if(resa.data.msg=='余额不足'){
									uni.showModal({
										title: '提示',
										content: resa.data.msg,
										showCancel: true,
										confirmText: "充值",
										success: function (res) {
											if (res.confirm) {
												if(thia.mid>0){
													var pricebuy=thia.buydata.pricedbuy
												}else{
													var pricebuy=thia.buydata.pricebuy
												}
												uni.navigateTo({
													url:"/pages/client/vipcard/recharge?price="+pricebuy*1
												})
											} else if (res.cancel) {
												//uni.navigateBack();
											}
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
			},
			wxxcx(data){
				uni.requestPayment({
				    "provider": 'wxpay',
					"appId": data.appId,
					"timeStamp": data.timeStamp+'',
					"nonceStr": data.nonceStr,
					"package": data.package,
					"signType": 'MD5',
					"paySign": data.sign,
					success: function (res1) {
						uni.showModal({
							title: '温馨提示',
							content: '支付成功',
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									uni.navigateBack();	
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
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});		
			},
			jianAct(){
				if(this.num == 1) return;
				this.num = this.num - 1;
			},
			jiaAct(){
				if(this.num > 99) return; //后面改为库存数量
				this.num = this.num + 1;
			},
			changeType(e){
				this.payType = e.detail.value;
				if(e.detail.value=='money'){
					this.buytype = '余额';
				}
				if(e.detail.value=='weixin'){
					this.buytype = '微信';
				}
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
	.tuan-buy-l{
		width: 200rpx;
		height: 150rpx;
		background: #F2F2F2;
	}
	.tuan-buy-r{
		width: calc(100% - 200rpx);
	}
</style>
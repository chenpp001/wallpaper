<template>
  <view class="content" v-if="idfd==1">
    <view class="header">
      <image src="../../static/shilu-login/logo.png"></image>
    </view>
	<!-- #ifndef MP-WEIXIN -->
    <view class="list">
      <view class="list-call">
        <image class="img" src="/static/shilu-login/1.png"></image>
        <input class="sl-input" v-model="mobile" type="number" maxlength="11" placeholder="输入手机号" />
      </view>
      <view class="list-call">
        <image class="img" src="/static/shilu-login/2.png"></image>
        <input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
      </view>
    </view>
    <view class="button-login" hover-class="button-hover" @tap="bindLogin()">
      <text style="font-size: 40upx;">登录</text>
    </view>
	<view class="agreenment">
	  <navigator url="reg" open-type="navigate">注册账户</navigator>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<!-- <view  class="list" style="margin-top: 10px; color: #666; font-size: 14px;text-align: center;">openid：{{openid}}</view> -->
	<button class="button-login" @click="getUserInfo1()" style="margin-top:80rpx; font-size: 26upx; color: #fff; height: 80rpx; line-height: 80rpx;">获取微信授权</button>
	<!-- #endif -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        mobile: '',
        password: '',
		openid:'',
		unionid:'',
		userinfowx:'',
		idfd:1,
      };
    },
	onLoad(e) {
		if(e.fxid){
			uni.setStorage({
				key: 'fxid',  
				data: e.fxid
			})
		}
		//#ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				this.idfd=0
				window.open(this.configs.webUrl+'/login.php', "_self")
			}
		//#endif
	},
    methods: {
		dyxx(){
			//#ifdef MP-WEIXIN
			uni.requestSubscribeMessage({
			  tmplIds: ['wAqsuRFgYS9XBJ2OmBgVYgZ-YrpOkS0dfo-WxQuv41c'],
			  success (res) {
				  /*uni.showModal({
				  	title: '提醒',
				  	content: JSON.stringify(res),
				  	showCancel: false,
				  	confirmText: "确定",
				  	success: function (res) {
				  		if (res.confirm) {
				  			//uni.navigateBack();
				  		} else if (res.cancel) {
				  			
				  		}
				  	}
				  });*/
			  },
			  fail: (data) => {
				  uni.showModal({
				  	title: '提醒',
				  	content: JSON.stringify(data),
				  	showCancel: false,
				  	confirmText: "确定",
				  	success: function (res) {
				  		if (res.confirm) {
				  			//uni.navigateBack();
				  		} else if (res.cancel) {
				  			
				  		}
				  	}
				  });
			  }
			})
			//#endif
		},
      async bindLogin() {
		  
		let _this =this
        if(!this.mobile){
        	uni.showToast({ title: '手机号不能为空',icon:"none" });
        	this.userfocus= true
        	return false;
        }
        if(!this.password){
        	uni.showToast({ title: '密码不能为空',icon:"none" });
        	this.paswfocus= true
        	return false;
        }
        let data = {'account':this.mobile,'password':this.password};
        // #ifdef APP-PLUS
        	var inf = plus.push.getClientInfo();
        	if(inf.clientid){data.clientid=inf.clientid}
        	if(plus.os.name == 'iOS') {data.iostoken=inf.token}
        	data.issb=plus.os.name
        // #endif
        
        if(this.openid){
        	data.openid=this.openid;
        }
        let [err,res] =await this.$httpas.get('/api/user/login',data);
		
        if (!this.$httpas.errorCheck(err,res)) return;
        
        if(res.data.code === 1){
				if(res.data.data.userinfo.avatar){
						var str = res.data.data.userinfo.avatar;
						if(str.indexOf("data:image") != -1){
							var avatar='';
						}else{
							if(str.indexOf("http") != -1){
								avatar=res.data.data.userinfo.avatar;
							}else{
								avatar=this.configs.imgUrl+res.data.data.userinfo.avatar;
							}
						}
					}else{
						var avatar='';
					}
			uni.setStorage({//缓存配置信息
				key: 'avatar',  
				data: avatar
			})
			uni.setStorage({//缓存配置信息
				key: 'userinfo',  
				data: res.data.data.userinfo
			})
			uni.setStorage({//缓存配置信息
				key: 'config',  
				data: res.data.data.config
			})
        	uni.showModal({
        		title: '温馨提示',
        		content: res.data.msg,
        		showCancel: false,
        		confirmText: "确定",
        		success: function (res) {
        			if (res.confirm) {
						_this.dyxx()
        				uni.navigateBack();
        			} else if (res.cancel) {
        				
        			}
        		}
        	});
        }else{
			uni.showToast({ title: res.data.msg,icon:"none" });
        }

      },
	  getUserInfo1(){
	  	var this_=this
	                 //console.log("aaaa")
	                 uni.getUserProfile({
	                     desc:'Wexin',     // 这个参数是必须的
	                     success:res=>{
	  					   console.log(res);
	                         this_.userinfowx=res.userInfo
	                         this_.wxlogin()
	                     },
	                     fail:err=>{
	                         console.log(err)
	                     }
	                 })
	  },
	  getuserinfo: function(){
		  uni.showLoading({
		  	title: '授权中...'
		  });
		var this_=this
	  	// wx登录
	  	wx.login({
	  	  success (res) {
	  	    if (res.code) {
	  	      //发起网络请求
	  		  var code = res.code
	  		  	// 获取微信用户信息
	  			wx.getUserInfo({
	  			  success: function(res) {
					this_.userinfowx=res.userInfo
					this_.wxlogin()
	  			  },
	  			  fail:res=>{
	  			      // 获取失败的去引导用户授权 
	  			   }
	  			})
	  			
	  	    } else {
	  			
	  	    }
	  	  }
	  	})
	  },
	  wxlogin(){
		  var userinfowx=this.userinfowx
		  var this_=this
		  uni.login({
		       timeout: 10000,
		        provider: 'weixin',  //如果是uniapp，在这里需要标明平台的类型，支持的参数请查阅uniapp官网的uni.login()文档
		        success: (res) => {
					//console.log(res);
		  			//登陆成功的回调
					uni.hideLoading();
					uni.request({
					      url: this.configs.webUrl+'/api/user/getOpenid',  
					      method:'GET',  
					      data: {   
					          //token: uni.getStorageSync("userinfo").token,       //你的小程序的secret,  
					          code: res.code                        //wx.login 登录成功后的code  
					      },  
					      success: (cts) => {  
							  if(cts.data.code==1){
								  this_.openid=cts.data.data.openid
								  this_.unionid=cts.data.data.unionid
								  uni.showModal({
								  	title: '温馨提示',
								  	content: '授权成功',
								  	showCancel: false,
								  	confirmText: "确定",
								  	success: function (res) {
										if (res.confirm) {
											console.log(cts.data.msg);
											if(cts.data.msg=='登录成功'){
												this_.logins(cts.data.data)
											}else{
												this_.opsdd(cts.data.data)
											}
										} else if (res.cancel) {
											
										}
										
								  	}
								  });
							  }else{
								  uni.showModal({
								  	title: '温馨提示',
								  	content: JSON.stringify(cts.data),
								  	showCancel: false,
								  	confirmText: "确定",
								  	success: function (res) {
								  		if (res.confirm) {
								  			//uni.navigateBack();
								  		} else if (res.cancel) {
								  			
								  		}
								  	}
								  });
							  }
					      },
						  fail: (err1) => {
						  	console.log(err1);
						     	uni.hideLoading();
						  }
					});
		  	  },
		        fail: (err) => {
		           	uni.hideLoading();
		        }
		  })
	  },
	  logins(data){
		  if(data.userinfo.avatar){
		  			var str = data.userinfo.avatar;
		  			if(str.indexOf("data:image") != -1){
		  				var avatar='';
		  			}else{
		  				if(str.indexOf("http") != -1){
		  					avatar=data.userinfo.avatar;
		  				}else{
		  					avatar=this.configs.imgUrl+data.userinfo.avatar;
		  				}
		  			}
		  		}else{
		  			var avatar='';
		  		}
		  uni.setStorage({//缓存配置信息
		  	key: 'avatar',  
		  	data: avatar
		  })
		  uni.setStorage({//缓存配置信息
		  	key: 'userinfo',  
		  	data: data.userinfo
		  })
		  uni.setStorage({//缓存配置信息
		  	key: 'config',  
		  	data: data.config
		  })
		  uni.navigateBack();
	  },
	  opsdd(data){
		  this.userinfowx.openid=this.openid
		  uni.setStorage({//缓存配置信息
		  	key: 'userinfowx',  
		  	data: this.userinfowx
		  })
		  var urlsa1='/pages/login/loginwxxcx'
		  if(data.dltel){
			  urlsa1='/pages/login/loginwxxcx?dltel='+data.dltel
		  }
		  uni.navigateTo({
		  	url:urlsa1
		  })	
	  },
	  onGetPhoneNumber(e) {
		  var this_=this
		  if(!this.openid){
			  uni.showModal({
			  		title: '温馨提示',
			  		content: '请先授权',
			  		showCancel: false,
			  		confirmText: "确定",
			  		success: function (res) {
			  			//this_.getuserinfo()
			  		}
			  });
			  return false;
		  }
		  uni.login({
		       timeout: 10000,
		        provider: 'weixin',  //如果是uniapp，在这里需要标明平台的类型，支持的参数请查阅uniapp官网的uni.login()文档
		        success: (res) => {
				console.log(res);
				console.log("onGetPhoneNumber", e);  
				uni.request({
					  url: this.configs.webUrl+'/api/user/getphone',  
					  method:'GET',  
					  data: {    
						  openid:this.openid,
						  userinfowx:this.userinfowx,
						  code: res.code,
						  iv: e.detail.iv,
						  encryptedData:e.detail.encryptedData,  
					  },  
					  success: (cts) => {
						  console.log(cts.data);
						  uni.showModal({
						  		title: '温馨提示',
						  		content: JSON.stringify(cts.data),
						  		showCancel: false,
						  		confirmText: "确定",
						  		success: function (res) {
						  			if (res.confirm) {
						  				//uni.navigateBack();
						  			} else if (res.cancel) {
						  										
						  			}
								}
						  });
					  },
					  fail: (err1) => {
						console.log(err1);
							//失败的回调
					  }
				});
			},
			fail: (err) => {
			     	//登陆失败的回调
			},
		})
	  } 
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    width: 161rpx;
    height: 161rpx;
    background: rgba(63, 205, 235, 1);
    box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
    border-radius: 50%;
    margin-top: 30rpx;
    margin-left: auto;
    margin-right: auto;
  }

  .header image {
    width: 161rpx;
    height: 161rpx;
    border-radius: 50%;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50rpx;
    padding-left: 70rpx;
    padding-right: 70rpx;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    color: #333333;
    border-bottom: 0.5px solid #e2e2e2;
  }

  .list-call .img {
    width: 40rpx;
    height: 40rpx;
  }

  .list-call .sl-input {
    flex: 1;
    text-align: left;
    font-size: 32rpx;
    margin-left: 16rpx;
  }

  .button-login {
    color: #FFFFFF;
    font-size: 34rpx;
    width: 470rpx;
    height: 100rpx;
    background: linear-gradient(-90deg, rgba(75, 196, 93, 1), rgba(188, 226, 158, 1));
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
    border-radius: 50rpx;
    line-height: 100rpx;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100rpx;
  }
.button-login1 {
    color: #FFFFFF;
    font-size: 34rpx;
    width: 470rpx;
    height: 80rpx;
    background: linear-gradient(-90deg, rgba(75, 196, 93, 1), rgba(188, 226, 158, 1));
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
    border-radius: 50rpx;
    line-height: 80rpx;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30rpx;
	color: #fff;
  }
  .button-hover {
    background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
  }

  .agreenment {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    margin-top: 80rpx;
    color: #FFA800;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
  }

  .agreenment text {
    font-size: 24rpx;
    margin-left: 15rpx;
    margin-right: 15rpx;
  }
</style>

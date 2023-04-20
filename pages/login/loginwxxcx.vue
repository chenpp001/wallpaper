<template>
  <view class="content">
    <view class="header">
      <image :src="userinfowx.avatarUrl"></image>
	  
    </view>
	<view style="height: 100upx;line-height: 100upx; text-align: center;">
		<text style="font-size: 36upx; text-align: center;">{{userinfowx.nickName}}</text>
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
	<view style="margin-top: 50px;">
		<button class="button-login1" v-if="dltel==1" open-type="getPhoneNumber" style="font-size: 26upx; color: #ffffff;" @getphonenumber="onGetPhoneNumber">登录</button>
		<button class="button-login1" v-else @click="Loginops()" style="font-size: 26upx; color: #ffffff;">登录</button>
	</view>
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
		userinfowx:'',
		fxpid:'',
		dltel:'',
      };
    },
	onLoad(e) {
		if(e.dltel){
			this.dltel=e.dltel
		}
		this.userinfowx=uni.getStorageSync("userinfowx")
		if(uni.getStorageSync("fxid")){
			this.fxpid=uni.getStorageSync("fxid")
		}
		if(e.fxid){
			this.fxpid=e.fxid
		}
		console.log(this.fxpid)
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
	  getuserinfo: function(){
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
					uni.request({
					      url: this.configs.webUrl+'/api/user/getOpenid',  
					      method:'GET',  
					      data: {   
					          //token: uni.getStorageSync("userinfo").token,       //你的小程序的secret,  
					          code: res.code                        //wx.login 登录成功后的code  
					      },  
					      success: (cts) => {  
							  if(cts.data.code==1){
								  this_.openid=cts.data.data
								  uni.showModal({
								  	title: '温馨提示',
								  	content: '授权成功',
								  	showCancel: false,
								  	confirmText: "确定",
								  	success: function (res) {
										if (res.confirm) {
											this_.opsdd()
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
						     	//失败的回调
						  }
					});
		  	  },
		        fail: (err) => {
		           	//登陆失败的回调
		        }
		  })
	  },
	  opsdd(){
		  this.userinfowx.openid=this.openid
		  uni.setStorage({//缓存配置信息
		  	key: 'userinfowx',  
		  	data: this.userinfowx
		  })
		  uni.navigateTo({
		  	url:'/pages/login/loginwxxcx'
		  })	
	  },
	  Loginops(){
		uni.request({
			  url: this.configs.webUrl+'/api/user/getphone',  
			  method:'GET',  
			  data: { 
				  nickName:this.userinfowx.nickName,
				  gender:this.userinfowx.gender,
				  avatarUrl:this.userinfowx.avatarUrl,
				  openid:this.userinfowx.openid,
				  pid:this.fxpid,
			  },  
			  success: (cts) => {
				  console.log(cts.data);
				  if(cts.data.code==1){
					  if(cts.data.data.userinfo.avatar){
					  			var str = cts.data.data.userinfo.avatar;
					  			if(str.indexOf("data:image") != -1){
					  				var avatar='';
					  			}else{
					  				if(str.indexOf("http") != -1){
					  					avatar=cts.data.data.userinfo.avatar;
					  				}else{
					  					avatar=this.configs.imgUrl+cts.data.data.userinfo.avatar;
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
					  	data: cts.data.data.userinfo
					  })
					  uni.setStorage({//缓存配置信息
					  	key: 'config',  
					  	data: cts.data.data.config
					  })
					  uni.showModal({
					  	title: '温馨提示',
					  	content: cts.data.msg,
					  	showCancel: false,
					  	confirmText: "确定",
					  	success: function (res) {
					  		if (res.confirm) {
					  			//this_.dyxx()
					  			uni.navigateBack({
					  				delta: 2
					  			});
					  		} else if (res.cancel) {
					  			
					  		}
					  	}
					  });
				  }else{
					  uni.showModal({
					  		title: '温馨提示',
					  		content: '网络错误 重新尝试一下',
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
					//失败的回调
			  }
		});  
	  },
	  onGetPhoneNumber(e) {
		  var this_=this
		  if(!this.userinfowx){
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
						  nickName:this.userinfowx.nickName,
						  gender:this.userinfowx.gender,
						  avatarUrl:this.userinfowx.avatarUrl,
						  openid:this.userinfowx.openid,
						  pid:this.fxpid,
						  code: res.code,
						  iv: e.detail.iv,
						  encryptedData:e.detail.encryptedData, 
							
					  },  
					  success: (cts) => {
						  console.log(cts.data);
						  if(cts.data.code==1){
							  if(cts.data.data.userinfo.avatar){
							  			var str = cts.data.data.userinfo.avatar;
							  			if(str.indexOf("data:image") != -1){
							  				var avatar='';
							  			}else{
							  				if(str.indexOf("http") != -1){
							  					avatar=cts.data.data.userinfo.avatar;
							  				}else{
							  					avatar=this.configs.imgUrl+cts.data.data.userinfo.avatar;
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
							  	data: cts.data.data.userinfo
							  })
							  uni.setStorage({//缓存配置信息
							  	key: 'config',  
							  	data: cts.data.data.config
							  })
							  uni.showModal({
							  	title: '温馨提示',
							  	content: cts.data.msg,
							  	showCancel: false,
							  	confirmText: "确定",
							  	success: function (res) {
							  		if (res.confirm) {
							  			this_.dyxx()
							  			uni.navigateBack({
							  				delta: 2
							  			});
							  		} else if (res.cancel) {
							  			
							  		}
							  	}
							  });
						  }else{
							  uni.showModal({
							  		title: '温馨提示',
							  		content: '网络错误 重新尝试一下',
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

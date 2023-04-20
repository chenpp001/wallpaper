<template>
  <view class="content">
    <view class="header">
      <image src="../../static/shilu-login/logo.png"></image>
    </view>
	<!-- <view  class="list" style="margin-top: 50px; color: #666; font-size: 14px;text-align: center;">openid：{{openid}}</view>
	<view  class="list" style="margin-top: 50px; color: #666; font-size: 14px;text-align: center;">unionid：{{unionid}}</view> -->
    <view class="button-login" style="margin-top: 30%;" hover-class="button-hover" @tap="bindLogin()">
      <text style="font-size: 40upx;">登录</text>
    </view>

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
		userinfowx:''
      };
    },
	onLoad(e) {
		if(e.openid){
			this.openid=e.openid;
		}
		if(e.unionid){
			this.unionid=e.unionid;
		}
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
        if(!this.openid){
        	uni.showToast({ title: 'openid不能为空',icon:"none" });
        	this.userfocus= true
        	return false;
        }
        if(!this.unionid){
        	uni.showToast({ title: 'unionid不能为空',icon:"none" });
        	this.paswfocus= true
        	return false;
        }
        let data = {'openid':this.openid,'unionid':this.unionid};
        let [err,res] =await this.$httpas.get('/api/user/logingzh',data);

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
        				//window.open('/pages/client/member/index', "_self")
						uni.switchTab({
							url: '/pages/client/member/index'
						});		
        			} else if (res.cancel) {
        				
        			}
        		}
        	});
        }else{
			uni.showToast({ title: res.data.msg,icon:"none" });
        }

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
						     	uni.hideLoading();
						  }
					});
		  	  },
		        fail: (err) => {
		           	uni.hideLoading();
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

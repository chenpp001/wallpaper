// 引入配置文件
import config from "./config.js";
export default{
	config:{
		baseUrl:config.webUrl,
		header:{
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",
	},
	request(options = {}){
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl+options.url;
		// TODO：token增加等操作
		if (options.token) {
			options.data.token = uni.getStorageSync("userinfo").token;
			options.data.uid = uni.getStorageSync("userinfo").id;
		}
		var version='web';
		// #ifdef APP-PLUS
		var version=plus.runtime.version
		// #endif
		options.data.version=version
		return uni.request(options).then(res => {
			if(res[1].data.msg=='version10001'){
				uni.showModal({
					title: '更新提示',
					content:"当前版本需要更新，请及时更新",
					showCancel: false,
					confirmText: "确定",
					success: function (ress) {
						plus.runtime.openURL(res[1].data.data);
						uni.reLaunch({
							url:'/pages/public/login'
						})
					}
				});
				return false;
			}
			return res;
		});
	},
	get(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	
	// 上传图片
	upload(url,options = {}){
		options.url = this.config.baseUrl+url;
		options.header = options.header || this.config.header;
		options.fileType = options.fileType || "image";
		options.formData = options.formData || {};
		options.filePath = options.filePath;
		options.name = options.name;
		// TODO：token增加等操作
		if (options.token) {
			// 验证是否登录
			if (!this.checkToken(options.checkToken)) return;
			// 验证权限
			if (!this.checkAuth(options.checkAuth)) return; 
			options.header.token = User.token;
		}
		
		return uni.uploadFile(options);
	},
	// 错误处理
	errorCheck(err,res,errfun = false,resfun = false){
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({ title: '加载失败',icon:"none" });
			return false;
		}
		if (res.data.errorCode) {
			typeof errfun === 'function' && resfun();
			uni.showToast({ title: res.data.msg,icon:"none" });
			return false;
		}
		return true;
	},
	// 验证用户是否登录
	checkToken(checkToken){
		if (checkToken && !User.token) {
			uni.showToast({ title: '请先登录', icon:"none" })
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return false;
		}
		return true;
	},
	// 验证用户权限
	checkAuth(checkAuth){
		if (checkAuth && !User.userinfo.phone) {
			uni.showToast({ title: '请先绑定手机号码', icon:"none" })
			uni.navigateTo({
				url: '/pages/user-bind-phone/user-bind-phone'
			});
			return false;
		}
		return true;
	}
}
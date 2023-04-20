import  config from './config.js';
import store from './store/store.js';

const visit  = function(params){
	if(!params) params = new Object;
	params.app_id  = config.appId;
	params.device = config.dev;
	let url = config.apiUrl + 'miniapp/visit'; //仅仅请求 不响应服务器的操作
	uni.request({
	    url: url,
	    data: params,
		method:'POST',
		success(){
			console.log('日志写入成功');
		},
		fail(){
			console.log('日志写入失败');
		},
	});
}

const  post   =  function (url,params){
	if(!params) params = new Object;
	params.device = config.dev;
	params.app_id  = config.appId;
	return  new Promise((resolve,reject) => {
		uni.request({
		    url: config.apiUrl + url, //仅为示例，并非真实接口地址。
		    data: params,
			method:'POST',
		    success: (res) => {
				uni.hideLoading(); 
				if(res.statusCode == 200){
					if(res.data.code == 200){
						if(res.data.code == 100){ //未登录的情况
							store.commit('setMember',null);
							uni.removeStorageSync('member-token');
							reject({
								code:res.data.code,
								msg:res.data.msg
							});	
						}else{
							resolve(res.data.data);	
						}
					}else{
						
						uni.showToast({
							icon:'none',
							title:res.data.msg + '#' +res.data.code
						});
						reject({
							code:res.data.code,
							msg:res.data.msg
						});	
					}
				}else{
					
					uni.showToast({
						icon:'none',
						title:"网络异常"
					});
					reject({
						code:500,
						msg:'网络异常'
					});
				}  
		    },
			fail:(res)=>{
				uni.hideLoading(); 
				uni.showToast({
					icon:'none',
					title:"服务器繁忙"
				});
				reject({
					code:500,
					msg:'服务器繁忙'
				});
			}
		});
		
	});
}


//需要登录的使用这个
const api  = function(url,params){
	if(!params) params = new Object;
	let token = uni.getStorageSync('member-token');
	params.token = token;
	return this.post(url,params);
}

export default {
	post,
	api,
	visit
}
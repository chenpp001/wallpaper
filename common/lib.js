import $http from "./request.js";
// 网络监听
const NetWork = {
	// 网络状态
	isConnect:false,
	// 监听网络状态
	On(){
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType!=='none'){ 
					this.isConnect=true; 
					return;
					}
				uni.showModal({
					title: '',
					content:"请先连接网络哦",
					showCancel: false,
					confirmText: "确定",
					success: function (res) {
						
					}
				});
			}
		})
		// 监听网络状态变化
		uni.onNetworkStatusChange((res)=>{
			this.isConnect = res.isConnected;
			if(!res.isConnected){
				uni.showModal({
					title: '',
					content:"您目前处于断网状态",
					showCancel: false,
					confirmText: "确定",
					success: function (res) {
						
					}
				});
			}
		})
	}
}

// app更新
const Update = function(showToast = false){
	// #ifdef APP-PLUS  
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		/*
		
		{
			"msg": "ok",
			"data": {
				"id": 1,
				"url": "http://www.baidu.com",
				"version": "1.0.1",
				"status": 1,
				"create_time": null
			}
		}
		
		*/
		$http.post('/update',{
			ver:widgetInfo.version, 
		}).then((res) => {
			let [err,result] = res;
			// 错误处理
			if (!$http.errorCheck(err,result)) return;
			// 成功
			var data = result.data.data;  
			if (!data.url){
				// 无需更新
				if (showToast) {
					return uni.showToast({ title: 'YT无需更新',icon:"none" })
				}
			}
			
			uni.showModal({
				title: '发现新的版本',
				content: '最新版本：'+data.version,
				cancelText: '放弃更新',
				confirmText: '立即更新',
				success: res => {
					if(res.confirm){
						uni.downloadFile({  
							url: data.url,  
							success: (downloadResult) => {  
								if (downloadResult.statusCode === 200) {  
									plus.runtime.install(downloadResult.tempFilePath, {  
										force: false  
									}, function() {  
										console.log('install success...');  
										plus.runtime.restart();  
									}, function(e) {  
										console.error('install fail...');  
									});  
								}  
							}  
						});  
					}
				}
			});
			
		});
		
	});  
	// #endif  
}

import config from "./config.js"
export default {
	NetWork,
	Update
}
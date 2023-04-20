<template>
	<view class="content"></view>
</template>

<script>
var pusher = null;
export default {
	props:{
		tips:{
			type: Object,
			default: function() {
				return {
					text:'提示文字，直播点文字'//业务需求
				};
			}
		}
	},
	name: 'yyq-LivePusher',
	data() {
		return {
			livepushurl: 'rtmp://131876.livepush.myqcloud.com/live/123456?txSecret=9063dc8fbde2a7856dbb2db52de23bbe&txTime=603DA642',
			currentWebview: null,
			itemTitle: '',
			begin: false,
			beauty:'1',//0关，1开
			whiteningNumber:'3'//美白等级
		};
	},
	created() {
		this.getwebview(); //获取webview
	},
	methods: {
		/**
		 * 获取当前显示的webview
		 */
		getwebview() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			var getcurrentWebview = page.$getAppWebview();
			var ch =getcurrentWebview.children();
			console.log(JSON.stringify(ch));
			this.plusReady(getcurrentWebview); //创建LivePusher对象

			// #endif
		},

		/**
		 * 创建LivePusher对象 即推流对象
		 */

		plusReady(currentWebview) {
			var temp = this;
			// 创建直播推流控件
			pusher = new plus.video.LivePusher('pusher', {
				url: '',
				top: '0px',
				left: '0px',
				width: '100%',
				// mode: 'SD',
				height: '100%',
				position: 'absolute', //static静态布局模式，如果页面存在滚动条则随窗口内容滚动,absolute绝对布局模式，如果页面存在滚动条不随窗口内容滚动； 默认值为"static"
				beauty: '1', //美颜 0 关  1  开
				whiteness: '3', //0、1、2、3、4、5，0不使用美白，值越大美白程度越大。
				aspect: '9:16'
			});
			// 提示文字
			var titleContent = new plus.nativeObj.View(
				'title',
				{
					top: '5%',
					left: '10%',
					height: '10%',
					width: '80%'
				},
				[
					{
						id: 'content',
						tag: 'font',
						text: temp.itemTitle,
						textStyles: {
							size: '10px',
							color: '#ffffff'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]
			);
			// 创建镜头切换的按钮
			var switchBarVew = new plus.nativeObj.View(
				'switchBarVew',
				{
					top: '5%',
					left: '80%',
					height: '10%',
					width: '20%'
				},
				[
					{
						tag: 'img',
						id: 'reversal',
						src: 'static/yyq-livepush/reversal.png',
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: '翻转',
						textStyles: {
							size: '10px',
							color: '#ffffff'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]
			);
			// 美颜按钮
			var beautyBarVew = new plus.nativeObj.View(
				'beautyBarVew',
				{
					top: '15%',
					left: '80%',
					height: '10%',
					width: '20%'
				},
				[
					{
						tag: 'img',
						id: 'reversal',
						src: 'static/yyq-livepush/beuty-close.png',
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: '美颜-关',
						textStyles: {
							size: '10px',
							color: '#ffffff'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]
			);
			// 美白按钮
			var WhiteningBarVew = new plus.nativeObj.View(
				'WhiteningBarVew',
				{
					top: '25%',
					left: '80%',
					height: '10%',
					width: '20%'
				},
				[
					{
						tag: 'img',
						id: 'reversal',
						src: 'static/yyq-livepush/beautiful.png',
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: '美白',
						textStyles: {
							size: '10px',
							color: '#ffffff'
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]
			);
			//开始按钮
			var startBtn = new plus.nativeObj.View('startBtn', { bottom: '0px', left: '0%', height: '50px', width: '100%' }, [
				{
					tag: 'rect',
					id: 'startrect',
					position: {
						width: '100%',
						left: '0px',
						height: '100%'
					},
					rectStyles: {
						color: '#ffffff',
						radius: '0px'
					}
				},
				{
					tag: 'font',
					id: 'startfont',
					text: '开始直播',
					textStyles: {
						size: '20px',
						color: '#FE2B54'
					},
					position: {
						width: '100%',
						left: '0px',
						height: '100%'
					}
				}
			]);
			var closeBtn = new plus.nativeObj.View(
				'closeBtn',
				{
					top: '5%',
					left: '20px',
					height: '24px',
					width: '24px'
				},
				[
					{
						tag: 'img',
						id: 'reversal',
						src: 'static/yyq-livepush/close-livepushi.png',
						position: {
							width: '100%',
							left: '0px',
							height: '100%'
						}
					}
				]
			);
			if (!this.begin) {
				closeBtn.hide();
			}
			console.log(JSON.stringify(pusher));
			// ios必须要加这个，不然ios会白屏
			pusher.preview();
			//将创建的对象 追加到webview中
			currentWebview.append(pusher);
			currentWebview.append(titleContent);
			currentWebview.append(startBtn);
			currentWebview.append(beautyBarVew);
			currentWebview.append(WhiteningBarVew);
			currentWebview.append(switchBarVew);
			currentWebview.append(closeBtn);
			// pusher.addEventListener(
			// 	'statechange',
			// 	function(e) {
			// 		console.log('statechange: ' + JSON.stringify(e));
			// 	},
			// 	false
			// );
			switchBarVew.addEventListener(
				'click',
				function(e) {
					temp.switchCamera();
				},
				false
			);
			beautyBarVew.addEventListener(
				'click',
				function(e) {
					temp.beauty=!temp.beauty;
					var textT='';
					var srcPath='';
					var colors='';
					if(temp.beauty){
						textT='美颜-开';
						srcPath='static/yyq-livepush/beuty-open.png';
						pusher.setStyles({
							beauty:1
						})
						colors='#f4ea2a';
					}else{
						textT='美颜-关';
						srcPath='static/yyq-livepush/beuty-close.png';
						pusher.setStyles({
							beauty:0
						})
						colors='#ffffff';
					}
					beautyBarVew.draw([
					{
						tag: 'img',
						id: 'reversal',
						src: srcPath,
						position: {
							width: '28%',
							left: '36%',
							height: '30%'
						}
					},
					{
						tag: 'font',
						id: 'font',
						text: textT,
						textStyles: {
							size: '10px',
							color: colors
						},
						position: {
							width: '80%',
							left: '10%'
						}
					}
				]);
				},
				false
			);
			WhiteningBarVew.addEventListener(
				'click',
				function(e) {
					var textT='';
					temp.whiteningNumber++;
					pusher.setStyles({
						whiteness:temp.whiteningNumber
					});
					if(temp.whiteningNumber==0){
						textT='无美白';
					}else{
						textT=temp.whiteningNumber+'级美白';
					}
					WhiteningBarVew.draw([
						{
							tag: 'img',
							id: 'reversal',
							src: 'static/yyq-livepush/beautiful.png',
							position: {
								width: '28%',
								left: '36%',
								height: '30%'
							}
						},
						{
							tag: 'font',
							id: 'font',
							text: textT,
							textStyles: {
								size: '10px',
								color: '#ffffff'
							},
							position: {
								width: '80%',
								left: '10%'
							}
						}
					]);
					if(temp.whiteningNumber==9){//
						temp.whiteningNumber=-1;
					}
				},
				false
			);
			closeBtn.addEventListener(
				'click',
				function(e) {
					console.log('closeBtn这里走了吗');
					temp.closeLivepush();
					
				},
				false
			);
			startBtn.addEventListener(
				'click',
				function(e) {
					console.log('startBtn这里走了吗');
					//开始直播录制
					uni.showModal({
						title: '提示',
						content: '是否开始直播录制?',
						cancelText: '否',
						confirmText: '是',
						success(res) {
							if (res.confirm) {
								//开始
								temp.begin = true;
								temp.startPusher();
								startBtn.hide();
								closeBtn.show();
								plus.navigator.setFullscreen(true);
							}
						}
					});
				},
				false
			);
			// 监听状态变化事件
		},
		// 开始推流
		startPusher() {
			// 设置推流服务器
			pusher.setStyles({
				url: this.livepushurl //推流地址********************************* 此处设置推流地址
			});
			pusher.start(); //推流开启
		},
       // 切换摄像头
		switchCamera() {
			pusher.switchCamera();
		},
		// 结束录制
		closeLivepush() {
			uni.showModal({
				title: '提示',
				content: '确定要结束直播录制吗',
				cancelText: '否',
				confirmText: '是',
				success: res => {
					if (res.confirm) {
						pusher.pause(); //结束直播推流
						pusher.close();
						//this.endlivepush();//上传直播结束的状态,服务器端做记录
						uni.navigateBack();
						plus.navigator.setFullscreen(false);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		endlivepush() {
			//上传直播结束的状态,服务器端做记录
			uni.request({
				url: '',
				method: 'POST',
				// dataType:'JSON',
				data: {},
				success: res => {
					console.log(JSON.stringify(res.data));
					if (res.result) {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 3000
						});
					}
				},
				error: data => {
					//alert(JSON.stringify(data)+'错误')
				}
			});
		}
	},
	onShow() {
		plus.navigator.setFullscreen(true); 
		uni.getNetworkType({
			success: function(res) {
				console.log(res.networkType);
				if (res.networkType != 'wifi') {
					uni.showModal({
						//提醒用户更新
						title: '温馨提示',
						content: '当前非Wifi网络，请注意您的流量是否够用',
						success: res => {}
					});
				}
			}
		});
		uni.onNetworkStatusChange(function(res) {
			console.log(res.isConnected);
			console.log(res.networkType);
			if (res.networkType != '4g' && res.networkType != 'wifi') {
				uni.showModal({
					//提醒用户更新
					title: '温馨提示',
					content: '当前网络质量差，请切换为4G网络或Wifi网络',
					success: res => {}
				});
			}
		});
	}
};
</script>

<style scoped>
.content {
	background: #000;
	overflow: hidden;
	width: 750upx;
	position: fixed;
}
</style>

<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		
		<view class="canvas">
			<canvas class="canvasa" @longtap="saveCans(1)" :style="{ width: cansWidth + 'px', height: cansHeight + 'px' }" canvas-id="firstCanvas"></canvas>
		</view>
		<view class="imglist">
			<view :style="[{ width:widths+'upx'}]">
				<block v-for="(swiperLists,index) in swiperList" :key="index">
					<image style="padding: 4upx;" @click="selseimg(swiperLists.posterImg)" :src="swiperLists.posterImg" mode="aspectFill"></image>
				</block>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom1" style="width: 32%;" @click="saveCans(1)">保存海报</view>
			<view class="bottom3" style="width: 32%;" @click="saveCans(2)">一键分享</view>
			<view class="bottom2" style="width: 32%;" @click="upbj()">上传背景</view>
		</view>
		<uni-popup ref="sharepopup" type="bottom">
		    <share-btn :sharedataTemp="sharedata"></share-btn>
		</uni-popup>
		<avatar @upload="doUpload" @avtinit="doBefore" quality="1" ref="avatar"></avatar>
		<!-- #endif -->
	</view>
</template>
<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import  QR   from '@/static/js/wxqrcode.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import shareBtn from '@/components/share-btn/share-btn.vue';
	import { mapMutations} from 'vuex';
	var that
	export default {
		components: {
			avatar,
			uniPopup,
			shareBtn
		},
		data() {
			return {
				sharedata: {
					type: 2,
					strShareUrl: "",
					strShareTitle: "分享标题",
					strShareSummary: "分享总结",
					strShareImageUrl: ""
				},
				uid:'',
				avatar:'',
				qrcodeImg:'',
				userinfo:[],
				cansWidth: 280, //海报宽度
				cansHeight: 500, //海报高度
				widths: "", //图片列表动态宽度
				imgsrc: "", //保存图片的路径
				userdata: {}, //个人数据
				swiperList: [] //海报数组
			};
		},
		onLoad: function() {
			this.show = true;
			this.userinfo=uni.getStorageSync("userinfo");
			this.avatar=uni.getStorageSync("avatar")
			var qrurl=this.configs.webUrl+'/d/?id='+this.userinfo.id
			let img = QR.createQrCodeImg(qrurl, {  
			     size: 300//二维码大小  
			})
			this.qrcodeImg = img;
			this.sharedata.strShareUrl=qrurl
			console.log(this.qrcodeImg)
			that = this
			that.huizhihaibao() //请求海报数据
		},
		methods: {
			upbj(){
				console.log(111)
				var index=0;
				var that = this
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '500upx', selHeight: '893upx', 
					expWidth: '800upx', expHeight: '1429upx',
					inner: index ? 'true' : 'false',
					canRotate:false,
					quality:1,
				});
			},

			doUpload(rsp) {
				//console.log(rsp);
				this.selseimg(rsp.path)
			},
			doBefore() {
				console.log('doBefore');
			},
			huizhihaibao() {
				var that = this
				//数据请求结束
				uni.showLoading({
					title: '加载中'
				});
				that.userdata = {
					img: "",
					text: "测试"
				}
				if(this.userinfo.config.fxhb){
					var swiperList = this.userinfo.config.fxhb
					let goodsData = [];
					swiperList.forEach(item=>{
						if(item.indexOf("http") != -1){
							item=item
						}else{
							item=that.configs.webUrl+item
						}
						goodsData.push({
							posterImg: item 
						})
					})
					that.swiperList=goodsData
				}else{
					that.swiperList = []
				}
				uni.hideLoading();
				//数据请求结束
				that.selseimg(that.swiperList[0].posterImg)
			},
			selseimg(e) { //绘制海报
				if (that.userinfo.nickname > 6) { //昵称太长加省略号
					that.userinfo.nickname = that.userinfo.nickname.slice(0, 6) + "..."
				}
				uni.showLoading({
					title: '生成海报中'
				});
				if(e.indexOf("http") != -1){
					// #ifdef H5
					that.selseimging(e)
					// #endif
					// #ifdef APP-PLUS || MP-WEIXIN
					uni.downloadFile({
						url: e,
						success: function(res) {
							if(res.tempFilePath){
								that.selseimging(res.tempFilePath)
							}
						}
					})
					// #endif
				}else{
					that.selseimging(e)
				}
			},
			selseimging(hbbj){
				const context = uni.createCanvasContext('firstCanvas')
				context.drawImage(hbbj, 0, 0, 280, 500) //海报背景
				var yd=20;//控制y的距离
				setTimeout(function() { //定时器，海报方法不能立即执行，等页面渲染完成
					
					context.shadowColor = '#999999';
					context.shadowOffsetX = 0;// 设置阴影的横向偏移量
					context.shadowOffsetY = 0;
					context.shadowBlur = 5;// 设置模糊等级
					context.drawImage(that.$config.staticUrl+'zw.png',10, 350+yd, 260, 110) //个人信息背景
					context.fill()
					context.save()
					
					context.drawImage(that.qrcodeImg, 182, 374+yd, 75, 75) //二维码图片 
					context.setFillStyle('#333333')
					context.setFontSize(14)
					context.fillText('我的邀请码：'+that.userinfo.id, 20, 373+yd)
					context.fill()
					
					context.setFillStyle('#333333')
					context.setFontSize(12)
					context.fillText('扫一扫二维码', 183, 368+yd)
					context.fill()
					
					
					context.setFillStyle('#333333')
					context.setFontSize(14)
					context.fillText(that.userinfo.nickname, 80, 405+yd) //昵称
					context.fill()
				
					context.setFillStyle('#666666')
					context.setFontSize(10)
					context.fillText('邀请你加入'+that.userinfo.config.name, 80, 425+yd)
					context.fillText('手机就能赚钱！', 80, 445+yd)
					context.fill()
				
					context.save()
					context.beginPath()
					context.arc(44, 420+yd, 25, 0, 2 * Math.PI)
					context.clip()
					context.drawImage(that.avatar, 17, 392+yd, 55, 55) //头像
					context.restore()
					context.draw()
				
					uni.hideLoading();
				}, 1000);
			},
			saveCans(e) { //保存海报
				console.log(222)
				if (e == 2) {
					that.$refs.sharepopup.open();
				}else{
					uni.showLoading({
						title: '保存海报中'
					});

					console.log('保存');
					let tempRatio = 1;

					// #ifdef H5 || APP-PLUS
					tempRatio = 1;
					// #endif

					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: that.cansWidth * tempRatio* 4,
						height: that.cansHeight * tempRatio* 4,
						destWidth: that.cansWidth * tempRatio * 4,
						destHeight: that.cansHeight * tempRatio * 4,
						canvasId: 'firstCanvas',
						success: function(res) {
							uni.hideLoading()
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function(red) {
									uni.showToast({
										title: '保存相册成功'
									})
									that.imgsrc = res.tempFilePath
									that.sharedata.strShareImageUrl= res.tempFilePath
									
								},
								fail(res) {
									if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
										uni.showModal({
											title: '您需要授权相册权限',
											success(res) {
												if (res.confirm) {
													uni.openSetting({
														success(res) {

														},
														fail(res) {
															console.log(res)
														}
													})
												}
											}
										})
									}
								}
							});
						},
						fail(res) {
							uni.hideLoading()
						}
					}, this)
				}
			},
			

		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}

	.pageHeader {
		height: var(--status-bar-height);
		background-color: #FFFFFF;
	}

	.box-header {
		position: fixed;
		top: 0upx;
		width: 100%;
		z-index: 100;
	}

	.top-box {
		height: 100upx;
		width: 100%;
	}

	.canvas {
		display: flex;
		justify-content: center;
		margin-top: 20upx;
		border-radius: 16upx;
	}

	.bottom {
		padding: 20upx 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		background-color: #ffffff;
	}

	.bottom1 {
		padding: 20upx 40upx;
		background: #FF8A00;
		border-radius: 44upx;
		font-size: 30upx;
		color: #FFFFFF;
	}

	.bottom2 {
		padding: 20upx 40upx;
		background: #FF5256;
		border-radius: 44upx;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.bottom3 {
		padding: 20upx 40upx;
		background: #5E40FF;
		border-radius: 44upx;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.imglist {
		width: 100%;
		padding: 20upx 0;
		overflow: auto;
		/* background-color: #ffffff; */
	}

	.imglist view {
		display: flex;
		justify-content: space-around;
	}

	.imglist image {
		width: 200upx;
		height: 200upx;
		
	}

	.tishi-box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 260upx;
		background: #FFFFFF;
		border-radius: 20upx 20upx 0upx 0upx;
		text-align: center;
	}

	.tishi-box view {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 50upx;
	}

	.tishi-box image {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.canvasa{
		border-radius: 10upx;
	}
</style>

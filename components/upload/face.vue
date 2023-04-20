<template>
	<view class="upload-face">
		<view v-if="value == ''" @click="uploadAct" class="upload-main">
			<view class="upload-btn">
				<text class="iconfont iconicon_photo  cl-w"></text>
			</view>
		</view>
		<view v-else class="upload-show">
			<image @click="uploadAct"></image>
			<view @click="delPic" class="del">
				<text class="iconfont iconicon_close12 ft12"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import qiniu from '../../static/js/qiniu.js';
	export default{
		props:{
			value:{
				type:String,
				default:'',
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			delPic(){
				this.$emit('input','');
			},
			uploadAct(){
				uni.chooseImage({
					count:1,
					success:(chooseImageRes)=>{
						if(chooseImageRes.tempFilePaths.length > 0){
							 // this.$http.api('child.upload/imageAuth').then(auth=>{
								//  let domain = auth.url;
								//  let token = auth.token;
								//  let region = auth.region_mini;
								
								// 	let file  = chooseImageRes.tempFilePaths[0];
								// 	let index = file.lastIndexOf('/');
								// 	let len   = file.length
								// 	let name  = file.substring(index + 1, len);
								// 	qiniu.upload(file, (res) => {
								// 		let url = res.imageURL;
								// 		this.$emit('input',url);
								// 	}, (error) => {
								// 		console.log(error);
								// 	}, {
								// 		region: region,
								// 		key: name,
								// 		domain:domain,
								// 		uptoken: token, 
								// 	});
							
							 // }).catch(res=>{
								//  console.log(res);
							 // });
						}
					}
				})
			}
		}
	}
</script>

<style>
	.upload-face{
		width: 210rpx;
		height: 210rpx;
		background: rgba(94, 64, 255, 0.06);
		border-radius: 110rpx;
	}
	.upload-face .upload-main{
		width: 210rpx;
		height: 210rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.upload-face .upload-btn{
		width: 64rpx;
		height: 64rpx;
		background: #5E40FF;
		border-radius: 32rpx;
		text-align: center;
		line-height: 64rpx;
	}
	.upload-face .upload-show{
		width: 210rpx;
		height: 210rpx;
		border-radius: 110rpx;
		position: relative;
	}
	.upload-face .upload-show image{
		width: 210rpx;
		height: 210rpx;
		border-radius: 110rpx;
		background: rgba(94, 64, 255, 0.06);
	}
	.upload-face .upload-show .del{
		position: absolute;
		right: 0;
		top: 0rpx;
		width: 56rpx;
		height: 56rpx;
		background: rgba(0,0,0,.4);
		border-radius: 28rpx;
		text-align: center;
		line-height: 56rpx;
		color:#FFFFFF;
	}
</style>
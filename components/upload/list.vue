<template>
	<view class="flex wrap">
		<view @click="uploadAct" v-if="value.length < maxNum" class="upload-list-photo camera flex center alcenter">
			<view class="upload" :style="{background:isMain ? tempColor : '#5E40FF'}">
				<text class="iconfont iconicon_photo  cl-w"></text>
			</view>
		</view>
		
		<view v-for="(item,index) in  value" :key="index" class="upload-list-photo">
			<image class="photo" :src="item"></image>
			<view :data-index="index" @click="delPic"  class="del">
				<text class="iconfont iconbtn_close cl-w"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import qiniu from '../../static/js/qiniu.js';
	export default{
		props:{
			value:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			isMain:{
				type:Boolean,
				default:true,
			},
			maxNum:{ //最多上传的数量
				type:Number,
				default:9
			}
		},
		data(){
			return {
				
			}
		},
		computed:{
			getNum(){
				return this.maxNum - this.value.length;
			}
		},
		created(){
			
		},
		methods:{
			delPic(e){
				let index = parseInt(e.currentTarget.dataset.index);
				let oldImgs = JSON.parse(JSON.stringify(this.value));
				oldImgs.splice(index,1);
				this.$emit('input',oldImgs);
			},
			uploadAct(){
				uni.chooseImage({
					count:this.getNum,
					success:(chooseImageRes)=>{
						if(chooseImageRes.tempFilePaths.length > 0){
							 // this.$http.api('child.upload/imageAuth').then(auth=>{
								//  let domain = auth.url;
								//  let token = auth.token;
								//  let region = auth.region_mini;
								// for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
								// 	let file  = chooseImageRes.tempFilePaths[i];
								// 	let index = file.lastIndexOf('/');
								// 	let len   = file.length
								// 	let name  = file.substring(index + 1, len);
								// 	qiniu.upload(file, (res) => {
								// 		let url = res.imageURL;
								// 		let oldImgs = JSON.parse(JSON.stringify(this.value));
								// 		oldImgs.push(url);
								// 		this.$emit('input',oldImgs);
								// 	}, (error) => {
								// 		console.log(error);
								// 	}, {
								// 		region: region,
								// 		key: name,
								// 		domain:domain,
								// 		uptoken: token, 
								// 	});
								// }	
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
	
	.upload-list-photo{
		width:190rpx;
		height:190rpx;
		border-radius:16rpx;
		position: relative;
		margin-right: 30rpx;
		margin-bottom: 30rpx;

	}
	
	
	.upload-list-photo.camera{
	
		background:#FFFFFF;
		border:2rpx dashed #C5CADB;
	}
	.upload-list-photo.camera .upload{
		width: 64rpx;
		height: 64rpx;
		border-radius: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.upload-list-photo:nth-child(3n){
		margin-right: 0rpx;
	}
	.upload-list-photo .photo{
		width:190rpx;
		height:190rpx;
		border-radius:16rpx;
		background: #f2f2f2;
	}
	.upload-list-photo .del{
		width: 56rpx;
		height: 56rpx;
		position: absolute;
		border-radius: 28rpx;
		background: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
		right: 0;
		top: 0;
	}
	
</style>

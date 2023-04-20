<template>
	<view>
		<view class="upload">
			<block v-for="(file,index) in files" :key="index">
				<view class="uplode-file">
					<image 
						v-if="types == 'image'" 
						mode="aspectFill"
						class="uploade-img" 
						:src="file.source" 
						@tap="onPreviewImage(file.source)"
					/>
					<view class="del-icon-wrap" v-if="types === 'image'" @tap="delFiles(index)">
						<image class="del-icon" :src="iconSource" />
					</view>
					<video
						v-if="types == 'video'" 
						class="uploade-img" 
						:src="file.source"
						controls
					>
						<cover-view class="del-icon-wrap" v-if="types === 'video'" @click="delFiles(index)">
							<cover-image :src="iconSource" class="del-icon" />
						</cover-view>
					</video>
				</view>
			</block>
			<view class="uploader-wrapper" @tap="chooseUploads">
				<view v-if="!isDefaultSlot" class="uploader-actions"></view>
				<slot />
			</view>
		</view>	
		<view v-if="!isImmediate" @tap="requestFile">
			<slot name="uploadBtn" />
		</view>
	</view>
</template>

<script>
	import iconImg from "./icon/icon.png";
	export default{
		props: {
			/**
			 * 选择上传类型 image | video
			 */
			types: {
				type: String,
				default: 'image'
			},
			/**
			 * 是否选择完立即上传
			 */
			isImmediate: {
				type: Boolean,
				default: true
			},
			/**
			 * 图片/视频数据展示
			 */
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			},
			/**
			 * 上传文件的接口
			 */
			uploadUrl: {
				type: String,
				default: ''
			},
			/**
			 * 删除的接口
			 */
			deleteUrl: {
				type: String,
				default: ''
			},
			/**
			 * 图标地址
			 */
			iconSource: {
				type: String,
				default: iconImg
			},
			/**
			 * 上传数量限制
			 */
			uploadMaxCount: {
				type: Number,
				default: 10000
			},
			/**
			 * 上传图片大小限制
			 */
			uploadMaxSize: {
				type: Number,
				default: 3
			},
			/**
			 * 点击图片是否可以预览
			 */
			previewImage: {
				type: Boolean,
				default: true
			},
			/**
			 * 请求中其他额外的参数
			 */
			formData: {
				type: Object,
				default: () => {}
			},
			/**
			 * 是否显示加载中
			 */
			isShowLoading: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否清空
			 */
			uploadfiles: {
				type: Number,
				default: 1
			}
		},
		data(){
			return {
				filesLen: 0,
				files: [],
				exceeded_list: [],
				resFails: [],
			}
		},

		computed: {
			isDefaultSlot() {
				return Boolean(this.$slots.default);
			}
		},
		watch:{
			dataList:{
				handler(val){
					this.files = val.map(item => {
						return {
							source: item,
							type: 'original'
						}
					});
				},
				immediate: true
			}
		},
		methods:{
			onPreviewImage (source) {
				if(!this.previewImage) return;
				uni.previewImage({
					current: source,
					urls: this.files.map(item => (item.source))
				})
			},
			chooseUploads(){
				if(this.uploadMaxCount - this.files.length === 0) {
					uni.showModal({
					    content : '最多只能上传'+this.uploadMaxCount+'个文件'
					});
					return
				};
				switch (this.types){
					case 'image': 
						uni.chooseImage({
							count: this.uploadMaxCount - this.files.length,
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], //从相册选择
							success: async (res) => {
								this.filesLen = res.tempFiles.length;
								for(let i = 0; i< res.tempFiles.length; i++){
									if(Math.ceil(res.tempFiles[i].size / 1024) < this.uploadMaxSize * 1024){
										this.files.push({
											source: res.tempFiles[i].path,
											type: 'process'
										});
									}else {
										this.exceeded_list.push(i + 1);
										this.filesLen = this.filesLen - 1;
										// #ifdef APP-PLUS
										plus.nativeUI.alert(`第${[...new Set(this.exceeded_list)].join(',')}张图片超出限制${this.uploadMaxSize}MB,已过滤`);
										// #endif
										// #ifndef APP-PLUS
										uni.showModal({
											content: `第${[...new Set(this.exceeded_list)].join(',')}张图片超出限制${this.uploadMaxSize}MB,已过滤`
										});
										// #endif
										continue;
									}
									//自动上传处理
									if(this.isImmediate){
										await this.uploads(res.tempFiles[i].path, i)
									}
								}
							}
						});
					break;
					case 'video' :
						uni.chooseVideo({
							sourceType: ['camera', 'album'],
							success: async (res) => {
								if(Math.ceil(res.size / 1024) < this.uploadMaxSize * 1024){
									this.files.push({
										source: res.tempFilePath,
										type: 'process'
									});
									if(this.isImmediate){
										this.filesLen = 1;
										await this.uploads(res.tempFilePath)
									}
								}else {
									// #ifdef APP-PLUS
									plus.nativeUI.alert(`您选择的视频超出${this.uploadMaxSize}MB,已过滤`);
									// #endif
									// #ifndef APP-PLUS
									uni.showModal({
										content: `您选择的视频超出${this.uploadMaxSize}MB,已过滤`,
										showCancel: false
									});
									// #endif
								}
							}
						});
					break;
				}
			},
			delFiles(index){
				
				//还未上传的文件
				if(this.files[index].type === 'process'){
					this.files.splice(index,1);
					this.filesLen = this.filesLen - 1;
					//return;
				};
				
				this.$emit('onDelSuccess', {
					data: '',
					index
				});
			},
			uploads(filePath, i = 0){
				if(this.isShowLoading){
					uni.showLoading({
						title: `正在上传第${i + 1}个`,
					});
				};
				//按顺序上传
				return new Promise(async (resolve) => {
					const [err, res] = await uni.uploadFile({
						url: this.uploadUrl,
						filePath,
						name: 'file',
						formData: this.formData,
					});
					if(err){
						// #ifdef APP-PLUS
						plus.nativeUI.alert(`您上传的文件第${i + 1}个失败`);
						// #endif
						// #ifndef APP-PLUS
						uni.showModal({
							content: `您上传的文件第${i + 1}个失败`,
							showCancel: false,
						});
						// #endif
					};
					var dataas=JSON.parse(res.data)
					console.log(dataas.data.url)
					this.resFails.push(dataas.data.url);
					if(this.filesLen === (i + 1)){
						this.$emit("onUploadSuccess", this.resFails);
						this.resFails = [];
					};
					uni.hideLoading();
					resolve('');
				})
			},
			async requestFile(){
				if(!this.uploadUrl) {
					console.error('请填写上传接口');
					return;
				};
				const uploadFails = this.files.filter(item => item.type === 'process');
				this.filesLen = uploadFails.length;
				for (let i = 0; i < uploadFails.length; i++) {
					await this.uploads(uploadFails[i].source, i);
				}
			}
		}
	}
</script>

<style scoped>
	.upload {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.uplode-file {
		position: relative;
		margin: 10rpx;
		width: 210rpx;
		height: 210rpx;
	}
	.uploade-img {
		position: relative;
		display: block;
		width: 210rpx;
		height: 210rpx;
	}
	.del-icon-wrap{
		position: absolute;
		top: 0;
		right: 0;
		z-index: 99;
		width: 44rpx;
		height: 44rpx;
		border-radius: 0 0 0 12rpx;
		background: rgba(0, 0, 0, 0.6);
	}
	.del-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 32rpx;
		height: 32rpx;
	}
	.uploader-wrapper{
		position: relative;
		width: 210rpx;
		height: 210rpx;
		margin:10rpx;
	}
	.uploader-actions {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 2rpx solid #D9D9D9;
	}
	.uploader-actions:before {
		width: 4rpx;
		height: 79rpx;
	}
	.uploader-actions:after {
		width: 79rpx;
		height: 4rpx;
	}
	.uploader-actions:before,
	.uploader-actions:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
</style>

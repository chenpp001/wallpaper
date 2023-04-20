<template>
	<view class="pd16_15">
		<view v-if="istougao">
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="BannerAd && uid>1">
				<ad  :unit-id="BannerAd"></ad>
			</view>
			<!-- #endif -->
			<view>
				<text class="ft16 mb10" style="color: #666;line-height: 100upx; padding-left: 10upx;">请选择分类</text>
			</view>
			<view style="padding-left: 10rpx;">
				<!-- <block v-for="(value,key) in configfenlei" :key="key">
				<text class="ft16 mb10 dfhgvb"  @click="opda(value.id)" :style="tyid==value.id?'background:#00C657; color: #ffffff; box-shadow: 0px 4px 16px -4px rgba(0, 198, 87, 0.3);':''" >{{value.name}}</text>
				</block> -->
				<uni-data-checkbox mode="button" v-model="checkbox2" @change="change" selectedColor="#00C657" :localdata="configfenlei"></uni-data-checkbox>
			</view>>
			<view>
				<text class="ft16 mb10" style="color: #666;line-height: 100upx; padding-left: 10upx;">请选择图片上传</text>
			</view>
				<easy-upload
						:dataList="imageList" 
						:uploadfiles="uploadfiles" 
						types="image"
						:uploadUrl="uploadUrl" 
						:deleteUrl="deleteUrl" 
						@onUploadSuccess="successFails" 
						@onDelSuccess="deleteFails"
					>
						<!-- <template v-slot:uploadBtn>
							<view class="upload-btn">上传</view>
						</template> -->
					</easy-upload>
			
			<!-- <view class="mt16">
				<button class="btn-big mb10" @click="tjtp()" :style="isSubmit ? getBtnStyle : getBtnStyle">立即提交</button>
			</view> -->
			<view class="mt16">
				<button class="btn-big" @click="tougaojl()" :style="isSubmit ? getBtnDisStyle : getBtnDisStyle">记录</button>
			</view>
			<view class="mt16" v-if="tgbz">
				<text class="ft16 mb10" style="color: #ff0000; line-height: 80upx; padding-left: 10upx;">说明：</text>
			</view>
			<view v-if="tgbz" style="padding-left:10upx;">
				<text class="ft14 mb10" style="color: #666;">{{tgbz}}</text>
			</view>
		</view>
		<view v-else style="text-align: center;">
			<text class="ft14 mb10" style="color: #666; text-align: center;">没有数据</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				istougao:false,
				uid:'',
				group_id:0,
				BannerAd:'',
				name:'',
				tags:[],
				uploadUrl:'',
				deleteUrl:'',
				imageList: [],
				imageLists: [],
				uploadfiles:1,
				configfenlei:[],
				tyid:0,
				checkbox2: [],
				tgbz:'',
				type:0,
			}
		},
		computed:{
			isSubmit(){
				if(this.imageLists.length>0){
					return true;
				}else{
					return false;
				}
			}
		},
		onLoad(){
			//this.uploadUrl=this.configs.webUrl+'/api/user/uploadpl?token='+uni.getStorageSync("userinfo").token
			this.deleteUrl=this.configs.webUrl+'/api/user/deleteUrl?token='+uni.getStorageSync("userinfo").token
			this.configfenlei=uni.getStorageSync("config").fenlei
			this.tgbz=uni.getStorageSync("config").site.tgbz
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("userinfo").group_id){
				this.group_id=uni.getStorageSync("userinfo").group_id
			}
			if(uni.getStorageSync("userinfo").id){
				this.uid=uni.getStorageSync("userinfo").id
			}
			if(uni.getStorageSync("config").site.weixinxcx.BannerAd && this.group_id<=1){
				this.BannerAd=uni.getStorageSync("config").site.weixinxcx.BannerAd
			}
			if(uni.getStorageSync("config").site.weixinxcx.tanchuAd){
				this.tanchuAd=uni.getStorageSync("config").site.weixinxcx.tanchuAd
			}
			// #endif
		},
		onShow() {
			this.ongrzlTap();
		},
		methods:{
			change(e){
				//console.log(e.detail.value);
				this.type=e.detail.value
				this.uploadUrl=this.configs.webUrl+'/api/user/uploadpl?token='+uni.getStorageSync("userinfo").token+'&type='+e.detail.value
			},
			opda(tyid){
				this.tyid=tyid;
			},
			successFails(list){
			        console.log(list)
			        const res = list.map(item => {
			             return item;
			        });
			        this.imageLists = [...this.imageLists, ...res];
			        // uni.showModal({
			        //     content : '上传成功'
			        // });
			    },
			    deleteFails(e){
			        console.log(e)
			        const { data, index} = e;
			        this.imageLists.splice(index,1)
			        // uni.showModal({
			        //     content: "删除成功",
			        //     showCancel: true
			        // });
			    },
			changeTag(e){
				let index = parseInt(e.currentTarget.dataset.index);
				this.tags[index].select = this.tags[index].select == 1 ? 0 : 1;
			},
			tougaojl(){
				uni.navigateTo({
					url:'/pages/client/member/tougaojl'
				})
			},
			async ongrzlTap(){
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				uni.request({
					url: this.configs.webUrl+'/api/user/index',
					data: data,
					success: res =>{
						if(res.data.code==1){
							let ionfo=res.data.data
							// #ifndef MP-WEIXIN
							this.istougao=true
							// #endif
							// #ifdef MP-WEIXIN
							if(ionfo.istg==2 && ionfo.tgbzje>0){
								this.istougao=true
							}
							// #endif
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});		
			},
			tjtp(){
				var this_=this
				let data = {};
				// if(!this.name){
				// 	uni.showModal({
				// 	    content : '请填写标题'
				// 	});
				// 	return
				// }
				console.log(this.checkbox2.length);
				if(this.checkbox2.length<=0){
					uni.showModal({
					    content : '请选择分类'
					});
					return
				}
				data.type=this.checkbox2
				// #ifdef MP-WEIXIN
				data.typelx=1
				// #endif
				// #ifndef MP-WEIXIN
				data.typelx=2
				// #endif
				console.log(data);
				if(this.imageLists.length<=0){
					uni.showModal({
					    content : '请填上传图片'
					});
					return
				}
				var lists=this.imageLists
				var pic=''
				var img=''
				const res = lists.map(item => {
					if(pic){
						pic=pic+','+item;
					}else{
						pic=item
						img=item
					} 
				});
				data.img=img
				//data.name=this.name
				data.pic=pic
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougao',
					data: data,
					success: res =>{
						if(res.data.code==1){
							uni.showModal({
								title: '温馨提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: "确定",
								success: function (res) {
									if (res.confirm) {
										this_.imageList=[]
										this_.imageLists=[]
										this_.uploadfiles=2
										this_.tougaojl()
									} else if (res.cancel) {
										
									}
								}
							});
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});	
			}
		}
	}
</script>

<style>
	.dfhgvb{
		background:#eee;
		color: #353535;
		padding: 15rpx 20rpx;
		border-radius: 50rpx;
		margin: 10rpx 25rpx 10rpx 8rpx;
		display: inline-block;
	}
	.tag-feedback{
		height: 64rpx;
		border:2rpx solid #E4E6ED;
		padding: 0 20rpx;
		line-height: 60rpx;
		color:#000000;
		font-size: 28rpx;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.tag-feedback.on{
		border:none;
		color:#FFFFFF;
		line-height: 64rpx;
		padding: 0 22rpx;
	}
	.list {
	  display: flex;
	  flex-direction: column;
	  padding: 0rpx;
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
</style>
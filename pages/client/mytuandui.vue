<template>
	<view class="pd16_15">
		<view class="box noshadow pd16_15" v-if="iskq==1">
			<view class="ft16 ftw600 cl-main"> 
				<text class="ft16 ftw600 cl-main">直接团队</text>
				<text @click="showQrcodeop" class="ft16 ftw600 cl-main" style="float: right;">分享码</text>
			</view>
			<view class="bd-line mt16"></view>
			<view class="flex wrap mt24">
				<block v-for="(value,key) in data" :key="key">
				<view class="col5">
					<view class="text-center">
						<image :src="value.avatar?value.avatar:value.url" class="miniapp-icon"></image>
					</view>
					<view class="text-center ft12 cl-info2 mt8">
						{{value.id}}
					</view>
				</view>
				</block>
			</view>
		</view>	
		<view class="box noshadow pd16_15" v-else>
			<view class="ft16 ftw600 cl-main">系统后台没有开通分销</view>
		</view>	
		<dialog-qrcode v-if="showQrcode" @closed="showQrcode = false"></dialog-qrcode>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				data:[],
				iskq:0,
				showQrcode:false,
			}
		},
		onLoad(){
			this.ongrzlTap();
			if(uni.getStorageSync("config").iskq){
				this.iskq=uni.getStorageSync("config").iskq;
			}
		},
		methods:{
			showQrcodeop(){
				this.showQrcode=true
			},
			async ongrzlTap(){
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;

				uni.request({
					url: this.configs.webUrl+'/api/user/mytuandui',
					data: data,
					success: res =>{
						if(res.data.code==1){
							this.data=res.data.data
		

						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});		
			},
		}
	}
</script>

<style>
	.miniapp-icon{
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: #F2F2F2;
	}
	.col5{
		margin-bottom: 20px;
	}
</style>
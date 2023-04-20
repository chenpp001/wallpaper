<template>
	<view v-if="vipSetting.length > 0">
		<view class="vipcard-detail-header">
			<image class="bg" :src="statics.vipcardDetailHeaderBg"></image>
			<view class="main pt20">
				<view class="flex alcenter space">
					<view class="col3 text-center">
						<view class="ft12 cl-w8">{{vipLevel>1?'到期日期':''}}</view>
						<view class="mt8 vipcard-num">{{vipLevel>1?userinfo.dtime:''}}</view>
					</view>
					<view class="col3 flex center">
						<image class="vipcard-face" :src="avatar"></image>
					</view>
					<view class="col3 text-center">
						<view class="ft12 cl-w8">{{vipLevel>1?'剩余天数':''}}</view>
						<view v-if="userinfo.dqts>=0" class="mt8 vipcard-num">{{vipLevel>1?userinfo.dqts+'天':''}}</view>
						<view v-if="userinfo.dqts<0" class="mt8 vipcard-num">{{vipLevel>1?'已经到期'+-userinfo.dqts+'天':''}}</view>
					</view>
				</view>
				
				<view class="flex center mt8">
					<view class="vipcard-level-tag ft12 cl-w8">当前等级:<text class="ftw600 ft12 ml4">{{vipname}}</text></view>
				</view>
			</view>
		</view>
	
		<view class="vipcard-detail-main">
			<view class="flex center">
				<swiper @change="changeVip" class="vipcard-swiper" previous-margin="15px" next-margin="30px" :indicator-dots="false" :autoplay="false">
					<swiper-item>
						<view class="swiper-item">
							<view class="card">
								<image class="bg" :src="statics.vipcardBg[vipLevel-1]"></image>
								<view class="main">
									<view class="text-center ft20 ftw600 cl-main">{{vipname}}</view>
									<view v-if="userinfo.dqts>=0" class="mt20 flex center">
										<view @click="vipcm" v-if="vipLevel == 1" class="vipcard-info"><text class="ft14 ftw600 ml4 cl-main">立即升级</text></view>
										<view @click="vipcm" v-if="vipLevel == 2" class="vipcard-info">{{userinfo.dqts}}天后到期 续费VIP</view>
									</view>
									<view v-if="userinfo.dqts<0" class="mt20 flex center">
										<view @click="vipcm" v-if="vipLevel == 1" class="vipcard-info"><text class="ft14 ftw600 ml4 cl-main">立即升级</text></view>
										<view @click="vipcm" v-if="vipLevel == 2" class="vipcard-info">已经到期{{-userinfo.dqts}}天 立即续费VIP</view>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
		
				</swiper>
			</view>
			<view class="pd16_15">
				<view class="box noshadow pd16_15">
					<view class="ft16 ftw600 cl-main">VIP会员持有权益</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="mt16" v-if="BannerAd">
						<ad  :unit-id="BannerAd"></ad>
					</view>
					<!-- #endif -->
					<view class="flex space alcenter mt8">
						<view class="vipcard-con-box pd20_15 flex alcenter">
							<image style="width: 80rpx;height: 80rpx;" :src="statics.vipTq[0]"></image>
							<view class="ml10">
								<view class="ft14 ftw600 cl-main">福利礼包</view>
								<view class="mt6 ft12 cl-notice">拿到手软</view>
							</view>
						</view>
						<view class="vipcard-con-box pd20_15 flex alcenter">
							<image style="width: 80rpx;height: 80rpx;" :src="statics.vipTq[1]"></image>
							<view class="ml10">
								<view class="ft14 ftw600 cl-main">特惠折扣</view>
								<view class="mt6 ft12 cl-notice">会员专属价</view>
							</view>
						</view>
						
					</view>
					
					<view class="flex space alcenter mt16">
						<view class="vipcard-con-box pd20_15 flex alcenter">
							<image style="width: 80rpx;height: 80rpx;" :src="statics.vipTq[2]"></image>
							<view class="ml10">
								<view class="ft14 ftw600 cl-main">专属特惠</view>
								<view class="mt6 ft12 cl-notice">免费下载</view>
							</view>
						</view>
						<view class="vipcard-con-box pd20_15 flex alcenter">
							<image style="width: 80rpx;height: 80rpx;" :src="statics.vipTq[3]"></image>
							<view class="ml10">
								<view class="ft14 ftw600 cl-main">专属顾问</view>
								<view class="mt6 ft12 cl-notice">独家服务</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<dialog-birthday :showOnly="true" :title="'V'+vipSetting[selectId].level +vipSetting[selectId].name + '生日礼包'" v-if="showBirthday" @closed="showBirthday = false"></dialog-birthday>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				group_id:0,
				BannerAd:'',
				vipLevel:'',
				rankNum:290, //成长值
				selectId:0,
				vipname:'',
				showBirthday:false,
				avatar:'',
				userinfo:[],
				vipSetting:[
					{level:1,name:'普通会员',rank_need:100},
					{level:2,name:'VIP会员',rank_need:200},
					// {level:3,name:'铂金会员',rank_need:300},
					// {level:4,name:'钻石会员',rank_need:400},
					// {level:5,name:'至尊会员',rank_need:500},
				],
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("userinfo").group_id){
				this.group_id=uni.getStorageSync("userinfo").group_id
			}
			if(uni.getStorageSync("config").site.weixinxcx.BannerAd){
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
		computed:{
			getVipType(){
				let arr =  new Array;
				for(var a  in this.vipSetting){
					let type = 0; // 0未达到  1已达到  2当前
					if(this.vipLevel > this.vipSetting[a].level){
						type = 1;
					}else if(this.vipLevel == this.vipSetting[a].level){
						type = 2;
					}
					arr.push(type);
				}
				return arr;
			}
		},
		methods:{
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
							this.userinfo=ionfo
							this.vipLevel=ionfo.group_id
							if(this.vipLevel==1){
								this.vipname='普通会员'
							}else{
								this.vipname='VIP会员'
							}
							if(res.data.data.avatar){
									var str = res.data.data.avatar;
									if(str.indexOf("data:image") != -1){
										this.avatar='';
									}else{
										if(str.indexOf("http") != -1){
											this.avatar=res.data.data.avatar;
										}else{
											this.avatar=this.configs.imgUrl+res.data.data.avatar;
										}
									}
								}else{
									this.avatar='';
								}
						}else{
							uni.showToast({ title: res.data.msg,icon:"none" });
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});		
			},
			changeVip(e){
				this.selectId = parseInt(e.detail.current);
			},
			vipcm(){
				//uni.showToast({ title: '0000',icon:"none" });
				uni.navigateTo({
					url:'/pages/client/vipcard/vipcm'
				})
			}
			
		}
	}
</script>

<style>
	.vipcard-detail-header{
		position: relative;
		height: 480rpx;
	}
	.vipcard-detail-header .bg{
		width: 100%;
		height: 480rpx;
	}
	.vipcard-detail-header .main{
		height: 480rpx;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.vipcard-detail-header .vipcard-num{
		font-size: 24rpx;
		font-weight: bold;
		line-height: 48rpx;
		background: linear-gradient(180deg, #F2DCA9 0%, #C79556 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.vipcard-detail-header .vipcard-face{
		width: 112rpx;
		height: 112rpx;
		border:8rpx solid rgba(255,255,255,0.9);
		border-radius: 100rpx;
		background: rgba(255,255,255,0.9);
	}
	.vipcard-detail-header .vipcard-level-tag{
		height: 40rpx;
		border-radius: 20rpx;
		padding: 0 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border:2rpx solid rgba(255,255,255,.3)
	}
	.vipcard-detail-main{
		position: relative;
		margin-top: -212rpx;
	}

	.vipcard-swiper{
		height: 280rpx;
		width: 100%;
	}
	.vipcard-swiper .swiper-item{
		width: 100%;
		padding-left: 15px; /**就用PX了**/
	}
	.vipcard-swiper .swiper-item .card{
		height: 280rpx;
		width: 100%;
		position: relative;
		border-radius: 32rpx;
		overflow: hidden;
	}
	.vipcard-swiper .swiper-item .card .bg{
		width: 100%;
		height: 280rpx;
	}
	.vipcard-swiper .swiper-item .card .main{
		width: 100%;
		height: 280rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		padding: 72rpx;
	}
	.vipcard-swiper .swiper-item .card .main .vipcard-info{
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 0 20rpx;
		text-align: center;
		line-height: 80rpx;
		color:#ff0000;
		font-size: 30rpx;
	}
	.vipcard-swiper .swiper-item .card .vip-type-tag{
		width: 104rpx;
		height: 40rpx;
		background: linear-gradient(136deg, #4E4E4E 0%, #262728 100%);
		border-radius: 0rpx 20rpx 20rpx 0rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
		color:#F7E3C3;
		font-weight: 500;
		position: absolute;
		z-index: 3;
		left: 0;
		top:40rpx;
	}
	.vipcard-con-box{
		width: 300rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 8rpx;
	}
</style>
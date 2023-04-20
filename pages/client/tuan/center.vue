<template>
	<view class="content">
		<view class="plr15">
			<!-- #ifdef APP-PLUS -->
			<view class="mt10 ad-view" ad-width="100%">
				<ad :adpid="xxladpid"></ad>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="mt10" v-if="BannerAd" style="width: 100%;">
				<ad :unit-id="BannerAd"></ad>
			</view>
			<view class="mt10" v-else style="width: 100%;">
				<home-banner :banners="banners"></home-banner>	
			</view>
			<!-- #endif -->
			<view class="tags pt20" v-if="zodiacList[0]">
				<view class="ft18 pl10">标签</view>
				<view class="flex space pt10" style="display: flex; justify-content: flex-start; flex-direction: row; flex-wrap: wrap;">
					<view class="tag ft14" :style="{'background-color':randomColor(index)}"  @click="tagClick(item)" v-for="(item, index) in zodiacList" :key="index">{{item}}</view>
				</view>
			</view>
			<view class="category pt20">
				<view class="ft18 pl10">分类</view>
				<view class="flex space pt10" style="display:flex; flex-wrap:wrap;">
					<view class="cate" v-for="(item, index) in categoryList" :key="index"  @click="listClick(item.id)">
						<image :src="webUrl+item.image" mode="aspectFill"></image>
						<view class="texts ft14" style="text-shadow:0px 0px 5px #000000;">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="" style="height: 30rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				group_id:0,
				BannerAd:'',
				tanchuAd:'',
				xxladpid:'',//banner信息流
				loadShow: false,
				banners:[],
				
				zodiacList: [], 
				categoryList: [],
				webUrl:'',
			}
		},
		onLoad() {
			this.webUrl=this.configs.webUrl
			this.getList1();
			
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor:"#000000",
				backgroundColor:"#ffffff",
				complete:()=>{
					this.navLock = false;
				}
			});
		},
		methods: {
			listClick(id){
				uni.navigateTo({
					url:'/pages/client/tuan/sstp?selectIndex=4&typeids='+id
				})
			},
			tagClick(keytext){
				uni.navigateTo({
					url:'/pages/client/tuan/sstp?selectIndex=4&keytext='+keytext
				})
			},
			getList1() {
				var lx=4
				let this_=this
				let data = {};
				data.limit=1
				data.lx=4
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						setTimeout(function() {
							uni.hideLoading();  
						},150)
						//console.log(data.data)
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						this.banners=data.data.config.banner
						this.categoryList=data.data.config.fenlei
						this.zodiacList=data.data.config.site.gjz
						
						//广告开始
						// #ifdef MP-WEIXIN
						if(data.data.config.site.weixinxcx.BannerAd){
							this.BannerAd=data.data.config.site.weixinxcx.BannerAd
						}
						if(data.data.config.site.weixinxcx.tanchuAd){
							this.tanchuAd=data.data.config.site.weixinxcx.tanchuAd
						}
						// #endif
						// #ifndef MP-WEIXIN
						if(data.data.config.site.appapi.xxladpid){
							this.xxladpid=data.data.config.site.appapi.xxladpid
							console.log(this.xxladpid)
						}
						// #endif
						//广告结束
						console.log(this.type4tab)
					},
					fail: (data, code) => {
						uni.stopPullDownRefresh();
						setTimeout(function() {
							uni.hideLoading();  
						},150)
					}
				});
			},
			randomColor() {
			   var col = "#";
			   for (var i = 0; i < 6; i++) col+=parseInt(Math.random() * 16).toString(16);
			   return col;
			}


		}
	}
</script>

<style lang="scss" scoped>
	.vtop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 999999;
		.title{
			position: relative;
			color: #303030;
			font-size: 24px;
			line-height: 80rpx;
		}
		.search{
			background: #F3F4F5;
			height: 68rpx;
			margin: 20rpx 40rpx 15rpx 40rpx;
			padding-left: 40rpx;
			border-radius: 50px;
			text{
				color: #a6a7a8;
				font-size: 14px;
			}
		}
	}
	.ranking{
		.tab{
			width: 225rpx;
			height: 100rpx;
			border-radius: 12rpx;
			color: #FFFFFF;
			.eng{
				color: #F5F5F5;
			}
		}
		.tab:nth-child(1){
			background-image: linear-gradient(to bottom right, #8acfaf, #5FBB92, #5FBB92, #8acfaf);
			margin-right: 10rpx;
		}
		.tab:nth-child(2){
			background-image: linear-gradient(to bottom right, #f0d35c, #F0B347, #F0B347, #f0d35c);
			margin-right: 10rpx;
		}
		.tab:nth-child(3){
			background-image: linear-gradient(to bottom right, #8c99de, #836AF0, #836AF0, #8c99de);
		}
	}
	
	.tags{
		.tag{
			font-size: 14px;
			 // background-image: linear-gradient(to bottom right, #8c99de, #836AF0, #836AF0, #8c99de);
			color: #ffffff;  
			border-radius: 40rpx;
			line-height: 60rpx;
			padding: 0 32rpx;
			text-align: center;
			margin-right: 12rpx;
			margin-bottom: 12rpx;
			// text-shadow:0px 0px 3px #000000;
		}
		
	}
	 
	.category{
		.cate{
			position: relative;
			margin-right: 10rpx;
			margin-left: 10rpx;
			margin-bottom: 20rpx;
			image{
				display: block;
				width: 325rpx;
				height: 160rpx;
				border-radius: 12rpx;
			}
			.texts{
				position: absolute;
				bottom: 20rpx;
				left: 20rpx;
				color: #FFFFFF;
			}
		}
	}
	.cate-active{
		transform:scale(0.95);
		transition: all 0.2s;
	}
</style>

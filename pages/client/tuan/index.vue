<template>
	<view>
		<!-- <sub-tabnav :tabs="tabs" @change="changeIndex" :selectIndex="selectIndex" :scrollTop="scrollTop"></sub-tabnav> -->
		<sub-tabnavlb v-if="selectIndex==4 && type4tab[1]" :tabs="type4tab" @change="changetype4" :selectIndex="selecttype4" :scrollTop="scrollTop"></sub-tabnavlb>
		<!-- #ifdef MP-WEIXIN -->
		<view class="" style="background: #ffffff;"> 
			<uni-search-bar @confirm="search" :focus="false" placeholder="请输入搜索内容" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
							@cancel="cancel" @clear="clear">
			</uni-search-bar>
		</view>
		<!-- #endif -->
		
		<!-- <sub-tabvs class="pt5" v-if="selectIndex==1 && typetab[1]" :tabs="typetab" @change="changetype" :selectIndex="selecttype" :scrollTop="scrollTop"></sub-tabvs>
		<sub-tabvs class="pt5" v-if="selectIndex==1 && addddtab[1]" :tabs="addddtab" @change="changeadddd" :selectIndex="selectadddd" :scrollTop="scrollTop"></sub-tabvs>
		<sub-tabvs class="pt5" v-if="selectIndex==1 && yeartab[1]" :tabs="yeartab" @change="changeyear" :selectIndex="selectyear" :scrollTop="scrollTop"></sub-tabvs>
		
		<sub-tabvs class="pt5" v-if="selectIndex==2 && type2tab[1]" :tabs="type2tab" @change="changetype2" :selectIndex="selecttype2" :scrollTop="scrollTop"></sub-tabvs>
		<sub-tabvs class="pt5" v-if="selectIndex==3 && type3tab[1]" :tabs="type3tab" @change="changetype3" :selectIndex="selecttype3" :scrollTop="scrollTop"></sub-tabvs> -->
		<view class="pd10_15 flex space" style="display:flex; flex-wrap:wrap;">
			<block v-for="(value,key) in listData" :key="key">
			<!-- #ifdef MP-WEIXIN -->
			<view class="mb10" v-if="key==6 && BannerAd" style="width: 100%;">
				<ad :unit-id="BannerAd"></ad>
			</view>	
			<!-- #endif -->
			<view class="box pic-item" v-if="type4id==104 || type4id==107"  @click="detail(value.id,value.lx)">
				<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
				<image class="integral-mall-goodstx" mode="aspectFill" :src="value.img"></image>
			</view>
			<view class="box pic-item" v-else  @click="detail(value.id,value.lx)">
				<!-- <view class="btn-mini" style="position: absolute; top: 20upx; right: 20upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 1;" :style="getBtnStyle">壁纸</view> -->
				<image class="integral-mall-goods" mode="aspectFill" :src="value.img"></image>
			</view>
			</block>
		</view>
		<view class="mb15">
			<uni-load-more  :status="status" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
export default{
		data(){
			return {
				group_id:0,
				BannerAd:'',
				tanchuAd:'',
				interstitialAd:'',
				banners:[],
				vipLevel:0,
				isLogin:true,
				showLogin:false,
				datasa:[],
				dataconfig:[],
				searchValue:'',
				total:0,
				pageSize:10,
				tabs:[
					{name:'全部'},
					{name:'视频'},
					{name:'音频'},
					{name:'小说'},
					{name:'壁纸'},
				],
				selectIndex:4,
				scrollTop:0,
				
				type2tab:[],
				selecttype2:0,
				type2id:'',
				
				type3tab:[],
				selecttype3:0,
				type3id:'',
				
				type4tab:[],
				selecttype4:0,
				type4id:'',
				
				typetab:[],
				selecttype:0,
				typeid:'',
				
				addddtab:[],
				selectadddd:0,
				addddid:'',
				
				yeartab:[],
				selectyear:0,
				yearid:'',
				
				type:'',
				keytext:'',
				listData: [],
				last_id: 0,
				reload: true,
				status: 'more',
				typeids:0,
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有数据了'
				}
			}
		},
		onLoad(e){
			//console.log(111)
			if(e.selectIndex){
				this.selectIndex=e.selectIndex*1
			}
			if(e.typeids){
				this.typeids=e.typeids*1
				this.type4id=e.typeids
			}
			if(e.keytext){
				this.keytext=e.keytext
				this.searchValue=e.keytext
			}
			this.status = 'more';
			this.getList();
			this.banners=uni.getStorageSync("config").banner
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("userinfo")){
				this.group_id=uni.getStorageSync("userinfo").group_id
			}
			if(uni.getStorageSync("config")){
				this.BannerAd=uni.getStorageSync("config").site.weixinxcx.BannerAd
			}
			if(uni.getStorageSync("config")){
				this.tanchuAd=uni.getStorageSync("config").site.weixinxcx.tanchuAd
			}
			if(this.tanchuAd){
				this.interstitialAd=wx.createInterstitialAd({
				    adUnitId: this.tanchuAd
				})
			}
			// #endif
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			var this_=this
			this.status = 'loading';
			setTimeout(function() {
			    this_.getList();
			},500)
		},
		//监听搜索框文本变化
		onNavigationBarSearchInputChanged(e) {
			let text = e.text;
			if(text){
				this.keytext=text;	
			}
			console.log(text)
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
		//监听点击搜索按钮事件
		onNavigationBarSearchInputConfirmed(e) {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
			var this_=this
			let text = e.text;
			if (!text) {
				uni.showModal({
					title: '',
					content:"请输入搜索内容",
					showCancel: false,
					confirmText: "确定",
					confirmColor:"#e19503",
					success: function (res) {
						this_.keytext='';
						this_.getList(0)
					}
				});
				return;
			} else {
				this.keytext=text;
				this.listData=[];
				this.last_id=0;
				this.type='';	
				this.getList(0)
			}
			
		},
		onPullDownRefresh(){
			uni.showLoading({
			    title: '加载中'
			});
			this.listData=[]
			this.getdata()
		},
		methods:{
			detail(id,lx){
				console.log(lx);
				if(lx==1){
					uni.navigateTo({
						url:'/pages/client/tuan/detail?id='+id
					})
				}else if(lx==2){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else if(lx==3){
					uni.navigateTo({
						url:'/pages/client/tuan/info?id='+id
					})
				}else if(lx==4){
					uni.navigateTo({
						url:'/pages/client/tuan/infotp?id='+id
					})
				}else{
					uni.navigateTo({
						url:'/pages/client/tuan/list?id='+id
					})
				}
			},
			onPageChange(e) {
			    this.last_id=0
			    this.reload=true
			    this.getList()
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
			},
			getList() {
				// #ifdef MP-WEIXIN
				console.log(this.last_id)
				if(this.last_id==3 || (this.last_id>5 && this.last_id%5==0)){
					if(this.tanchuAd && this.interstitialAd){
						this.interstitialAd.show().catch((err) => {
						    console.error(err)
						})
					}
				}
				// #endif
				let data = {
					//column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				var limit=15;
				if (this.last_id>0) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.offset = this.last_id*limit;
					data._ = new Date().getTime() + '';
				}
				data.limit=limit		
				
				if(this.selectIndex){
					data.lx=this.selectIndex
				}
				if(this.typeid && this.selectIndex==1){
					data.typeid=this.typeid
				}
				if(this.addddid && this.selectIndex==1){
					data.addddid=this.addddid
				}
				if(this.yearid && this.selectIndex==1){
					data.yearid=this.yearid
				}
				if(this.type2id && this.selectIndex==2){
					data.typeid=this.type2id
				}
				if(this.type3id && this.selectIndex==3){
					data.typeid=this.type3id
				}
				if(this.type4id && this.selectIndex==4){
					data.typeid=this.type4id
				}
				if(this.keytext){
					data.keytext=this.keytext
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/lists',
					data: data,
					success: data => {
						//console.log(data.data)
						uni.stopPullDownRefresh();
						setTimeout(function() {
						    uni.hideLoading();  
						},150)
						this.yeartab=data.data.typedata.year
						this.addddtab=data.data.typedata.adddd
						this.typetab=data.data.typedata.type
						this.type2tab=data.data.typedata.type2
						this.type3tab=data.data.typedata.type3
						this.type4tab=data.data.typedata.type4
						
						
						if(this.typeids>0){
							for (var i=0;i<this.type4tab.length;i++)
							{ 
								if(this.typeids==this.type4tab[i].id){
									this.selecttype4=i
									//console.log(this.type4tab[i])
								}
							}
						}
						if (data.data.total>0) {
							let list = data.data.rows;
							this.listData = this.reload ? list : this.listData.concat(list);
							this.reload = false;
							this.last_id = this.last_id+1;
							if(data.data.total<this.last_id*limit){
								this.status = '';
							}
						}else{
							this.listData=[];
							this.contentText.contentdown='没有数据'
							this.status=''
							
						}
					},
					fail: (data, code) => {
						uni.stopPullDownRefresh();
						setTimeout(function() {
						    uni.hideLoading();  
						},150)
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			changeIndex(index){
				this.selectIndex = index;
				this.type=this.tabs[index].name
				this.getdata()				
			},
			changetype(index){
				this.selecttype = index;
				this.typeid=this.typetab[index].id
				this.getdata()				
			},
			changeadddd(index){
				this.selectadddd = index;
				this.addddid=this.addddtab[index].id
				this.getdata()				
			},
			changeyear(index){
				this.selectyear = index;
				this.yearid=this.yeartab[index].id
				this.getdata()				
			},
			
			changetype2(index){
				this.selecttype2 = index;
				this.type2id=this.type2tab[index].id
				this.getdata()				
			},
			changetype3(index){
				this.selecttype3 = index;
				this.type3id=this.type3tab[index].id
				this.getdata()				
			},
			changetype4(index){
				this.typeids=0
				this.selecttype4 = index;
				this.type4id=this.type4tab[index].id
				this.getdata()				
			},
			getdata(){
				this.last_id=0
				this.reload=true
				this.getList()
			},
			loginYes(){
				
			},
			mlinkTo(e){
				if(this.isLogin == true){
					let link = e.currentTarget.dataset.link;
				}else{
					this.showLogin = true;
				}
			},
			search(res) {
				this.listData=[];
				this.last_id=0;
				this.keytext=res.value;
				this.type='';	
				this.getList(0)
			},
	
			clear(res) {
				this.keytext='';
				this.last_id=0;
				this.listData=[];
				this.keytext='';
				this.type='';	
				this.getList(0)
			},
			input(res) {
				console.log('----input:', res)
			},
			blur(res) { 
				// this.listData=[];
				// this.last_id=0;
				// this.keytext=res.value;
				// this.type='';	
				// this.getList(0)
				//res.value 
			},
			focus(e) {

			},
			cancel(res) {
				this.keytext='';
				this.last_id=0;
				this.listData=[];
				this.keytext='';
				this.type='';	
				this.getList(0)
			}
		}
	}
</script>

<style>

	.user-not-vip{
		width: 100%;
		height: 80rpx;
		background: #FDF6EC;
		border-radius: 40rpx;
		border: 2rpx solid #EFC381;
		text-align: center;
		line-height: 76rpx;
		font-size: 24rpx;
		color:#000000;
		font-weight: bold;
	}
	

	.tuan-product-l{
		width: 320rpx;
		height: 240rpx;
		border-radius: 16rpx;
		background: #F2F2F2;
	}
	.tuan-product-r{
		width: calc(100% - 320rpx);
	}
	.search-result {
			padding-top: 10px;
			padding-bottom: 20px;
			text-align: center;
		}
	
		.search-result-text {
			text-align: center;
			font-size: 14px;
			color:#666;
		}
	
		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			padding: 0px;
		}
	
		.uni-mt-10 {
			margin-top: 10px;
		}
		.integral-mall-goods{
			width: 100%;
			height: 350rpx;
			background: #F2F2F2;
			border-radius: 16upx;
		}
		.integral-mall-goodstx{
			width: 100%;
			height: 230rpx;
			background: #ffffff;
			border-radius: 16upx;
		}
		/* 商品列表 */
		.pic-list{
			display:flex;
			flex-wrap:wrap;
			padding: 0 30upx;
			background: #fff;
		
		}
		.pic-item{
			display:flex;
			flex-direction: column;
			width: 32%;
			margin-bottom: 20upx;
		}
</style>
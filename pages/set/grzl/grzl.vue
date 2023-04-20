<template>
	<view class="container">
		<view class="list-cell b-b avatar" hover-class="cell-hover" :hover-stay-time="50"  @click="clk(0)">
			<text class="cell-tit">头像</text>
			<image :src="urls" mode="aspectFill"></image>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('../../set/grzl/nc/nc?ty=nickname&name=呢称&v='+listgrzl.nickname)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">昵称</text>
			<text class="cell-tip">{{listgrzl.nickname}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell m-t b-b" @tap="sex"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{sexType}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('../../set/grzl/nc/nc?ty=org&name=生日&v='+listgrzl.birthday)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">生日</text>
			<text class="cell-tip">{{listgrzl.birthday}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">手机号</text>
			<text class="cell-tip">{{listgrzl.mobile}}</text>
		</view>
<!-- 		
		<view class="list-cell b-b" @click="navTo('../../set/grzl/nc/nc?ty=sg&name=身高&v='+listgrzl.sg)">
			<text class="cell-tit">身份证号</text>
			<text class="cell-tip">{{listgrzl.sg}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<avatar @upload="doUpload" @avtinit="doBefore" quality="1" ref="avatar"></avatar>
	</view>
</template>

<script>
	import avatar from "../../../components/yq-avatar/yq-avatar.vue";
	let sex = ['女', '男'];
	import { mapMutations} from 'vuex';
	export default {
		data() {
			return {
				urls:'',
				sexsi:'',
				array: [],
				ageid: 0, 
				listgrzl:[],
				msg:false,
				imgUrl:this.configs.imgUrl
			};
		},
		computed: {
			sexType() {
				return sex[this.sexsi];
			},
		},
		onShow(){
			this.ongrzlTap();
			if(this.msg){
				uni.showToast({ title: '保存成功',icon:"none" });
				this.msg=false;
			}
		},
		methods:{
			...mapMutations(['logout']),
			...mapMutations(['login']),
			//跳转
			async ongrzlTap(){
				let _this=this;
				let [err,res] = await this.$httpas.get('/api/user/index',{},{token:true});
				if (!this.$httpas.errorCheck(err,res)) return;
				if(res.data.code === 1){
					this.listgrzl=res.data.data;
					this.sexsi=res.data.data.gender;
					var str = res.data.data.avatar;
					if(str.indexOf("http") != -1){
						this.urls=res.data.data.avatar;
					}else{
						this.urls=this.configs.imgUrl+res.data.data.avatar;
					}
					
					
				}else{
					uni.showToast({title:res.data.msg})
					this.logining = false;
				}
			},
			navTo(url){
				uni.navigateTo({
					url:url,
					animationType: 'slide-in-bottom',
				})
			},
			navsTo(url){
				uni.navigateTo({
					url:url
				})
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		uni.clearStorageSync();
				    		setTimeout(()=>{
								uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			//选择性别
			sex() {
				uni.showActionSheet({
					itemList:sex,
					success: (res)=> {
						this.sexgender(res);
					}
				});
			},
			async sexgender(ress) {
				let _this=this;
				let [err,res] = await this.$httpas.post('/api/user/edituser',{sex:ress.tapIndex},{token:true});
				if (!this.$httpas.errorCheck(err,res)) return;
				if(res.data.code === 1){
					  this.sexsi = ress.tapIndex,
					  uni.showToast({
						title:"保存成功"
					  })
				}else{
					uni.showToast({title:res.data.msg})
					this.logining = false;
				}
			},
			
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '350upx', selHeight: '350upx', 
					expWidth: '400upx', expHeight: '400upx',
					inner: index ? 'true' : 'false',
					canRotate:false,
					quality:1,
				});
			},
			doUpload(rsp) {
				uni.showLoading({
				    title: '加载中'
				});
				uni.uploadFile({
					url: this.configs.webUrl+'/api/user/avatar?token='+uni.getStorageSync("userinfo").token, //仅为示例，非真实的接口地址
					filePath: rsp.path,
					name: "file",
					dataType:"json",
					formData: {
						'token': uni.getStorageSync("userinfo").token,
						'uid': uni.getStorageSync("userinfo").id,
						// #ifdef H5
						'base64':rsp.base64, //h5上传base64
						// #endif
					},
					success: (uploadFileRes) => {
						var dataarr=JSON.parse(uploadFileRes.data);
						if(dataarr.code==1){
							console.log(dataarr.data.url)
							this.urls=this.configs.imgUrl+dataarr.data.url;
							uni.showToast({
								title:"修改成功"
							})
							
						}else{
							uni.showToast({
								title:dataarr.msg
							})
						}
					},
					complete(res) {
						uni.hideLoading();
						console.log(res)
					}
				});
			}
		},
		components: {
			avatar
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.yyt-ellipsis{
		display: inline-block;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换
	}
	.avatar{
		padding-top: 40upx!important;
		padding-bottom: 40upx!important;
	}
	.agess{
		position: absolute;
		z-index: 2;
		top: 0px;
		right: 0px;
		height: 100%;
		line-height: 38px;
		padding-left: 200px;
		padding-right: 36px!important;
		background: transparent;
	}
	.avatar .cell-tit{
		font-weight: bold!important;
	}
	.avatar image{
		position: absolute;
		top: 50%;
		right: 36px;
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		margin-top: -44upx;
		z-index: 1
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>

<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="czmain">
			<view class="cztop">
				<view class="czxx">提现方式：{{type}}</view>
				<view class="czyebox">
					<view style="font-size: 36upx; text-align: center;">当前余额 ￥{{urerdata.money}}</view>
					<view>提现金额</view>
					<input type="digit" focus class="czye" v-model="money" placeholder="请输入提现金额" />
					<view>提现姓名</view>
					<input type="text" class="czye1" v-model="name" placeholder="请输入提现姓名" />
					<view>提现账号</view>
					<input type="text" class="czye1" v-model="cord" placeholder="请输入提现账号" />
					<view style="margin-top: 10upx; font-size: 28upx; color: #ff0000;">备注：{{configsa.txbz}}</view>
					<view class="uni-btn-v uni-common-mt">
						<button  class="onstep" @click="butsub()">提交</button>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                money: '',
				name: '',
				cord:'',
				type:'支付宝',
				dbled:true,
				urerdata:[],
				configsa:[],
                providerList: []
            }
        },
        onLoad: function() {
			
        },
		onShow: function() {
			this.ongrzlTap()
		},
        methods: {
			async butsub(){
				var thia=this
				let data = {
					'token':uni.getStorageSync("userinfo").token,
					'money':this.money,
					'name':this.name,
					'cord':this.cord,
					'type':this.type,
					};
				let [err,res] =await this.$httpas.get('/api/user/tx',data);
				if (!this.$httpas.errorCheck(err,res)) return;
				uni.showModal({
					title: '提示',
					content: res.data.msg,
					showCancel: false,
					success: ress => {
						if(res.data.code == 1){
							thia.money=''
							thia.name=''
							thia.cord=''
						}
						thia.ongrzlTap()
					}
				});
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
							this.urerdata=res.data.data
							if(res.data.data.config){
								this.configsa=res.data.data.config
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
			// 监听原生标题导航按钮点击事件
			onNavigationBarButtonTap(e) {
				const index = e.index;
					uni.navigateTo({
						url:"/pages/client/member/txjl"
					})
					
			}
        }
    }
</script>

<style>
	page{
		background: #f9f9f9;
	}
	.cztop{
		position: relative;
	}
	.czxx{
		top: 10px;
		font-size: 32upx;
		margin-left: 50upx;
		color: #3a3a3a;
		font-family: iconfont;
		line-height: 80upx;
	}
	.czyebox{
		padding: 20upx 50upx;
	}
	.czyebox>view:first-child{
		font-size: 32upx;
		color: #3a3a3a;
		line-height: 50px;
	}
	.czye{
		width: 100%;
		border-bottom: 1upx solid #e5e5e5;
		font-size: 36upx;
		font-weight: bold;
		color: #3a3a3a;
		position: relative;
		padding-left: 20px;
		height: 40px;
		line-height: 40px;
	}
	.czye:after{
		position: absolute;
		top: -2px;
		left: 0;
		content: '￥';
		color: #3a3a3a;
		font-size: 18px;
	}
	.czye1{
		width: 100%;
		border-bottom: 1upx solid #e5e5e5;
		font-size: 32upx;
		color: #3a3a3a;
		position: relative;
		height: 40px;
		line-height: 40px;
	}
	.onstep{
		margin-top: 40upx;
		background: #007AFF!important;
	}
	.czmain{
		width: 94%;
		margin: 10px auto;
		overflow: hidden;
		background: #fff;
		border-radius: 16upx;
		padding-bottom: 20px;
		-webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
	}
	.icon-alipay{
		background: #fbfbfb;
		padding-bottom: 20upx;
	}
	.icon-alipay>view:first-child{
		margin-top: 10px;
		font-size: 32upx;
		padding-left: 0upx;
		color: #3a3a3a;
		font-family: iconfont;
		position: relative;
		line-height: 30px;
	}
	.icon-alipay:before {
	    content: "\e636";
		margin-top: 25upx;
		margin-right: 10upx;
		color: #007AFF;
	}
	.cztype>view:first-child:after{
		position: absolute;
		content:"\e66c";
		top: 0;
		left: 0;
		font-size: 26px;
		color: #05c160;
	}


 .rmbLogo {
        font-size: 40upx;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }

    .uni-h1.uni-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
    }

    .ipaPayBtn {
        margin-top: 30upx;
    }
</style>

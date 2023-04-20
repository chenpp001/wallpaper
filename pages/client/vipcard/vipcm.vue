<template>
	<view class="pd16_15">		
		<radio-group  @change="changeNum">
			<view class="flex wrap space mt16">
				<view v-for="(item,index) in moneyList" :key="index"  :class="index > 1 ? 'mt16' : ''" class="box pd20_15 flex alcenter space" style="width: 330rpx;">
					<view style="width: 100%;text-align: center;">
					<text style="width: 100%; display: block;" class="ft14 cl-main ftw600">{{item.num}}</text>
					<text style="width: 100%; display: block;" class="ft12 cl-main ftw600">{{item.money}}</text>
					</view>
					<radio :value="item.coupon+''" :checked="num == item.num"  :color="tempColor" />
				</view>
			</view>
		</radio-group>

		<view class="form-footer-h">
			<view class="form-footer form-footer-h">
				<view class="form-footer-main pd10_15">
					<button @click="paySuccess" class="btn-big" :style="getBtnStyle">确定</button>
				</view>
			</view>
		</view>
		<hFormAlert v-if="cancelShow" title=""  name="cancel_desc" placeholder="请输入卡密卡号" @confirm="confirm" @cancel="cancel"></hFormAlert>
		<dialog-couponshare v-if="showCouponInvite" @closed="closedInvite"></dialog-couponshare>
	</view>
</template>

<script>
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
	export default{
		components: {hFormAlert},
		data(){
			return {
				num:'',
				moneyList:[],
				numa:'',
				userinfo:'',
				paysj:'',
				showCouponInvite:false,
				cancelShow:false,
			}
		},
		computed:{
			getCoupon(){
				for(var  a in this.moneyList){
					if(this.moneyList[a].num == this.num){
						return this.moneyList[a].coupon;
					}
				}
				return 0;
			}
		},
		onLoad(){
			this.paysja()
		},
		methods:{
			changeNum(e){
				console.log(e);
				this.num = e.detail.value;
			},
			async paysja(){
				//this.showCouponInvite = true;
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				uni.request({
					url: this.configs.webUrl+'/api/user/paysj',
					data: data,
					success: res =>{
						if(res.data.code==1){
							this.moneyList =res.data.data
						}else{
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			paySuccess(){		
				//this.showCouponInvite = true;
				let data = {};
				data.token = uni.getStorageSync("userinfo").token;
				data.uid = uni.getStorageSync("userinfo").id;
				data.num = this.num;
				uni.request({
					url: this.configs.webUrl+'/api/user/vipsj',
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
										uni.navigateBack();
									} else if (res.cancel) {
										
									}
								}
							});
						}else{
							if(res.data.msg=='余额不足'){
								uni.showModal({
									title: '提示',
									content: '积分不足，做任务获取',
									showCancel: true,
									confirmText: "确定",
									success: function (res) {
										if (res.confirm) {
											uni.navigateTo({
												url:"/pages/client/integral/role"
											})
										} else if (res.cancel) {
											//uni.navigateBack();
										}
									}
								});
							}else{
								uni.showToast({ title: res.data.msg,icon:"none" });
							}
							
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			closedInvite(){
				this.showCouponInvite = false;
				let pages = getCurrentPages();
				uni.navigateBack({
					delta:pages.length
				});
			}
		}
	}
</script>

<style>
	.tag-coupon{
		width: 100%;
		height: 80rpx;
		border-radius: 16rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.recharge-header{
		height: 240rpx;
		width: 100%;
		position: relative;
	}
	.recharge-header image{
		width: 100%;
		height: 240rpx;
	}
	.recharge-header .main{
		position: absolute;
		width: 100%;
		height: 240rpx;
		left: 0;
		top: 0;
	}
	.tdadf{
		border: 1px solid #f8f8f8; padding: 10px 5px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.04);
	}
</style>
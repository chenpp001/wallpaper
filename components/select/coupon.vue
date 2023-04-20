<template>
	<view>
		<view @click="showAct" >
			<text v-if="showType == 0" class="ft14 cl-notice">暂无券可用</text>
			<text v-if="showType == 1" class="ft14 cl-notice">有{{coupons.length}}张可选</text>
			<text v-if="showType == 2" class="ft14 cl-price">-¥{{getSelectItem.num}}</text>
			<text v-if="showType != 2"  class="iconfont iconicon_arrow_small cl-notice ft14 ml10"></text>
		</view>
		
		<view v-show="showCoupon" class="coupon-modal">
			<view  class="modal-bg"></view>
			<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
				<view class="modal-main">
					<view class="closed">
						<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
					</view>
					<view class="lh20 ft16 cl-main ftw600 text-center">选择优惠券</view>
					
					<view class="pd16_15" style="min-height:600rpx;max-height: 1000rpx; overflow-y: scroll;">
						<view v-for="(item,index) in coupons" :key="index" class="coupon-box" :class="index > 0 ? 'mt16' : ''">
							<view class="pd16_15 bg-w flex alcenter space" style="border-bottom: 2rpx dashed   #E4E6ED;">
								<view class="flex alcenter">
									<view class="cl-orange" style="width: 96rpx;">
										<text class="ft12">¥</text>
										<text class="ft24 ftw600 ml4">{{item.num}}</text>
									</view>
									<view class="ml15">
										<view class="ft14 ftw600 cl-main">普通洗剪吹优惠券</view>
										<view class="mt12 ft12 cl-info2">2020-09-22到期</view>
									</view>
								</view>
								<view class="btn-mini" @click="usedAct" :data-id="item.coupon_id" :style="value == item.coupon_id ? getBtnDisStyle : getBtnStyle">{{value == item.coupon_id ? '已选' : '使用'}}</view>
							</view>
							<view class="pd16_15 ft12 cl-notice">满50元可用，不可与其他优惠活动同时使用</view>
							<view class="coupon-yl"></view>
							<view class="coupon-yr"></view>
							<view class="coupon-vip-tag">会员专享</view>
						</view>
						
					</view>
					
					<view @click="noUseAct" class="pd16_15 mt30 bg-w text-center ft16 cl-main" style="box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.04);">不使用优惠</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			value:{
				type:Number,
				default:0
			},
			coupons:{
				type:Array,
				default:function(){
					return new Array;
				}
			}
		},
		data(){
			return {
				show:false,
				showCoupon:false,
				isSelect:false,
				selectId:0,
				
			}
		},
		computed:{
			showType(){
				if(this.coupons.length == 0) return 0;
				if(this.value == 0) return 1;
				if(this.getSelectItem == null) return 1;
				return 2;
			},
			getSelectItem(){
				for(var a  in this.coupons){
					if(this.coupons[a].coupon_id == this.value) return this.coupons[a];
				}
				return null;
			}
		},
		created(){
			
		},
		methods:{
			noUseAct(){
				this.$emit('input',0);
				this.closed();
			},
			usedAct(e){
				let id = parseInt(e.currentTarget.dataset.id);
				if(id == this.value) return;
				this.$emit('input',id);
				this.closed();
			},
			showAct(){
				this.showCoupon = true;
				this.show = true;
			},
			
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.showCoupon = false;
				},400);
			}
		}
	}
</script>

<style>
	.coupon-modal{
		position: relative;
		z-index: 400;
	}
	.coupon-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.coupon-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#F5F6FA;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.coupon-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
	}
	.coupon-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	
	.coupon-box{
		background: #FAFAFA;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;
		height: 252rpx;
	}
	.coupon-box .coupon-yl,.coupon-box .coupon-yr{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 148rpx;
		background: #F5F6FA; 
		z-index: 2;
	}
	.coupon-box .coupon-yl{
		left: -10rpx;
	}
	.coupon-box .coupon-yr{
		right: -10rpx;
	}
</style>
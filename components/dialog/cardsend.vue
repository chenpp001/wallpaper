<template>
	<view class="cardsend-modal">
		<view  class="modal-bg"></view>
		<view class="modal-box animated fast" :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">赠送好友</view>
				<view class="text-center ft16 ftw600 text-over mt40">【VIP洗剪吹次卡】</view>
				<view class="mt32 plr15">
					<view class="box pd16_15">
						<input placeholder="输入对方手机号" type="number" placeholder-class="cl-info2"  class="ft16 ftw600 text-center"/>
					</view>
					<view class="text-center mt16 ft14 cl-orange lh20">手机号不存在，请重新输入</view>
				</view>
			</view>
			<view class="pd10_15 bg-w mt60">
				<button class="btn-big" :style="getBtnStyle">确定赠送</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	export  default{
		props:{
		
		},
		data(){
			return {
				show:false,
			}
		},
		created(){
			this.show = true;
		
		},
		methods:{
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.$emit('closed');
				},400);
			}
		}
	}
</script>

<style>
	.cardsend-modal{
		position: relative;
		z-index: 400;
	}
	.cardsend-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.cardsend-modal .modal-box{
		position: fixed;
		z-index: 401;
		background: #F5F6FA;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.cardsend-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.cardsend-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
</style>
<template>
	<view class="ach-modal">
		<view  class="modal-bg"></view>
		<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
			<view class="modal-main">
				<view class="closed">
					<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
				</view>
				<view class="lh20 ft16 cl-main ftw600 text-center">不予通过</view>
				
				
				<view class=" pd16_15">
					<view class="ft14 cl-info2">不过理由</view>
					<view class="mt16">
						<textarea placeholder="请输入拒绝的理由" class="ft14 cl-main" placeholder-class="cl-notice"></textarea>
					</view>
				</view>
				
			</view>
			<view class="bg-w mt16 pd10_15" style="box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.04);">
				<button class="btn-manage">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export  default{
		props:{
			id:{
				type:Number,
				default:0
			},
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
	.ach-modal{
		position: relative;
		z-index: 400;
	}
	.ach-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.ach-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#FFFFFF;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.ach-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
	}
	.ach-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
</style>
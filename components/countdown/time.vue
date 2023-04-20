<template>
	<view>
		<view class="flex alcenter">
			<text class="order-t"  :class="size" :style="{background:bgColor,color:color}">{{showT.h}}</text><text class="ft12 ftw600 plr5">:</text>
			<text class="order-t"  :class="size" :style="{background:bgColor,color:color}">{{showT.m}}</text><text class="ft12 ftw600 plr5">:</text>
			<text class="order-t"   :class="size" :style="{background:bgColor,color:color}">{{showT.s}}</text>
		</view>
	</view>
</template>

<script>
	import  helper from '@/static/js/helper.js';
	
	export default{
		props:{
			t:{
				type:Number,
				default:0,
			},
			size:{
				type:String,
				default:''
			},
			bgColor:{
				type:String,
				default:'#2E2F33'
			},
			color:{
				type:String,
				default:'#ffffff'
			}
		},
		data(){
			return {
				myT:0,
				timer:null,
			}
		},
		computed:{
			showT(){
				let myT = this.myT;
				
				return helper.djsFull(myT);
			}
		},
		created(){
			this.myT = this.t;
			this.djs();
		},
		destroyed(){
			if(this.timer != null){
				clearInterval(this.timer);
			}
		},
		methods:{
			djs(){
				if(this.timer){
					clearInterval(this.timer);
				}	
				this.timer = setInterval(()=>{
					if(this.myT == 0){
						clearInterval(this.timer);
					}else{
						this.myT = this.myT - 1;
					}
				},1000);
			}
		}
	}
</script>

<style>
	.order-t{
		width:48rpx;
		height:48rpx;
		background:#FFFFFF;
		text-align: center;
		line-height: 48rpx;
		font-size:28rpx;
		font-weight: 500;
		color: #000000;
		border-radius: 8rpx;
	}
	.order-t.small{
		width: 40rpx;
		height: 40rpx;
		font-size: 24rpx;
		line-height: 40rpx;
	}
</style>
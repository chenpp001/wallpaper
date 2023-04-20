<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		<view class="box pd16_15">
			<view class="flex alcenter">
				<text class="ft16 cl-main ftw600 ">问题类型</text>
				<text class="ml10 ft12 cl-notice">(请至少选择一个标签分类)</text>
			</view>
			<view class="mt16 flex  wrap">
				<view v-for="(item,index) in tags" :data-index="index" @click="changeTag" :class="{on:item.select == 1}" :style="{background:item.select == 1 ? tempColor : '#ffffff'}" class="tag-feedback">{{item.name}}</view>
			</view>
		</view>
		
		<view class="mt16  box pd16_15">
			<textarea v-model="content" placeholder="我有问题要反馈:" placeholder-class="cl-notice" class="ft14" style="height: 300rpx; width: 100%;" :maxlength="300"></textarea>
			<view class="mt12 text-right ft12 cl-notice">
				{{content.length}}/300
			</view>
		</view>
		<view class="mt16">
			<button class="btn-big" :style="isSubmit ? getBtnStyle : getBtnDisStyle">立即提交</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:'',
				tags:[
					{name:'充值',select:0},
					{name:'积分',select:0},
					{name:'无法观看',select:0},
					{name:'代理',select:0},
					{name:'邀请',select:0},
					{name:'其他',select:0}
				]
			}
		},
		computed:{
			isSubmit(){
				if(this.content.length < 30){
					return false;
				}
				let tag = false;
				for(var a in this.tags){
					if(this.tags[a].select == 1){
						tag = true;
						break;
					}
				}
				return tag;
			}
		},
		onLoad(){
			
		},
		methods:{
			changeTag(e){
				let index = parseInt(e.currentTarget.dataset.index);
				this.tags[index].select = this.tags[index].select == 1 ? 0 : 1;
			}
		}
	}
</script>

<style>
	.tag-feedback{
		height: 64rpx;
		border:2rpx solid #E4E6ED;
		padding: 0 20rpx;
		line-height: 60rpx;
		color:#000000;
		font-size: 28rpx;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.tag-feedback.on{
		border:none;
		color:#FFFFFF;
		line-height: 64rpx;
		padding: 0 22rpx;
	}
</style>
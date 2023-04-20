<template>
	<view class="footer-h" v-if="isShowFooter">
		<view class="footer-box footer-h">
			<view class="footer-main flex space">
				<view v-for="(item,index) in getFooter" :key="index" :data-model="item.model" @click="linkTo" class="footer-item" :style="{width:getWidth,color:model== item.model ? tempColor : '#AEB2C1'}">
					<text class="ft22 iconfont" :class="item.icon"></text>
					<view class="ft12 mt4 ftw600">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			model:{
				type:String,
				default:'',
			},
		},
		data(){
			return {
				footerList:[
					{name:'首页',icon:'icontabbar03',model:'index',show:1},
					{name:'全部列表',icon:'icontabbar01',model:'tuan',show:1},
					{name:'次卡',icon:'icontabbar03',model:'card',show:0},
					{name:'优惠券',icon:'icontabbar06',model:'coupon',show:0}, //预留其他组件
					{name:'积分商城',icon:'icontabbar05',model:'integral',show:0},
					{name:'个人中心',icon:'icontabbar04',model:'member',show:1},
				]
				// footerList:[
				// 	{name:'VIP',icon:'icontabbar01',model:'index',show:1},
				// 	{name:'特惠',icon:'icontabbar02',model:'tuan',show:1},
				// 	{name:'次卡',icon:'icontabbar03',model:'card',show:1},
				// 	{name:'优惠券',icon:'icontabbar06',model:'coupon',show:0}, //预留其他组件
				// 	{name:'积分商城',icon:'icontabbar05',model:'integral',show:1},
				// 	{name:'我的',icon:'icontabbar04',model:'member',show:1},
				// ]
			}
		},
		computed:{
			isShowFooter(){
				let show = false;
				for(var a  in this.footerList){
					if(this.footerList[a].model == this.model && this.footerList[a].show == 1){
						show = true;
					}
				}
				return show;
			},
			getFooter(){
				let arr = new Array;
				for(var a  in this.footerList){
					if(this.footerList[a].show == 1){
						arr.push(this.footerList[a]);
					}
				}
				return arr;
			},
			getWidth(){
				let len = this.getFooter.length;
				if(len > 0){
					return  (100/len) + '%';
				}
				return  '100%';
			}
		},methods:{
			linkTo(e){ //链接相关的操作 这个操作一般在首页 和底部菜单出现，其他地方的请另外操作
				let model = e.currentTarget.dataset.model;
				if(this.model == model) return;
				if(model == 'index'){
					let page = getCurrentPages();
					if(page.length > 1){
						uni.navigateBack({
							delta:page.length
						});
					}else{
						uni.reLaunch({
							url:'/pages/client/index'
						})
					}
					return;
				}
				let url = '';
				switch(model){
					case 'tuan':
						url = '/pages/client/tuan/index';
					break;
					case 'coupon':
						url = '/pages/client/coupon/index';
					break;
					case  'card':
						url = '/pages/client/card/index';
					break;
					case 'member':
						url = '/pages/client/member/index';
					break;
					case 'integral':
						url = '/pages/client/integral/index'
					break;
				}
				if(url == '') return;
				if(this.model == 'index'){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.redirectTo({
						url:url
					})
				}
			}
		}
	}
</script>

<style>
	.footer-h {
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}
	
	.footer-box {
		width: 100%;
		position: fixed;
		z-index: 100;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(0, 0, 0, 0.04);
	}
	
	.footer-main {
		height: 100rpx;
	}
	
	.footer-item {
		height: 100rpx;
		width: 20%;
		padding-top: 10rpx;
		text-align: center;
	}
</style>
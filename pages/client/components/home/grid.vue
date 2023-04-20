<template>
	<view class="flex alcenter space">
		
		<button v-if="getGridOne!=null  && getGridOne.model=='share'" open-type="share" class="grid-left-box">
			<view class="main pd16_15">
				<view class="ft16 ftw600 cl-default">{{getGridOne.name}}</view>
				<view class="mt4 ft12" :style="{color:tempColor}">{{getGridOne.desc}}</view>
				<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
			</view>
			<image class="left-bg" :src="statics.gridLeft"></image>
			<image class="left-icon" :src="getGridOne.icon"></image>
		</button>
		<view v-if="getGridOne!=null  && getGridOne.model!='share'" :data-model="getGridOne.model" @click="linkTo" class="grid-left-box">
			<view class="main pd16_15">
				<view class="ft16 ftw600 cl-default">{{getGridOne.name}}</view>
				<view class="mt4 ft12" :style="{color:tempColor}">{{getGridOne.desc}}</view>
				<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
			</view>
			<image class="left-bg" :src="statics.gridLeft"></image>
			<image class="left-icon" :src="getGridOne.icon"></image>
		</view>
		<view>
			<button v-if="getGridTwo!=null  && getGridTwo.model=='share'" open-type="share" class="grid-right-box">
				<view class="main pd16_15">
					<view class="ft16 ftw600 cl-default">{{getGridTwo.name}}</view>
					<view class="mt4 ft12" :style="{color:tempColor}">{{getGridTwo.desc}}</view>
					<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
				</view>
				<image class="right-bg" :src="statics.gridRight"></image>
				<image class="right-icon" :src="getGridTwo.icon"></image>
			</button>
			<view  v-if="getGridTwo!=null  && getGridTwo.model!='share'"  :data-model="getGridTwo.model" @click="linkTo" class="grid-right-box">
				<view class="main pd16_15">
					<view class="ft16 ftw600 cl-default">{{getGridTwo.name}}</view>
					<view class="mt4 ft12" :style="{color:tempColor}">{{getGridTwo.desc}}</view>
					<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
				</view>
				<image class="right-bg" :src="statics.gridRight"></image>
				<image class="right-icon" :src="getGridTwo.icon"></image>
			</view>
			<view class="mt15">
				<button v-if="getGridThree!=null  && getGridThree.model=='share'" open-type="share" class="grid-right-box">
					<view class="main pd16_15">
						<view class="ft16 ftw600 cl-default">{{getGridThree.name}}</view>
						<view class="mt4 ft12" :style="{color:tempColor}">{{getGridThree.desc}}</view>
						<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
					</view>
					<image class="right-bg" :src="statics.gridRight"></image>
					<image class="right-icon" :src="getGridThree.icon"></image>
				</button>
				<view  v-if="getGridThree!=null  && getGridThree.model!='share'"  :data-model="getGridThree.model" @click="linkTo"   class="grid-right-box">
					<view class="main pd16_15">
						<view class="ft16 ftw600 cl-default">{{getGridThree.name}}</view>
						<view class="mt4 ft12" :style="{color:tempColor}">{{getGridThree.desc}}</view>
						<view class="btn-go" :style="{background:tempColor}">GO<text class="iconfont iconicon_arrow_small ft12"></text></view>
					</view>
					<image class="right-bg" :src="statics.gridRight"></image>
					<image class="right-icon" :src="getGridThree.icon"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				gridData:[
					{name:'VIP特惠',desc:'尊享会员折上折',model:'tuan',icon:this.$config.staticUrl +'vipcard_home_tehui@2x.png',show:1},
					{name:'领优惠券',desc:'领券更省钱',model:'coupon',icon:this.$config.staticUrl +'vipcard_home_coupon@2x.png',show:1},
					{name:'邀请好友',desc:'越邀请，越优惠',model:'share',icon:this.$config.staticUrl +'vipcard_home_invite@2x.png',show:0},
					{name:'积分商城',desc:'小积分兑豪礼',model:'integral',icon:this.$config.staticUrl +'vipcard_home_integralmall@2x.png',show:1},
					{name:'开通次卡',desc:'省钱升级必备',model:'card',icon:this.$config.staticUrl +'vipcard_home_cika@2x.png',show:0},
				]
			}
		},
		computed:{
			getGridDatas(){
				let arr  = new Array;
				for(var a  in this.gridData){
					if(this.gridData[a].show == 1){
						arr.push(this.gridData[a]);
					}
				}
				return arr;
			},
			getGridOne(){
				return this.getGridDatas[0] ? this.getGridDatas[0] : null;
			},
			getGridTwo(){
				return this.getGridDatas[1] ? this.getGridDatas[1] : null;
			},
			getGridThree(){
				return this.getGridDatas[2] ? this.getGridDatas[2] : null;
			}
		},
		methods:{
			linkTo(e){
				let model = e.currentTarget.dataset.model;
				let url = '';
				switch(model){
					case 'coupon':
						url = '/pages/client/coupon/index';
					break;
					case 'integral':
						url = '/pages/client/integral/index';
					break;
					case 'card':
						url = '/pages/client/card/index';
					break;
					case 'tuan':
						url = '/pages/client/tuan/index';
					break;
				}
				if(url == '') return;
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	.grid-left-box{
		width: 330rpx;
		height: 430rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 32rpx;
		position: relative;
		overflow: hidden;
		margin: 0;
		padding: 0;
		line-height: 1;
		text-align: left;
	}
	.grid-right-box{
		width: 330rpx;
		height: 200rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 32rpx;
		position: relative;
		overflow: hidden;
		margin: 0;
		padding: 0;
		line-height: 1;
		text-align: left;
	}
	.grid-left-box .main,.grid-right-box .main{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
	}
	.grid-left-box .left-bg{
		width: 100%;
		height: 140rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
	.grid-left-box .left-icon{
		width: 200rpx;
		height: 200rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
	}
	.grid-right-box .right-icon{
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
	}
	.grid-right-box .right-bg{
		width: 100%;
		height: 74rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
	.btn-go{
		display: block;
		width: 92rpx;
		height: 40rpx;
		border-radius: 20rpx;
		text-align: center;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #FFFFFF;
		font-style:italic;
	}
	.btn-go text{
		font-weight: 400;
		margin-left: 8rpx;
	}
</style>
<template>
	<view class="nav-tab-list">
		<view class="main">
			<view  v-for="(item,index) in tabs" :key="index" @click="changeTab(index)" :style="getWstyle[index]" :class="selectIndex == index ? 'ft16  ftw600' : 'ft14  ftw500' " class="text-center ">
				{{item}}
			</view>
		</view>
		<view class="bd" :style="getL"></view>
	</view>
</template>

<script>
	export default{
		props:{
			isMain:{
				type:Boolean,
				default:true
			},
			tabs:{
				type:Array,
				default:function(){
					return new Array;
				}
			},
			selectIndex:{
				type:Number,
				default:0
			}
		},
		computed:{
			getW(){
				if(this.tabs.length == 0) return 0;
				let len = this.tabs.length;
				let w = 100/len;
				return w;
			},
			getWstyle(){
				let arr = new Array;
				for(var a in this.tabs){
					let style = 'width:'+this.getW + '%;';
					if(this.selectIndex == a){
						style+= 'color:'+ (this.isMain ?  this.tempColor : '#5E40FF')+';';
					}else{
						style+='color:#333333;';	
					}
					arr.push(style);
				}
				return arr;
			},
			getL(){
				let w = this.getW;
				let w2 = w/2;
				let l = this.selectIndex  *  w  + w2;
				let style = 'left:calc('+l+'% - '+uni.upx2px(18)+'px);';
				if(this.isMain){
					style += 'background:'+this.tempColor+';';
				}
				return style;
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			changeTab(index){
				this.$emit('change',index);
			}
		}
	}
</script>

<style>
	.nav-tab-list{
		height:100rpx;
		position: relative;
	}
	.nav-tab-list .main{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
	}
	.nav-tab-list .bd{
		width: 36rpx;
		height:10rpx;
		background:#5E40FF;
		border-radius:6rpx 6rpx 0rpx 0rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		transition: left 0.4s;
	}
</style>
<template>
	<view class="tab-nav-plus">
		<view class="tab-nav-plus-main"  :class="isFixed ? 'fixed' : ''">
			<scroll-view :scroll-left="getLeft"   :scroll-with-animation="true" :scroll-x="true" class="tab-nav-plus-scroll">
				<view v-for="(item,index) in tabs" :key="index"  :data-index="index" @click="tabClick" class="item">
					<view class="tit" :class="selectIndex == index ? 'on' : ''">{{item.name}}</view>
					<!-- <view class="bd" :style="{background:selectIndex == index ? tempColor: 'transparent'}"></view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			scrollTop:{
				type:Number,
				default:0,
			},
			selectIndex:{
				type:Number,
				default:0,
			},
			tabs:{
				type:Array,
				default:function(){
					return new Array;
				}
			}
		},
		data(){
			return {
				myTop:150,
			}
		},
		computed:{
			isFixed(){
				return this.scrollTop >= this.myTop; 
			},
			getLeft(){ //这个计算不准确 凑合用
				let w = 0;
				for(var a  in this.tabs){
					if(this.selectIndex < a) break;
					let myw = 0;
					if(this.selectIndex == a){
						myw = this.tabs[a].name.length * 32;
					}else{
						myw = this.tabs[a].name.length * 28;
					}
					w+=myw;
				}
				w+= this.selectIndex * 60;
				if(w > 375){
					return  uni.upx2px(w - 375);
				}
				return 0;
			},
		},
		created(){
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(this);
				let css = '.tab-nav-plus';
				query.select(css).boundingClientRect(data => {
				   this.myTop = data.top;
				}).exec();
			},500);
		},
		methods:{
			tabClick(e){
				let index  = parseInt(e.currentTarget.dataset.index);
				this.$emit('change',index);
			}
		}
	}
</script>

<style>
	.tab-nav-plus{
		height: 80rpx;
	}
	.tab-nav-plus-main{
		width: 100%;
		height: 80rpx;
		padding: 20rpx 0rpx 0rpx 0rpx;
		/* background: #FFFFFF; */
		/* border-top: 0rpx solid #E4E6ED; */
	}
	.tab-nav-plus-main.fixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		background: #f8f8f8;
		box-shadow:0rpx 4rpx 16rpx 0rpx rgba(0,0,0,0.08);
	}
	.tab-nav-plus-scroll{
		width: 100%;
		white-space: nowrap;
		height: 76rpx;
	}

	.tab-nav-plus-scroll .item{
		height: 60upx;
		line-height: 60upx;
		display: inline-block;
		margin-right: 20rpx;
		position: relative;
	}
	.tab-nav-plus-scroll .item:last-child{
		margin-right: 0;
	}
	.tab-nav-plus-scroll .item .tit{
		text-align: center;
		height: 70rpx;
		line-height: 50rpx;
		font-size: 34rpx;
		/* border: solid 1upx #ddd; */
		background: #eeeeee;
		padding: 10upx 30upx;
		border-radius: 40rpx;
		font-weight: 200;
		color: #8f9398;
	}
	.tab-nav-plus-scroll .item .tit.on{
		font-size: 34rpx;
		color: #323332;
		background-image: linear-gradient(to right, #fbf95e, #f9cc3b);
	}
	.tab-nav-plus-main .tab-nav-plus-scroll .item .bd{
		position: absolute;
		z-index: 1;
		left: calc(50% - 18rpx);
		bottom: 0;
		width: 36rpx;
		height: 12rpx;
		border-radius: 6rpx 6rpx 0rpx 0rpx;
	}
	
	.tab-nav-plus-main.fixed  .tab-nav-plus-scroll .item .bd{
		background: #FFFFFF;
	}
	
</style>
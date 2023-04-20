<template>
	<view>
		<view v-if="photos.length > 0">
			<view v-if="showType == 'big'" class="show-big-photo">
				<image @click="showPic" v-for="(item,index) in photos" :key="index" :data-index="index" :src="item" mode="aspectFill"></image>
			</view>
			<view v-if="showType == 'mid'" class="show-mid-photo flex alcenter space">
				<image @click="showPic" v-for="(item,index) in photos" :key="index" :data-index="index"  :src="item" mode="aspectFill"></image>
				
			</view>
			<view v-if="showType == 'small'" class="show-small-photo flex space wrap">
				<image @click="showPic" v-for="(item,index) in photos" :key="index" :data-index="index"  :src="item" mode="aspectFill"></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			photos:{
				type:Array,
				default:function(){
					return new Array;
				}
			}
		},
		computed:{
			showType(){
				if(this.photos.length == 1) return 'big';
				if(this.photos.length == 2) return 'mid';
				return 'small';
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			showPic(e){
				let index = parseInt(e.currentTarget.dataset.index);
				uni.previewImage({
					current:index,
					urls:this.photos
				});
			}
		}
	}
</script>

<style>
	
	.show-big-photo image{
		width: 100%;
		height: 400rpx;
		background: #F2F2F2;
	}
	.show-mid-photo image{
		width: calc(50% - 8rpx);
		height: 300rpx;
		background: #F2F2F2;
	}
	.show-small-photo image{
		width: 190rpx;
		height: 190rpx;
		background: #F2F2F2;
		border-radius: 8rpx;
	}
	.show-small-photo image:nth-child(n+4){
		margin-top: 16rpx;
	}
</style>
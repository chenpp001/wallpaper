<template>
	<view>
		<swiper class="home-swiper-banner" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<navigator :url="item.link">
				<image :src="item.src" style="border-radius: 16rpx"></image>
				</navigator>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	export default{
		props: ['banners'],
		data(){
			return {
				banners1:[],
			}
		},
	}
</script>

<style>
	.home-swiper-banner{
		height: 200rpx;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		overflow: hidden;
	}
	.home-swiper-banner image{
		width: 100%;
		height: 200rpx;
	}
</style>

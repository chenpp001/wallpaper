<template>
	<view class="copyright">
		<image :src="statics.copyright"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.copyright{
		padding: 48rpx;
		text-align: center;
	}
	.copyright image{
		width: 208rpx;
		height: 76rpx;
	}
</style>
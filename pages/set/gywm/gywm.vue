<template>
	<view>
		<view style="padding: 0 40upx;">
			<rich-text class="cont" :nodes="gywm"></rich-text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			gywm:'',	
			}
		},
		onLoad() {
			this.gywm = uni.getStorageSync("config").site.gywm;
		},
		methods: {
			
		}
	}
</script>

<style>
	.h1{
		font-size: 32upx;
		text-align: center;
		font-weight: bold;
		line-height: 52px;
	}
.cont{
	font-size: 32upx;
	box-sizing: border-box;
}
</style>

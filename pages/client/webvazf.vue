<template>
    <view>
		<!-- #ifndef MP-WEIXIN -->
        <web-view :src="url"></web-view>
		<!-- #endif -->
    </view>
</template>
<script>
	export default{
		data(){
			return {
				url:'',

			}
		},
		onLoad(option){
			this.url=uni.getStorageSync("userinfo").config.zflj
		},

		methods:{
			// 监听原生标题导航按钮点击事件
			onNavigationBarButtonTap(e) {
				const index = e.index;
					uni.switchTab({
						url:"/pages/client/index"
					})
					
			}
		}
	}
</script>
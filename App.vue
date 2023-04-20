<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
			if(extConfig.appid){
				this.$config.appId = extConfig.appid;
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	@import url("./static/css/common.css");
	/* #endif */
</style>

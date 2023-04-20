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
			if(option.url){
				this.url=option.url
			}
		},

		methods:{
	
		}
	}
</script>
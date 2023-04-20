<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		
		<view class="box pd20_15">
			<view class="flex alcenter">
				<view class="ft14 cl-main" style="width: 144rpx;">
					姓名
				</view>
				<view style="width: calc(100% - 144rpx);">
					<input :maxlength="64" v-model="form.name" placeholder="输入收货人姓名"  class="ft14 cl-main" placeholder-class="cl-notice" />
				</view>
			</view>
			<view class="bd-line mt20 mb20"></view>
			<view class="flex alcenter">
				<view class="ft14 cl-main" style="width: 144rpx;">
					手机号
				</view>
				<view style="width: calc(100% - 144rpx);">
					<input :maxlength="11" v-model="form.mobile" type="number" placeholder="输入收货人手机号"  class="ft14 cl-main" placeholder-class="cl-notice" />
				</view>
			</view>
			<view class="bd-line mt20 mb20"></view>
			<view class="flex alcenter">
				<view class="ft14 cl-main" style="width: 144rpx;">
					详细地址
				</view>
				<view style="width: calc(100% - 144rpx);">
					<input :maxlength="255" v-model="form.address" placeholder="输入收货人地址"  class="ft14 cl-main" placeholder-class="cl-notice" />
				</view>
			</view>
			<view class="bd-line mt20 mb20"></view>
			<view class="flex alcenter" @click="changeDefault">
				<text class="iconfont ft20" :class="form.is_default == 0 ? 'iconicon_selector_disable' : 'iconicon_selector_enable'" :style="{color:form.is_default == 1 ? tempColor:'#E4E6ED'}"></text>
				<text class="ft14 ml10 cl-main">设为默认</text>
			</view>
			
		</view>
		
		<view class="mt24">
			<button class="btn-big" :style="getBtnStyle">确定保存</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				address_id:0,
				form:{
					name:'',
					mobile:'',
					address:'',
					is_default:0,
				},
			}
		},
		onLoad(e){
			if(e.id){
				this.address_id = parseInt(e.id);
				uni.setNavigationBarTitle({
				    title: '编辑地址'
				});
			}else{
				uni.setNavigationBarTitle({
				    title: '新增地址'
				});
			}
		},
		methods:{
			changeDefault(){
				this.form.is_default = this.form.is_default == 0 ? 1 : 0;
			}
		}
	}
</script>

<style>
	
</style>
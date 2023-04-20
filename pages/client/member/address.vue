<template>
	<view class="pd16_15">
		<!-- #ifndef MP-WEIXIN -->
		
		
			<navigator url="/pages/client/member/addressform">
				<view class="box noshadow pd10_15 flex alcenter center" :style="{color:tempColor}">
					<text class="iconfont iconbtn_add_liner ft20 mr5"></text>
					<text class="ft16 ftw600">新增地址</text>
				</view>
			</navigator>	
			
			<radio-group @change="changeDefaultAddr">
				<view v-for="(item,index) in addrs" :key="index" class="box noshadow pd16_15 mt16">
					<view class="ft14 cl-main ftw600">{{item.name}}  {{item.mobile}}</view>
					<view class="mt8 ft12 cl-notice">{{item.address}}</view>
					<view class="bd-line mt20 mb16"></view>
					<view class="flex alcenter space">
						<view class="flex alcenter">
							<radio :value="item.address_id"  :checked="item.is_default == 1"  :color="tempColor"  />
							<text class="ml10 ft14 cl-info2">默认地址</text>
						</view>
						<view class="flex alcenter">
							<text class="iconfont iconbtn_delete mr60 ft20 cl-info2"></text>
							<text class="iconfont iconbtn_edit ft20 cl-info2"></text>
						</view>
					</view>
				</view>
			
			</radio-group>
			<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				addrs:[
					{address_id:1,name:'张华',mobile:'13515608638',address:'合肥市包河区万达临湖苑A区16栋1602室',is_default:1},
					{address_id:2,name:'张华',mobile:'13515608638',address:'合肥市包河区万达临湖苑A区16栋1602室',is_default:0}
				],
			}
		},
		onLoad(){
			
		},
		methods:{
			changeDefaultAddr(e){
				let id = parseInt(e.detail.value);
				for(var a in this.addrs){
					this.addrs[a].is_default = this.addrs[a].address_id == id ? 1 : 0;
				}
			}
		}
	}
</script>

<style>
	
</style>
<template>
	<view>
		<view @click="showAct" class="pd16_15 flex alcenter">
			<view style="width: calc(100% - 40rpx);" class="flex">
				<text class="iconfont iconicon_location02 ft18" :style="{color:tempColor}"></text>
				<view class="pl10" style="width: calc(100% - 40rpx);">
					<view v-if="getSelectItem == null" class="ft14 cl-main ftw600">选择收货地址</view> 
					<view v-if="getSelectItem != null" class="ft14 cl-main ftw600 text-over">{{getSelectItem.address}}</view>
					<view v-if="getSelectItem != null" class="ft12 mt12 cl-info2">{{getSelectItem.name}} {{getSelectItem.mobile}}</view>
				</view>
			</view>
			<text class="iconfont iconicon_arrow_small ft14 cl-notice"></text>
		</view>
		
		<view v-show="showAddress" class="address-modal">
			<view  class="modal-bg"></view>
			<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
				<view class="modal-main">
					<view class="closed">
						<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
					</view>
					<view class="lh20 ft16 cl-main ftw600 text-center">选择收货地址</view>
					
					<view class="pd16_15">
						<navigator url="/pages/client/member/address">
							<view class="box noshadow pd10_15 flex alcenter center" :style="{color:tempColor}">
								<text class="iconfont iconbtn_add_liner ft20 mr5"></text>
								<text class="ft16 ftw600">新增地址</text>
							</view>
						</navigator>	
						<radio-group @change="selectAddr">
							
						<view v-for="(item,index) in addrs" :key="index" class="box noshadow pd16_15 mt16 flex alcenter space">
							<view style="width: calc(100% - 60rpx);">
								<view class="flex alcenter">
									<view class="tag-default mr10" v-if="item.is_default == 1" :style="{background:tempColor}">默认</view>
									<text class="ft14 ftw600 cl-main">{{item.name}}  {{item.mobile}}</text>
								</view>
								<view class="mt8 ft12 cl-notice text-over">
									{{item.address}}
								</view>
							</view>
							<radio :value="item.address_id" :checked="item.address_id == getSelectId"  :color="tempColor"  />
						</view>
						
						</radio-group>
					</view>
					
					<view v-if="addrs.length > 0 " class="plr15 mt40">
						<button class="btn-big" @click="selectYes" :style="getBtnStyle">确定选择</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			value:{
				type:Number,
				default:0
			},
		},
		data(){
			return {
				show:false,
				showAddress:false,
				isSelect:false,
				selectId:0,
				addrs:[
					{address_id:1,name:'张华2',mobile:'13515608638',address:'合肥市包河区万达临湖苑A区16栋1602室',is_default:1},
					{address_id:2,name:'张华',mobile:'13515608638',address:'合肥市包河区万达临湖苑A区16栋2007室',is_default:0}
				],
			}
		},
		computed:{
			getDefaultId(){
				if(this.addrs.length == 0) return 0;
				for(var a in this.addrs){
					if(this.addrs[a].is_default == 1){
						return this.addrs[a].address_id;
					}
				}
				if(this.addrs[0]){
					return this.addrs[0].address_id;
				}
			},
			getSelectId(){
				if(this.isSelect){
					return this.selectId;
				}
				if(this.value > 0){
					return this.value;
				}
				return this.getDefaultId;
			},
			getSelectItem(){
				for(var a  in this.addrs){
					if(this.addrs[a].address_id == this.value){
						return this.addrs[a];
					}
				}
				return null;
			}
		},
		created(){
			
		},
		methods:{
			selectAddr(e){
				this.isSelect = true;
				this.selectId = parseInt(e.detail.value);
			},
			showAct(){
				this.showAddress = true;
				this.show = true;
			},
			selectYes(){
				if(this.getSelectId){
					this.$emit('input',this.getSelectId);
					this.closed();
				}
			},
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.showAddress = false;
				},400);
			}
		}
	}
</script>

<style>
	.address-modal{
		position: relative;
		z-index: 400;
	}
	.address-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.address-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#F5F6FA;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.address-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.address-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	
	.tag-default{
		width: 64rpx;
		height: 36rpx;
		border-radius: 4rpx;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
		color:#FFFFFF;
	}
</style>
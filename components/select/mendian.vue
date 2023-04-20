<template>
	<view>
		<view @click="showAct" class="pd16_15 flex alcenter">
			<view style="width: calc(100% - 40rpx);" class="flex">
				<text class="iconfont iconicon_location02 ft18" :style="{color:tempColor}"></text>
				<view class="pl10" style="width: calc(100% - 40rpx);">
					<view v-if="getSelectItem == null" class="ft14 cl-main ftw600">选择门店</view> 
					<view v-if="getSelectItem != null" class="ft14 cl-main ftw600 text-over">[{{getSelectItem.name}}]{{getSelectItem.address}}</view>
					<view v-if="getSelectItem != null" class="ft12 mt12 cl-orange">距离{{getSelectItem.juli}}km</view>
				</view>
			</view>
			<text class="iconfont iconicon_arrow_small ft14 cl-notice"></text>
		</view>
		
		<view v-show="showmendian" class="mendian-modal">
			<view  class="modal-bg"></view>
			<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
				<view class="modal-main">
					<view class="closed">
						<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
					</view>
					<view class="lh20 ft16 cl-main ftw600 text-center">选择自提门店</view>
					
					<view class="pd16_15">
						
						<radio-group @change="selectMendian">
							
						<view v-for="(item,index) in mendians" :key="index" class="box noshadow pd16_15 mt16 flex alcenter space">
							<view style="width: calc(100% - 60rpx);">
								<view class="flex alcenter">
									<view class="tag-default mr10" v-if="item.is_tuijian == 1" :style="{background:tempColor}">推荐</view>
									<text class="ft14 ftw600 cl-main text-over" style="width: calc(100% - 88rpx);">[{{item.name}}]{{item.address}}</text>
								</view>
								<view class="mt8 ft12 cl-orange ">
									距离{{item.juli}}km
								</view>
							</view>
							<radio :value="item.mendian_id" :checked="item.mendian_id == getSelectId"  :color="tempColor"  />
						</view>
						
						</radio-group>
					</view>
					
					<view v-if="mendians.length > 0 " class="plr15 mt40">
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
				showmendian:false,
				isSelect:false,
				selectId:0,
				mendians:[
					{mendian_id:1,name:'高速店',address:'合肥市包河区万达临湖苑A区16栋1602室',juli:0.6,is_tuijian:1},
					{mendian_id:2,name:'万达店',address:'合肥市包河区万达临湖苑A区16栋2007室',juli:11,is_tuijian:0}
				],
			}
		},
		computed:{
			getDefaultId(){
				if(this.mendians.length == 0) return 0;
				for(var a in this.mendians){
					if(this.mendians[a].is_tuijian == 1){
						return this.mendians[a].mendian_id;
					}
				}
				if(this.mendians[0]){
					return this.mendians[0].mendian_id;
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
				for(var a  in this.mendians){
					if(this.mendians[a].mendian_id == this.value){
						return this.mendians[a];
					}
				}
				return null;
			}
		},
		created(){
			
		},
		methods:{
			selectMendian(e){
				this.isSelect = true;
				this.selectId = parseInt(e.detail.value);
			},
			showAct(){
				this.showmendian = true;
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
					this.showmendian = false;
				},400);
			}
		}
	}
</script>

<style>
	.mendian-modal{
		position: relative;
		z-index: 400;
	}
	.mendian-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.mendian-modal .modal-box{
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
	.mendian-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.mendian-modal .modal-main .closed{
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
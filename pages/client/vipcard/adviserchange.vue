<template>
	<view class="pd16_15">
		<view v-if="resultType == 0">
			<view class="box noshadow pd10_15 flex alcenter space">
				<input placeholder="输入顾问ID" placeholder-class="cl-notice" style="width: 300rpx;" class="ft16 cl-main" />
				<button class="btn-mid" :style="getBtnStyle" style="width: 160rpx;">确定</button>
			</view>
			<view class="text-center pt60 ft14 cl-info2">或</view>
			
			<view class="box noshadow mt60 pd32">
				<view class="text-center">
					<text class="iconfont iconicon_saoma ft40" :style="{color:tempColor}"></text>
				</view>
				<view class="text-center mt16 ft14 cl-main">扫描顾问码</view>
			</view>
		</view>
		<view v-if="resultType == 1">
			
			<view class="box noshadow pd16_15">
				<view class="flex alcenter">
					<image class="adviser-face-big" :src="statics.defaultFace"></image>
					<view style="width: calc(100% - 160rpx);" class=" pl15">
						<view class="ft16 cl-main ftw600">张顾问</view>
						<view class="flex alcenter mt8">
							<view class="flex alcenter cl-notice">
								<text class="iconfont iconicon_weixin ft14"></text>
								<text class="ft14 ml5">ffy1203605498</text>
							</view>
							
						</view>
						<view class="flex alcenter space mt8">
							<view class="flex alcenter cl-notice">
								<text class="iconfont iconicon_call ft14"></text>
								<text class="ft14 ml5">13515608638</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mt16">
				<button class="btn-big" :style="getBtnStyle">确定更换</button>
			</view>
			
		</view>
		
		<view v-if="resultType == -1">
			
			<com-empty title="未找到顾问，请返回重新操作"></com-empty>
			
			<view class="flex center">
				<button class="btn-mid" :style="getBtnStyle">返回</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				resultType: -1, //1 -1
			}
		}
	}
</script>

<style>
	.adviser-face-big{
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		background: #FFFFFF;
	}
</style>
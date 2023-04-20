<view class="pd16_15">
				<navigator url="/pages/client/tuan/detail">
				<view class="box pd16_15 flex alcenter mb16">
					<image class="tuan-product-l"></image>
					<view class="tuan-product-r pl15">
						<view class="ft14 ftw600 cl-main text-over2">洗剪吹加护理一次套餐 会员只需5…</view>
						<view class="mt16">
							<text class="ft12 cl-orange">会员价</text>
							<text class="ft12 cl-orange">¥</text>
							<text class="ft16 cl-orange ftw600">58</text>
							<text class="ml15 ft12 cl-notice text-line">¥88</text>
						</view>
						<view class="mt16 flex space alcenter">
							<view class="ft12 cl-notice">868次</view>
							<view class="btn-mini" :style="getBtnStyle">播放</view>
						</view>
					</view>
				</view>
				</navigator>
				
				<view class="box pd16_15 flex alcenter mb16">
					<image class="tuan-product-l"></image>
					<view class="tuan-product-r pl15">
						<view class="ft14 ftw600 cl-main text-over2">洗剪吹加护理一次套餐 会员只需5…</view>
						<view class="mt16">
							<text class="ft12 cl-orange">会员价</text>
							<text class="ft12 cl-orange">¥</text>
							<text class="ft16 cl-orange ftw600">58</text>
							<text class="ml15 ft12 cl-notice text-line">¥88</text>
						</view>
						<view class="mt16 flex space alcenter">
							<view class="ft12 cl-notice">868次</view>
							<view class="btn-mini" :style="getBtnStyle">播放</view>
						</view>
					</view>
				</view>
				
				<view class="box pd16_15 flex alcenter mb16">
					<image class="tuan-product-l"></image>
					<view class="tuan-product-r pl15">
						<view class="ft14 ftw600 cl-main text-over2">洗剪吹加护理一次套餐 会员只需5…</view>
						<view class="mt16">
							<text class="ft12 cl-orange">会员价</text>
							<text class="ft12 cl-orange">¥</text>
							<text class="ft16 cl-orange ftw600">58</text>
							<text class="ml15 ft12 cl-notice text-line">¥88</text>
						</view>
						<view class="mt16 flex space alcenter">
							<view class="ft12 cl-notice">868次</view>
							<view class="btn-mini" :style="getBtnStyle">播放</view>
						</view>
					</view>
				</view>
				
				<view class="box pd16_15 flex alcenter mb16">
					<image class="tuan-product-l"></image>
					<view class="tuan-product-r pl15">
						<view class="ft14 ftw600 cl-main text-over2">洗剪吹加护理一次套餐 会员只需5…</view>
						<view class="mt16">
							<text class="ft12 cl-orange">会员价</text>
							<text class="ft12 cl-orange">¥</text>
							<text class="ft16 cl-orange ftw600">58</text>
							<text class="ml15 ft12 cl-notice text-line">¥88</text>
						</view>
						<view class="mt16 flex space alcenter">
							<view class="ft12 cl-notice">868次</view>
							<view class="btn-mini" :style="getBtnStyle">播放</view>
						</view>
					</view>
				</view>
		</view>

<script>
	export default{
		props:{
			model:{
				type:String,
				default:'',
			},
		},
		data(){
			return {
				footerList:[
					{name:'首页',icon:'icontabbar03',model:'index',show:1},
					{name:'全部列表',icon:'icontabbar01',model:'tuan',show:1},
					{name:'次卡',icon:'icontabbar03',model:'card',show:0},
					{name:'优惠券',icon:'icontabbar06',model:'coupon',show:0}, //预留其他组件
					{name:'积分商城',icon:'icontabbar05',model:'integral',show:0},
					{name:'个人中心',icon:'icontabbar04',model:'member',show:1},
				]
				// footerList:[
				// 	{name:'VIP',icon:'icontabbar01',model:'index',show:1},
				// 	{name:'特惠',icon:'icontabbar02',model:'tuan',show:1},
				// 	{name:'次卡',icon:'icontabbar03',model:'card',show:1},
				// 	{name:'优惠券',icon:'icontabbar06',model:'coupon',show:0}, //预留其他组件
				// 	{name:'积分商城',icon:'icontabbar05',model:'integral',show:1},
				// 	{name:'我的',icon:'icontabbar04',model:'member',show:1},
				// ]
			}
		},
		computed:{

		},
		methods:{

		}
	}
</script>

<style>
	.member-face .face{
		width: 160rpx;
		height: 160rpx;
		border:6rpx solid #FFFFFF;
		background: #FFFFFF;
		border-radius: 100rpx;
		box-shadow: 0rpx 24rpx 48rpx 0rpx rgba(197, 202, 219, 0.3);
	}
	.miniapp-icon{
		width: 48rpx;
		height: 48rpx;
		border-radius: 24rpx;
		background: #F2F2F2;
	}
</style>
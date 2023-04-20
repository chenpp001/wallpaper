<template>
	<view class="pd24_15">
		<view class="order-time-line">
			<view class="order-time-main">
				<view v-for="(item,index) in datasa" :key="index" class="pb24">
					<order-integralgoods :datas="item"></order-integralgoods>
				</view>
				<uni-pagination title="" @change="onPageChange" v-if="total>pageSize" show-icon="true" :pageSize="pageSize" :total="total" current="1"></uni-pagination>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	export default{
			components: {
			        uniPagination
			    },
		data(){
			return {
				datasa:[//type 1 次卡 2抢购  3积分商城 exchange_type 1特惠套餐  2 优惠券  3是实物 实物订单多一个字段 delivery_type 1 快递  2 门店自提
					// {type:3,exchange_type:3,delivery_type:1,status:0,status_means:'待支付'},
					// {type:3,exchange_type:3,delivery_type:1,status:1,status_means:'待发货'},
					// {type:3,exchange_type:3,delivery_type:2,status:2,status_means:'待自提'},
					// {type:3,exchange_type:2,status:0,status_means:'待支付'},
					// {type:3,exchange_type:1,status:0,status_means:'待支付'},
					// {type:1,exchange_type:0,status:0,status_means:'待支付'}, // status 各个组件自己定义  积分商城才有兑换的类型
					// {type:2,exchange_type:0,status:0,status_means:'待支付'},
				],
				//datasa:[],
				total:0,
				pageSize:10,
			}
		},
		onLoad(){
			//console.log(111)
			this.getList(0)
		},
		methods:{
			onPageChange(e) {
			    this.getList(e.current-1)
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
			},
			getList(offset) {
				let data = {};
				data.limit=this.pageSize
				data.offset=this.pageSize*offset
				if(uni.getStorageSync("userinfo").token){
					data.token = uni.getStorageSync("userinfo").token
					data.uid = uni.getStorageSync("userinfo").id
				}
				if(this.type){
					data.type=this.type
				}
				if(this.keytext){
					data.keytext=this.keytext
				}
				uni.request({
					url: this.configs.webUrl+'/api/video/orderlists',
					data: data,
					success: data => {
						console.log(data.data)
						this.total=data.data.total
						this.datasa=data.data.rows
					},
					fail: (data, code) => {
					}
				});
			},
		}
	}
</script>

<style>
	
	.order-time-line{
		padding-left: 0rpx;
	}
	.order-time-main{
		width: 100%;
		min-height: 100vh;
	}
	.order-list-item-tit{
		position: relative;
		height: 60rpx;
		line-height: 60rpx;
	}
	.order-list-item-tit .order-type{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		left: -90rpx;
		top: 0;
	}
	.order-list-item-l{
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	.order-list-item-r{
		width: calc(100% - 200rpx);
		padding-left: 30rpx;
	}
	.pb24 {
	    padding-bottom: 40upx;
	}
</style>
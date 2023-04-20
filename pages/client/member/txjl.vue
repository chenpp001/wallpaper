<template>
	<view class="pd16_15">
		<block v-for="(item,index) in listData" :key="index">
		<view class="box pd16_15 alcenter space" style="margin-bottom: 30upx;">
			<view class="flex" style="width: 100%;">
				<view style="width: 60%;">
					<view class="ft14 cl-main">提现姓名：{{item.name}} </view>
					<view class="mt8 ft12 cl-notice">帐号：{{item.cord}}</view>
					<view class="mt8">
						<text class="ft12 cl-notice">手续费：</text>
						<text class="ft12 cl-main">{{item.sxf}}</text>
						<text class="ft12 cl-main" style="float: right;">{{item.createtime}}</text>
					</view> 
				</view>
				<view class="uni-triplex-right" style="width: 40%; text-align: right; line-height: 40upx;">
					<text class="uni-h5" style="width: 100%; display: block; font-size: 24upx;">{{item.type}}</text>
					<text class="uni-h5" style="font-size: 24upx; color: #ff0000; width: 100%; display: block;">￥{{item.money}}</text>
					<text class="uni-h5" style="width: 100%; display: block; font-size: 24upx;" v-if="item.iscl==1">未审核</text>
					<text class="uni-h5" style="width: 100%; display: block;  font-size: 24upx;" v-if="item.iscl==2">已审核</text>
					<text class="uni-h5" style="width: 100%; display: block;font-size: 24upx;" v-if="item.iscl==3">已驳回</text>
				</view>
			</view>
			<view v-if="item.memoj" class="mt8" style="width: 100%;">
				<text class="ft12 cl-notice">备注：</text>
				<text class="ft12 cl-main">{{item.memoj}}</text>
			</view>
		</view>
		</block>	
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>
<script>
	export default{
	    data() {
	        return {
	            listData: [],
				last_id: 0,
				reload: true,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有数据了'
				}
	        }
	    },
	    onReachBottom() {
	    	this.status = 'more';
	    	this.getList();
	    },
	    onLoad() {
	    	this.getList();
	    },
		methods: {
			getList() {
				let data = {
					//column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				var limit=10;
				if (this.last_id>0) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.offset = this.last_id*limit;
					data._ = new Date().getTime() + '';
				}
				data.limit=limit		
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/txinfo',
					data: data,
					success: data => {
						console.log(data.data)
						if (data.data.total>0) {
							let list = data.data.rows;
							this.listData = this.reload ? list : this.listData.concat(list);
							this.reload = false;
							this.last_id = this.last_id+1;
							if(data.data.total<this.last_id*limit){
								this.status = '';
							}
						}else{
							this.contentText.contentdown='没有数据'
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
		}
	}
</script>

<style>
	.uni-title{
		color: #444;
		font-size: 32upx;
		font-weight: normal;
	}
	.uni-text{
		font-size: 28upx;
	}
	.uni-h5{
		font-size: 32upx;
		color: #3a3a3a;
		font-weight:500;
	}
</style>

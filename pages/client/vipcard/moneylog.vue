<template>
	<view class="pd16_15">
		<block v-for="(item,index) in listData" :key="index">
		<view class="box pd16_15 flex alcenter space" style="margin-bottom: 30upx;">
			<view>
				<view class="ft14 cl-main">{{item.memo}}</view>
				<view class="mt8 ft12 cl-notice">{{item.createtime}}</view>
				<!-- <view class="mt8">
					<text class="ft12 cl-notice">备注：</text>
					<text class="ft12 cl-main">暂无</text>
				</view> -->
			</view>
			
			<view class="cl-main ft18 ftw600">
				{{item.lxjj}}{{item.money}}
			</view>
		
		</view>
		</block>	
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
export default{
		data(){
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
		methods:{
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
					url: this.configs.webUrl+'/api/user/usermoneyinfo',
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
	
</style>
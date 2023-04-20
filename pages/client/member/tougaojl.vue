<template>
	<view>
		<sub-tabnavtg :tabs="tabs" @change="changeIndex" :selectIndex="selectIndex" :scrollTop="scrollTop"></sub-tabnavtg>
		<view class="" style="background: #ffffff;">
			<uni-search-bar @confirm="search" :focus="false" placeholder="请输入搜索内容" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
							@cancel="cancel" @clear="clear">
			</uni-search-bar>
		</view>
		<view class="pd16_15">
			<block v-for="(item,index) in listData" :key="index">
			<view class="box pd16_15 alcenter space" style="margin-bottom: 30upx;">
				<view class="flex" style="width: 100%;" @click="detail(item.id)">
					<view style="width:230rpx;">
						<image mode="aspectFill" class="order-list-item-l" :src="item.img" style="margin-right: 5%; border-radius: 5px;"></image>
					</view>
					<view style="width: 100%; padding-left: 20upx;">
						<view class="ft14 cl-main">ID:{{item.id}} {{item.name}}</view>
						<view class="mt8 ft12 cl-notice">
							￥{{item.price}}
							<text v-if="uid==1" class="ft12 cl-notice" style="float: right;">UID:{{item.uid}} </text>
						</view>
						<view class="mt8 ft12 cl-notice">
							{{item.createtime}}
							<text v-if="selectIndex<=2" class="ft12 cl-notice" style="float: right;">{{item.status=='hidden'?'未审核':'已审核'}}</text>
							<text v-if="selectIndex>2" class="ft12 cl-notice" style="float: right;">{{item.glv==1?'未过滤':'已过滤'}}</text>
						</view>
						<view class="mt8">
							<view v-if="uid==1" class="flex alcenter space mt16">
								<view class="btn-small plan" @tap.stop="tougaodel(item.id,index)">删除</view>
								<view v-if="selectIndex>2" @tap.stop="glv(item.id,index,item.glv)">
									<view class="btn-small plan" v-if="item.glv==1" :style="getBtnStyle">设置过滤</view>
									<view class="btn-small" v-if="item.glv==2" style="background: #2196f3; color: #ffffff;">取消过滤</view>
								</view>
								<view v-if="selectIndex<=2" @tap.stop="shenhe(item.id,index,item.status)">
									<view class="btn-small plan" v-if="item.status=='hidden'" :style="getBtnStyle">审核</view>
									<view class="btn-small" v-else style="background: #0dbbc3; color: #ffffff;">取消审核</view>
								</view>
							</view>
							<view v-else class="flex alcenter space mt16">
								<view class="btn-small plan"  @tap.stop="detail(item.id)">详情</view>
								<view class="btn-small plan" :style="getBtnStyle" @tap.stop="tougaodel(item.id,index)">删除</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			</block>
			<uni-pagination title="" @change="onPageChange" v-if="total>pageSize" show-icon="true" :pageSize="pageSize" :total="total" :current="current"></uni-pagination>
			<!-- <uni-load-more :status="status" :content-text="contentText" /> -->
		</view>
	</view>
</template>
<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	export default{
			components: {
			        uniPagination
			    },
	    data() {
	        return {
				scrollTop:0,
				selectIndex:0,
				tabs:[
					{name:'全部'},
					{name:'已审核'},
					{name:'未审核'},
					{name:'已过滤'},
					{name:'未过滤'},
				],
				uid:'',
				total:0,
				pageSize:30,
				current:1,
				keytext:'',
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
	    // onReachBottom() {
	    // 	this.status = 'more';
	    // 	this.getList();
	    // },
	    onLoad() {
			if(uni.getStorageSync("userinfo").id){
				this.uid=uni.getStorageSync("userinfo").id
			}
	    	this.getList();
	    },
		methods: {
			onPageChange(e) {
			    // this.getList(e.current-1)
				this.getList(e.current-1);
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
			},
			changeIndex(index){
				this.selectIndex = index;
				this.status = 'more';
				this.last_id=0
				this.listData=[]
				this.reload=true
				this.current=1
				
				this.getList(0)				
			},
			getList(offset) {
				let data = {
					//column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				// var limit=10;
				// if (this.last_id>0) {
				// 	//说明已有数据，目前处于上拉加载
				// 	this.status = 'loading';
				// 	data.offset = this.last_id*limit;
				// 	data._ = new Date().getTime() + '';
				// }
				// data.limit=limit
				if(this.keytext){
					data.keytext=this.keytext
				}
				data.limit=this.pageSize
				data.offset=this.pageSize*offset
				
				if(this.selectIndex>0){
					data.selectIndex=this.selectIndex
				}
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaojl',
					data: data,
					success: data => {
						if (data.data.total>0) {
							let list = data.data.rows;
							this.listData = this.reload ? list : this.listData.concat(list);
							this.total=data.data.total
						}else{
							this.status = '';
							this.contentText.contentdown='没有数据'
						}
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			glv(id,index,glv){
				var name=glv==1?'设置过滤':'取消过滤'
				var this_=this
				uni.showModal({
					title: '温馨提示',
					content: '是否确认'+name,
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							this_.glv1(id,index);
						} else if (res.cancel) {
														
						}
					}
				});
			},
			glv1(id,index){
				var this_=this
				let data = {};
				data.id=id
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaoglv',
					data: data,
					success: data => {
						uni.showToast({ title: data.data.msg,icon:"none" });
						this_.listData[index].glv=data.data.data
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			shenhe(id,index,status){
				var name=status=='hidden'?'审核':'取消审核'
				var this_=this
				uni.showModal({
					title: '温馨提示',
					content: '是否确认'+name,
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							this_.shenhe1(id,index);
						} else if (res.cancel) {
														
						}
					}
				});
			},
			shenhe1(id,index){
				var this_=this
				let data = {};
				data.id=id
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaoshenhe',
					data: data,
					success: data => {
						uni.showToast({ title: data.data.msg,icon:"none" });
						this_.listData[index].status=data.data.data
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			tougaodel(id,index){
				var this_=this
				uni.showModal({
					title: '温馨提示',
					content: '是否确认删除',
					showCancel: true,
					confirmText: "确定",
					success: function (res) {
						if (res.confirm) {
							this_.tougaodel1(id,index);
						} else if (res.cancel) {
														
						}
					}
				});
			},
			tougaodel1(id,index){
				var this_=this
				let data = {};
				data.id=id
				data.token = uni.getStorageSync("userinfo").token;
				uni.request({
					url: this.configs.webUrl+'/api/user/tougaodel',
					data: data,
					success: data => {
						uni.showModal({
							title: '温馨提示',
							content: data.data.msg,
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									this_.listData.splice(index,1)
								} else if (res.cancel) {
									
								}
							}
						});
					},
					fail: (data, code) => {
						//console.log('fail' + JSON.stringify(data));
					}
				});
			},
			detail(id){
				//console.log(lx);
				uni.navigateTo({
					url:'/pages/client/tuan/infotp?id='+id
				})
			},
			search(res) {
				this.listData=[];
				this.last_id=0;
				this.keytext=res.value;
				this.type='';
				this.current=1
				this.getList(0)
			},
				
			clear(res) {
				this.last_id=0;
				this.listData=[];
				this.keytext='';
				this.type='';
				this.current=1
				this.getList(0)
			},
			input(res) {
				console.log('----input:', res)
			},
			blur(res) { 
				// this.listData=[];
				// this.last_id=0;
				// this.keytext=res.value;
				// this.type='';	
				// this.getList(0)
				//res.value 
			},
			focus(e) {
			
			},
			cancel(res) {
				this.last_id=0;
				this.listData=[];
				this.keytext='';
				this.type='';
				this.current=1
				this.getList(0)
			}
		}
	}
</script>

<style>
	.order-list-item-l{
		width: 150rpx;
		height: 225rpx;
		border-radius: 8rpx;
		background: #F2F2F2;
	}
	.order-list-item-r{
		width: calc(100% - 200rpx);
		padding-left: 30rpx;
	}
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

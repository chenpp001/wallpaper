<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="with-fun" style="padding: 20upx;">
				<input class="uni-input" type="text" confirm-type="done" focus :placeholder="name" placeholder-style="color:#666"  @input="onKeyInput" :value="inputValue" />
			</view>
		</view>
		<button class="onname" :style="{'background':dbled?'#999':'#E17503'}" :disabled="dbled"  type="primary" @tap="onOKname()">确 认</button>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex';
	export default {
		data() {
			return {
				inputValue: '',
				dbled:true,
				name:'',
				ty:''
			}
		},
		onLoad(options){
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let ty = options.ty;
			let name = options.name;
			let v = options.v;
			this.ty=ty;
			this.name='请修改'+name;
			uni.setNavigationBarTitle({
				title: '修改'+name
			});
			if(v=='null'){
				this.inputValue='';
			}else{
				this.inputValue=v;
			}
		},
		methods: {
			...mapMutations(['login']),
			onKeyInput(event){
				this.inputValue = event.target.value
				let lens = event.target.value
				if(lens.length){
					this.dbled=false
				}else{
					this.dbled=true
				}
			},
			async onOKname(){
				let _this=this;
				var data={[this.ty]:this.inputValue};
				let [err,res] = await this.$httpas.post('/api/user/edituser',data,{token:true});
				if (!this.$httpas.errorCheck(err,res)) return;
				if(res.data.code === 1){
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1];   //当前页面
					var prevPage = pages[pages.length - 2];  //上一个页面
					//将前一页的address和address_id修改为当前选中的
					if(this.ty=='nickname'){
						var userInfo =uni.getStorageSync("userInfo");
						if(userInfo){
							userInfo.nickname=this.inputValue;
							this.login(userInfo);
						}
					}
					uni.showModal({
					    content: '修改成功',
					    success: (e)=>{
					    	if(e.confirm){
					    		setTimeout(()=>{
									uni.navigateBack();
					    		}, 200)
					    	}
					    }
					});
				}else{
					uni.showToast({ title: res.data.msg,icon:"none" });
					this.logining = false;
				}
			}
		}
	}
</script>

<style scoped>
	.title {
		padding: 10upx 25upx;
	}
	.with-fun{
		background: #f8f8f8;
		position: relative;
	}
	.with-fun:after{
		position: absolute;
		content: $name;
		height: 50px;
		line-height: 50px;
		top: 0px;
		left: 20px;
		font-size: 32upx;
	}
	.uni-input{
		height: 50px;
		line-height: 50px;
		font-size: 32upx;
		background: #f8f8f8;

		color: #666;
	}
	.uni-icon-clear,
	.uni-icon-eye {
		color: #999;
	}
	.onname{
		width: 94%;
		margin: 20upx auto;
		background: -webkit-linear-gradient(left top, #E49315 , #E17503); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom right, #E49315, #E17503); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom right, #E49315,#E17503); /* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom right, #E49315 , #E17503); /* 标准的语法（必须放在最后） */
	}
	.onnames{
		width: 94%;
		margin: 20upx auto;
		background: -webkit-linear-gradient(left top, #f1f1f1 , #f9f9f9); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom right, #f1f1f1, #f9f9f9); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom right, #f1f1f1,#f9f9f9); /* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom right, #f1f1f1 , #f9f9f9); /* 标准的语法（必须放在最后） */
	}
</style>

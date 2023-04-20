<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="uni-form-item uni-column">
			<view class="with-fun" style="margin-top: 10px;">
				<input class="uni-input" type="text" confirm-type="done" focus placeholder="输入你的微信号" placeholder-style="color:#ff1919"  @input="onKeyInput" :value="inputValue" />
			</view>
		</view>
		<button class="onname" :style="{'background':dbled?'#999':'#E17503'}" :disabled="dbled"  type="primary" @tap="onOKname()">确 认</button>
	<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				dbled:true
			}
		},
		methods: {
			onKeyInput(event){
				this.inputValue = event.target.value
				let lens = event.target.value
				if(lens.length>=11){
					this.dbled=false
				}else{
					this.dbled=true
				}
			},
			onOKname(){
				uni.navigateBack({
					delta:1
				})
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
		content: '微信号';
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
		padding-left: 80px;
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

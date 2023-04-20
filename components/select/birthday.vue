<template>
	<view>
		<view @click="showSelect" class="flex alcenter">
			<text v-if="value.length == 0" class="ft14 ftw500 cl-main">请选择</text>
			<text v-else class="ft14 ftw500 cl-main">{{value[0]}}月{{value[1]}}日</text>
			<text class="iconfont  iconicon_arrow_small ft14 ml10"></text>
		</view>
		<view v-show="showBirthday" class="birthday-modal">
			<view  class="modal-bg"></view>
			<view class="modal-box animated fast"  :class="show   ? 'slideInUp' : 'slideOutDown'">
				<view class="modal-main">
					<view class="closed">
						<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
					</view>
					<view class="lh20 ft16 cl-main ftw600 text-center">请选择生日</view>
					<view class="mt30">
						
						<picker-view class="picker-view" indicator-style="height:50px" :value="selectVal" @change="bindChange">
						
							<picker-view-column>
								<view class="item text-center" v-for="(item,index) in month" :key="index">{{item}}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item text-center" v-for="(item,index) in days" :key="index">{{item}}</view>
							</picker-view-column>
						</picker-view>	  
						
					</view>
					
					<view class="plr15 mt40">
						<button class="btn-big" @click="selectYes" :style="isSelect == false ? getBtnDisStyle :getBtnStyle ">确定选择</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export  default{
		props:{
			value:{
				type:Array,
				default:function(){
					return [];
				}
			},
		},
		computed:{
			selectVal(){
				let value = this.value;
				if(value.length == 0){
					value = new Array;
					value = ['01','01'];
				}
				let arr = [0,0];
				for(var a  in this.month){
					if(this.month[a] == value[0]){
						arr[0] = a;
					}
				}
				for(var  b  in  this.days){
					if(this.days[b] == value[1]){
						arr[1] = b;
					}
				}
				return arr;
			}
		},
		data(){
			let month = new Array;
			for(var i= 1;i<=12;i++){
				var m  = i < 10 ? '0'+i : i;
				month.push(m);
			}
			let days = this.makeDays(this.value[0] ? this.value[0] : '01');
		
			return {
				month:month,
				days:days,
				show:false,
				showBirthday:false,
				isSelect:false,
				selectdate:['01','01'],
			}
		},
		created(){
			
		},
		methods:{
			showSelect(){
				this.showBirthday = true;
				this.show = true;
			},
			makeDays(m){
				let dmax = 31;
				if(m == '02'){
					dmax = 29;
				}else{
					if(m == '04' || m == '06' || m == '09' || m == '11'){
						dmax = 30;
					}else{
						dmax = 31;
					}
				}
				let days  = new Array;
				for(var i = 1;i<=dmax;i++){
					var d = i< 10 ? '0'+i : i;
					days.push(d);
				}
				return days;
			},
			bindChange(e){
				let values = e.detail.value;
				this.days = this.makeDays(this.month[values[0]]);
				this.selectdate = [this.month[values[0]],this.days[values[1]]];
				this.isSelect = true;
			},
			selectYes(){
				console.log(this.selectdate);
				console.log(this.isSelect);
				if(this.isSelect ){
					this.$emit('input',this.selectdate);
					this.closed();
				}
			},
			closed(){
				this.show = false;
				setTimeout(()=>{
					this.showBirthday = false;
				},400);
			}
		}
	}
</script>

<style>
	.birthday-modal{
		position: relative;
		z-index: 400;
	}
	.birthday-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.birthday-modal .modal-box{
		position: fixed;
		z-index: 401;
		background:#FFFFFF;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-bottom:0rpx;
		padding-bottom:constant(safe-area-inset-bottom);
		padding-bottom:env(safe-area-inset-bottom);
		border-radius:32rpx 32rpx 0rpx 0rpx;
	}
	.birthday-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
		padding-bottom: 40rpx;
	}
	.birthday-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
</style>
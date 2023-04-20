<template>
	<view>
		<view @click="showDiv" class="flex alcenter">
			<text class="ft16  cl-manage">{{value == 0 ? '请选择' : value}}</text>
			<text class="iconfont  iconicon_arrow_small ml5 ft14 cl-manage"></text>
		</view>
		<view v-show="show" class="selecttime-modal">
			<view class="modal-bg"></view>
			<view class="modal-box animated fast" :class="show   ? 'slideInUp' : 'slideOutDown'">
				<view class="modal-main">
					<view class="closed">
						<text @click="closed()" class="iconfont  ft20 cl-notice iconbtn_close"></text>
					</view>
					<view class="lh20 ft16 cl-main ftw600 text-center">选择时间</view>

					<view class="mt40">
						<view class="flex">
							<view class="col2 flex center">
								<view class="time-type" @click="changeType(0)" :class="selectType == 0 ? 'on' :''">选择日期</view>
							</view>
							<view class="col2 flex center">
								<view class="time-type" @click="changeType(1)" :class="selectType == 1 ? 'on' :''">选择时分</view>
							</view>
						</view>
						<view v-if="selectType == 0 && show == true " class="pd16_15">
							<picker-view class="picker-view" indicator-style="height:50px" :value="[selectVal[0],selectVal[1],selectVal[2]]"
							 @change="bindChange">
								<picker-view-column>
									<view class="item text-center" v-for="(item,index) in years" :key="index">{{item}}年</view>
								</picker-view-column>
								<picker-view-column>
									<view class="item text-center" v-for="(item,index) in month" :key="index">{{item}}月</view>
								</picker-view-column>
								<picker-view-column>
									<view class="item text-center" v-for="(item,index) in days" :key="index">{{item}}日</view>
								</picker-view-column>
							</picker-view>
						</view>
						<view v-if="selectType == 1 && show == true" class="pd16_15">
							<picker-view class="picker-view" indicator-style="height:50px" :value="[selectVal[3],selectVal[4]]" @change="bindChange2">
								<picker-view-column>
									<view class="item text-center" v-for="(item,index) in hours" :key="index">{{item}}时</view>
								</picker-view-column>
								<picker-view-column>
									<view class="item text-center" v-for="(item,index) in mins" :key="index">{{item}}分</view>
								</picker-view-column>

							</picker-view>
						</view>
						<view class="pd16_15">
							<button @click="submitYes" class="btn-manage">确定选择</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../static/js/helper.js';
	export default {
		props: {

			value: {
				type: String,
				default: ''
			},
		},
		data() {
			let years = new Array;
			for (var i = 2000; i <= 2030; i++) {
				years.push(i);
			}
			let month = new Array;
			for (var i = 1; i <= 12; i++) {
				var m = i < 10 ? '0' + i : i;
				month.push(m);
			}
			let days = this.makeDays([0, 0]);
			let hours = new Array;
			for (var i = 0; i <= 23; i++) {
				var h = i < 10 ? '0' + i : i;
				hours.push(h);
			}
			let mins = new Array;
			for (var i = 0; i <= 59; i++) {
				var min = i < 10 ? '0' + i : i;
				mins.push(min);
			}

			return {

				selectType: 0,
				mydateValue: [0, 0, 0, 0, 0],
				years: years,
				month: month,
				days: days,
				hours: hours,
				mins: mins,
				show: false,
			}
		},

		computed: {
			getValue() {
				let value = this.value;
				if (value == '' || value == 0) {
					let today = helper.getTimeArr();
					value = today.y + '-' + today.m + '-' + today.d + ' ' + today.h + ':' + today.i;
				}
				let v = value.replace(/[-|:]/g, ' ');
				let val = v.split(' ');
				return val;
			},
			selectVal() {
				let value = this.getValue;
				let month = this.month;
				let days = this.days;
				let hours = this.hours;
				let mins = this.mins;

				let res = [0, 0, 0, 0, 0];
				for (var a in this.years) {
					if (this.years[a] == value[0]) {
						res[0] = parseInt(a);
						break;
					}
				}
				for (var a in month) {
					if (month[a] == value[1]) {
						res[1] = parseInt(a);
						break;
					}
				}
				for (var a in days) {
					if (days[a] == value[2]) {
						res[2] = parseInt(a);
						break;
					}
				}
				for (var a in hours) {
					if (hours[a] == value[3]) {
						res[3] = parseInt(a);
						break;
					}
				}
				for (var a in mins) {
					if (mins[a] == value[4]) {
						res[4] = parseInt(a);
						break;
					}
				}
				return res;
			},
		},
		methods: {
			showDiv() {
				this.show = true;
			},
			makeDays(value) {
				let years = value[0];
				let month = value[1];
				let dmax = 31;
				if ((years / 4 == 0) && month == '02') {
					if ((years / 100 == 0) && (years % 400 !== 0)) {
						dmax = 28;
					} else {
						dmax = 29;
					}
				} else {
					if (month == '04' || month == '06' || month == '09' || month == '11') {
						dmax = 30;
					} else if (month == '02') {
						dmax = 28;
					}
				}
				let days = new Array;
				for (var i = 1; i <= dmax; i++) {
					var d = i < 10 ? '0' + i : i;
					days.push(d);
				}
				return days;
			},
			makeDays2(selectVal) {
				let values = [this.years[selectVal[0]], this.month[selectVal[1]]];
				return this.makeDays(values);
			},
			bindChange(e) {
				let values = e.detail.value;
				this.days = this.makeDays2(values);
				this.mydateValue[0] = values[0];
				this.mydateValue[1] = values[1];
				this.mydateValue[2] = values[2];
			},
			bindChange2(e) {
				let values = e.detail.value;
				this.mydateValue[3] = values[0];
				this.mydateValue[4] = values[1];
			},
			submitYes() {
				for (var a in this.mydateValue) {
					if (this.mydateValue[a] == 0) {
						this.mydateValue[a] = this.selectVal[a];
					}
				}
				let date = this.years[this.mydateValue[0]] + '-' +
					this.month[this.mydateValue[1]] + '-' +
					this.days[this.mydateValue[2]] + ' ' +
					this.hours[this.mydateValue[3]] + ':' +
					this.mins[this.mydateValue[4]];
				if (date == '2000-01-00 00:00') {
					this.$emit('input', this.value);
				} else {
					this.$emit('input', date);
				}
				this.selectType = 0;
				this.show = false;
			},
			closedAct() {
				this.show = false;
			},
			changeType(type) {
				this.selectType = type;
			},
		}
	}
</script>

<style>
	.selecttime-modal{
		position: relative;
		z-index: 400;
	}
	.selecttime-modal .modal-bg{
		position: fixed;
		z-index: 400;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
	}
	.selecttime-modal .modal-box{
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
	.selecttime-modal .modal-main{
		position: relative;
		height: auto;
		overflow: hidden;
		padding-top: 64rpx;
	}
	.selecttime-modal .modal-main .closed{
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}
	
	.time-type {
		height: 66rpx;
		color: #333333;
		font-size: 36rpx;
		font-weight: 600;
		border-bottom: 6rpx solid #FFFFFF;
	}

	.time-type.on {
		border-color: #5E40FF;
		color: #5E40FF; 
	}
</style>

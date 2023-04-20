<template>
	<view class="flex space alcenter star-list" :class="size">
		<text  v-for="(a,i) in datas" :key="i"  @click="changeStar" :data-value="a" class="star iconfont iconicon_star" :style="{color:a <= getVal ? '#FFD200' : '#E4E6ED' }"></text>
	</view>
</template>

<script>
	export default{
		props:{
			type:{
				type:String,
				default:'star'
			},
			size:{
				type:String,
				default:'small'
			},
			value:{
				type:Number,
				default:0,
			},
			readOnly:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			getVal(){
				return this.value;
			},
			
		},
		data(){
			return {
				myValue:0,
				datas:[1,2,3,4,5], //不同端 可能存在 a in number 得差异 所以用数组
			}
		},
		methods:{
			changeStar(e){
				if(this.readOnly) return;
				let val = parseInt(e.currentTarget.dataset.value);
				console.log(val);
				this.$emit('input',val);
			}
		}
	}
</script>

<style>
	.star-list{width: 100%;}
	.star-list.small{width: 380rpx;}
	.star-list.mini{width: 200rpx;}
	.star-list .star{
		font-size: 80rpx;
	}
	.star-list.small .star{
		font-size: 48rpx;
	}
	.star-list.mini .star{
		font-size: 32rpx;
	}
</style>
<template>
	<view class="subject">
		<view class="subject-title">
			{{title}}
		</view>
		<view class="answer" :class="{'active':active===index}" v-for="(item,index) in answer" :key="index" @click="select(index)">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:"题目"
			},
			answer:{
				type:Array
			}
		},
		data() {
			return {
				active:null
			};
		},
		methods:{
			select(index){
				this.active = index;
				let _this = this;
				let timer = setTimeout(function(){
					clearTimeout(timer);
					_this.$emit("select",_this.answer[index]);
					_this.active = null;
				},100)
			}
		}
	}
</script>

<style lang="scss">
.subject{
	text-align: center;
	.subject-title{
		font-size: 48rpx;
		color: #333333;
		margin: 50rpx auto 20rpx auto;
		max-width: 80%;
		height: 200rpx;
		overflow: hidden;
	}
	.answer{
		width: 500rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 1rpx solid #E2E2E2;
		border-radius: 80rpx;
		margin: 0 auto 50rpx auto;
		font-size: 30rpx;
		&.active{
			background: #F1FFF6;
			border: 2rpx solid #2B8349;
			color: #2B8349;
		}
	}
}
</style>

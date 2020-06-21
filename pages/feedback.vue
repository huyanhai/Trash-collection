<template>
	<view class="feedback-content">
		<textarea value="" class="textarea" placeholder="请提出您宝贵的建议~" />
		<view class="item">
			<view class="label">姓名</view>
			<input type="text"   value="" placeholder="请输入您的姓名 "/>
		</view>
		<view class="item">
			<view class="label">联系电话</view>
			<input type="text" class="ui-input" value="" placeholder="请输入您的电话"/>
		</view>
		<view class="btn">提交</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
export default {
	data() {
		return {
			shopData(){
				
			}
		};
	},
	onLoad(e) {
		this.getData();
	},
	onShow(){
		
	},
	onHide(){
		
	},
	components: {
		
	},
	methods: {
		getData(data){
			post("/goods/query",data).then(res=>{
				console.log(res)
			})
		},
		goPage(path){
			uni.navigateTo({
				url: path
			})
		}
	}
};
</script>

<style lang="scss">
.feedback-content{
	background: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	position: relative;
	.textarea{
		width: 100%;
		height: 524rpx;
		border-bottom: 2rpx solid #F1F1F1;
		padding: 24rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	.item{
		height: 100rpx;
		border-bottom: 2rpx solid #F1F1F1;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		.label{
			width: 180rpx;
			font-size: 30rpx;
			color: #666666;
			flex: 0 0 auto;
		}
		.ui-input{
			font-size: 30rpx;
			color: #666666;
			flex: 1 0 auto;
		}
	}
	.btn{
		position: absolute;
		height: 80rpx;
		line-height: 80rpx;
		background: #2B8349;
		border-radius: 10rpx;
		text-align: center;
		font-size: 30rpx;
		color: #FFFFFF;
		bottom: 80rpx;
		left: 24rpx;
		right: 24rpx;
	}
}
</style>

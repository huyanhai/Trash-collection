<template>
	<view class="question-content">
		<image src="../static/img/question-bg.png" class="bg" mode=""></image>
		<view class="box">
			<view class="title">
				<view class="col-left">
					单选题
				</view>
				<view class="col-right">
					<text class="d">1</text>/10
				</view>
			</view>
			<view class="container">
				<subject :title="'怡宝水瓶子'" :answer="answer"/>
			</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
import subject from "../components/subject.vue"
export default {
	data() {
		return {
			answer:["易腐垃圾","其他垃圾","可回收物","有害垃圾"]
			
		};
	},
	onLoad(e) {
		
	},
	onShow(){
		
	},
	onHide(){
		
	},
	components: {
		subject
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
.question-content{
	background: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	position: relative;
	overflow: hidden;
	.bg{
		position: absolute;
		top: 0rpx;
		left: 0;
		width: 750rpx;
		height: 257rpx;
	}
	.box{
		width: 650rpx;
		height: 980rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
		margin: 60rpx auto 0 auto;
		position: relative;
		z-index: 10;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		.title{
			display: flex;
			height: 80rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #F3F3F3;
			padding: 0 24px;
			.col-left{
				display: flex;
				align-items: center;
				&::before{
					display: block;
					content: "";
					width: 4rpx;
					height: 28rpx;
					background: #2B8349;
					margin-right: 12rpx;
				}
			}
			.col-right{
				.d{
					color: #2B8349;
				}
			}
		}
	}
}
</style>

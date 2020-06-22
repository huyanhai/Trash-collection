<template>
	<view class="question-content">
		<image src="../static/img/question-bg.png" class="bg" mode=""></image>
		<view class="box">
			<image src="../static/img/complatebg.png" mode="" class="c-bg"></image>
			<view class="complate-info">
				<text class="title">恭喜您！</text>
				<text class="score">{{result.accuracy}}</text>
			</view>
			<view class="details">
				<view class="item">
					<view class="col-l">错题数</view>
					<view class="col-r yellow">{{result.errorNumber}}</view>
				</view>
				<view class="item">
					<view class="col-l">本次答题用时</view>
					<view class="col-r green">{{time}}</view>
				</view>
				<view class="item">
					<view class="col-l">积分奖励</view>
					<view class="col-r green">{{result.scoring}}</view>
				</view>
			</view>
			<view class="tips">今日答题次数已用完，明天记得再来哦~</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
import subject from "../components/subject.vue"
export default {
	data() {
		return {
			time:"00:00:00",
			result:{}
		};
	},
	onLoad(e) {
		let {time,result} = e;
		if(time) {
			this.time = this.formatSeconds(time);
		}
		if(result) {
			this.result = JSON.parse(result)
		}
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
		formatSeconds(value) {
		　　let result = parseInt(value)
		　　let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
		　　let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
		　　let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
		　　result = `${h}:${m}:${s}`
		　　return result
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
		overflow: hidden;
		.c-bg{
			height: 325rpx;
			width: 650rpx;
			position: absolute;
			top: 0;
			left: 0;
		}
		.complate-info{
			width: 100%;
			text-align: center;
			position: relative;
			z-index: 10;
			margin-top: 40rpx;
			.title{
				font-size: 36rpx;
				color: #FFFFFF;
				display: block;
				margin-bottom: 90rpx;
			}
			.score{
				font-size: 36rpx;
				color: #FFFFFF;
				display: block;
			}
		}
		.details{
			position: relative;
			z-index: 10;
			margin-top: 140rpx;
			padding: 0 60rpx;
			.item{
				display: flex;
				justify-content: space-between;
				line-height: 60rpx;
				height: 60rpx;
				margin-bottom: 20rpx;
				.col-l{
					font-size: 30rpx;
					color: #666666;
				}
				.col-r{
					&.yellow{
						color: #D79814;
					}
					&.green{
						color: #2B8349;
					}
				}
			}
		}
		.tips{
			position: absolute;
			width: 100%;
			bottom: 120rpx;
			font-size: 28rpx;
			color: #D79814;
			text-align: center;
		}
	}
}
</style>

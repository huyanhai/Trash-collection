<template>
	<view class="me-content">
		<image src="../static/img/me-bg.png" class="top-bg" mode=""></image>
		<view class="user-info">
			<image src="../static/img/me-tx.png" class="user-img" mode=""></image>
			<view class="col-right">
				<text class="name">{{userInfo.customerName}}</text>
				<text class="address">{{userInfo.customerAddress}}</text>
			</view>
		</view>
		<view class="more-action">
			<image src="../static/img/me-xbg.png" class="xbg" mode=""></image>
			<image src="../static/img/me-fl.png" class="btbg" mode=""></image>
			<view class="integral">
				<view class="col-left">
					<image src="../static/img/me-hz.png" class="ye" mode=""></image>
					积分余额
				</view>
				<view class="col-right">
					{{userInfo.customerScoring || 0}}分
				</view>
			</view>
			<view class="links">
				<view class="link">
					<view class="left" @click="goPage('integral')">积分记录</view>
				</view>
				<view class="link">
					<view class="left" @click="goPage('feedback')">我要反馈</view>
				</view>
				<view class="link">
					<view class="left" @click="goPage('set')">修改密码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
export default {
	data() {
		return {
			userInfo:{}
		};
	},
	onLoad(e) {
		this.userInfo = uni.getStorageSync("auth");
		console.log(this.userInfo)
	},
	onShow(){
		
	},
	onHide(){
		
	},
	components: {
		
	},
	methods: {
		goPage(path){
			uni.navigateTo({
				url: path
			})
		}
	}
};
</script>

<style lang="scss">
.me-content{
	background: #F2F2F2;
	padding: 24rpx;
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	position: relative;
	.top-bg{
		position: absolute;
		height: 441rpx;
		top: 0;
		width: 750rpx;
		left: 0;
	}
	.user-info{
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 60rpx 20rpx 60rpx 20rpx;
		.user-img{
			width: 120rpx;
			height: 120rpx;
			border-radius: 120rpx;
		}
		.col-right{
			line-height: 48rpx;
			display: flex;
			flex-direction: column;
			text-align: right;
			.name{
				font-size: 34rpx;
				color: #FFFFFF;
			}
			.address{
				font-size: 34rpx;
				color: #FFFFFF;
			}
		}
	}
	.more-action{
		border-radius: 20rpx;
		background: #FFFFFF;
		height: 817rpx;
		position: relative;
		z-index: 10;
		overflow: hidden;
		.xbg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 153rpx;
			overflow: hidden;
		}
		.btbg{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 235rpx;
			overflow: hidden;
		}
		.integral{
			display: flex;
			justify-content: space-between;
			position: relative;
			z-index: 10;
			margin: 40rpx 40rpx;
			.col-left{
				display: flex;
				align-items: center;
				font-size: 34rpx;
				color: #666666;
				.ye{
					width: 34rpx;
					height: 34rpx;
					margin-right: 20rpx;
				}
				
			}
			.col-right{
				color: #2B8349;
				font-size: 36rpx;
			}
		}
		.links{
			margin-top: 70rpx;
			.link{
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 2rpx solid #F1F1F1;
				padding: 0 20rpx;
				.left{
					font-size: 34rpx;
					color: #333333;
				}
			}
		}
	}
}
</style>

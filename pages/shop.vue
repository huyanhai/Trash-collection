<template>
	<scroll-view class="content">
		<view class="shop-content">
			<view class="shop-item">
				<view class="img">
					<image src="../static/img/khs.png" mode="aspectFit"></image>
				</view>
				<view class="integral">100积分</view>
				<view class="name">精选葵花籽油10L</view>
			</view>
			<view class="shop-item">
				<view class="img">
					<image src="../static/logo.png" mode="aspectFit"></image>
				</view>
				<view class="integral">100积分</view>
				<view class="name">精选葵花籽油10L</view>
			</view>
			<view class="shop-item">
				<view class="img">
					<image src="../static/logo.png" mode="aspectFit"></image>
				</view>
				<view class="integral">100积分</view>
				<view class="name">精选葵花籽油10L</view>
			</view>
		</view>
	</scroll-view>
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
		}
	}
};
</script>

<style lang="scss">
.content{
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	.shop-content{
		background: #F2F2F2;
		padding: 24rpx;
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
		clear: both;
		.shop-item{
			float: left;
			height: 400rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			width: calc(50% - 12rpx);
			margin-bottom: 24rpx;
			&:nth-child(2n-1){
				margin-right: 12rpx;
			}
			&:nth-child(2n){
				margin-left: 12rpx;
			}
			.img{
				width: 100%;
				height: 280rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 12rpx 0;
				image{
					max-width: 100%;
					max-height: 100%;	
				}
			}
			.integral{
				font-size: 30rpx;
				color: #2B8349;
				text-align: center;
			}
			.name{
				text-align: center;
				font-size: 28rpx;
				color: #999999;
			}
		}
	}
}
</style>

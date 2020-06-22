<template>
	<scroll-view class="content" scroll-y @scrolltolower="scrolltolower">
		<view class="shop-content">
			<view class="shop-item" v-for="(item,index) in shopList" :key="index">
				<view class="img">
					<image :src="baseUrl+item.pictureUrl" mode="aspectFit"></image>
				</view>
				<view class="integral">{{item.scoring}}积分</view>
				<view class="name">{{item.goodsName}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import { get, post } from '../libs/request.js';
import { BASE_URL } from "../config/index.js"
export default {
	data() {
		return {
			shopList:[],
			baseUrl:BASE_URL,
			page:1
		};
	},
	onLoad(e) {
		
	},
	onShow(){
		this.shopList = []
		this.getData({
			"rows":10,
			"page":this.page
		});
	},
	onHide(){
		
	},
	components: {
		
	},
	methods: {
		getData(data){
			let _this = this;
			post("goods/query",data).then(res=>{
				if(res.list.length > 0){
					res.list.map(item => {
						_this.shopList.push(item)
					})
				}
			})
		},
		scrolltolower(){
			this.page ++;
			this.getData({
				"rows":10,
				"page":this.page
			});
		}
	}
};
</script>

<style lang="scss">
.content{
	background: #F2F2F2;
	display: flex;
	flex-direction: column;
	height: 100vh;
	.shop-content{
		background: #F2F2F2;
		padding: 24rpx;
		box-sizing: border-box;
		width: 100%;
		min-height: 100%;
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

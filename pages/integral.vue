<template>
	<scroll-view class="integral-content">
		<view class="item" v-for="(item,index) in '1232221312312321'">
			<view class="col-left">
				<text class="title">每日知识竞答</text>
				<text class="date">2020-03-04</text>
			</view>
			<view class="num add">
				+1
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
.integral-content{
	background: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	position: relative;
	.item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 128rpx;
		border-bottom: 2rpx solid #F1F1F1;
		padding: 0 24rpx;
		.col-left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.title{
				font-size: 28rpx;
				color: #666666;
			}
			.date{
				font-size: 24rpx;
				color: #999999;
			}
		}
		.num{
			font-size: 34rpx;
			font-weight: bold;
			color: #B03333;
			&.add{
				color: #2B8349;
			}
		}
	}
}
</style>

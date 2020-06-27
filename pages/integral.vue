<template>
	<scroll-view class="integral-content" scroll-y @scrolltolower="scrolltolower">
		<view class="item" v-for="(item,index) in list">
			<view class="col-left">
				<text class="title" v-if="item.type === '0'">投放垃圾</text>
				<text class="title" v-if="item.type === '1'">每日知识竞答</text>
				<text class="title" v-if="item.type === '3'">活动积分</text>
				<text class="title" v-if="item.type === '4'">其他</text>
				<text class="title" v-if="item.type === '2'">{{item.goods}}</text>
				<text class="date">{{item.createTime || "暂无日期"}}</text>
			</view>
			<view class="num" v-if="item.type === '2'">
				{{item.scoring}}
			</view>
			<view class="num add" v-else>
				+{{item.scoring}}
			</view>
		</view>
	</scroll-view>
</template>

<script>
import { get, post } from '../libs/request.js';
export default {
	data() {
		return {
			list:[],
			page:1
		};
	},
	onLoad(e) {
		
	},
	onShow(){
		this.page = 1
		this.list = [];
		this.getData({
			"customerId": uni.getStorageSync("auth").id,
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
			post("/customerScoringRecord/getCustomerScoringList",data).then(res=>{
				if(res.list.length > 0){
					res.list.map(item => {
						_this.list.push(item)
					})
				}
				
			})
		},
		goPage(path){
			uni.navigateTo({
				url: path
			})
		},
		scrolltolower(){
			console.log("----")
			this.page ++;
			this.getData({
				"customerId": uni.getStorageSync("auth").id,
				"rows":10,
				"page":this.page
			});
		}
	}
};
</script>

<style lang="scss">
.integral-content{
	background: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	height: 100vh;
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

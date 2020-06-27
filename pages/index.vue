<template>
	<view class="content">
		<!-- <view class="notice">
			<view class="info">
				<image class="ui-icon" src="../static/img/icon-notice.png"></image>
				点我查看社区公告
			</view>
			<image src="../static/img/notice.png" class="ui-img"></image>
		</view> -->
		<view class="box">
			<view class="tab">
				<view class="item" :class="{active:type==='yf'}" @click="changeType('yf')">厨余垃圾</view>
				<view class="item" :class="{active:type==='qt'}" @click="changeType('qt')">其他垃圾</view>
				<view class="item" :class="{active:type==='khs'}" @click="changeType('khs')">可回收物</view>
				<view class="item" :class="{active:type==='yh'}" @click="changeType('yh')">有害垃圾</view>
			</view>
			<scroll-view class="container">
				<view :class="['info',type]">
					<image :src="typeImg" class="info-img"></image>
					<view class="text-info">
						<view class="title">{{typeDetail[type]}}</view>
						<text class="text">{{pageData[type]["info"]}}</text>
					</view>
				</view>
				<view class="demand">
					<view class="title">投放要求</view>
					<text class="text">{{pageData[type]["tfyq"]}}</text>
				</view>
				<view :class="['details',type]">
					<view class="title" :class="{active:type==='yf'}">常见厨余垃圾</view>
					<view class="title" :class="{active:type==='qt'}">常见其他垃圾</view>
					<view class="title" :class="{active:type==='khs'}">常见可回收垃圾</view>
					<view class="title" :class="{active:type==='yh'}">常见有害垃圾</view>
					<view class="item" v-for="(item,index) in pageData[type]['list']" :key="index">{{item}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
import { checkAuth } from '../libs/checkAuth.js';
export default {
	data() {
		return {
			typeDetail:{
				"yf":"厨余垃圾",
				"qt":"其他垃圾",
				"khs":"可回收物",
				"yh":"有害垃圾"
			},
			type:"yf",
			typeImg:null,
			pageData:{
				"yf":{
					info:"",
					tfyq:"",
					list:[]
				},
				"qt":{
					info:"",
					tfyq:"",
					list:[]
				},
				"khs":{
					info:"",
					tfyq:"",
					list:[]
				},
				"yh":{
					info:"",
					tfyq:"",
					list:[]
				}
			}
		};
	},
	onLoad(e) {
		this.getData();
		this.typeImg = require(`../static/img/${this.type}.png`);
	},
	onShow(){
		checkAuth();
	},
	onHide(){
		
	},
	components: {
		
	},
	methods: {
		changeType(type) {
			this.type = type;
			this.typeImg = require(`../static/img/${this.type}.png`);
		},
		getData(){
			post("/refuseClassification/getRefuseClassificationList",{}).then(res=>{
				for(let item of res){
					switch (item.type){
						case "厨余垃圾":
							if(item.title === "厨余垃圾"){
								this.pageData["yf"]["info"] = item["content"]
							}
							if(item.title === "投放要求"){
								this.pageData["yf"]["tfyq"] = item["content"]
							}
							if(item.title === "常见厨余垃圾"){
								this.pageData["yf"]["list"] = item["content"].split("|").map(item=>item.replace(/ /g,'')).filter(item=>item)
							}
							break;
						case "其他垃圾":
							if(item.title === "其他垃圾"){
								this.pageData["qt"]["info"] = item["content"]
							}
							if(item.title === "投放要求"){
								this.pageData["qt"]["tfyq"] = item["content"]
							}
							if(item.title === "常见其他垃圾"){
								this.pageData["qt"]["list"] = item["content"].split("|").map(item=>item.replace(/ /g,'')).filter(item=>item)
							}
							break;
						case "可回收物":
							if(item.title === "可回收物"){
								this.pageData["khs"]["info"] = item["content"]
							}
							if(item.title === "投放要求"){
								this.pageData["khs"]["tfyq"] = item["content"]
							}
							if(item.title === "常见可回收物"){
								this.pageData["khs"]["list"] = item["content"].split("|").map(item=>item.replace(/ /g,'')).filter(item=>item)
							}
							break;
						case "有害垃圾":
							if(item.title === "有害垃圾"){
								this.pageData["yh"]["info"] = item["content"]
							}
							if(item.title === "投放要求"){
								this.pageData["yh"]["tfyq"] = item["content"]
							}
							if(item.title === "常见有害垃圾"){
								this.pageData["yh"]["list"] = item["content"].split("|").map(item=>item.replace(/ /g,'')).filter(item=>item)
							}
							break;
						default:
							break;
					}
				}
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
}
.notice{
	position: relative;
	height: 60rpx;
	line-height: 60rpx;
	flex: 0 0 auto;
	.ui-img{
		width: 100%;
		height: 60rpx;
		position: absolute;
		top: 0;
	}
	.info{
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		.ui-icon{
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
			display: block;
		}
	}
}
.box{
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
	.tab{
		flex: 0 0 auto;
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 2rpx solid #E7E7E7;
		box-sizing: border-box;
		.item{
			width: 25%;
			font-size: 32rpx;
			color: #333333;
			text-align: center;
			&.active{
				border-bottom: 2rpx solid #2B8349;
				color: #2B8349;
			}
		}
	}
	.container{
		.info{
			position: relative;
			margin: 24rpx;
			overflow:hidden ;
			&.yf,&.qt{
				width: 702rpx;
				height: 220rpx;
			}
			&.khs{
				width: 702rpx;
				height: 260rpx;
			}
			&.yh{
				width: 702rpx;
				height: 260rpx;
			}
			.info-img{
				width: 100%;
				height: 100%;
			}
			.text-info{
				position: absolute;
				width: 520rpx;
				top: 30rpx;
				left: 30rpx;
				line-height: 36rpx;
				.title{
					font-size: 34rpx;
					color: #FFFFFF;
					margin-bottom: 10rpx;
				}
				.text{
					font-size: 28rpx;
					color: #FFFFFF;
				}
			}
		}
		.demand{
			margin: 0 24rpx;
			line-height: 45rpx;
			border-bottom: 2rpx solid rgba($color: #487358, $alpha: 0.1);
			padding: 0 24rpx 24rpx 24rpx;
			.title{
				font-size: 34rpx;
				color: #333333;
				font-weight: bold;
			}
			.text{
				font-size: 30rpx;
				color: #666666;
			}
		}
		.details{
			margin: 24rpx 24rpx 0 24rpx;
			overflow: hidden;
			&.yf{
				.item{
					color: #487358;
					&:nth-child(2n-1){
						background: #F6F9F4;
					}
				}
			}
			&.qt{
				.item{
					color: #736D48;
					&:nth-child(2n-1){
						background: #F9F8F4;
					}
				}
			}
			&.khs{
				.item{
					color: #485973;
					&:nth-child(2n-1){
						background: #F4F7F9;
					}
				}
			}
			&.yh{
				.item{
					color: #734848;
					&:nth-child(2n-1){
						background: #F9F4F4;
					}
				}
			}
			.title{
				font-size: 34rpx;
				color: #333333;
				margin: 24rpx 0;
				padding: 0 24rpx;
				font-weight: bold;
				display: none;
				&.active{
					display: block;
				}
			}
			.item{
				font-size: 30rpx;
				color: #666666;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 24rpx;
			}
		}
	}
}
</style>

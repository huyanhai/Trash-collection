<template>
	<view class="login-content">
		<image src="../static/img/login-bg.png" class="bg"></image>
		<view class="navbar" :style="{marginTop:statusBarHeight+'px'}">垃圾分类</view>
		<view class="box">
			<image src="../static/img/login-title.png" class="title"></image>
			<view class="info">
				<view class="xq-info">
					<image src="../static/img/yiyonglaji.png" class="post"></image>
					<text class="name">垃圾分类系统登录</text>
				</view>
				<view class="form">
					<view class="item">
						<image src="../static/img/yonghu.png" class="icon"></image>
						<input type="text" class="input" placeholder="请输入手机号" v-model="loginData.customerPhone"/>
					</view>
					<view class="item">
						<image src="../static/img/mima.png" class="icon"></image>
						<input type="password" class="input" placeholder="请输入密码" v-model="loginData.password"/>
					</view>
				</view>
				<view class="btn" @click="login">登录</view>
			</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
export default {
	data() {
		return {
			"statusBarHeight": wx.getSystemInfoSync()['statusBarHeight'],
			loginData:{
				customerPhone:"",
				password:""
			}
		};
	},
	
	onLoad(e) {

	},
	onShow(){
		
	},
	onHide(){
		
	},
	components: {
		
	},
	methods: {
		login(data){
			if(!this.loginData.customerPhone){
				return uni.showToast({
					icon:"none",
					title:"请输入手机号！"
				})
			}
			if(!this.loginData.password){
				return uni.showToast({
					icon:"none",
					title:"请输入密码！"
				})
			}
			post("/customer/toLogin",this.loginData).then(res=>{
				if(res){
					uni.setStorageSync("auth",res);
					uni.switchTab({
						url:"index"
					})
				}
			})
		}
	}
};
</script>

<style lang="scss">
.login-content{
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 100vh;
	.bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 673rpx;
	}
	.navbar{
		height: 98rpx;
		line-height: 98rpx;
		position: relative;
		z-index: 10;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.box{
		width: 600rpx;
		height: 940rpx;
		position: absolute;
		left: 50%;
		top: 300rpx;
		transform: translateX(-50%);
		background: #FFFFFF;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		border-radius: 10rpx;
		.title{
			width: 383rpx;
			height: 278rpx;
			transform: translateY(-150rpx);
			margin: 0 auto;
		}
		.info{
			transform: translateY(-120rpx);
			margin: 0 60rpx;
			.xq-info{
				overflow: hidden;
				margin: 0 auto 20rpx auto;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.post{
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
					margin-bottom: 30rpx;
				}
				.name{
					font-size: 30rpx;
					color: #333333;
				}
			}
			.form{
				.item{
					display: flex;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 2rpx dashed #999999;
					position: relative;
					.icon{
						width: 34rpx;
						height: 36rpx;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.input{
						width: 100%;
						border: none;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						color: #333333;
						font-size: 30rpx;
					}
				}
			}
			.btn{
				width: 480rpx;
				height: 80rpx;
				border-radius: 10rpx;
				background: #2B8349;
				color: #FFFFFF;
				font-size: 30rpx;
				text-align: center;
				line-height: 80rpx;
				margin-top: 200rpx;
			}
		}
	}
}
</style>

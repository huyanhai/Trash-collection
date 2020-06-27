<template>
	<view class="feedback-content">
		<view class="item">
			<view class="label">旧密码</view>
			<input type="text" v-model="setData.oldPassworld" placeholder="请输入旧密码 "/>
		</view>
		<view class="item">
			<view class="label">新密码</view>
			<input type="password" class="ui-input" v-model="setData.newPassworld" placeholder="请输入新密码"/>
		</view>
		<view class="item">
			<view class="label">确认新密码</view>
			<input type="password" class="ui-input" v-model="setData.checknewPassworld" placeholder="请确认新密码"/>
		</view>
		<view class="btn" @click="setPws">确定</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
export default {
	data() {
		return {
			setData:{
				customerId: uni.getStorageSync("auth").id,
				oldPassworld:"",
				newPassworld:"",
				checknewPassworld:""
			},
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
		setPws(data){
			if(!this.setData["oldPassworld"]){
				return uni.showToast({
					title:"请输入旧密码",
					icon:"none"
				})
			}
			if(!this.setData["newPassworld"]){
				return uni.showToast({
					title:"请输入新密码",
					icon:"none"
				})
			}
			if(!this.setData["checknewPassworld"]){
				return uni.showToast({
					title:"请输入确认新密码",
					icon:"none"
				})
			}
			if(this.setData["newPassworld"] !== this.setData["checknewPassworld"]){
				return uni.showToast({
					title:"两次密码不一致",
					icon:"none"
				})
			}
			post("/customer/updatePassword",this.setData).then(res=>{
				if(res){
					uni.clearStorageSync("auth");
					uni.navigateTo({
						url:"login"
					})
				}
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

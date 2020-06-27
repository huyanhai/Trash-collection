<template>
	<view class="question-content">
		<image src="../static/img/question-bg.png" class="bg" mode=""></image>
		<view class="box">
			<view class="title">
				<view class="col-left">
					单选题
				</view>
				<view class="col-right">
					<text class="d">{{index >= 10 ? 10 : index + 1}}</text>/{{total}}
				</view>
			</view>
			<view class="container">
				<subject :title="title" :answer="answer" :qid.sync="qid" @select="select"/>
			</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../libs/request.js';
import { checkAuth } from '../libs/checkAuth.js';
import subject from "../components/subject.vue"
export default {
	data() {
		return {
			answer:[],
			title:null,
			subject:[],
			index:0,
			time: 0,
			timer:null,
			total:null, // 题目总数
			userAnswer:[], // 用户答题
			customerId:null,
			isAnswer:false,
			qid:null // 题目id
		};
	},
	onLoad(e) {
		
	},
	onShow(){
		checkAuth();
		this.customerId = uni.getStorageSync("auth").id;
		this.checkAnswer();
	},
	onHide(){
		
	},
	components: {
		subject
	},
	methods: {
		checkAnswer(){
			// 检查是否可以答题
			post("/questionAnsweringRecord/verificationAnswersAcount",{
				customerId: this.customerId
			}).then(res=>{
				console.log(res)
				if(!res){
					this.isAnswer = true;
				}
				this.getData();
			})
		},
		getData(data){
			let _this = this;
			post("/questionbank/getQuestionbankList").then(res=>{
				_this.subject = res.map(item=>{
					return {
						title: item.questions,
						answer: [item.optiona,item.optionb,item.optionc,item.optiond],
						id: item.id
					}
				});
				_this.total = _this.subject.length;
				_this.index = 0;
				_this.setSubject();
				_this.times();
				_this.userAnswer = [];
			})
		},
		submitAnswer(data){
			post("/questionbank/verificationAnswers",data).then(res=>{
				uni.navigateTo({
					url:"complate?time=" + this.time + "&result=" + JSON.stringify(res)
				})
			})
		},
		goPage(path){
			uni.navigateTo({
				url: path
			})
		},
		select(e){
			if(this.isAnswer){
				return uni.showToast({
					title:"今日已答题，请明日在来",
					icon:"none"
				})
			}
			this.index++;
			this.userAnswer.push({
				id: e.id,
				choseoption: e.answer,
				customerId: this.customerId
			})
			console.log(this.userAnswer)
			if(this.index >= this.total) {
				this.submitAnswer(this.userAnswer);
			} else {
				this.setSubject();
			}
		},
		setSubject(){
			this.answer = this.subject[this.index].answer;
			this.title = this.subject[this.index].title;
			this.qid = this.subject[this.index].id;
		},
		times(){
			let _this = this;
			this.time = 0;
			this.timer = setInterval(function(){
				_this.time ++;
			},1000)
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
			flex: 0 0 auto;
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

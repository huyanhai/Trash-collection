import { BASE_URL,TIMEOUT,HEADER } from "../config/index.js"

export function get(url,data) {
	let authCode = String(uni.getStorageSync("authCode"))
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'GET',
			url:BASE_URL + url,
			header:{
				authCode:authCode
			},
			timeout:TIMEOUT,
			success:function(res){
				if(res.data.code !== 0) {
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
				resolve(res.data.result);
			},
			fail:function(err){
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
			complete:function(){
				uni.hideLoading();
			}
		})
	})
}

export function post(url,data) {
	let authCode = String(uni.getStorageSync("authCode"))
	console.log('开始请求post，authCode:',authCode);
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'POST',
			url:BASE_URL + url,
			timeout:TIMEOUT,
			header:{
				authCode:authCode
			},
			data:data,
			success:function(res){
				if(res.data.code !== 0) {
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
				resolve(res.data.result);
			},
			fail:function(err){
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
			complete:function(){
				uni.hideLoading();
			}
		})
	})
}
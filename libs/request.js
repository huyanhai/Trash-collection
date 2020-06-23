import { BASE_URL,TIMEOUT,HEADER } from "../config/index.js"

export function get(url,data) {
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'GET',
			url:BASE_URL + url,
			timeout:TIMEOUT,
			success:function(res){
				uni.hideLoading();
				if(res.data.code !== 0) {
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:3000
					})
					resolve(res.data.result);
				} else {
					resolve(res.data.result || true);
				}
			},
			fail:function(err){
				uni.hideLoading();
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
		})
	})
}

export function post(url,data) {
	return new Promise((resolve, reject)=>{
		uni.showLoading();
		uni.request({
			method: 'POST',
			url:BASE_URL + url,
			timeout:TIMEOUT,
			data:data,
			success:function(res){
				uni.hideLoading();
				if(res.data.code !== 0) {
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:3000
					})
					resolve(res.data.result);
				} else {
					resolve(res.data.result || true);
				}
			},
			fail:function(err){
				uni.hideLoading();
				uni.showToast({
					title:err.msg,
					icon: 'none'
				})
				reject(err);
			},
		})
	})
}
export function checkAuth(){
	let auth = uni.getStorageSync("auth");
	if(!auth) {
		return uni.navigateTo({
			url:"login"
		})
	}
}
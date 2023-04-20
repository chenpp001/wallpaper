const state = {
  member: null, //数据不缓存
  mToken:uni.getStorageSync('member-token') ? uni.getStorageSync('member-token') : null,
  parentId:0,	
  adviserId:0,//员工邀请用户注册的ID
};
const mutations = {
	setParentId(state,param){
		state.parentId = param;
	},
	setAdviserId(state,param){
		state.adviserId = param;
	},
	setMember(state,param){
		state.member = param;
		if(null === param){
			uni.removeStorageSync('member-token');
			state.mToken = null;
		}
	},
	setToken(state,param){
		state.mToken = param;
		uni.setStorageSync('member-token',param);
	},
	
};
export default {
  state,
  mutations
}
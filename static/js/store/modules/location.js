const state = {
	location:{
		lat:31.863433,
		lng:117.292364
	},
	mendianSelectId: null,
	memdianLists:[],
};
const mutations = {
	setLocation(state,param){
		state.location = param;
	},
	setMendianSelectId(state,param){
		state.mendianSelectId = param;
	},
	setMendianLists(state,param){
		state.mendianLists = param;
	}
	
};

export default {
  state,
  mutations
}
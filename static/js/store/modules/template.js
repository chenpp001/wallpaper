const state = {
  tempColor: '#00C657',
  tempColorRbg:{r:0,g:198,b:87}
};
const mutations = {
	setTemp(state,param){
		state.tempColor = param;
	}
};
export default {
    state,
    mutations
}
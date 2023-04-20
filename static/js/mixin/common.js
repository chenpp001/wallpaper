import {statics} from '../statics.js';
import {mapState} from 'vuex';
export const common = {
	data(){
		return {
			statics:statics
		}
	},
	computed:{
		...mapState({
			tempColor:state			=> state.template.tempColor,
			tempColorRgb:state  	=> state.template.tempColorRbg,
			memberToken:state   	=> state.member.mToken,
			latLng:state 			=> state.location.location,
			memberInfo:state   		=> state.member.member,
			adviserId:state 		=> state.member.adviserId,//推广的顾问员
			parentId:state 			=> state.member.parentId, //父推广员ID
			mendianSelectId:state 	=> state.location.mendianSelectId, //当前的门店ID
			memdianLists:state 		=> state.location.memdianLists 
		}),
		checkLogin(){ //验证是否登录
			if(this.memberToken === null) return false;
			if(this.memberInfo == null) return false;
			if(!this.memberInfo.member_id) return false;
			return true;
		},
		getBtnStyle(){
			let style = 'background:'+this.tempColor+';color:#ffffff;';
			style+="box-shadow: 0px "+uni.upx2px(8)+"px "+uni.upx2px(32)+"px -"+uni.upx2px(8)+"px rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.3);";
			return style;
		},
		getBtnDisStyle(){
			let style = 'background:#F0F1F5;color:#AEB2C1;';
			return style;
		},
		getTagStyle(){
			let style = "background:rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.08);";
			style+='color:'+this.tempColor + ';';
			return style;
		},
		getBtnPlanStyle(){
			let style = 'border: 1px solid '+this.tempColor+';';
			style+='color:'+this.tempColor+';';
			return style;
		}
	},
	methods:{
		
	},
}
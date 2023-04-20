import Vue from 'vue'
import App from './App'
import store from './static/js/store/store.js';
import config from './static/js/config.js';
Vue.prototype.$config = config;
import * as http from './static/js/request.js';
Vue.prototype.$http  = http;

import md5 from './static/js/md5.js';
Vue.prototype.$Md5  =  md5;

//权限相关的判断
import {common} from './static/js/mixin/common.js';
Vue.mixin(common);

// 挂载全局方法
import configs from "./common/config.js"
Vue.prototype.configs=configs

// import lib from "./common/lib.js"
// Vue.prototype.lib=lib

import request from "./common/request.js";
Vue.prototype.$httpas = request;


import ZAudio from '@/components/uniapp-zaudio/index.js'
// import ZAudio from 'uniapp-zaudio' // npm引用方式

console.log(`ZAudio当前版本`,ZAudio.version)
let zaudio = new ZAudio({
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
Vue.prototype.$zaudio = zaudio
Vue.prototype.$mbgColor='#ffffff'
//this.$mbgColor
//模拟初始数据
var data = [];
// 设置音频数据
//zaudio.setAudio(data)
//渲染第一首音频
zaudio.setRender(0)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
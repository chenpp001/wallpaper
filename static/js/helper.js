const getDistance = function(lat1, lng1, lat2, lng2) {
	let rad = Math.PI / 180.0;
	var radLat1 = lat1 * rad;
	var radLat2 = lat2 * rad;
	var a = radLat1 - radLat2;
	var b = lng1 * rad - lng2 * rad;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	s = s.toFixed(2); //保留2位小数
	return s;
}

//计算矩形范围，最长角是不对的不过能满足基本需求 半径的单位是M
const getRectangle = function(lat, lng, radius) {
	let deg = 2 * Math.PI * 6378137 / 360.0; //地球周长 每一度的距离 2πR
	let dpmLat = 1 / deg;
	let radiusLat = dpmLat * radius;
	let minLat = lat - radiusLat;
	let maxLat = lat + radiusLat;
	let mpdLng = deg * Math.cos(lat * (3.141592653 / 180))
	let dpmLng = 1 / mpdLng;
	let radiusLng = dpmLng * radius;

	let minLng = lng - radiusLng; // 最小经度
	let maxLng = lng + radiusLng; // 最大经度

	return {
		minLat: minLat,
		maxLat: maxLat,
		minLng: minLng,
		maxLng: maxLng
	};
}


const djsFull = function(t) {
	var d = Math.floor(t / 86400);
	var h = Math.floor(t % 86400 / 3600);
	var m = Math.floor(t % 3600 / 60);
	var s = Math.floor(t % 60);

	return {
		d: this.addzero(d),
		h: this.addzero(h),
		m: this.addzero(m),
		s: this.addzero(s)
	}
}

//m {y:2020,m:8,month:'08'}
const upMonth = function(m){
	let _m = parseInt(m.m) - 1;
	let _y = parseInt(m.y);
	if(_m == 0){
		_y = _y - 1;
		_m = 12;
	}
	return {
		y:_y,
		m:this.addzero(_m)
	}
}
const downMonth = function(m){
	let _m = parseInt(m.m) + 1;
	let _y = parseInt(m.y);
	if(_m == 13){
		_y = _y+1;
		_m = 1;
	}
	return {
		y:_y,
		m:this.addzero(_m)
	}
}

const getTimeArr = function(day) {
	let date1 = new Date();
	let date2 = new Date(date1);
	day = day ? day : 0;
	date2.setDate(date1.getDate() + day);
	let y = date2.getFullYear();
	let m = date2.getMonth() + 1;
	let d = date2.getDate();
	let h = date2.getHours();
	let i = date2.getMinutes();
	let s = date2.getSeconds();
	
	let dt = '上午';
	if(h >=9 && h<=11){
		dt = '上午';
	}else if(h <9 && h>5){
		dt = '早上';
	}else if(h>11 && h<14){
		dt = '中午';
	}else if(h>=14 && h<18){
		dt = '下午';
	}else{
		dt = '晚上';
	}
	let w = date2.getDay();
	switch (w) {
		case 1:
			w = '星期一';
			break;
		case 2:
			w = '星期二';
			break;
		case 3:
			w = '星期三';
			break;
		case 4:
			w = '星期四';
			break;
		case 5:
			w = '星期五';
			break;
		case 6:
			w = '星期六';
			break;
		case 0:
			w = '星期日';
			break;
	}
	return {
		y: y,
		m: this.addzero(m),
		d: this.addzero(d),
		h: this.addzero(h),
		i: this.addzero(i),
		s: this.addzero(s),
		w: w,
		t: dt
	}
}

const datetimeToUnix = function(str) {
	var _arr = str.split(' ');
	var _day = _arr[0].split('-');
	_arr[1] = (_arr[1] == null) ? '0:0:0' : _arr[1];
	var _time = _arr[1].split(':');
	for (var i = _day.length - 1; i >= 0; i--) {
		_day[i] = isNaN(parseInt(_day[i])) ? 0 : parseInt(_day[i]);
	}
	for (var i = _time.length - 1; i >= 0; i--) {
		_time[i] = isNaN(parseInt(_time[i])) ? 0 : parseInt(_time[i]);
	}
	_time[2] = 0;
	var _temp = new Date(_day[0], _day[1] - 1, _day[2], _time[0], _time[1], _time[2]);
	return _temp.getTime() / 1000;
}


const unixToDatetime = function(format, time) {
	var _temp = (time != null) ? new Date(time * 1000) : new Date();
	var _return = '';

	if (/Y-m-d/.test(format)) {
		var _day = [_temp.getFullYear(), this.addzero(1 + _temp.getMonth()), this.addzero(_temp.getDate())];
		_return = _day.join('-');
	}
	if (/H:i:s/.test(format)) {
		var _time = [this.addzero(_temp.getHours()), this.addzero(_temp.getMinutes()), this.addzero(_temp.getSeconds())];
		_return += ' ' + _time.join(':');
	}
	return _return;

}

const addzero = function(i) {
	if (i <= 9) {
		return '0' + i;
	} else {
		return i;
	}
}

export default {
	getDistance,
	getRectangle,
	djsFull,
	getTimeArr,
	datetimeToUnix,
	unixToDatetime,
	addzero,
	upMonth,
	downMonth
}

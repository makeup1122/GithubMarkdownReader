'use strict'
/* eslint-disable*/
const today = new Date()
//data类型转string
Date.prototype.format = function(format)
{
   var o = {
     "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
     "h+" : this.getHours(),   //hour
     "m+" : this.getMinutes(), //minute
     "s+" : this.getSeconds(), //second
     "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
     "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
  (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
      ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}
// const DAY = 1000 * 60 * 60 * 24
export function todayBegin() {
  return today.format('yyyy-MM-dd')
}
export function weekBegin() {
	let day = today.getDay();
	let week = "1234567";
	let first = 0 - week.indexOf(day);
	let thisWeekfirstDay = new Date;
	thisWeekfirstDay.setDate(thisWeekfirstDay.getDate() + first);
	return thisWeekfirstDay.format('yyyy-MM-dd')
}
export function monthBegin() {
  today.setDate(1)
  return today.format('yyyy-MM-dd')
}
export function quarterBegin() {
  // const bb = today
  // return bb.format('yyyy-MM-dd')
}
export function yearBegin() {
  let currentYear=today.getFullYear();
	let bb=new Date(currentYear,0,1);
  return bb.format('yyyy-MM-dd')
}

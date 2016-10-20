;
/*var config={
  askIndexUrl:'http://testopen.api.yaolan.com/api/ask/essence/getbybirth',//首页
  askDetailUrl:'http://testopen.api.yaolan.com/api/ask/getbyid',//问题详情获取问题
  askDetailMurl:'http://testopen.api.yaolan.com/api/ask/allcomment',//问题详情获取更多回复
  askGetHotUrl:'http://testopen.api.yaolan.com/api/ask/getkeywordbybirth',//搜索获取热点词
  askSeacherUrl:'http://testopen.api.yaolan.com/api/ask/search',//搜索内容
  askSubmitUrl:'http://testopen.api.yaolan.com/api/ask/add',//提交问题
  askAgreeUrl:'http://testopen.api.yaolan.com/api/ask/best',//采纳答案
  askMyUrl:'http://testopen.api.yaolan.com/api/ask/myquestion'//采纳答案
};
*/
/*var config={
  askIndexUrl:'http://open.api.yaolan.com/api/ask/essence/getessencebybirth',//首页
  askDetailUrl:'http://open.api.yaolan.com/api/ask/getbyid',//问题详情获取问题
  askDetailMurl:'http://open.api.yaolan.com/api/ask/allcomment',//问题详情获取更多回复
  askGetHotUrl:'http://open.api.yaolan.com/api/ask/getkeywordbybirth',//搜索获取热点词
  askSeacherUrl:'http://open.api.yaolan.com/api/ask/search',//搜索内容
  askSubmitUrl:'http://open.api.yaolan.com/api/ask/add',//提交问题
  askAgreeUrl:'http://open.api.yaolan.com/api/ask/best',//采纳答案
  askMyUrl:'http://open.api.yaolan.com/api/ask/myquestion'//采纳答案
};*/

var config={
  askIndexUrl:'http://open.api.yaolan.com/api/ask/essence/getessencebybirth',//首页
  askDetailUrl:'http://open.api.yaolan.com/api/ask/getbyid',//问题详情获取问题
  askDetailMurl:'http://open.api.yaolan.com/api/ask/allcomment',//问题详情获取更多回复
  askGetHotUrl:'http://open.api.yaolan.com/api/ask/getkeywordbybirth',//搜索获取热点词
  askSeacherUrl:'http://open.api.yaolan.com/api/ask/search',//搜索内容
  askSubmitUrl:'http://open.api.yaolan.com/api/ask/add',//提交问题
  askAgreeUrl:'http://open.api.yaolan.com/api/ask/best',//采纳答案
  askMyUrl:'http://open.api.yaolan.com/api/ask/myquestion',//采纳答案
  expertUrl:'http://open.api.yaolan.com/api/ask/schedulingList',//专家排期
  expertSortUrl:'http://open.api.yaolan.com/api/ask/rankingList',//专家排行
  expertMesUrl:'http://open.api.yaolan.com/api/ask/expertInfo',//专家个人信息
  expertQUrl:'http://open.api.yaolan.com/api/ask/expertAskInfo',//专家个人问答
  expertBestAnsUrl:'http://open.api.yaolan.com/api/ask/bestAnswerQuestionList',//最佳答案
  expertSubmitUrl:'http://open.api.yaolan.com/api/ask/add',//提交问题测试地址
  expertViewUrl:'http://open.api.yaolan.com/api/ask/getview',//获取专家页面浏览次数
  expertDoViewUrl:'http://open.api.yaolan.com/api/ask/doview'//添加专家页面浏览次数
};
var deBugYL=true;
/*
* 智能机浏览器版本信息:
*
*/
var browser = {
	versions: function() {
	var u = navigator.userAgent, app = navigator.appVersion;
	return {//移动终端浏览器版本信息 
	trident: u.indexOf('Trident') > -1, //IE内核
	presto: u.indexOf('Presto') > -1, //opera内核
	webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
	ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
	iPad: u.indexOf('iPad') > -1, //是否iPad
	webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
    
/*
 
if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
	alert('111112222');
	//注册对象 ios系统
	connectWebViewJavascriptBridge(function(bridge){
		alert('444444');
		alert(bridge);
	}); 	
}else*/ 


var bridgeAndroid={
	isEnter:function(callback){
		getBabyBirthday();
		var isEnter=isEnterApp();
		var isEnter=appuser.isEnter();
		callback(isEnter);
	},
	getAppUserId:function(callback){
	
		var isEnter=appuser.isEnter();
		if(isEnter){
			var userId=appuser.getUserIdDes();
			callback(userId);
		}
	},
	goToEnter:function(callback){
	
		appuser.goToEnter();
		callback(true);
	},
	getBabyBirthday:function(callback){
	
		var birthday=appuser.getBirthday();
		callback(birthday);
	},
	exitAppWeb:function(callback){
		appuser.finish();
	},
	setShareMsg:function(source,title, content,
			url,userName,birthday, views,replies,createDate,callback){
				
		appuser.setShareMsgAsk(source,title, content,
			url,userName,birthday, views,replies,createDate);
	},
	openShare:function(callback){
		 appuser.openShare();
	}
};
var bridgeIos={
	//判断是否登录
	isEnter:function(callback){
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			var enter=params['isEnter'];
			if(enter=='false'){
				enter=false;
			}else{
				enter=true;
			}
			callback(enter);
		}
	 	window.ov_gap.invoke("isEnter", null, success, null);	
	},
	//获取用户id
	getAppUserId:function(callback){
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			var userId=params['userId'];
			callback(userId);
		}
	 	window.ov_gap.invoke("getAppUserId", null, success, null);	
	},
	//跳转到登录页面
	goToEnter:function(callback){
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			callback();
		}
	 	window.ov_gap.invoke("goToEnter", null, success, null);	
	},
	//获取宝宝生日
	getBabyBirthday:function(callback){
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			var birthday=params['birthday'];
			callback(birthday);
		}
	 	window.ov_gap.invoke("getBabyBirthday", null, success, null);	
	},
	//退出到App
	exitAppWeb:function(callback){
		//alert('exit');
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			callback();
		}
		//alert(window.ov_gap);
	 	window.ov_gap.invoke("exitAppWeb", null, success, null);	
	},
	//设置问答收藏分享信息
	setShareMsg:function(source,title, content,
			url,userName,birthday, views,replies,createDate,callback){
				
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			
			callback();
		}
		var json={'source':source,'title':title,'content':content,'url':url,'userName':userName,'birthday':birthday,'views':views,'replies':replies,'createDate':createDate};
		//var json='"source":'+source+',"title":'+title+',"content":'+content+',"url":'+url+',"userName":'+userName+',"birthday":'+birthday+',"views":'+views+',"replies":'+replies+',"createDate":'+createDate;
		//alert('111111');
		//alert(json);
	 	window.ov_gap.invoke("setShareMsg",json, success, null);	
	},
	//打开收藏分享原生UI
	openShare:function(callback){
		var success=function(callbackId, params){
			//alert(JSON.stringify(params));
			callback();
		}
	 	window.ov_gap.invoke("openShare", null, success, null);
	}
}


var yl;

if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		//alert('ios');
		yl=bridgeIos;
}else if (browser.versions.android) {
		//alert('android');
		yl=bridgeAndroid;
}
/*
yl.isEnter(function(isEnter){
	alert(isEnter);
});

*/

function getAppUserId(){
	var userId;
	if(appuser.isEnter()){
		userId=appuser.getUserIdDes();
		return userId;
	}else{
		appuser.goToEnter();
	}
	
}
function isEnterApp(){
	//alert('1111111');
	return appuser.isEnter();
}
function getBabyBirthday(){
	//alert('222222');
	var birthday=appuser.getBirthday();
	//alert(birthday);
	return birthday;
}
$('.scrolltop').hide();







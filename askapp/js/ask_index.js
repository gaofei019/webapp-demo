var myScroll,
pullUpEl, pullUpOffset,
generatedCount = 0;
function pullUpAction () {
  if(firstF){
    return false;
  }
  setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!
    getdata();//下拉刷新执行获取问题
    // Remember to refresh when contents are loaded (ie: on ajax completion)
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}
function loaded() {
  pullUpEl = document.getElementById('pullUp');
  pullUpOffset = pullUpEl.offsetHeight;
  myScroll = new iScroll('wrapper', {
    useTransition: false,
    onRefresh: function () {
      if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
      }
    },
    onScrollMove: function () {
      if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放即可加载...';
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
        this.maxScrollY = pullUpOffset;
      }
      /*transition: transform 0ms; -webkit-transition: transform 0ms; transform-origin: 0px 0px 0px; transform: translate(0px, -48px) scale(1) translateZ(0px);*/
    },
    onScrollEnd: function () {
      if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载中...';
        pullUpAction(); // Execute custom function (ajax call?)
      }
      var sVa=$('#scroller').attr('style');
      sVa=sVa.split(',');
      sVa=sVa[1];
      sVa=sVa.split(')');
      var traVal=parseInt(sVa[0]);
      var traWid=document.documentElement.clientHeight;
      if(traVal<-traWid){
        $('.scrolltop').show();
      }else{
        $('.scrolltop').hide();
      }
      //返回顶部end
    }
  });
  setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
//iscroll滚动效果end
yl.isEnter(function(isEnter){
	if(isEnter){
		 yl.getAppUserId(function(userId){
			 var userid=userId;
		});
	}
});
/*
if(isEnterApp()){ 
  var isEnter=isEnterApp();
  var userid=null;
  if(isEnter){
  	var userid=getAppUserId();
  	//alert(userid);
  }
}
*/
//判断是否登陆
/*if(isEnterApp()){
  $('.appEnter').click(function(){
  	var userid=getAppUserId();
  	if(userid){
  		if($(this).hasClass('suser_w')){
  		  window.location.href="ask_myself.html";
  		}
		  if($(this).hasClass('suser_submit')){
  		  window.location.href="ask_submit.html";
  		}
  	}
  });
  var birthday=getBabyBirthday();
}else{
  var birthday='2014-05-10';
  $('.appEnter').click(function(){
    appuser.goToEnter();
  })
}*/

$('.sback').on('click',function(e) {
		/*
        if(appuser){
			appuser.finish();
		}
		*/
		//alert('111111122222222');
		yl.exitAppWeb(function(state){
		});
    //history.back(-1);
}); 
var birthday='';
function appEnter(){
    $('.appEnter').on('click',function(){
  
          var appEnterObject=this;
        yl.isEnter(function(isEnter){
          //alert(isEnter);
        if(isEnter){
          
          yl.getAppUserId(function(userId){
            //alert(userId);
            if(userId){
              // alert(appEnterObject);
               if($(appEnterObject).hasClass('suser_w')){          
                window.location.href="ask_myself.html";
                //return false;
              }
              if($(appEnterObject).hasClass('suser_submit')){
                 window.location.href="ask_submit.html";
                 //return false;
              }
            }
          });
        }else{
          yl.goToEnter(function(){
          });
        }
       });
    });
};


function gotoUrl(url){
	window.location.href="http://tiny.yaolan.com/topic/testapp/askapptestjs/ask_myself.html?";
}
var data = {'birthday':birthday,'page':1,'pagesize':10, 'ft':2,'source':'app'};
//初始化值end
var heih=$('#header').height()+$('.hometop').height();
$('#wrapper').css('top',heih+'px');
//根据首页顶部的高度设置内容容器top
//getdata函数获取问题信息
function getdata(){
  var num=parseInt($('#pagecont>li').length);
  var page=num/10+1,pagesize=10;//根据当前问题数量来设置页数以及加载数量
  //获取用户信息end
	yl.getBabyBirthday(function(birthday){
		birthday=birthday;
		var data = {'birthday':birthday,'page':page,'pagesize':pagesize, 'ft':2,'source':'app'};
		if(navigator.onLine){ 
			ajax.run({'url':config.askIndexUrl, 'type':'get'},data,setdata);
		 }else{
			alert('网络连接不上，请检查');
		 }
	});
 
}
var firstload=false;//设置开关第一次获取问题
var firstF=false;
var setdata =function(r){
  var list=[];
  var expert='';
  var ExpertType='';
  //console.info(r);
  for (var i in r.data){
    babydate=r.data[i].Age >0?r.data[i].Age:'孕期';
    if(r.data[i].Age>0){
      if(r.data[i].Age==0){
        babydate='宝宝'+r.data[i].Month+'个月';
      }else if(r.data[i].Month==0){
        babydate='宝宝'+r.data[i].Age+'岁';
      }else{
        babydate='宝宝'+r.data[i].Age+'岁'+r.data[i].Month+'个月';
      }
    }
    //问题提问者的宝宝信息end
    var person= r.data[i].OperateStatus;
    /*if (person==2){
      expert= '<span>'+ r.data[i].CommentUserName+'</span>';
      // expert= '<span>'+ r.data[i].CommentUserName+'</span><em>|</em><span>'+babydate+'</span>';
    }else */if(person==3){
      if(r.data[i].Title==undefined || r.data[i].Title==''){
        var askTi='';
      }else{
        var askTi='<em>|</em><span>'+r.data[i].Title+'</span>';
      }
      if(r.data[i].ExpertName==undefined || r.data[i].ExpertName==''){
        r.data[i].ExpertName='';
      }
      ExpertType=r.data[i].ExpertType==2?'<span class="da">达</span>':'<span class="zhuan">专</span>';
      expert=ExpertType+'<span>'+r.data[i].ExpertName+'</span>'+askTi;
    }else{
      if(r.data[i].CommentUserName==undefined || r.data[i].CommentUserName==''){
        expert='';
        $('.askbox_au').hide();
      }else{
        expert='<span>'+r.data[i].CommentUserName+'</span>';
      }
    }
    if(person==0){
      var noBest='<div class="askbox" style="display:none;">';
    }else{
      var noBest='<div class="askbox">';
    }
    //专家判断end
    list.push(
      '<li class="homeblo"><a class="clear" href="ask_detail.html?'+r.data[i].QuestionID+'">',//
      '<div class="askbox">',
      '<span class="askno corlan">Q:</span>',
      '<div class="askq">',
      '<h2>',r.data[i].QuestionTitle,'</h2>',
      '<span class="usernam">',r.data[i].UserName,'</span>',
      '<span>',babydate,'</span>',
      '<span class="saypad"><em class="saypic"></em>&nbsp;', r.data[i].CommentCount,'</span>',
      '<span><em class="eyepic"></em>', r.data[i].pv,'</span>',
      '</div>',
      '</div>',
      noBest,
      '<span class="askno corfen">A:</span>',
      '<div class="aska">',
      r.data[i].Comment,
      '<p class="fon13 corfen corfens clear">'+expert+'</p>',
      '</div>',
      '</div>',
      '</a></li>')
  };
  //问题结构end
  $('#pagecont').append(list.join(''));
  //页面插入问题结构end
  if(r.data.length<10){
      $('.pullUpU').hide();
      $('#pullUph').html('没有数据了');
      firstF=true;
  }
  //判断获取的问题条数end
  $('.sask_loading_mask').hide();//遮罩层
  $('.sask_loading').hide();//遮罩小人动画
  if(!firstload){
    firstload=true;
    $('#pullUp').show();
  }
  //设置开关第一次加载end
  myScroll.refresh();//页面插入元素后 重置iscroll效果
}
if(navigator.onLine){ 
    $(function(){
        appEnter();
    });
		yl.getBabyBirthday(function(birthday){
				//alert(birthday);
				birthday=birthday;
				var data = {'birthday':birthday,'page':1,'pagesize':10, 'ft':2,'source':'app'};				
  				ajax.run({'url':config.askIndexUrl, 'type':'get'},data,setdata);
		});
}else{
  alert('网络连接不上，请检查');
}
$('.scrolltop').click(function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
})
//判断网络加载问题end
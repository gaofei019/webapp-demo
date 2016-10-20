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
/*
if(isEnterApp()){ 
  var isEnter=isEnterApp();
  var userid=null;
  if(isEnter){
  	var userid=getAppUserId();
  	alert(userid);
  }
}




var birthday=getBabyBirthday();
$('.appEnter').click(function(){
  if(isEnterApp()){
    var userid=getAppUserId();
    if(userid){
      if($(this).hasClass('suser_w')){
        window.location.href="ask_myself.html";
      }
      if($(this).hasClass('suser_submit')){
        window.location.href="ask_submit.html";
      }
    }
  }else{
    getAppUserId();
  }
})*/


//获取用户信息end*/

var data = {'page':1};
//初始化值end

var heih=$('#header').height()+$('.hometop').height(),
    $sBack = $('#sBack');
$('#wrapper').css('top',heih+'px');
//根据首页顶部的高度设置内容容器top
$sBack.on('click',function(){
    history.back(-1);
    /*yl.exitAppWeb(function(state){
    });*/
});
function appEnter(){
    $('.appEnter').on('click',function(){
          var appEnterObject=this;
          yl.isEnter(function(isEnter){
         // alert(isEnter);
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

function appLinkEnter(){
   $('#textBespeakList').on('click','.appLinkEnter',function(){
        var appEnterObject=this,
            selfUrl;
        yl.isEnter(function(isEnter){
         // alert(isEnter);
          if(isEnter){
            yl.getAppUserId(function(userId){
              //alert(userId);
              if(userId){
                // alert(appEnterObject); 
                  selfUrl = $(appEnterObject).attr('data-url');        
                  window.location.href=selfUrl;
                  //return false;
              }
            });
          }else{
            yl.goToEnter(function(){
            });
          }
       });
    });
};
    
//判断是否为苹果设备,如果是把定时器的盒子隐藏
var isApple = browser.versions.ios || browser.versions.iPhone || browser.versions.iPad;

function newTimeDate(obj,startDate,endDate){
          var timeSet = null,
              oNum = 60,
              timer,
              endTime = new Date(endDate),
              startTime = new Date(startDate);
              //console.log(endDate);
          function oMallTime(){
            var newTime = new Date(),
                time = startTime.getTime() - newTime.getTime(),
                bTime = endTime.getTime() - newTime.getTime();
              if( time > 0 ){
                  //if(isApple){
                  //    obj.addClass('btn-bespeak-coming').html('特约即将开始');
                 // }else{
                      var oDay = parseInt(time/1000/60/60/24),
                        oHour= parseInt(time/1000/60/60%24),
                        oMin = parseInt(time/1000/60%60),
                        oSec = parseInt(time/1000%60),
                        strHtml = '<span class="new-day"></span>天<span class="new-hour"></span>小时<span class="new-min"></span>分<span class="new-sec"></span>秒后开始';
                      obj.html(strHtml);
                      obj.find('.new-day').text(oDay);
                      if( oHour < 10 ){
                          obj.find('.new-hour').text('0' + oHour );
                      }else{
                          obj.find('.new-hour').text( oHour );
                      }
                      if( oMin < 10 ){
                          obj.find('.new-min').text('0' + oMin );
                      }else{
                          obj.find('.new-min').text( oMin );
                      }
                      if( oSec < 10 ){
                          obj.find('.new-sec').text('0' + oSec );
                      }else{
                          obj.find('.new-sec').text( oSec );
                      }
                  //}
                  
              }else if( bTime > 0 ){
                  /*var bTime = endTime.getTime() - newTime.getTime();
                  console.log(bTime);*/
                  obj.addClass('btn-bespeak-come').html('特约进行中');
              }else{
                  obj.html('特约已经结束');
              }
          }
          clearInterval(timer);
          timer = setInterval(oMallTime,1000);
          
};




//getdata函数获取问题信息
function getdata(){
  var $textBespeakList = $('#textBespeakList'),
      $tbs = $textBespeakList.find('div.text-bespeak'), 
      len = $tbs.length,
      num=parseInt(len),
      page=num/10+1,pagesize=10,//根据当前问题数量来设置页数以及加载数量
      data = {'page':page};
      //console.log(page);
  /*var num=parseInt($('#textBespeakList > div').length);
  var page=num/10+1,pagesize=10;//根据当前问题数量来设置页数以及加载数量
  var data = {'page':page,'pagesize':pagesize};*/
  if(navigator.onLine){ 
    var tblBoxDom = '<div class="tbl-box"></div>';
    $textBespeakList.append(tblBoxDom);
    ajax.run({'url':config.expertUrl, 'type':'get'},data,setdata);
    $(function(){
        appLinkEnter();
    });
  }else{
    alert('网络连接不上，请检查');
  }
}
var firstload=false;//设置开关第一次获取问题
var firstF=false;
var setdata =function(r){
  //var list=[];
  //var expert='';
  //var ExpertType='';
  //console.info(r.data.list[0]);
  //console.log(r);
  var qData = r.data,
      qList = qData.list,
      curTime = qData.curtime,
      qListLen = 0,
      ListArr = [],
      ListHtml = '',
      $tblBox = $('div.tbl-box'),
      $textBespeakList = $('#textBespeakList'),
      bLen = $tblBox.length,
      qUnitHtml = [],
      qUnitStr = '',
      Pic = '',
      expertid = 0,
      themeContent = '',
      expertName = '',
      Title = '',
      Field = '',
      startTime = '',
      endTime = '',
      now = 0,
      btnBespeakDom,
      sliceEndTime;
      if(qList){
          qListLen = qList.length;
          if(qListLen){
              for(var i=0;i<qListLen;i++){
                  themeContent = qList[i].theme_content;
                  Pic = qList[i].Pic;
                  expertName = qList[i].expert_name;
                  expertid = qList[i].expertid;
                  Title = qList[i].Title;
                  Field = qList[i].Field;
                  startTime = qList[i].start_time;
                  endTime = qList[i].end_time;
                  sliceEndTime = endTime.split(' ')[1];
                  qUnitHtml = [
                      '<div class="text-bespeak">',
                          '<h3>' + themeContent + '</h3>',
                          '<div class="test-bespeak spr clear">',
                              '<a href="ask_expert_ans.html?'+expertid+'" class="test-img"><img src="' + Pic + '"></a>',
                              '<a href="ask_expert_ans.html?'+expertid+'" class="bespeak-mes">',
                                  '<h4><em>' + expertName + '</em>' + Title + '</h4>',
                                  '<p><em>擅长：</em>' + Field + '</p>',
                                  '<p><em>时间：</em><time><i class="start-time">' + startTime + '</i>&nbsp;-&nbsp;<i class="end-time">' + sliceEndTime + '</i></time></p>',
                              '</a>',
                              '<div class="btn-bespeak-box '+(isApple?'hidden':'')+'">',
                                  '<em class="btn-bespeak">',
                                      '加载中...',
                                  '</em>',
                              '</div>',
                              '<a href="javascript:;" data-url="ask_expert_submit.html?'+expertid+'&'+expertName+'" class="btn-q appLinkEnter">提&nbsp;&nbsp;问</a>',
                          '</div>',
                      '</div>'
                  ];
                  //console.log(startTime+''+endTime);
                  qUnitStr = qUnitHtml.join('');
                  ListArr.push(qUnitStr);
              }
              ListHtml = ListArr.join('');
              now = bLen - 1;

              //console.log(ListHtml);

              $tblBox[now].innerHTML=ListHtml;

              /*for(var i=0;i<qListLen;i++){
                  startTime = qList[i].start_time;
                  endTime = qList[i].end_time;
                  btnBespeakDom = $($tblBox[now]).find('em.btn-bespeak').eq(i);
                  newTimeDate(btnBespeakDom,startTime,endTime);
              }*/

              var $tbs = $textBespeakList.find('div.text-bespeak'), 
                  tbsLen = $tbs.length,
                  $thisTbs;
              for(var i = 0;i<tbsLen;i++){
                  $thisTbs = $tbs.eq(i);
                  startTime = $thisTbs.find('i.start-time').text();
                  yearDate = startTime.split(' ')[0];
                  endTime = yearDate+' '+$thisTbs.find('i.end-time').text();
                  btnBespeakDom = $thisTbs.find('em.btn-bespeak');
                  newTimeDate(btnBespeakDom,startTime,endTime);
              }

          }
          if(qListLen<10){
              $('.pullUpU').hide();
              $('#pullUph').text('没有数据了');
              firstF=true;
          }
          //判断获取的问题条数end
          if(!firstload){
            firstload=true;
            $('#pullUp').show();
          }
          //设置开关第一次加载end
      }
  /*for (var i in r.data.list){
    list.push(
      '<div class="text-bespeak">',
      '<h3>' + r.data.list[i].theme_content + '</h3>',
      '<div class="test-bespeak spr clear">',
      '<span class="test-img"><img src="' + r.data.list[i].Pic + '"></span>',
      '<div class="bespeak-mes">',
      '<h4><em>' + r.data.list[i].expert_name + '</em>' + r.data.list[i].Title + '</h4>',
      '<p><em>擅长：</em>' + r.data.list[i].Field + '</p>',
      '<p><em>特约时间：</em><time>' + r.data.list[i].start_time + '&nbsp;-&nbsp;' + r.data.list[i].end_time + '</time></p>',
      '<a href="javascript:;" class="btn-bespeak">',
      '<span class="new-day"></span>天<span class="new-hour"></span>小时<span class="new-min"></span>分<span class="new-sec"></span>秒后开始',
      '</a>',
      '</div>',
      '<a href="" class="btn-q">提问</a>',
      '</div>',
      '</div>'
    )
  };
  //问题结构end
  $('#textBespeakList').append(list.join(''));
  for (var i in r.data.list){
    newTimeDate($('.btn-bespeak').eq(i),r.data.list[i].start_time,r.data.list[i].end_time);
      
  }*/




  //页面插入问题结构end
  
  $('.sask_loading_mask').hide();//遮罩层
  $('.sask_loading').hide();//遮罩小人动画
  myScroll.refresh();//页面插入元素后 重置iscroll效果
}

if(navigator.onLine){
  ajax.run({'url': config.expertUrl, 'type':'get'},data,setdata);
  $(function(){
      appEnter();
      appLinkEnter();
  });
  
}else{
  alert('网络连接不上，请检查');
}

$('.scrolltop').off('click');
$('.scrolltop').on('click',function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
});
//判断网络加载问题end
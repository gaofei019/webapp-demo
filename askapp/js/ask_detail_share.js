//TODO
var myScroll,
  pullUpEl, pullUpOffset,
  generatedCount = 0;
function pullUpAction(){
  if(firstF){
    return false;
  };
  setTimeout(function(){  // <-- Simulate network congestion, remove setTimeout from production!
   squestionAn(getQuesId);//下拉刷新执行获取回复数
  }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}
function pullDownAction () {
  setTimeout(function () {  // <-- Simulate network congestion, remove setTimeout from production!
    myScroll.refresh();   // Remember to refresh when contents are loaded (ie: on ajax completion)
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
    },
    onScrollEnd: function () {
      if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载中...';        
        pullUpAction(); // Execute custom function (ajax call?)
      }else{
        pullDownAction();
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
    }
  });
  setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
//iscroll滚动效果end
//var getUserid=getAppUserId();
//获取用户end
var locaHref=window.location.href;
locaHref=locaHref.split("?");
var getQuesId=locaHref[1].split('&')[0];//根据当前地址获取问题id
//alert(getQuesId);
//console.log(getQuesId);
//初始化值end
/*if(navigator.onLine){ */
  ajax.run({url:config.askDetailUrl},{qid:getQuesId,source:'app',getbest:true},squestionLast);
/*}else{
  alert('网络连接不上，请检查');
  return false;
}*/
//默认加载获取问题的详情end
var bestAn=false;//设置开关 作用是当前问题id和用户访问id一样时 是true
var reFirst=false;//设置开关 作用是区别回复列表默认第一次加载
var firstF=false;
var reNumb=1;//设置默认页数是第一页
//squestionLast函数获取问题信息
function squestionLast(r){
  var qTi=r.data;
  var qBe=qTi.BestInfo;
  var questionT=[];
  //初始赋值end
  //针对审核问题 跳转审核页面
  //console.info(r);
  if(qTi.Age==0){
    if(qTi.Month==0){
      askBaby='<em>没有宝宝</em>';
    }else{
      askBaby='<em>'+qTi.Month+'月</em>';
    }
  }else if(qTi.Age<0){
    askBaby='<em>孕期</em>';
  }else{
    if(qTi.Month==0){
      askBaby='<em>宝宝'+qTi.Age+'周</em>';
    }else{
      askBaby='<em>宝宝'+qTi.Age+'周'+qTi.Month+'月</em>';
    }
  }
  //问题提问者的宝宝信息end
  if(qTi.pv==null){
    askView='<span>0</span></dd>';
  }else{
    askView='<span>'+qTi.pv+'</span></dd>';
  }
  //当前问题的访问数end
  if(qTi.CommentCount==0){
    askComment='<div class="sask_re">当前还没有回答</div>';
    $('.sanswer_list_w').remove();//回复容器div删除
    $('#pullUp').remove();//删除下拉刷新容器
  }else{
    qTi.CommentCount=qTi.CommentCount>10?'10+':qTi.CommentCount;
    askComment='<div class="sask_re sask_re_left"><em>'+qTi.CommentCount+'</em>条回答</div>';
  }
  //当前问题的回答数判断end
  //设置开关 判断当前问题id和用户访问id
  questionT=[
    '<dl class="sask_dl">',
    '<dt>'+qTi.QuestionTitle+'</dt>',
    '<dd class="sask_detail">'+qTi.QuestionDesc+'</dd>',
    '<dd class="sask_userIn clear"><em>'+qTi.UserName+'</em>'+askBaby+'<em>'+qTi.ShowCreateTime+'</em>'+askView+askComment
  ];
 // alert(qTi.QuestionTitle);
 // alert(qTi.QuestionDesc);
 // alert(locaHref);
 //获取用户end
  //问题详情题目的结构end
  //console.log(qTi.ShowAnswerTime);
  if(qBe.ShowCreateTime==undefined){
    qBe.ShowCreateTime='';
  }
  if(qBe.ShowCommentTime==undefined){
    qBe.ShowCommentTime='';
  }
  if(qTi.BestInfo!==undefined){
    var questionB=[];
    if(qTi.OperateStatus==3){
      if(qTi.ExpertType==2){
        var qtiE='<em>达</em>';
      }else{
        var qtiE='<em>专</em>';
      }
      if(qBe.Title==undefined || qBe.Title==''){
        var askTi='';
      }else{
        var askTi='<b>|</b><i>'+qBe.Title+'</i>';
      }
      var askRex='<p class="sanswer_auther clear">'+qBe.ShowCommentTime+'<span>'+qtiE+qBe.ExpertName+askTi+'</span>';
    }else if(qTi.OperateStatus==2){
      var askRex='<p class="sanswer_auther clear">'+qBe.ShowCommentTime+'<span>'+qBe.CommentUserName+'</span>';
    }
    questionB=[
      '<li class="sanswer_list_h">', 
      '<div class="sanswer_list">',
      '<p class="sanswer_re_con clear">'+qBe.Comment+'</p>',
      '<p class="sanswer_re_con_b clear"><span>最佳答案</span></p>'+askRex+'</p></div></li>'
      ]
    $('.sanswer_list_w').html(questionB.join(''));
  }
  $('.sask_title').html(questionT.join(''));
  //问题最佳答案end
}
if(locaHref[2]=='submit' || $('.sask_re_left em').html()>0){
  //console.log(locaHref[2]);
}else{
  squestionAn(getQuesId);
}
//根据当前地址判断是否从提问页面过来以及根据回答数来判断是否执行下面的回复函数end
//squestionAn获取问题回复数量
function squestionAn(questionID){
  if(!navigator.onLine){ 
    alert('网络连接不上，请检查');
    return false;
  }
  //判断网络end
  $.ajax({
    type: 'GET',
    url: config.askDetailMurl,//获取回复数据
    dataType: 'jsonp',
    data:{qid:getQuesId,page:reNumb,pagesize:10},
    success: function(t){
      var arrRe=t.data;
      //console.info(t);
      var arrRea=[];
      //初始值end
      if(t.code){//t.code为true 则有回复数据 反之没有数据
        for(var j=0;j<arrRe.length;j++){
          if(arrRe[j].Type==3){
            var peoUser=arrRe[j].ExpertInfo;
            if(peoUser.Title!==undefined || peoUser.Title==""){
              var askTi='<b>|</b><i>'+peoUser.Title+'</i>';
            }else{
              var askTi='';
            }
            if(peoUser.ExpertType==2){
              arrExp='<span><em>达</em><i>'+peoUser.ExpertName+'</i>'+askTi+'</span>';
            }else{
              arrExp='<span><em>专</em><i>'+peoUser.ExpertName+'</i>'+askTi+'</span>';
            }
          }else{
            var peoUser=arrRe[j].UserInfo;
            if(arrRe[j].UserInfo==undefined){
              arrExp='<span></span>';
            }else{
              arrExp='<span>'+peoUser.CommentUserName+'</span>';
            }
          }
          //专家判断end
          //根据当前问题提问者和访问者的id是否一样 以及是否存在最佳答案显示采纳答案end
          arrRea.push(
            '<li> ', 
            '<div class="sanswer_list">',
            '<p class="sanswer_re_con clear">'+arrRe[j].AnswerContent+'</p>',
            '<p class="sanswer_auther clear">'+arrRe[j].ShowAnswerTime+arrExp+'</p>',
            '</div>',
            '</li>'
          );
          //回复结构end
        }
        //for循环回复数end
        $('.sanswer_list_w').append(arrRea.join(''));//页面中插入回复结构
        $('#pullUp').show();//下拉刷新容器显示
        $('.sask_loading_mask').hide();//遮罩层
        $('.sask_loading').hide();//遮罩小人动画
        if(arrRe.length<10){
          $('.pullUpU').hide();
          $('#pullUph').html('没有数据了');
        }
        //判断获取的问题条数end
        reNumb++;//页数累加设置
        reFirst=true;//第一次加载开关设置
        myScroll.refresh();//页面插入元素后 重置iscroll效果
      }else{
        $('.sask_loading_mask').hide();//遮罩层
        $('.sask_loading').hide();//遮罩小人动画
        if(!reFirst){
          $('#pullUp').html();
          /*myScroll.refresh();*/
          //判断第一次开始加载回复函数且没有数据情况
        }else{
          if(t.msg=='问题不存在！'){
            return false;
          }else{
            $('#pullUp').show();
            $('.pullUpU').hide();
            $('#pullUph').show().html('没有数据了');
          }
          //判断当加载没有数据的时候显示没有数据了
        }
        firstF=true;
      }
    },
    error: function(xhr, type){
      alert('加载失败!')
    }
  })
}
$('.scrolltop').click(function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
})
//返回顶部end
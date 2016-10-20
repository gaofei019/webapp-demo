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
};
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
};
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
})

//获取用户信息end
*/
var locaHref=window.location.href,
    $btnQuiz = $('#btnQuiz'),
    $sBack = $('#sBack');
locaHref = decodeURIComponent(locaHref);
locaHref=locaHref.split("?");
var getExpertId=locaHref[1].split('&')[0],//根据当前地址获取专家id
    getExpertName = locaHref[1].split('&')[1]; //根据当前地址获取专家名字

//console.log(getExpertId);
/*$sBack.on('click',function(){
    history.back(-1);
});*/
if($sBack[0]){
    $sBack[0].href = "ask_expert_mes.html?"+getExpertId;
}
//var data = {'page':1,'expertid':'12040614042162f2385e','flag':1};
var data = {'page':1,'expertid':getExpertId};
//初始化值end

var heih=$('#header').height()+$('.hometop').height();
$('#wrapper').css('top',heih+'px');
//根据首页顶部的高度设置内容容器top

//getdata函数获取问题信息
function getdata(){
  var $boxQaList = $('#boxQaList'),
      $boxQa = $('#boxQaList').find('div.box-qa'), 
      len = $boxQa.length,
      num=parseInt(len),
      page=num/10+1,pagesize=10,//根据当前问题数量来设置页数以及加载数量
      data = {'page':page,'expertid':getExpertId};
  if(navigator.onLine){
    var boxQaBoxDom = '<div class="box-qa-box"></div>';
    $boxQaList.append(boxQaBoxDom);
    ajax.run({'url':config.expertBestAnsUrl, 'type':'get'},data,setdata);
  }else{
    alert('网络连接不上，请检查');
  }
};
var firstload=false;//设置开关第一次获取问题
var firstF=false;
var setdata =function(r){
  //console.log(r);
  var qList = r.data,
      qListLen = 0,
      ListArr = [],
      ListHtml = '',
      $boxQaBox = $('div.box-qa-box'),
      $boxQaList = $('#boxQaList'),
      $boxQaNone = $('#boxQaNone'),
      bLen = $boxQaBox.length,
      qUnitHtml = [],
      qUnitStr = '',
      CommentCount = '',
      QuestionTitle = '',
      UserName = '',
      now = 0,
      AnswerContent = '',
      Age = 0,
      Month = 0,
      babydate = '',
      QuestionID = 0,
      PeriodID = 0,
      pv = 0,
      thisInfo;
      if($btnQuiz[0]){
          $btnQuiz[0].href = 'ask_expert_submit.html?' + getExpertId +'&' + getExpertName;
      }

    if(qList){
        qListLen = qList.length;
        if(qListLen){
            $boxQaNone.addClass('hidden');
            $boxQaList.removeClass('hidden');
            for(var i=0;i<qListLen;i++){
                thisInfo = qList[i].thisInfo;
                CommentCount = qList[i].CommentCount;
                QuestionDesc = qList[i].QuestionDesc;
                UserName = qList[i].UserName;
                //AnswerContent = qList[i].ExpertAnswer;
                AnswerContent = thisInfo.AnswerContent;
                Age = qList[i].Age;
                Month = qList[i].Month;
                QuestionID = qList[i].QuestionID;
                PeriodID = qList[i].PeriodID;
                pv = qList[i].pv;
                QuestionTitle = qList[i].QuestionTitle;
                if(Age>=0){
                    if(Age==0){
                      babydate='宝宝'+Month+'个月';
                    }else if(Month==0){
                      babydate='宝宝'+Age+'周';
                    }else{
                      babydate='宝宝'+Age+'周'+Month+'个月';
                    }
                }else{
                    switch (PeriodID){
                      case -2:
                        babydate = '备孕';
                        break;
                      case -1:
                        babydate = '怀孕';
                        break;
                    }
                }
                qUnitHtml = [
                              '<div class="box-qa">',
                                  '<div class="box-q clear">',
                                      '<span class="qa-type-q">Q：</span>',
                                      '<h4><a href="ask_detail.html?'+QuestionID+'">'+QuestionTitle+'</a></h4>',
                                      '<p class="cite clear">',
                                        '<i class="icon-qa-check">'+pv+'</i>',
                                        '<i class="icon-qa-comment">'+CommentCount+'</i>',
                                        '<span>'+UserName+' '+babydate+'</span>',
                                      '</p>',
                                  '</div>',
                                  '<div class="box-a clear '+(AnswerContent?'':'hidden')+'">',
                                      '<span class="qa-type-a">A：</span>',
                                      '<p><a href="ask_detail.html?'+QuestionID+'">'+AnswerContent+'</a></p>',
                                  '</div>',
                              '</div>'
                          ];
                qUnitStr = qUnitHtml.join('');
                ListArr.push(qUnitStr);
            }
            ListHtml = ListArr.join('');

            now = bLen-1;

            $boxQaBox[now].innerHTML = ListHtml;
        }else{
            $boxQaNone.removeClass('hidden');
            $boxQaList.addClass('hidden');
            //$btnQuiz[0].href = 'ask_expert_submit.html?' + getExpertId +'&' + getExpertName;
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

    

  //问题结构end

  //页面插入问题结构end

  $('a.appExpCollect').on('click',function(){
      var cdata = {};
  });
  
  $('.sask_loading_mask').hide();//遮罩层
  $('.sask_loading').hide();//遮罩小人动画
  myScroll.refresh();//页面插入元素后 重置iscroll效果
};

if(navigator.onLine){
  ajax.run({'url': config.expertBestAnsUrl, 'type':'get'},data,setdata);
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
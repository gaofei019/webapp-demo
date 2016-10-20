var myScroll,
pullUpEl, pullUpOffset,
generatedCount = 0;
function pullUpAction () {
    if(firstF){
      return false;
    }
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

/*if(isEnterApp()){ 
  var isEnter=isEnterApp();
  var userid=null;
  if(isEnter){
  	var userid=getAppUserId();
  	//alert(userid);
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

var data = {'birthday':birthday,'page':1,'pagesize':10, 'ft':2,'source':'app'};
//初始化值end
*/
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
        yl.getBabyBirthday(function(birthday){
           birthday=birthday;
        });
      });
    }else{
      yl.goToEnter(function(){
      });
    }
   });
});
var locaHref=window.location.href,
    $sBack = $('#sBack'),
    $btnQuiz = $('#btnQuiz'),
    $mesAnswerCountLink = $('#mesAnswerCountLink'),
    $mesBestAnswerCountLink = $('#mesBestAnswerCountLink'),
    $mesPV = $('#mesPV');
locaHref=locaHref.split("?");
var getExpertId=locaHref[1].split('&')[0];//根据当前地址获取专家id
$mesAnswerCountLink[0].href = 'ask_expert_wholeans.html?'+ getExpertId;
//console.log(getExpertId);
$sBack.on('click',function(){
    history.back(-1);
});

var heih=$('#header').height()+$('.hometop').height();
$('#wrapper').css('top',heih+'px');
//根据首页顶部的高度设置内容容器top
//getdata函数获取专家个人信息
var firstload=false,//设置开关第一次获取问题
    firstF=false,
    expertData = {};//收藏专家信息初始化
var setdata =function(r){
  //console.log(r);
    var mesData = r.data,
        mesPic = mesData.Pic,
        mesExpertName = mesData.ExpertName,
        mesIntroduce = mesData.Introduce,
        mesTitle = mesData.Title,
        mesField = mesData.Field,
        mesTotalInfo = mesData.TotalInfo,
        mesAnswerCount = mesTotalInfo.AnswerCount ? mesTotalInfo.AnswerCount:0,
        mesBestAnswerCount = mesTotalInfo.BestAnswerCount ? mesTotalInfo.BestAnswerCount:0,
        $mesPic = $('#mesPic'),
        $mesExpertName = $('#mesExpertName'),
        $mesIntroduce = $('#mesIntroduce'),
        $mesTitle = $('#mesTitle'),
        $mesField = $('#mesField'),
        $mesAnswerCount = $('#mesAnswerCount'),
        $mesBestAnswerCount = $('#mesBestAnswerCount'),
        $mesFullIntroduce = $('#mesFullIntroduce');

        
    $mesPic.attr('src',mesPic);
    $mesExpertName.text(mesExpertName);
    $mesIntroduce.text(mesIntroduce);
    $mesTitle.text(mesTitle);
    $mesField.text(mesField);
    $mesAnswerCount.text(mesAnswerCount);
    $mesBestAnswerCount.text(mesBestAnswerCount);
    $mesFullIntroduce.text(mesIntroduce);
    expertData = {//收藏专家信息
        Pic : mesPic,
        ExpertName : mesExpertName,
        Introduce : mesIntroduce,
        Title : mesTitle,
        Field : mesField,
        ExpertID : mesData.ExpertID,
        ExpertUrl : window.location.href
    };
    $btnQuiz.on('click',function(){
        yl.isEnter(function(isEnter){
            if(isEnter){
              yl.getAppUserId(function(userId){
                
                if(userId){
                    window.location.href='ask_expert_submit.html?' + getExpertId +'&' + mesExpertName;
                }
                
              });
            }else{
              yl.goToEnter(function(){
              });
            }
        });
        //window.location.href='ask_expert_submit.html?' + getExpertId +'&' + mesExpertName;
    });
    //$btnQuiz[0].href = 'ask_expert_submit.html?' + getExpertId +'&' + mesExpertName;
    $mesBestAnswerCountLink[0].href = 'ask_expert_bestans.html?' + getExpertId +'&' + mesExpertName;
    $('.sask_loading_mask').hide();//遮罩层
    $('.sask_loading').hide();//遮罩小人动画
    //设置开关第一次加载end
   // myScroll.refresh();//页面插入元素后 重置iscroll效果
};
var setViewData = function(r){
    var pv = r.data;
    $mesPV.text(pv);
};
var doViewData = function(r){};
function getdata(){
    var data = {'expertid':getExpertId,'flag':1},
        vdata = {'code':getExpertId,'type':2};
    if(navigator.onLine){ 
      ajax.run({'url': config.expertDoViewUrl, 'type':'get'},vdata,doViewData);
      ajax.run({'url':config.expertMesUrl, 'type':'get'},data,setdata);
      ajax.run({'url': config.expertViewUrl, 'type':'get'},vdata,setViewData);
      /* 收藏专家功能 */
      /*var appExpCollect = $('a.appExpCollect');
      yl.isCollect(function(isCollect){
          if(isCollect){
              appExpCollect.addClass('hcollect_w');
              appExpCollect.off('click');
          }else{
              appExpCollect.removeClass('hcollect_w');
              appExpCollect.on('click',function(){
                  yl.collect(expertData,function(result){
                  });
              });
          }
      });*/
    }else{
      alert('网络连接不上，请检查');
    }
};
$('.scrolltop').off('click');
$('.scrolltop').on('click',function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
});
//判断网络加载问题end
$(function(){
    getdata(); //执行调用数据方法;
});
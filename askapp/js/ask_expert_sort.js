var myScroll,
pullUpEl, pullUpOffset,
generatedCount = 0;
function pullUpAction () {
  if(firstF){
    return false;
  }
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
})

//获取用户信息end*/

var data = {size:10};
//初始化值end


var heih=$('#header').height()+$('.hometop').height();
$('#wrapper').css('top',heih+'px');
//根据首页顶部的高度设置内容容器top

var $sBack = $('#sBack');

$sBack.on('click',function(){
    history.back(-1);
});




//getdata函数获取问题信息
/*function getdata(){
  var num=parseInt($('#textBespeakList > div').length);
  var page=num/10+1,pagesize=10;//根据当前问题数量来设置页数以及加载数量
  var data = {'birthday':birthday,'page':page,'pagesize':pagesize, 'ft':2,'source':'app'};
  if(navigator.onLine){ 
    ajax.run({'url':config.expertSortUrl, 'type':'get'},data,setdata);
  }else{
    alert('网络连接不上，请检查');
  }
}*/
var firstload=false;//设置开关第一次获取问题
var firstF=false;
var setdata =function(r){
  var list=[],
      expert='',
      ExpertType='',
      listStr = ''
  //console.info(r.data[0]);
  for (var i in r.data){
    list.push(
      '<a href="ask_expert_ans.html?'+r.data[i].ExpertID+'" class="text-bespeak">',
          '<div class="test-bespeak spr clear">',
              '<span class="test-img"><img src="' + r.data[i].Pic + '"></span>',
              '<div class="bespeak-mes">',
                  '<h4><em>' + r.data[i].ExpertName + '</em>' + r.data[i].Title + '</h4>',
                  '<p>',
                  '<em>当月解答：</em><span>' + r.data[i].CurrAnswerCount + '</span>',
                  '<em>总解答：</em><span>' + r.data[i].TotalInfo.AnswerCount + '</span>',
                  '</p>',
              '</div>',
              '<i class="sort">' + (parseInt(i)+1) + '</i>',
          '</div>',
      '</a>'
    )
  };
  //问题结构end
  listStr = list.join('');
  $('#expertSort')[0].innerHTML = listStr;



  //页面插入问题结构end
  /*if(r.data.length<10){
      $('.pullUpU').hide();
      $('#pullUph').html('没有数据了');
      firstF=true;
  }*/
  //判断获取的问题条数end
  $('.sask_loading_mask').hide();//遮罩层
  $('.sask_loading').hide();//遮罩小人动画
  /*if(!firstload){
    firstload=true;
    $('#pullUp').show();
  }
  //设置开关第一次加载end
  myScroll.refresh();//页面插入元素后 重置iscroll效果*/
}

if(navigator.onLine){
  ajax.run({'url': config.expertSortUrl, 'type':'get'},data,setdata);
}else{
  alert('网络连接不上，请检查');
}

$('.scrolltop').off('click');
$('.scrolltop').on('click',function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
})
//判断网络加载问题end
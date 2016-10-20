//TODO
//alert('222222222222222222');
var myScroll,
  pullUpEl, pullUpOffset,
  generatedCount = 0;
function pullUpAction(){
  if(firstF){
    return false;
  }
  setTimeout(function(){  // <-- Simulate network congestion, remove setTimeout from production!
    squestionAn(userid);
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
$('#sBack').on('click',function(){
    history.back(-1);
});
var firstF=false;
var userid;
//获取用户end
var reNumb=1;//设置默认页数是第一页
var reFirst=false;//设置开关 作用是区别回复列表默认第一次加载
//alert('1111111111');
yl.getAppUserId(function(userId){
	//alert(userId);
	userid=userId;
	squestionAn(userid);
});

function squestionAn(suserId){
  if(!navigator.onLine){
    alert('网络连接不上，请检查');
    return false;
  }
  //判断网络end
  $.ajax({
    type: 'GET',
    url: config.askMyUrl,
    dataType: 'jsonp',
    data:{userid:userid,page:reNumb,pagesize:10},
    success: function(t){
      var arrRe=t.data;
      //console.info(t);
      var arrRea=[];
      //t.code=false;
      if(!reFirst){
        if(!t.code){
          var seacherCon=[];
          seacherCon.push(
            '<div class="sask_nothing sask_nothing_m">',
            '<a href="ask_submit.html">马上提问</a>',
            '</div>');
          $('.myques_w').html(seacherCon.join(''));
		  $('.sask_loading_mask').hide();//遮罩层
        $('.sask_loading').hide();//遮罩小人动
          return false;
        }
      }
      //判断第一次是否有我的问题 没有的话显示马上提问end
      if(arrRe.length>0){
		
        for(var j=0;j<arrRe.length;j++){
		 	//alert(arrRe.OperateStatus);
			/*
          if(arrRe[j].OperateStatus=='2'){
              var solve='已解决 OperateStatus==2';
          }else if(arrRe[j].OperateStatus=='3'){
              var solve='已解决 OperateStatus==3';
          }else{
              var solve='未解决 OperateStatus ==';
          }*/
		  if( arrRe[j].OperateStatus == 0 ){
            var solve='未解决';
          }else{
            var solve='已解决';
          }
          arrRea.push(
              '<div class="myques_c"><a href="ask_detail.html?'+arrRe[j].QuestionID+'">'+
              '<h2 class="mytit">'+arrRe[j].QuestionTitle+'</h2>'+
              '<div class="clear myfont">'+
              '<span class="mfri">'+arrRe[j].ShowCreateTime+'</span>'+
              '<span class="marfri">'+solve+'</span>'+
              '<span class="marfri">'+arrRe[j].CommentCount+'个回答</span>'+
              '</div></a></div>'
            )
        }
        //for循环我的问题结构end
        $('.myques_w').append(arrRea.join(''));//页面加入结构
        if(arrRe.length<10){
          $('.pullUpU').hide();
          $('#pullUph').html('没有数据了');
          firstF=true;
        }
        //判断获取的问题条数end
        if(reFirst){
          myScroll.refresh();//页面插入元素后 重置iscroll效果
        }else{
          $('.pullUpU').removeClass('pullUpHide');//下拉接触隐藏
        }
        $('.sask_loading_mask').hide();//遮罩层
        $('.sask_loading').hide();//遮罩小人动画
        reFirst=true;//区别第一次加载
        reNumb++;//页数设置累加
      }else{
        $('.pullUpU').hide();//下拉刷新隐藏处理
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
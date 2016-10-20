  var firstload=false;
  var birthday='2014-05-10';
  var data = {'birthday':birthday,'page':1,'pagesize':10, 'ft':2,'source':'app'}
  function getdata(){
    var num=parseInt($('#pagecont>div').length);
    var page=num/10+1,pagesize=10;
    var data = {'birthday':birthday,'page':page,'pagesize':pagesize, 'ft':2,'source':'app'}
    ajax.run({'url':'http://s.askapi.yaolan.com/Essence/getEssence', 'type':'get'},data,setdata);
  }

  var setdata =function(r){
    var list=[];
    var expert='';
    var ExpertType='';
    //console.info(r)
    for (var i in r.data){
      babydate=r.data[i].Age >0?r.data[i].Age:'孕期';

      var person= r.data[i].OperateStatus;
      if (person==2){
        expert= '<span><em class="da"></em></span>'+ r.data[i].UserName+'&nbsp;&nbsp;|&nbsp;&nbsp;<span>'+babydate+'</span>';
      }else if(person==3){
        ExpertType=r.data[i].ExpertType==2?'<em class="da"></em>':'<em class="zhuan"></em>'
        expert= '<span>'+ExpertType+'</span>'+r.data[i].ExpertName+'&nbsp;&nbsp;|&nbsp;&nbsp;<span>'+r.data[i].Title+'</span>';
      }else{
        expert= r.data[i].ExpertName+'&nbsp;&nbsp;|&nbsp;&nbsp;<span>'+babydate+'</span>';

      }
      list.push(
              '<li class="homeblo">',
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
              '<div class="askbox">',
              '<span class="askno corfen">A:</span>',
              '<div class="aska">',
              r.data[i].Comment,
              '<p class="fon13 corfen">'+expert+'</p>',
              '</div>',
              '</div>',
              '</li>' )
    }
    $('#pagecont').append(list.join(''));
    if(firstload){
      myScroll.refresh();
    }else{
      firstload=true;
    }
  }
  ajax.run({'url':'http://s.askapi.yaolan.com/Essence/getEssence', 'type':'get'},data,setdata);
  //  加载更多
  var myScroll,
          pullUpEl, pullUpOffset,
          generatedCount = 0;
  function pullUpAction () {
    setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!
      getdata();

      // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
  }
  function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('wrapper', {
      useTransition: true,
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
      }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
  }
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
document.getElementById('scroller').addEventListener('touchmove', function (){ 
  var sVa=document.getElementById('scroller').style.transform;
  var reg=/\-?[0-9]+/g;
  var sVal=sVa.match(reg);
  var traVal=sVal[1];
  var traWid=$('header').height();
  var askSub=$('.hometop').height();
  if(traVal<-traWid){
    $('.hometop').addClass('header_f');
    $('#wrapper').css('top',traWid+'px');
  }else{
    $('.hometop').removeClass('header_f');
    $('#wrapper').css('top',traWid+askSub+'px');
  }
}, false);
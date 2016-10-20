//TODO
var myScroll,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
function pullUpAction(){
		if(firstF){
			return false;
		}
		if($('#pagecont > li').length>0){
				setTimeout(function(){  // <-- Simulate network congestion, remove setTimeout from production!
					appendRe();
				}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
		}else{
				//console.log(2);
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
//以下解决input失去焦点
function allowFormsInIscroll(){
	[].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el){
	el.addEventListener(('ontouchstart' in window)?'touchstart':'mousedown', function(e){
		e.stopPropagation();
		})
	})
}
//加载isrcoll
document.addEventListener('DOMContentLoaded', allowFormsInIscroll, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
//iscroll滚动效果end
/*var userid=getAppUserId();*/
//var getBrithday=getBabyBirthday();
var getBrithday='2014-02-14';
//获取用户end
$('.sask_inp').focus(function(){
	if($(this).val()=='请输入你要搜索的内容'){
		$(this).val('');
		$(this).addClass('sask_inph');
	}
})
$('.sask_inp').blur(function(){
	if($(this).val()==''){
		$(this).val('请输入你要搜索的内容');
		//$(this).removeClass('sask_inph');
	}
})
//默认加载热点词
if(navigator.onLine){
	yl.getBabyBirthday(function(birthday){
		getBrithday=birthday;
		$.ajax({
			type: 'GET',
			url: config.askGetHotUrl,//获取热点数据
			dataType: 'jsonp',
			data:{brithday:getBrithday,count:20},
			success: function(d){
				//console.log(d);
				var hotWord=d.data;
					var hotWordCon=[];
					for(var y=0;y<hotWord.length;y++){
						hotWordCon.push('<a href="javascript:seacherFinish(\''+hotWord[y].keyword+'\');" >'+hotWord[y].keyword+'</a>');
					}
					$('.sask_hot_word').html(hotWordCon.join(''));
					//hide
					$('.sask_loading_mask').hide();
					$('.sask_loading').hide();
			}
	})
	}); 
	
}else{
	alert('网络连接不上，请检查');
}

//点击搜索
var reFirst=false;
var reNumb=2;
$('.sask_inpb').click(function(){
	var saskInput=$('.sask_inp').val();
	if(saskInput=='请输入你要搜索的内容' || saskInput==''){
		var seacherConNo=[
			'<div class="sask_nothing">',
			'<a href="ask_submit.html">马上提问</a>',
			'<div class="sask_nothing_t"></div>',
			'</div>'
			];
		$('.sask_seacher_tip').show(); 
		$('.sask_seacher_tip').html(seacherConNo.join(''));
		return false;
	}else{
		seacherFinish(saskInput);
	}
})
//搜索ajax
var firstF=false;
function seacherFinish(seacherVal){
	//show
	$('.sask_loading_mask').show();
	$('.sask_loading').show();
	setTimeout(function(){
	$('.sask_inp').val(seacherVal);
	var seacherCon=[];
		$.ajax({
			type: 'GET',
			url: config.askSeacherUrl,
			dataType: 'jsonp',
			data:{key:seacherVal,getbest:true,source:'app',page:1,pagesize:10},
			success: function(r){
				//console.info(r);
				if(r.code){
					var sCon=r.data;
					var expert='';
					var ExpertType='';
					for(var i=0;i<sCon.length;i++){
					var babydate=r.data[i].Age >0?r.data[i].Age:'孕期';
				    if(r.data[i].Age>0){
				      if(r.data[i].Age==0){
				        babydate='宝宝'+r.data[i].Month+'月';
				      }else if(r.data[i].Month==0){
				        babydate='宝宝'+r.data[i].Age+'周';
				      }else{
				        babydate='宝宝'+r.data[i].Age+'周'+r.data[i].Month+'月';
				      }
				    }
				    //问题提问者的宝宝信息end
				    var person= r.data[i].OperateStatus;
				    if (person==2){
				    	if(r.data[i].CommentUserName==undefined || r.data[i].CommentUserName==''){
				        	r.data[i].CommentUserName='';
				      	}
				      expert= '<span>'+ r.data[i].CommentUserName+'</span>';
				    }else if(person==3){
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
				        	r.data[i].CommentUserName='';
				      	}
				      expert='<span>'+r.data[i].CommentUserName+'</span>';
				    }
				    if(person==0){
				      var noBest='<div class="askbox" style="display:none;">';
				    }else{
				      var noBest='<div class="askbox">';
				    }
				    //专家判断end
				    if(r.data[i].Comment=='' || r.data[i].Comment==undefined){
				    	var seacherStart='<li class="homeblo homeblohide"><a class="clear" href="ask_detail.html?'+r.data[i].QuestionID+'">';
				    }else{
						var seacherStart='<li class="homeblo"><a class="clear" href="ask_detail.html?'+r.data[i].QuestionID+'">';
				    }
					seacherCon.push(
							seacherStart,
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
					      '</a></li>');
					//搜索对应结构end
					}
					//下拉框显示和first加载搜索
					$('.sask_seacher_tip').hide();//隐藏热点容器
					$('#pullUp').show();//显示下拉刷新
					$('.sask_loading_mask').hide();//遮罩层
        			$('.sask_loading').hide();//遮罩小人动画
					$('.pullUpU').removeClass('pullUpHide');//下拉刷新文字显示
					$('#pagecont').html(seacherCon.join(''));//页面插入对应搜索内容
					reFirst=true;
					if(r.data.length<10){
						$('.pullUpU').hide();
						$('#pullUph').html('没有数据了');
						firstF=true;
					}
					//alert(r.data.length);
					//判断获取的问题条数end
					myScroll.refresh();//页面插入元素后 重置iscroll效果
					reNumb=2;//点击搜索 页数为2
				}else{
					seacherCon.push(
						'<div class="sask_nothing">',
						'<a href="ask_submit.html">马上提问</a>',
						'<div class="sask_nothing_t"></div>',
						'</div>'
						);
					$('.sask_seacher_tip').show().html(seacherCon.join(''));
					$('#pagecont').html('');
					$('#pullUp').hide();
					myScroll.refresh();
					$('.sask_loading_mask').hide();//遮罩层
        			$('.sask_loading').hide();//遮罩小人动画
        			//搜索无对应内容显示结构end
				} 
			}
		})
		},400);
}
//搜索内容上拉刷新
function appendRe(){
	var seacherCon=[];
	var saskInput=$('.sask_inp').val();
	if(!navigator.onLine){ 
		alert('网络连接不上，请检查');
		return false;
	}
	$.ajax({
			type: 'GET',
			url: config.askSeacherUrl,
			dataType: 'jsonp',
			data:{key:saskInput,getbest:true,source:'app',page:reNumb,pagesize:10},
			success: function(r){
				//console.info(r);
				if(r.code){
					var sCon=r.data;
					var expert='';
					var ExpertType='';
					for(var i=0;i<sCon.length;i++){
						babydate=r.data[i].Age >0?r.data[i].Age:'孕期';
				    if(r.data[i].Age>0){
				      if(r.data[i].Age==0){
				        babydate='宝宝'+r.data[i].Month+'月';
				      }else if(r.data[i].Month==0){
				        babydate='宝宝'+r.data[i].Age+'周';
				      }else{
				        babydate='宝宝'+r.data[i].Age+'周'+r.data[i].Month+'月';
				      }
				    }
				    //问题提问者的宝宝信息end
				    var person= r.data[i].OperateStatus;
				    if (person==2){
				      expert= '<span>'+ r.data[i].UserName+'</span>';
				    }else if(person==3){
				      ExpertType=r.data[i].ExpertType==2?'<span class="da">达</span>':'<span class="zhuan">专</span>';
				      expert=ExpertType+'<span>'+r.data[i].ExpertName+'</span><em>|</em><span>'+r.data[i].Title+'</span>';
				    }else{
				      expert='<span>'+r.data[i].UserName+'</span>';
				    }
				    //专家判断end
				    if(r.data[i].Comment=='' || r.data[i].Comment==undefined){
				    	var seacherStart='<li class="homeblo homeblohide"><a class="clear" href="ask_detail.html?'+r.data[i].QuestionID+'">';
				    }else{
						var seacherStart='<li class="homeblo"><a class="clear" href="ask_detail.html?'+r.data[i].QuestionID+'">';
				    }
				    if(person==0){
				      var noBest='<div class="askbox" style="display:none;">';
				    }else{
				      var noBest='<div class="askbox">';
				    }
					seacherCon.push(
						seacherStart,
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
					      '</a></li>');
					//搜索对应结构end
					}
					$('#pagecont').append(seacherCon.join(''));
					$('.sask_seacher_tip').hide();//隐藏热点容器
					$('#pullUp').show();//下拉容器显示
					if(!reFirst){
						$('.sask_loading_mask').hide();//遮罩层
        				$('.sask_loading').hide();//遮罩小人动画
						$('.pullUpU').removeClass('pullUpHide');//显示下拉文字
					}
					if(r.data.length<10){
						$('.pullUpU').hide();
						$('#pullUph').html('没有数据了');
					}else{
						myScroll.refresh(); 
					}
					//判断获取的问题条数end
					reFirst=true;//第一次加载开关设置
					reNumb++;//页数累加设置
					myScroll.refresh();//页面插入元素后 重置iscroll效果
				}else{
					$('.pullUpU').hide();
					$('#pullUph').html('没有数据了');
					//再次获取问题无数据显示end
				}
			}
	})
}
$('.scrolltop').click(function(){
  myScroll.scrollTo(0,0,100);
  myScroll.refresh();
  $(this).hide();
})
//返回顶部end
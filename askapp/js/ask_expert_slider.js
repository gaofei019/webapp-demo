document.addEventListener('DOMContentLoaded',function(){
    var oBox=document.querySelector('#box'),
        oUl=oBox.children[0],
        aLi=oUl.children,
        aBtn=document.querySelectorAll('#box ol li'),
        oBtnNext = document.querySelector('#next'),
        gtimer;
    
    oUl.innerHTML+=oUl.innerHTML;
    
    oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
    
    
    var W=oUl.offsetWidth/2;
    
    var translateX=0;
    
    var iNow=0;
    oUl.addEventListener('touchstart',function(ev){
        clearInterval(oUl.timer);
        clearInterval(gtimer);
        var disX=ev.targetTouches[0].pageX-translateX;
        
        var downX=ev.targetTouches[0].pageX;
        
        function fnMove(ev){
            clearInterval(gtimer);
            translateX=ev.targetTouches[0].pageX-disX;
            if(translateX<0){
                oUl.style.WebkitTransform='translateX('+translateX%W+'px)';
            }else{
                oUl.style.WebkitTransform='translateX('+(translateX%W-W)%W+'px)';
            }
            gtimer=setInterval(oBtnNext.onclick, 3000);
        }
        
        function fnEnd(ev){
            oUl.removeEventListener('touchmove',fnMove,false);
            oUl.removeEventListener('touchend',fnEnd,false);
            
            if(Math.abs(ev.changedTouches[0].pageX-downX)>10){
                if(downX>ev.changedTouches[0].pageX){
                    iNow++; 
                    
                    startMove(oUl,-iNow*aLi[0].offsetWidth);
                    tab();
                }else{
                    iNow--; 
                    startMove(oUl,-iNow*aLi[0].offsetWidth);
                    tab();
                }
            }else{
                startMove(oUl,-iNow*aLi[0].offsetWidth);    
            }


        }
        oUl.addEventListener('touchmove',fnMove,false);
        
        oUl.addEventListener('touchend',fnEnd,false);
        ev.preventDefault();
        clearInterval(gtimer);
    },false);
    
    function tab(){
        for(var i=0; i<aBtn.length; i++){
            aBtn[i].className='';
        }
        if(iNow>0){
            aBtn[iNow%aBtn.length].className='on';  
        }else{
            aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';    
        }
    };
    
    function startMove(obj,iTarget){
        clearInterval(obj.timer);
        
        obj.timer=setInterval(function(){
            var iSpeed=(iTarget-translateX)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            
            translateX+=iSpeed;
            
            if(translateX<0){
                obj.style.WebkitTransform='translateX('+translateX%W+'px)';
            }else{
                obj.style.WebkitTransform='translateX('+(translateX%W-W)%W+'px)';   
            }
        },30);
        
        
    };

            oBtnNext.onclick=null;
            oBtnNext.onclick=function (){
                iNow++;
                startMove(oUl,-iNow*aLi[0].offsetWidth);
                tab();
            };

            gtimer=setInterval(oBtnNext.onclick, 3000);


},false);
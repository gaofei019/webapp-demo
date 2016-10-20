;var ajax = {
	config:{
		'type'       :'get',
		'dType'     : 'jsonp',
		'jsonp'      :false,
		'status'     :0
		
	},
	run:function(opt, data , fun){
		
		var _this = this ;
		_this.requestAjax(opt , data,fun);
		
	},
	requestAjax:function(opt,data,fun){
		var _this =this ;
		opt = $.extend({},_this.config , opt);
		var url = opt.url;
		
		if(typeof data == 'string'){
			data = $(data).serialize() ;	
		}else if(typeof data == 'object	'){
			data = data;
		}
		//console.info(opt)
		//console.info(opt)
		//TODO ajax 执行
		$.ajax({
			type:opt.type,
			url:url,
			dataType:opt.dType,
			//jsonp: "callback",
			jsonpCallback: 'complete',
			data:data,
			success:function(r){
				//console.info(r)

				if(r.code > 0){
					fun(r);
				}else{
					alert('加载失败')
				}
			}
		});
	}	
};

function complete(){};






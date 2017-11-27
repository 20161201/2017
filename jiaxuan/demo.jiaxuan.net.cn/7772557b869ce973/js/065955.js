$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!=""){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}

function RequestURL(viewid, sys_url, moreParams){
	var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'json',
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).children(".view_contents").show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		console.log(Request('chlang'))
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
		if(OO.nodeType==3){OO.data=StranText(OO.data)}
		else StranBody(OO)
	}
	
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranBodyce(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
		else StranBodyce(OO)
	}
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}

DIY_PAGE_SIZE='1200';
var viewsSettings={"comm_layout_header":{"diyShowName":"\u533a\u57df\u5e03\u5c40","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"css":{"pc":{"height":"109px","display":"block"},"content":{"overflow":"hidden","max-width":"1200px"},"pad":{"height":"98px","display":"block"},"mobile":{"height":"55px","display":"block","z-index":2}},"autoHeight":"false","setFixedScroll":{"mobile":"2"}},"text_style_02_1490063023274":{"diyShowName":null,"css":{"pc":{"display":"block"},"mobile":{"display":"block"}}},"text_style_02_1490063046138":{"diyShowName":null,"css":{"pc":{"display":"block"},"mobile":{"display":"block"}}},"dh_style_01_1490063713095":{"diyShowName":null,"css":{"pc":{"display":"block"},"mobile":{"display":"block"}}},"text_style_02_1490249742339":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"27px","left":"0%","display":"block"},"pad":{"width":"55px","left":"0.9544008483563097%","top":"30px"},"mobile":{"width":"11.842105263157894%","top":"5px","left":"4.2105263157894735%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"44px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490249808389":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"4.166666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"27px","left":"5%","display":"block"},"pad":{"width":"46px","left":"7.4380302226935315%","top":"27px"},"mobile":{"width":"7.894736842105263%","top":"5px","left":"13.421052631578947%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffc001","font-size":"44px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490326676930":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"9.583333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"54px","left":"9.375%","display":"block"},"pad":{"width":"120px","left":"13.270479851537646%","top":"54px"},"mobile":{"width":"27.8125%","top":"21px","left":"22.105263157894736%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"20px","height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","color":"#999999"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1490340999150":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"47.16666666666667%","z-index":"9999","position":"absolute","top":"30px","left":"52.666666666666664%","display":"block"},"pad":{"z-index":"999","height":"44px","width":"467px","left":"50.47720042417816%","top":"30px"},"mobile":{"z-index":"999","height":"44px","left":"89.46134868421053%","top":"5px","width":"39px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"%hot>a":{"color":"#ffffff","font-size":"16px","border-bottom-color":"#ffcc01","border-bottom-style":"none","border-bottom-width":"1px","background":"#ffcc01"},"%hot>a:hover":{"font-family":"Microsoft YaHei","color":"#ffffff","font-size":"16px","border-bottom-color":"#ffcc01","border-bottom-style":"none","border-bottom-width":"1px","background":"#ffcc01"},"@mainMenuSet":{"font-size":"16px"},"@mainMenuSet:hover":{"font-family":"Microsoft YaHei","font-size":"16px","color":"#ffffff","border-bottom-style":"none","border-bottom-color":"#ffcc01","border-bottom-width":"1px","background":"#ffcc01"}},"mobile":{"%hot>a":{"color":"#000000","padding-left":"20px"},"%hot>a:hover":{"color":"#000000"},"@subMenuSet:hover":{"color":"#000000","padding-left":"0px"},"@mainMenuSet:hover":{"color":"#000000","padding-left":"20px"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"setFixed":"2"},"layout_1490065549182":{"css":{"pc":{"height":"559px"},"content":{"overflow":"visible"},"pad":{"height":"320px"},"mobile":{"height":"153px","display":"block"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":[]}},"banner_style_01_1490066020609":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"bannerConfig","setupFunc":"bannerSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u8f6e\u64ad\u56fe-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u56fe\u7247\u8f6e\u64ad","viewCtrl":"default","css":{"pc":{"width":"100%","height":"507px","position":"absolute","top":"0%","left":"0%","display":"block"},"pad":{"top":"0px","left":"0%","height":"320px"},"mobile":{"width":"100%","height":"153px","top":"0px","left":"0%","z-index":1,"display":"block"}},"doubleClickFunc":"bannerViewSelect","mouseMenu":[{"name":"\u7f16\u8f91\u8f6e\u64ad\u56fe","func":"bannerViewSelect()","ico":"fa-file-image-o"}],"params":{"filelist":"\/userimg\/3928\/pkgimg\/pkgimg\/banner222.jpg,\/userimg\/3928\/pkgimg\/pkgimg\/timg.jpg,\/userimg\/3928\/pkgimg\/pkgimg\/b13.jpg,\/userimg\/3928\/pkgimg\/pkgimg\/bb1.jpg,","textlist":",,,,","urllist":",,,,"},"name":"banner","kind":"\u56fe\u7247\u8f6e\u64ad","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"layout_1490067323803":{"css":{"pc":{"height":"485px","display":"block"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"238px","display":"block"},"pad":{"height":"510px","display":"block"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","eventSet":{"scrollView":"none","type":"none"}},"text_style_09_1490067406018":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"6.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"78px","left":"46.875%","display":"block"},"pad":{"left":"calc(50% - 36.5px)","top":"70px","width":"73px"},"mobile":{"width":"17.8125%","top":"16px","left":"41.09375%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490067222617":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleShowImg":"../../../systools/Model/viewsRes/showImg/text_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//text_style_2.png*/,"styleShowClass":"one","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"125px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","left":"44.79166666666667%","top":"129px","position":"absolute","display":"block"},"pad":{"width":"99px","left":"calc(50% - 49.5px)","top":"127px"},"mobile":{"width":"85px","left":"calc(50% - 42.5px)","top":"64px","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-weight":"bold","font-family":"Microsoft YaHei","font-size":"30px"},"@diyCurTab":{"font-family":"Microsoft YaHei","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490068185034":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"44.75%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"190px","left":"27.625%","display":"block"},"pad":{"width":"538px","left":"calc(50% - 269px)","top":"184px"},"mobile":{"width":"77.5%","top":"103px","left":"11.25%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#aaaaaa"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"50px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1490075498512":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.666666666666667%","height":"80px","position":"absolute","top":"279px","left":"14.499999999999998%","display":"block"},"pad":{"width":"80px","left":"12.990455991516436%","top":"314px"},"mobile":{"width":"16.875%","height":"50px","top":"165px","left":"4.7998046875%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/cloud.png"/*tpa=http://userimg//3928//pkgimg//pkgimg//cloud.png*/,"imgStyle":{"pc":null,"pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1490076517213":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.666666666666667%","height":"80px","position":"absolute","top":"279px","left":"36.41666666666667%","display":"block"},"pad":{"width":"80px","left":"34.08172057264051%","top":"314px"},"mobile":{"width":"13.157894736842104%","height":"50px","top":"165px","left":"31.751644736842106%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/pic2.png"/*tpa=http://userimg//3928//pkgimg//pkgimg//pic2.png*/,"imgStyle":{"pc":null,"pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1490076523752":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.666666666666667%","height":"80px","position":"absolute","top":"279px","left":"58.20833333333333%","display":"block"},"pad":{"width":"80px","left":"56.65098091198303%","top":"314px"},"mobile":{"width":"15.937499999999998%","height":"50px","top":"165px","left":"54.95065789473684%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/gift.png"/*tpa=http://userimg//3928//pkgimg//pkgimg//gift.png*/,"imgStyle":{"pc":null,"pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1490076712291":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"5.75%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"372px","left":"58.666666666666664%","display":"block"},"pad":{"width":"70px","left":"57.18120360551432%","top":"411px","display":"block"},"mobile":{"width":"15.937499999999998%","top":"218px","left":"56.184210526315795%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490076718121":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"5.666666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"372px","left":"79.875%","display":"block"},"pad":{"width":"69px","left":"79.10922587486743%","top":"411px"},"mobile":{"width":"15.937499999999998%","top":"218px","left":"79.07072368421053%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490076639361":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"4.416666666666667%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"372px","left":"15.625%","display":"block"},"pad":{"width":"56px","left":"14.262990455991517%","top":"411px"},"mobile":{"width":"12.1875%","top":"215px","left":"7.143554687500001%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","font-family":"Microsoft YaHei","line-height":"30px","height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490076706832":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"8.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"372px","left":"35.625%","display":"block"},"pad":{"width":"102px","left":"32.915230646871684%","top":"411px"},"mobile":{"width":"24.0625%","top":"215px","left":"26.279296875000004%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","font-family":"Microsoft YaHei","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1490076530048":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.666666666666667%","height":"80px","position":"absolute","top":"279px","left":"79.375%","display":"block"},"pad":{"width":"80px","left":"78.52598091198303%","top":"314px"},"mobile":{"width":"16.25%","height":"50px","top":"165px","left":"79.0673828125%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/s.png"/*tpa=http://userimg//3928//pkgimg//pkgimg//s.png*/,"imgStyle":{"pc":null,"pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1490082113050":{"css":{"pc":{"height":"1741px","display":"block"},"content":{"overflow":"hidden","max-width":"1200px"},"mobile":{"height":"1801px","display":"block"},"pad":{"height":"1678px","display":"block"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1490081952272":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"41.66666666666667%","height":"364px","position":"absolute","top":"101px","left":"0%","z-index":2,"display":"block"},"pad":{"top":"155px","height":"287px","left":"0%","width":"411px","display":"block"},"mobile":{"width":"53.1578947368421%","height":"136px","top":"95px","left":"1.0526315789473684%","display":"block","z-index":4},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/work.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//work.jpg*/,"imgStyle":{"pc":"3","pad":null,"mobile":null}},"moveEdit":[],"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1490350647644":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"39.33333333333333%","height":"199px","position":"absolute","top":"590px","left":"55.708333333333336%","z-index":6,"display":"block"},"pad":{"display":"block","left":"55.991516436903495%","top":"639px"},"mobile":{"width":"86.05263157894737%","height":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/198.5px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/384.5px","left":"3.3837890625%","display":"block"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_09_1490087992507":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"15.570175438596493%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/23.5px","left":"8.648574561403509%","z-index":5,"display":"block"},"pad":{"width":"82px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/12.5px","left":"8.91593665768194%","display":"block"},"mobile":{"width":"21.843003412969285%","top":"19px","left":"10.182530581039757%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490088135288":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleShowImg":"../../../systools/Model/viewsRes/showImg/text_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//text_style_2.png*/,"styleShowClass":"one","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"33.771929824561404%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","left":"8.429276315789473%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/63.5px","position":"absolute","z-index":5,"display":"block"},"pad":{"top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/56.5px","left":"8.397911051212938%"},"mobile":{"width":"38.54545454545455%","left":"9.398891437308869%","top":"63px","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-weight":"bold","font-family":"Microsoft YaHei","font-size":"30px"},"@diyCurTab":{"font-family":"Microsoft YaHei","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"text_default_1490350788722":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u81ea\u5b9a\u4e49\u89c6\u56fe\u5c5e\u6027\u8bbe\u7f6e"},"style":"default","styleShowName":"\u81ea\u5b9a\u4e49\u6587\u672c\u89c6\u56fe","styleKind":"HTML\u6587\u672c","viewCtrl":"html","css":{"pc":{"width":"85.74561403508771%","height":"54px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/133.5px","left":"8.222987288135593%","display":"block"},"pad":{"display":"block","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/119.5px","left":"8.692722371967655%"},"mobile":{"width":"86.18181818181819%","height":"74px","top":"102px","left":"9.392045454545455%","display":"block"}},"doubleClickFunc":"diyViewSelect","mouseMenu":[{"name":"HTML\u4ee3\u7801\u7f16\u8f91","func":"diyViewSelect()","ico":"fa-code"}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"HTML\u6587\u672c-\u81ea\u5b9a\u4e49\u6587\u672c\u89c6\u56fe","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1490088385650":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"37.833333333333336%","height":"293px","position":"absolute","top":"532px","left":"61.583333333333336%","z-index":1,"display":"block"},"pad":{"top":"594px","left":"61.666556203605516%","display":"block"},"mobile":{"width":"77.10526315789473%","height":"236px","top":"371px","left":"20.9375%","display":"block"},"customCss":{"pc":{"modelArea":{"border-top-color":"#ffc001","border-right-color":"#ffc001","border-bottom-color":"#ffc001","border-left-color":"#ffc001","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","background":"#ffffff","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1490090753829":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"55.166666666666664%","height":"434px","position":"absolute","top":"586px","left":"0%","z-index":2,"display":"block"},"pad":{"display":"block","height":"396px","width":"521px","top":"558px","left":"0%"},"mobile":{"width":"92.10526315789474%","height":"228px","top":"624px","left":"3.94736842105263%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/case.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//case.jpg*/,"imgStyle":{"pc":"3","pad":null,"mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_09_1490091322756":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"9.333333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1032.5px","left":"21.083333333333336%","z-index":5,"display":"block"},"pad":{"width":"10.498409331919406%","left":"22.375397667020145%","top":"961px","display":"block"},"mobile":{"width":"27.187499999999996%","top":"866px","left":"36.40625%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","height":"30px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1490090972745":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"36.333333333333336%","height":"366px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/869.5px","left":"59.54166666666667%","z-index":2,"display":"block"},"pad":{"height":"262px","width":"350px","left":"59.49761399787911%","top":"954px","display":"block"},"mobile":{"width":"91.28%","height":"228px","top":"921px","left":"4.359999999999999%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/case2.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//case2.jpg*/,"imgStyle":{"pc":"3","pad":null,"mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_09_1490091413067":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.833333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1235.5px","left":"73.08333333333333%","z-index":5,"display":"block"},"pad":{"width":"8.8016967126193%","left":"72.53777836691411%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1222.5px","display":"block"},"mobile":{"width":"22.8125%","top":"1164px","left":"38.59375%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","height":"30px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1490090985766":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"41.16666666666667%","height":"358px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1096.5px","left":"14.541666666666666%","z-index":2,"display":"block"},"pad":{"left":"9.331919406150584%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1047.5px","display":"block","height":"344px","width":"433px"},"mobile":{"width":"91.2%","height":"228px","top":"1215px","left":"4.399999999999999%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/case3.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//case3.jpg*/,"imgStyle":{"pc":"3","pad":null,"mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_09_1490091552070":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.833333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/1454.5px","left":"31.5%","z-index":5,"display":"block"},"pad":{"width":"8.8016967126193%","left":"30.275715800636267%","top":"1404px","display":"block"},"mobile":{"width":"23.125%","top":"1457px","left":"38.4375%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","height":"30px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1490091020198":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"36.333333333333336%","height":"366px","position":"absolute","top":"1305px","left":"59.62499999999999%","z-index":2,"display":"block"},"pad":{"left":"58.27478791092259%","top":"1299px","height":"290px","display":"block","width":"373px"},"mobile":{"width":"91.2%","height":"228px","top":"1506px","left":"4.399999999999999%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/case4.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//case4.jpg*/,"imgStyle":{"pc":"3","pad":null,"mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_09_1490091636618":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.833333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"1671px","left":"73.79166666666667%","z-index":5,"display":"block"},"pad":{"width":"8.8016967126193%","left":"73.65455991516437%","top":"1602px","display":"block"},"mobile":{"width":"22.8125%","top":"1744px","left":"38.59375%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","line-height":"30px","height":"30px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1490350413661":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"57.41666666666667%","height":"232px","position":"absolute","top":"152px","left":"42.583333333333336%","z-index":4,"display":"block"},"pad":{"width":"522px","left":"44.66132025450689%","height":"225px"},"mobile":{"width":"44.58984375%","height":"236px","top":"95px","left":"54.1748046875%","display":"block"},"customCss":{"pc":{"modelArea":{"background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_default_1490350508665":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u81ea\u5b9a\u4e49\u89c6\u56fe\u5c5e\u6027\u8bbe\u7f6e"},"style":"default","styleShowName":"\u81ea\u5b9a\u4e49\u6587\u672c\u89c6\u56fe","styleKind":"HTML\u6587\u672c","viewCtrl":"html","css":{"pc":{"width":"91.29172714078373%","height":"89px","position":"absolute","top":"131px","left":"4.5786465892597965%","display":"block"},"pad":{"left":"6.321839080459771%","width":"91.37931034482759%","top":"116px","height":"95px"},"mobile":{"width":"139px","height":"142px","top":"87px","left":"5.415883458646617%","display":"block"}},"doubleClickFunc":"diyViewSelect","mouseMenu":[{"name":"HTML\u4ee3\u7801\u7f16\u8f91","func":"diyViewSelect()","ico":"fa-code"}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"HTML\u6587\u672c-\u81ea\u5b9a\u4e49\u6587\u672c\u89c6\u56fe","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490082312729":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleShowImg":"../../../systools/Model/viewsRes/showImg/text_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//text_style_2.png*/,"styleShowClass":"one","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"27.28592162554427%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","left":"4.571843251088534%","top":"63px","position":"absolute","z-index":4,"display":"block"},"pad":{"top":"53px","left":"6.010536398467433%","width":"25.478927203065133%"},"mobile":{"width":"78.19548872180451%","left":"6.645569620253164%","top":"53px","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-weight":"bold","font-family":"Microsoft YaHei","font-size":"30px"},"@diyCurTab":{"font-family":"Microsoft YaHei","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"text_style_09_1490082282916":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"12.62699564586357%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"21px","left":"4.571843251088534%","z-index":4,"display":"block"},"pad":{"top":"12px","left":"5.857878352490421%","width":"16.666666666666664%"},"mobile":{"width":"43.037974683544306%","top":"8px","left":"5.063291139240507%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1490145563413":{"css":{"pc":{"height":"589px","display":"block"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"635px","display":"block"},"customCss":{"pc":{"modelArea":{"background":"transparent"}}},"pad":{"height":"537px","display":"block"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_09_1490148001126":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"6.333333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"22px","left":"46.833333333333336%","z-index":4,"display":"block"},"pad":{"width":"84px","left":"calc(50% - 42px)"},"mobile":{"width":"20%","top":"253px","left":"41.578947368421055%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#c0c0c0","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490148016567":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleShowImg":"../../../systools/Model/viewsRes/showImg/text_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//text_style_2.png*/,"styleShowClass":"one","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"12.916666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","left":"43.541666666666664%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/70.5px","position":"absolute","z-index":4,"display":"block"},"pad":[],"mobile":{"width":"32.1875%","left":"33.90625%","top":"302px","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-weight":"bold","font-family":"Microsoft YaHei","font-size":"30px"},"@diyCurTab":{"font-family":"Microsoft YaHei","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1490151311725":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"43.833333333333336%","height":"360px","position":"absolute","top":"154px","left":"0%","display":"block"},"pad":{"width":"452px","left":"0%","top":"127px","height":"363px"},"mobile":{"width":"100%","height":"253px","top":"0px","left":"0%","display":"block"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../../../userimg/3928/pkgimg/pkgimg/news.jpg"/*tpa=http://userimg//3928//pkgimg//pkgimg//news.jpg*/,"imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"newsList_style_01_1490151269875":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u65b0\u95fb\u5217\u8868-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"AAA","viewCtrl":"newsList","css":{"pc":{"width":"54%","position":"absolute","top":"154px","left":"46%","display":"block"},"pad":{"width":"480px","left":"49.09862142099682%","top":"129px"},"mobile":{"width":"91.23%","top":"332px","left":"4.473684210526316%","display":"block"},"customCss":{"pc":{"@titleSet":{"margin-top":"20px"},"@riSet":{"color":"#ffc001"}}}},"lock":{"height":"true"},"data":{"newsShow":["date","title","page"],"sort":"id","newsnum":3,"column":1,"titlenum":36,"detailnum":36,"showat":65954,"newsGids":["all",14878,14877,14876,14875,14874,14873]},"newList":{"date":"\u65e5\u671f","title":"\u6807\u9898","kind":"\u7c7b\u522b","summary":"\u6458\u8981","page":"\u5206\u9875","article":"\u9605\u8bfb\u91cf"},"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"}},"layout_1490152512740":{"css":{"pc":{"height":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/411.5px","display":"block"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/3928\/pkgimg\/pkgimg\/bg.jpg)"}}},"mobile":{"height":"708px","display":"block"},"pad":{"height":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/419.5px","display":"block"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_09_1490154009267":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_09","diyShowName":"\u6587\u5b57\u6a21\u5757-Roman","styleKind":"\u82f1\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"12.583333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Times New Roman","position":"absolute","top":"150px","left":"10.125%","z-index":10,"display":"block"},"pad":{"top":"151px","left":"5.025516967126193%","display":"block"},"mobile":{"width":"37.631578947368425%","top":"112px","left":"10.789473684210527%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"40px","height":"40px","color":"#666666","border-bottom-color":"#ffc001","border-bottom-style":"solid","border-bottom-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490154029410":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleShowImg":"../../../systools/Model/viewsRes/showImg/text_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//text_style_2.png*/,"styleShowClass":"one","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"10.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","left":"10.125%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/196.5px","position":"absolute","z-index":10,"display":"block"},"pad":{"top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/192.5px","left":"5.025516967126193%","display":"block"},"mobile":{"width":"28.421052631578945%","left":"10.263157894736842%","top":"159px","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-weight":"bold","font-family":"Microsoft YaHei","font-size":"30px"},"@diyCurTab":{"font-family":"Microsoft YaHei","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px","line-height":"40px","height":"40px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1490163425624":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"13.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/284.5px","left":"10.291666666666668%","z-index":10,"display":"block"},"pad":{"width":"248px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/289.5px","left":"5.025516967126193%","display":"block"},"mobile":{"width":"32.631578947368425%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/195.5px","left":"10.127467105263158%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#333333","line-height":"20px","height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","height":"20px","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"18px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490154046390":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"24.416666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/255.5px","left":"10.291666666666668%","z-index":10,"display":"block"},"pad":{"width":"265px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/255.5px","left":"5.025516967126193%"},"mobile":{"width":"60.526315789473685%","top":"274px","left":"10%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#333333","line-height":"20px","height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","height":"20px","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"18px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490163482045":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"15.416666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/312.5px","left":"10.208333333333334%","z-index":10,"display":"block"},"pad":{"width":"247px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/320.5px","left":"5.025516967126193%"},"mobile":{"width":"36.578947368421055%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/220.5px","left":"10%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#333333","line-height":"20px","height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","height":"20px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"18px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490163507654":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"16.833333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/341.5px","left":"10.208333333333334%","z-index":10,"display":"block"},"pad":{"width":"212px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/352.5px","left":"5.025516967126193%"},"mobile":{"width":"40%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/247.5px","left":"10%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","color":"#333333","line-height":"20px","height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","height":"20px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"18px","height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1490154456036":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30.333333333333336%","height":"259px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/61.5px","left":"16.25%","z-index":1,"display":"block"},"pad":{"width":"364px","left":"6.493571049840933%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/71.5px","height":"289px"},"mobile":{"width":"71.05263157894737%","height":"236px","top":"45px","left":"19.342105263157894%","display":"block"},"customCss":{"pc":{"modelArea":{"border-top-color":"#ffc001","border-right-color":"#ffc001","border-bottom-color":"#ffc001","border-left-color":"#ffc001","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"none","border-left-style":"none","border-top-width":"1px","border-right-width":"1px"}},"mobile":{"modelArea":{"border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1490167502078":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"12.916666666666668%","height":"91px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/320.5px","left":"33.75%","display":"block"},"pad":{"left":"31.430607104984094%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/361.5px","width":"131px","height":"58px"},"mobile":{"width":"18.947368421052634%","height":"34px","top":"282px","left":"71.83388157894737%","display":"block"},"customCss":{"pc":{"modelArea":{"border-top-style":"solid","border-top-color":"#ffc001","border-top-width":"3px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1490167578670":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"10.5%","height":"77px","position":"absolute","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/63.5px","left":"5.75%","display":"block"},"pad":{"left":"1.2725344644750796%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/71.5px","height":"74px","width":"47px"},"mobile":{"width":"16.05263157894737%","height":"65px","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/46.5px","left":"3.421052631578948%","display":"block"},"customCss":{"pc":{"modelArea":{"border-top-style":"none","border-top-color":"#ffc001","border-top-width":"3px","border-right-color":"#ffc001","border-bottom-color":"#ffc001","border-left-color":"#ffc001","border-right-style":"solid","border-bottom-style":"none","border-left-style":"none","border-right-width":"3px","border-bottom-width":"3px","border-left-width":"3px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"liuyanban_style_01_1490153170348":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"liuyanbanConfig","setupFunc":"liuyanbanSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7559\u8a00\u677f\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u7559\u8a00\u677f-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleShowImg":"../../../systools/Model/viewsRes/showImg/lyb_style_2.png"/*tpa=http://systools//Model//viewsRes//showImg//lyb_style_2.png*/,"styleShowClass":"two","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"441px","left":"53.5%","top":"29px","position":"absolute","z-index":7,"display":"block"},"pad":{"width":"400px","left":"51.938626723223756%","top":"http://demo.jiaxuan.net.cn/7772557b869ce973/js/36.5px"},"mobile":{"width":"100%","left":"0%","top":"331px","display":"block"}},"lock":{"height":"true"},"name":"liuyanban","kind":"\u8868\u5355\u6a21\u5757","showname":"\u7559\u8a00\u677f","eventSet":{"scrollView":"none","type":"none"},"lyshow":"none","lybMail":"none","lybQQ":"none","lybName":"block","lybPhone":"block","lybTel":"block"},"layout_1490339832443":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"display":"block"},"pc":{"display":"block"},"pad":{"display":"block"}}},"comm_layout_footer":{"diyShowName":"\u533a\u57df\u5e03\u5c40","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"css":{"pc":{"height":"227px","display":"block"},"mobile":{"height":"66px","display":"block"},"pad":{"height":"194px","display":"block"}}},"div_includeBlock_1490256629295":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"227px","position":"absolute","top":"0px","left":"0%","display":"block"},"pad":{"height":"194px","display":"block"},"mobile":{"width":"100%","height":"66px","top":"0px","left":"0%","display":"block"},"customCss":{"pad":{"modelArea":{"background":"#282828"}},"pc":{"modelArea":{"background":"#282828"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[],"pc":[]}},"image_style_01_1490256629447":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.1082220660576247%","height":"37px","position":"absolute","top":"77px","left":"18.308591004919183%","display":"block"},"mobile":{"width":"6.052631578947368%","height":"28px","top":"28px","left":"2.1%","display":"none"},"content":{"overflow":"visible"},"pad":{"top":"51px","left":"6.41072375397667%","width":"28px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u56fe\u7247\u6a21\u5757","data":{"imgUrl":"../../../systools/Model/views/footer/z_04/v9Res/7fb142ea899bd8ea15c21c7ecf9661f3.png"/*tpa=http://systools//Model//views//footer//z_04//v9Res//7fb142ea899bd8ea15c21c7ecf9661f3.png*/,"imgStyle":"2"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}},"params":{"filelist":"","urllist":""}},"image_style_01_1490256629455":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.459592410400562%","height":"37px","position":"absolute","top":"75px","left":"37.85905657062544%","display":"block"},"mobile":{"width":"6.052631578947368%","height":"28px","top":"28px","left":"56.0%","display":"none"},"content":{"overflow":"visible"},"pad":{"height":"32px","top":"53px","left":"29.6875%","width":"30px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u56fe\u7247\u6a21\u5757","data":{"imgUrl":"../../../systools/Model/views/footer/z_04/v9Res/28a85caaa2119fec9657acfb6a9c5729.png"/*tpa=http://systools//Model//views//footer//z_04//v9Res//28a85caaa2119fec9657acfb6a9c5729.png*/,"imgStyle":"2"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}},"params":{"filelist":"","urllist":""}},"image_style_01_1490256629459":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.3333333333333335%","height":"39px","position":"absolute","top":"73px","left":"58.09908643710471%","display":"block"},"mobile":{"width":"6.052631578947368%","height":"28px","top":"61px","left":"2.1%","display":"none"},"content":{"overflow":"visible"},"pad":{"top":"51px","left":"54.6%","width":"28px","height":"35px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u56fe\u7247\u6a21\u5757","data":{"imgUrl":"../../../systools/Model/views/footer/z_04/v9Res/902ecb817eb330500d863b7b4c89d6df.png"/*tpa=http://systools//Model//views//footer//z_04//v9Res//902ecb817eb330500d863b7b4c89d6df.png*/,"imgStyle":"2"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}},"params":{"filelist":"","urllist":""}},"image_style_01_1490256629465":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"2.6704146170063248%","height":"40px","position":"absolute","top":"75px","left":"74.54761068165847%","display":"block"},"mobile":{"width":"6.052631578947368%","height":"28px","top":"61px","left":"56.0%","display":"none"},"content":{"overflow":"visible"},"pad":{"width":"2.863202545068929%","top":"51px","left":"74.90555408271474%","height":"30px"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u56fe\u7247\u6a21\u5757","data":{"imgUrl":"../../../systools/Model/views/footer/z_04/v9Res/50303a1615c273cb3bf982f23a25dfdb.png"/*tpa=http://systools//Model//views//footer//z_04//v9Res//50303a1615c273cb3bf982f23a25dfdb.png*/,"imgStyle":"2"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}},"params":{"filelist":"","urllist":""}},"text_style_02_1490256629469":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"17%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"79px","left":"21.0%","display":"block"},"pad":{"top":"51px","left":"9.9%"},"mobile":{"width":"34.710743801652896%","top":"32px","left":"11.8%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629473":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"17%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"79px","left":"41.0%","display":"block"},"pad":{"width":"17%","top":"53px","left":"33.3%"},"mobile":{"width":"33.057851239669425%","top":"32px","left":"65.2%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629478":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"12.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"79px","left":"61.1%","display":"block"},"pad":{"width":"13.149522799575822%","top":"55px","left":"58.3%"},"mobile":{"width":"30.57851239669421%","top":"65px","left":"11.6%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629483":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"6.666666666666667%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"79px","left":"77.2%","display":"block"},"pad":{"width":"11.028632025450689%","top":"51px","left":"78.5%"},"mobile":{"width":"23.415977961432507%","top":"65px","left":"65.2%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":null},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629488":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"4.833333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"145px","left":"29.0%","display":"block"},"pad":{"left":"25.9%","top":"114px"},"mobile":{"width":"11.570247933884298%","top":"111px","left":"2.1%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"18px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":65955},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629493":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"4.708362614195362%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"145px","left":"36.88949402670414%","display":"block","z-index":"7"},"pad":{"width":"7.635206786850477%","display":"block","left":"34.775980911983034%","top":"114px"},"mobile":{"width":"17.079889807162534%","top":"111px","left":"19.387335526315788%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"18px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":65956},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629497":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"6.676036542515812%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"145px","left":"45.5%","display":"block","z-index":"7"},"pad":{"width":"8.271474019088016%","display":"block","left":"43.95711823966066%","top":"114px"},"mobile":{"width":"17.63085399449036%","top":"111px","left":"38.1702302631579%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"18px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":65951},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629501":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"6.416666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"145px","left":"55.2%","display":"block","z-index":"7"},"pad":{"width":"8.16542948038176%","display":"block","left":"56.2%","top":"114px"},"mobile":{"width":"17.90633608815427%","top":"111px","left":"60.9%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"18px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":65954},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629505":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"6.416666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"145px","left":"65%","display":"block","z-index":"7"},"pad":{"width":"7.84729586426299%","display":"block","left":"67.7%","top":"114px"},"mobile":{"width":"16.2534435261708%","top":"111px","left":"82.3%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#666666","font-size":"18px","line-height":"20px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":65952},"viewLock":{"mobile":{"position":"true"},"pad":{"position":"true"},"pc":{"position":"true"}}},"text_style_02_1490256629509":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"43.166666666666664%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"187px","left":"28.416666666666668%","display":"block"},"pad":{"width":"53.23435843054083%","left":"23.382820784729585%","top":"151px"},"mobile":{"width":"93.38842975206612%","top":"15px","left":"3.305785123966942%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","color":"#666666","line-height":"20px","text-align":"center","font-family":"Verdana"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[],"pad":{"position":"true"},"pc":{"position":"true"}}}}
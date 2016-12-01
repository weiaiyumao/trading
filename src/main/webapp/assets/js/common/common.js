//添加百度编辑器提示 Editor： 对象    hint： 提示文本
function addhint(Editor,hint){
		Editor.addListener("ready", function () {
			if(plainTxt(Editor)==""){
			loadEditorText(Editor,"",hint);
		}    
	});
	Editor.addListener("blur", function (type, event) {
		if(plainTxt(Editor)==""){
			loadEditorText(Editor,"",hint);
		}
	});
	Editor.addListener("afterFocus ", function (type, event) {
		var hintHtml='<div name="hint_zz" style="color: rgb(153, 153, 153);">'+hint+'</div>'
		if(plainTxt(Editor)==hintHtml)
			loadEditorText(Editor,"","");
	});
}





//切换国际化
function changeLocale(langType) {
	location.href = basePath + "/global?langType="+langType+"&targetUrl=" + location.href ;
}
//生成编辑器 id 编辑器id   宽度   高度   是否强制创建编辑器     编辑器最大字数限制
function newEditor(id,width,height,y,maxnum){
	var ue= UE.getEditor(id,{
			initialFrameWidth :width,//设置编辑器宽度
			initialFrameHeight:height,//设置编辑器高度
			autoHeightEnabled: true,
			},y);
	if(maxnum==null){
		maxnum=10000;
	}
	ue.addListener("keyup", function(type, event) {
		var count = ue.getContentLength(true);
		if(count>maxnum){
		var contentText = ue.getContentTxt();
		ue.setContent(contentText.substring(0, maxnum));
		}
		})
	return ue
};
//替换回车
function TransferString(content)  
{  
    var string = content;  
    try{  
        string=string.replace(/\r\n/g,"<p>")  
        string=string.replace(/\n/g,"<p>");  
    }catch(e) {  
        alert(e.message);  
    }  
    return string;  
}

//获取编辑器全部内容
function plainTxt(Editor){
	var Txt= Editor.getContent();
	return Txt;
	 
}  

//获取百度编辑器纯文本内容
function editorText(Editor){
	var Text=Editor.getContentTxt();
	return Text;
}

//获取编辑器带格式内容
function getTxt(Editor){
	var Txt= Editor.getPlainTxt();
	return Txt;
	
}  

//加载初始数据
function loadEditorText(Editor,text,hint){
	  Editor.ready(function() {
		  Editor.setContent(text,false,true,hint);  //赋值给UEditor
	    });
	
};

//销毁百度编辑器
function deleteEditor(Editor) {
	Editor.destroy();
}

//禁止百度编辑器
var DisableEditor=function(editorName){
	
	UE.getEditor(editorName).setDisabled('fullscreen');
};

//百度编辑器可编辑
var EnableEditor=function(editorName){
	
	UE.getEditor(editorName).setEnabled();
};

var incompleteNum = 0;
var completeNum = 0;
//判断文本是否需要填写
/*id : 警告将会显示在此id标签前面
 * 调用 ：   warn("#id",str);
 * */
function warn(id,str){
	var html="";
	if(str==""||str=="null" || str==null ){
		html='<span class="hintico"></span>';
		incompleteNum++;
	}else{
		html='<span class="rightico"></span>';
		completeNum++;
	}
	$(id).prev().remove();
	$(id).before(html);
}
function warnbool(id,bool){
	var html="";
	if(bool!=true){
		html='<span class="hintico"></span>';
		incompleteNum++;
	}else{
		html='<span class="rightico"></span>';
		completeNum++;
	}
	$(id).prev().remove();
	$(id).before(html);
}


//保留一位小数 学分
function scoreValidation(obj,digit){
	
	var score = $(obj).val();
	if(score == "00" ||score == "000"||score == "0000"){
		$(obj).val("0");
	}
	if(score.substring(0,score.length-1) == "0" && isInteger(score*1)){
		$(obj).val(score.replace(/^0*/g,''));
	}
	if(digit!=null||digit==0){
		score=parseInt(score);
		$(obj).val(score);
	}
	 var reg = /.*\..*/;
	 var scoreArr;
	   if (reg.test(score)){
	    	scoreArr = score.split(".");
	    }
	
	if($.trim(score) == "" ){// 如果为空
		$(obj).val("");
		return false;
	}
	
	if(isNaN(score)){
		$(obj).val("");
		return false;
	} else {
		if(digit==null){
		if(score < 0 || score >99){
			score=score+"";
			score=score.substring(0,score.length-1);
			$(obj).val(score);
			return false;
		}
		}else if(digit==0){
			if(score < 0 || score >100){
				score=score+"";
				score=score.substring(0,score.length-1);
				$(obj).val(score);
				return false;
			}	
		}else{
		if(score < 1 || score >600){
			score=score+"";
			score=score.substring(0,score.length-1);
			$(obj).val(score);
			return false;
		}
		}
	}
	if(digit==null){
	if(scoreArr.length >1 ){
		if(scoreArr[1].length>1){
			$(obj).val(scoreArr[0]+"."+scoreArr[1].substr(0,1));//只能输入1位小数
			return null;
		}
	}
	}else{
		$(obj).val(score);
	}
	if(scoreArr.length<=1&&$.trim(score.substr(0,1))=="0"&&$.trim(score).length>1){//验证多个0
		//$(obj).val("");
		return false;
	}
	
	
}
//重新加载js
var reloadJs = function(id){
    var jsObj = document.getElementById(id);
    var src = jsObj.src;
    delete jsObj;
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
};
//置顶 
//jsp 页面底部添加div：  <div class="srollbar-up-btn" style="display:none;" title="<spring:message code='sixthstep_back_to_top'/>"></div>
function  backToTop(){
	$(window).scroll(function () {
		if($(this).scrollTop()>$(window).height()){
			$(".srollbar-up-btn").show();
		}else{
			$(".srollbar-up-btn").hide();
		}
	})
	$('.srollbar-up-btn').bind('click', function(){
		$('body,html').animate({scrollTop: 0}, 'fast');
	})
	
}
/**
 * 清除课程进度缓存
 * @param courseId
 * @returns
 */
function cleanTreeRedis(courseId){
	$.ajax({
		 type:"post",
		 url:basePath+"/course/cleanTreeRedis",
		 data:{"courseId" : courseId},
	      dataType:'json',
	      success:function(data){
	    	}
	})
}
/**
 * <!--添加遮罩 -->
<div style=" z-index:10001;display: none;position: fixed;  top: 0px; left: 0px; right:0px;background-color: #777;  opacity: 0.6; "  id="bgDiv_zz"></div>
<!--添加遮罩 -->
 * @param div
 */

//打开遮罩
function showDetail(div){
	var bgDiv = document.getElementById(div);
    if("offsetwidth" in document.body){
	    bgDiv.style.width = document.body.offsetwidth + "px";
    }
	bgDiv.style.height = screen.height + "px";
	 bgDiv.style.display = "block";	
	
}
//关闭遮罩
function hideDetail(div){
  var bgDiv = document.getElementById(div);
		bgDiv.style.display =  "none";
}
function isInteger(obj) {
	 return Math.floor(obj) === obj;
}




/**
 * 优化火狐页面的跳转问题
 */
function firefoxPageJump(strClass){
	var browserName=getOs();
	$("."+strClass).live("click",function(event){
		if(browserName=="Firefox"){
			event.preventDefault();
			var newwindowHref = $(this).attr("href");
			var newWindowName = $(this).attr("target");
			MyWindow = window.open(newwindowHref,newWindowName);
			if(!MyWindow.closed){
				MyWindow.close();
			}
			MyWindow = window.open(newwindowHref,newWindowName);
			
		}
	})
}

/**
 * 判断浏览器
 * @returns {String}
 */
function getOs()  
{  
    var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";  
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }  
     
}  
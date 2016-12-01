//此处需要外部提供id为courseId的文本框
function getCourseNameByLoginUser(){
	$.ajax({
		type:"post",
		url:basePath+"/course/courseHome/getCourseNameByLoginUser",
		dataType:"json",
		success:function(result){
			//当前的输入的课程id是否是登录人的课程，默认不是
			var flag = false;
			var courseName = '';
			if(result.success == 1 &&result.CourseOpenDtos!='' && result.CourseOpenDtos.length > 0){
				var html = '';
				var firstLine = "";
				var courseId = $("#courseId").val();
				$.each(result.CourseOpenDtos,function(i,u){
					if(courseId != null && courseId!=''){
						if(courseId==u.courseId){
							$("#header_first_title").text(u.name);
							flag = true;//是当前登录人的课程，修改标记位
							courseName = u.name;
							return true; 
						}
					}else{
						if(i==0) $("#header_first_title").text(u.name);
					}
					
					var line = '<li class="clearfix"  onclick="requestHref('+u.courseId+')">';
					line += '<em class="progress-state-icon progress-state-icon-building fl"></em>';
					line += '<div class="course-list-title fl"><a href="javascript:void(0);" style="height:22px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;" >'+u.name+'</a></div>';
					line += '</li>';
					html += line;
				});
				$("#header_ul_selected").html(firstLine + html);
				if(!flag){
					$("#header_first_title").text(zLocale.header_xinjiankecheng);
				}else{
					changeTitleName(courseName);
				}
			}else{
				$("#header_first_title").text(zLocale.header_xinjiankecheng);
				$("#header_ul_selected").html('');
			}
			if(typeof(utilHade) != "undefined"){//存在该方法时，才调用，用于home.jsp上,当前的方法位于home.js
				utilHade();
				$("#getFocusId").val(courseName);
				$("#courseName").val(courseName);
			}
			$(".nano").nanoScroller({alwaysVisible: true});
			if(result.CourseOpenDtos.length>0){
				//=====设置头部下拉课程列表的高度start =====
				setCourseListHeight(result.CourseOpenDtos.length);
				$(".course-list-drop").css("height",height);
				//=====设置头部下拉课程列表的高度end =====
			}
		},
		error:function(){
		}
	});
}
var urls = ['/course/courseHome','/course/home','/course/firstStep','/course/secondStep','/course/thirdStep','/course/fourStep','/course/fifthStep','/course/sixthStep'];
function requestHref(courseId,name){
	var localPath = window.location.href.split("?")[0];
	var url = localPath.replace(basePath,"");
	var flag = false;
	for(var i=0;i<urls.length;i++){
		if(url ==urls[i]){
			flag = true;
			break;
		}
	}
	if(!flag){
		url = '/course/home';
	}
	window.location.href = "/course/courseHome/requestStep?courseId="+courseId+"&courseName="+name+"&url="+url;
}

function createCourse(param){
	
	window.location.href=basePath + "/course/home?isCreate="+param;
}


$(function(){
	getCourseNameByLoginUser();
	$("#new-course-btn-11").bind("click", function(){
		createCourse(1);
	});
});


/**
*change title name
*@param titleName
**/
function changeTitleName(titleName){
	var exp = $("#public_title_name");
	if(typeof(exp) != "undefined"){
		$("#public_title_name").text(titleName);
	}
}

$(document).ready(function(){
	if(z_locale==1){
		$(".i18n-switch-cur").text(zLocale.header_zhongwen);
		$(".i18n-switch-item-CHinse").hide();
	}else if(z_locale==2){
		$(".i18n-switch-cur").text(zLocale.header_yingyu);
		$(".i18n-switch-item-English").hide();
	}
	$(".trees-btn").mouseover(function(){
		if(!$(this).children(".delete-tit").is(":animated")){
			$(this).children(".delete-tit").animate({width:65},300);
		}
	});
	$(".trees-btn").mouseout(function(){
		$(this).children(".delete-tit").animate({width:0},300);
	});
//中英文切换效果
	switchI18n();
	function switchI18n(){
		$(".i18n-switch-cur").click(function(event){
			if(!$(this).hasClass("blur")){
				$(this).addClass("blur");
				$(".i18n-switch-list").show().animate({"right":50},300);
			}else{
				stopSwitchList();	
			}
			event.stopPropagation();
		})
		$(".i18n-switch-list li").click(function(){
			$(".i18n-switch-cur").html($(this).html());
			stopSwitchList();
			changeI18n(this);
		})
		var isOut = true;
		$(".i18n-switch-list").mouseenter(function(){
			isOut = false;	
		});
		$(".i18n-switch-list").mouseleave(function(){
			isOut = true;	
		})
		$(document).click(function (event) { 
			if(isOut){
				stopSwitchList();
			}
		});
	}
	function stopSwitchList(){
		if($(".i18n-switch-cur").hasClass("blur")){
			$(".i18n-switch-cur").removeClass("blur");
		}
		$(".i18n-switch-list").animate({"right":-150},300);
	}
	
	function changeI18n(b){
		var localPath = encodeURI(window.location.href);
		localPath = localPath.replace("&","%26");
		window.location.href = basePath+"/global/index?langType="+$(b).attr("v")+"&targetUrl="+localPath;
	}

});





//生成表单，生成post提交
function postSubmit(url){
	var formElement = document.createElement('form');
    formElement.setAttribute('id','create-form-post-submit');
    formElement.setAttribute('name','create-form-post-submit');
    formElement.setAttribute('action',url);
    formElement.setAttribute('method','post');
    document.body.appendChild(formElement);
    if(arguments.length > 2){
    	for(var i=1;i<arguments.length;){
    		var inputElement = document.createElement('input');
    		inputElement.setAttribute('type','hidden');
    		inputElement.setAttribute('name',arguments[i]);
    		inputElement.setAttribute('value',arguments[i+1]);
    		i+=2;
    		formElement.appendChild(inputElement);
    	}
    }
    formElement.submit();//提交表单
}

/**
 * 设置头部下拉课程列表的高度
 * @param courseCount 课程数量
 */
function setCourseListHeight(courseCount){
	height = 105;
	var titleCourse = $("#header_first_title").text();
	if(titleCourse=="Creating a Course"){
		height += (courseCount)*43;
	}else{
		if(courseCount!=0){
			height += (courseCount-1)*43;
		}
	}
	if(height>330){
		height = 330;
	}
}
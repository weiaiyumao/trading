/**
 * 建课第一步:js
 */

//教师团队头像 默认
var httpInstructorEN= "http://image.zhihuishu.com/zhs_yanfa_150820/ablecommons/demo/201608/519fae084df9460a962657dd69e98ac9.jpg";//英文图片
var httpInstructorZH= "http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/4141be2276f8405883cf75939e4801cc.jpg";//中文图片
var className="layerImageShow";
//课程片花的封面
var httpPromoVideo="http://image.zhihuishu.com/testzhs/able-commons/demo/201609/1ffee29189244b5ca9882c93517aa54e.jpg";
//课程封面
var httpCourseImg ="http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/4a3cd3d559654159bfdb74de065f734d.jpg";
//上传片花未转码默认图片
var promoVideoImg = "/assets/image/223X125.jpg";
//页面加载完毕后调用
$(function(){
	init();	
	//置顶
	backToTop();
   //先修课程添加监听	
	prerequisiteEditor.addListener("blur", function (type, event) {
		
		titPWarn('#tit-p-prerequisite',getTxt(prerequisiteEditor).trim());
			
		updateCourse("courseAcademicPrepare",getTxt(prerequisiteEditor).trim()==""?"":plainTxt(prerequisiteEditor));
	});
	// 去除 面对面学时数 和 视频课时数 的小数点
	$("#hours_video_lectures,#face_to_face_lectures").bind("keyup",function(){
		var hours_video_lectures = $('#hours_video_lectures').val();
		var face_to_face_lectures = $('#face_to_face_lectures').val();
		 $('#hours_video_lectures').val(hours_video_lectures.replace(/\D/g,''));
		 $('#face_to_face_lectures').val(face_to_face_lectures.replace(/\D/g,''))
	});
	//通过bind()绑定失去焦点事件
	$("#hours_video_lectures,#face_to_face_lectures").bind("blur",function(){addHourseFaceLectures()});
	$("#course_title").bind("keyup",function(){courseTitelLength()});
	
	
	$("#course_title").bind("blur",function(){
		$(".coursetitle-input").css("border","");
		titPWarn('#tit-p-coursetitle',$('#course_title').val());
	});
	$("#instiution").bind("blur",function(){titPWarn('#firststep_institutuion',$('#instiution').val().trim());});
	$("#credits_score").bind("blur",function(){warnCreditsScore('#tit-p-credits',$('#credits_score').val());});
	
});
//页面初始化后调用的函数
function init(){
	onblurUpdateCourse();
	selectCourseInstructor();
	selectTblCourse();
	addCourseInsetuctor();
	courseTitelLength();
	showInternationalization();
	addHourseFaceLectures();
	searchPromoVideo();
	showWarn();
	nextAction();
	
	//图片弹窗绑定
	//public_ImageShow();
};


//页面打开时加载的警告 时勾还是感叹号
function showWarn(){
	titPWarn('#tit-p-coursetitle',$('#course_title').val());
	titPWarn('#tit-p-category',$("#course_Category").val());
	titPWarn('#firststep_institutuion',$('#instiution').val());
	warnCreditsScore('#tit-p-credits',$('#credits_score').val());
	warnImg('#tit-p-courseimg',$(".singlePhoto>img").attr("src"),httpCourseImg);
	warnImg('#tit-p-pianhua',$("#PromoVideo-id").attr("src"),httpPromoVideo);
	
	
}

// 判断各个文本框是否有值 显示对号还是感叹号
function titPWarn(id,str){
	warnSymbol(id,str);
}

function titPwarnBool(id,bool){
	warnboolSymbol(id,bool);
}
//点击 Add Instructor 增加一个教学团队
function addCourseInsetuctor(){
	$("#addCourseInstructor-addfont").click(function(){
		addInstructor(1);
		searchInstructorFull(httpInstructorEN,httpInstructorZH);
	});
}
//各个文本框失去焦点的事件 -- 修改课程
function onblurUpdateCourse(){
	$("#course_title").bind("blur",function(){
		var val = $("#course_title").val();
		if(val.trim() == "" || val.trim() == null) return false;
		$("#public_title_name").text(val);
		$("#header_first_title").text(val);
		updateCourse("name",val);
	});
	$("#instiution").bind("blur",function(){updateCourse("institute",$("#instiution").val().trim());});
	$("#credits_score").bind("blur",function(){updateCourse("credit",$("#credits_score").val());});
	$("#hours_video_lectures").bind("blur",function(){updateCourse("onlineCoursePeriod",$("#hours_video_lectures").val());});
	$("#face_to_face_lectures").bind("blur",function(){updateCourse("meetCoursePeriod",$("#face_to_face_lectures").val());});
	//课程类别添加change()事件
	$("#course_Category").on("change",function(){
		updateCourse("courseCategory",$("#course_Category").val());
		titPWarn('#tit-p-category',$("#course_Category").val());
		judgeCateGory()
	})
}

// 修改课程 提交
function updateCourse(name,value){
	var dataParm = {"courseId" : $("#courseId").val()};
	dataParm[name] = value;
	$.ajax({
		type: "post",
	    url: basePath+"/course/firstStep/updateCourseInfo",
	    data:dataParm,
//	    cache : false,
	    dataType : 'json',	
	    beforeSend:function(){},
	    success: function(data){},
	    error:function(data){},
	    complete:function(){}
	});
}


//======del Instructor==== 删除教学团队=======//
function delInstructior(index){
	var value = $("#id-"+index+"").val();
	layer.confirm(zLocale.public_message, {
 	   title:' ', 
 	   icon:0,
	   shade:.6,
 	   skin: 'layui-layer-zhs',
 	   btn: [zLocale.public_confim,zLocale.public_cancel], //按钮  
 	 }, function(){ 
 		 if(value != "" && value != undefined && value != null){
 			$.ajax({
 				type: "post",
 			    url: basePath+"/course/firstStep/delCourseSpeaker",
 			    data:{
 			    		"id" : value,
 			    	},
 			    dataType : 'json',	
 			    beforeSend:function(){},
 			    success: function(data){
 			    	if(data){
		    		  layer.msg(zLocale.public_message_success, {
         	    	     time: 1000, //2s后自动关闭
         	    	  });
 			    		$(".information-divTitle").find("#information-div-"+index+"").remove();
 			    		searchInstructorFull(httpInstructorEN,httpInstructorZH);
 			    	}
 			    },
 			    error:function(data){},
 			    complete:function(){}
 			});
 		 } else {
 			 if(true){
				layer.msg(zLocale.public_message_success, {
	 	    	    time: 1000, //2s后自动关闭
	 	    	 });
 				$(".information-divTitle").find("#information-div-"+index+"").remove();
 				searchInstructorFull(httpInstructorEN,httpInstructorZH);
 			 }
 		 }
 	 }, function(){
 	 });
	
}


// 根据课程Id 查询所有的课程
function selectTblCourse(){
	$.ajax({
		type: "post",
	    url: basePath+"/course/firstStep/queryCourseInfo",
	    data:{
	    	"courseId" : $("#courseId").val(),
	    	},
	    async: false,
	    dataType : 'json',	
	    beforeSend:function(){},
	    success: function(response){
	    	if(response != null){
	    		titPWarn('#tit-p-prerequisite',response.courseAcademicPrepare);
	    		$("#course_title").val(response.name);//Course Title
    	    	$("#courseImageShow").attr('src',response.img); //Course Image
    	    	$("#instiution").val(response.institute);//Institution
    	    	$("#credits_score").val(response.credit);//Credits
    	    	$("#hours_video_lectures").val(response.onlineCoursePeriod);//Class Hours of Video Lectures
    	    	$("#face_to_face_lectures").val(response.meetCoursePeriod);//Class Hours of Face to Face Lectures
    	    	$("#course_Category").val(response.courseCategory);
    	    	judgeCateGory()
    	    	loadEditorText(prerequisiteEditor,response.courseAcademicPrepare==null?"":response.courseAcademicPrepare);
    	    	$("#linkCourseId").val(response.linkCourseId);
    	    	if(response.img != null && response.img != ""){
    	    		$(".singlePhoto>img").attr("src",response.img);
    	    		$(".singlePhoto>img").addClass("layerImageShow");
    	    		$(".singlePhoto>img").show();
    	    		
    	    		$("#_uploadCourseImageDiv").removeClass("uploadBtn_courseTitle");
    	    		$("#_uploadCourseImageDiv").addClass("setedit_editico");
    	    		$("#course_Image").val("test");
    	    		uploadCourseImage();
    	    		
    	    		//图片弹窗绑定
					//public_ImageShow();
    	    	}
    	    	
    	    	addHourseFaceLectures();
    	    	courseTitelLength();
    	    	
	    	}
	    },
	    error:function(data){
	    	
	    },
	    complete:function(response){
	    }
	});
}

// 查询所有的教师团队
function selectCourseInstructor(){
	$.ajax({
		type: "post",
	    url: basePath+"/course/firstStep/courseSpeakearList",
	    data:{
	    	"courseId" : $("#courseId").val(),
	    	},
	    dataType : 'json',	
	    beforeSend:function(){},
	    success: function(response){
	    	// 判断是否有教学团队 存在的话则创建教学团队的div,如果不存在教学团队 则默认创建一个
	    	if(response != null ){
	    		if(response.courseSpeakearList.length > 0) {
	    			for(var i=0;i<response.courseSpeakearList.length;i++){
	    				if(i == 0){
	    					addInstructorData(2,response.courseSpeakearList[i],className);
	    				} else {
	    					addInstructorData(1,response.courseSpeakearList[i],className);
	    				}
	    			}
	    			initUploader();
	    		} else {
		    		addInstructor(2);
		    	}
	    		searchInstructorFull(httpInstructorEN,httpInstructorZH);
	    	} 
	    },
	    error:function(data){},
	    complete:function(){}
	});
}

// 教师团队 增加或者修改 （如果 value 存在则做增加 否则则做修改）
// value 是COURSE_SPEAKER 中的Id floorIndex 是第几层需要做修改
function addUpdateCourseInstructor(floorIndex){
	var value = $("#id-"+floorIndex+"").val();
	var imgSrcValue = $("#firstStep_courseInstructorImg-"+floorIndex+"").attr("src");
	
//	console.log("en:"+imgSrcValue +"=="+ httpInstructorEN );
//	console.log("zh:"+imgSrcValue +"=="+ httpInstructorZH );
//	
//	console.log("en:"+  imgSrcValue == httpInstructorEN );
//	console.log("zh:"+  imgSrcValue == httpInstructorZH);
//	console.log();
	

	if(value != ""){
		// 则做修改
		$.ajax({
			type: "post",
		    url: basePath+"/course/firstStep/updateSpeakerCourse",
		    data:{
		    	"courseId" : $("#courseId").val().trim(),
		    	"id" : value,
		    	 "username": $("#username-"+floorIndex+"").val().trim(),
		    	 "jobstatus" : $("#jobstatus-"+floorIndex+"").val().trim(),
		    	 "decription" : $("#decription-"+floorIndex+"").val().trim(),
		    	 "userType" : $("#userType-"+floorIndex+"").val(),
		    	 "img" :  imgSrcValue,
		    	},
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	searchInstructorFull(httpInstructorEN,httpInstructorZH);
		    },
		    error:function(data){},
		    complete:function(){}
		});
	} else {
		//则做增加
		$.ajax({
			type: "post",
		    url: basePath+"/course/firstStep/saveSpeakerCourse",
		    data:{
		    	"courseId" : $("#courseId").val().trim(),
		    	"username": $("#username-"+floorIndex+"").val().trim(),
		    	"jobstatus" : $("#jobstatus-"+floorIndex+"").val().trim(),
		    	"decription" : $("#decription-"+floorIndex+"").val().trim(),
		    	"userType" :$("#userType-"+floorIndex+"").val().trim(),
		    	 "img" : imgSrcValue,
		    	},
		    dataType : 'json',
		    async: false,
		    beforeSend:function(){},
		    success: function(response){
		    	console.log("response"+floorIndex);
		    	if(response != null){
		    		$("#id-"+floorIndex+"").val(response.speakerOpenDto[0]);
		    		$("#ahref-"+floorIndex+"").attr("href","javascript:delInstructior("+floorIndex+","+response.speakerOpenDto[0]+")");
		    	}
		    	searchInstructorFull(httpInstructorEN,httpInstructorZH);
		    },
		    error:function(data){},
		    complete:function(response){
		    }
		});
	}
}


//查询片花
function searchPromoVideo(){
	var value = $("#linkCourseId").val();
	if(value != "" && value != null){
		$.ajax({
			type: "post",
		    url: basePath+"/course/firstStep/searchCourseClipse",
		    data:{
		    	"clipsId" : value,
		    	},
		    dataType : 'json',
		    async: false,
		    beforeSend:function(){},
		    success: function(response){
		    	// 判断是否有教学团队 存在的话则创建教学团队的div,如果不存在教学团队 则默认创建一个
		    	if(response != null ){
		    		if(response.videoId != null && response.clipsId != null){
		    			PromoVideoImg(response.videoId,response.clipsId);
		    		} 
		    	} 
		    },
		    error:function(data){},
		    complete:function(){
		    	
		    }
		});
	}
}

// 查询视频片花封面 视频id 
function PromoVideoImg(ids,clipsId){
	$.ajax({
		type: "post",
	    url: basePath+"/course/firstStep/updatePromoVideoImg",
	    data:{
	    	"courseId" : $("#courseId").val(),
	    	"ids" : ids,
	    	 "clipsId" : clipsId,
	    	},
	    dataType : 'json',	
	    beforeSend:function(){},
	    success: function(response){
	    	if(response != null && response != ""){
	    		if(response.dto != "" && response.dto != ""){
	    			var img = response.dto.videoImage;
	    			
	    			$("#uploadBtn_promoVideo-Div").removeClass("uploadBtn_promoVideo");
    	    		$("#uploadBtn_promoVideo-Div").addClass("setedit_editico");
	    			if(response.dto.videoImage == ""){
	    				img = promoVideoImg;
	    				$("#uploadPromoVideo-div #PromoVideo>.message").show();
	    				$("#uploadPromoVideo-div #PromoVideo>.imageIcon").hide();
	    			}else{
	    				$("#uploadPromoVideo-div #PromoVideo>.message").hide();
	    	    		$("#uploadPromoVideo-div #PromoVideo>.imageIcon").show();
	    			}
	    			
	    			$("#linkCourseId").val(response.dto.clipsId);
	    			$("#videoSrc").val(response.dto.videoId);
	    			$("#videoSrc").attr("src",response.dto.videoPath);
	    			
	    			$("#uploadPromoVideo-div #PromoVideo>img").attr("src",img);
					$("#uploadPromoVideo-div #PromoVideo>img").show();
					
	    			uploadPromoVideo();
	    			videoInit();
	    			$("#tit-p-pianhua").prev().remove();
	    			$("#tit-p-pianhua").before('<span class="rightico"></span>');
	    			$("#PromoVideo").addClass("uploadPromo-div PromoVideo");
	    			$(".uploadPromo-div span").show();
	    			$(".uploadPromo-div").find("span").addClass("spanIcon");
	    		} 
	    	}   	
	    },
	    error:function(data){},
	    complete:function(){}
	});
}


function nextAction(){
	$(".btn-Style").click(function(){
		var courseId = $("#courseId").val();	
		location="secondStep?courseId="+courseId;
	});
}


//判断所有的教师团队内容是否填写完整
function searchInstructorFull(strImgEN,strImgZH){
	var bool1 = false;
	var bool2 = false;
	var bool3 = false;
	$(".information-divTitle").find("input[type=text]").each(function(){
		if($(this).attr("value").trim() != null && $(this).attr("value").trim() != ""){
			bool1 = true;
		} else {
			bool1 = false;
			titPwarnBool("#tit-p-courseinstructor",bool1);
			return false;
		}
	});
	 $(".information-divTitle").find("img").each(function(){
		 var src = $(this).attr("src").toLocaleLowerCase();
		 if(src != null && src !=""){
			 if(src == strImgEN || src == strImgZH ){
				 bool2 = false;
				 titPwarnBool("#tit-p-courseinstructor",bool2);
				 return false;
			 }
			 bool2 = true;
		 } else{
			 bool2 = false;
			 titPwarnBool("#tit-p-courseinstructor",bool2);
			 return false;
		 }
	 });
	 $(".information-divTitle").find("textarea").each(function(){
		 if($(this).attr("value").trim() != null && $(this).attr("value").trim() != ""){
			 bool3 = true;
		 } else {
			 bool3 = false;
			titPwarnBool("#tit-p-courseinstructor",bool3);
			return false;
		 }
	 });
	if(bool1== true && bool2 == true && bool3 == true){
		titPwarnBool("#tit-p-courseinstructor",true);
	}
}


//记录 课程名称的长度
function courseTitelLength(){
	var course_title = $("#course_title").val();
	var len ;// 记录长度
	if(course_title.length > 120){
		$("#course_title").val(course_title.substr(0,120));
		len = 0;
	} else {
		len = 120 - course_title.length;
	}
	$("#course_title_maxSum").html(len);
}

//因为图片过来的有默认的 所以 应该再传过来一个图片默认的 
function warnImg(id,str,strImg){
	var html="";
	if(str==""||str=="null" || str==null ){
		html='<span class="hintico"></span>';
		var htm = html.substr(13,7);
	} else if (str == strImg ){
		html='<span class="hintico"></span>';
		var htm = html.substr(13,7);
	}else{
		html='<span class="rightico"></span>';
		var htm = html.substr(13,8);
	}
	var pre = $(id).prev().attr("class");
	$(id).prev().remove();
	$(id).before(html);
	if(pre !=undefined && pre!=htm){
		 var value= $("#courseId").val();
		 if(value != '' && value != undefined && value != null ){
			 $.ajax({
				 type:"post",
				 url:basePath+"/course/cleanTreeRedis",
	 			 data:{"courseId" : value},
 			      dataType:'json',
 			      success:function(data){
 			    		
 			    	}
			 })
		 }
		 
	}
}

// 如果学分是0 或者 0.0 还是警告的提示框
function warnCreditsScore(id,str){
	var html="";
	if(str==""||str=="null" || str==null ){
		html='<span class="hintico"></span>';
		var htm = html.substr(13,7);
	}else{
		if(str == "0.0" || str == "0"|| str == "00"|| str == "000"|| str == "0000"){
			html='<span class="hintico"></span>';
			var htm = html.substr(13,7);
		} else {
			html='<span class="rightico"></span>';
			var htm = html.substr(13,8);
		}
	}
	var pre = $(id).prev().attr("class");
	$(id).prev().remove();
	$(id).before(html);
	if(pre !=undefined && pre!=htm){
		 var value= $("#courseId").val();
		 if(value != '' && value != undefined && value != null ){
			 $.ajax({
				 type:"post",
				 url:basePath+"/course/cleanTreeRedis",
	 			 data:{"courseId" : value},
 			      dataType:'json',
 			      success:function(data){
 			    		
 			    	}
			 })
		 }
		 
	}
}

//======Add Instructor==== 增加教学团队 type 2 是课程主讲人，1 是助教== 默认添加一个空的教学团队div=====//
function addInstructor(type){
	var lastDiv = $(".information-divTitle").find(".information-div").last();
	var addDiv=$("#addCourseInstructor-addfont").parent();
	var id = $(lastDiv).attr("id").split("-");
	var ids = id[2];
	++ids;
	var div =  '<div class="information-div" type="'+type+'" id="information-div-'+ids+'" floor="'+ids+'"> ';
	div += '<a id="ahref-'+ids+'" href="#"> ';
	if(type =="1"){
		div+='<span class="informationdelete-ico"></span>';
	}
	div += '</a>';
	div += '<div class="information-l fl">';
	div += '<div class="manyPhoto">';
	div += '<img style="display:none;" class="layerImageShow" id="firstStep_courseInstructorImg-'+ids+'" src="" />';
	
	div += '<div class="uploadBtn_courseInstructor" id="courseInstructorImgsDiv-'+ids+'">';
	div += '<span  id="aspUploadImags-'+ids+'"></span>';
	div += '</div>';
	
	div += '</div>';
	div += '</div>';
	div += '<div class="information-r fl">';
    div += '<ul>';
    div += '<li style="display:none"><input name="id" id="id-'+ids+'"  type="text"></li>';
    div +='<li><input style= "overflow:hidden; resize:none;" name="username"  maxlength="30" onblur="addUpdateCourseInstructor('+ids+')" id="username-'+ids+'" value="" class="fullname getFocus"  type="text"/></li>';
    div +='<li><input style= "overflow:hidden; resize:none;" name="jobstatus" maxlength="30" onblur="addUpdateCourseInstructor('+ids+')"  id="jobstatus-'+ids+'" value="" class="title getFocus"  type="text"/></li>';
    div +='<li><textarea style= "overflow:hidden; resize:none;" name="decription" onblur="addUpdateCourseInstructor('+ids+')" id="decription-'+ids+'" value= "" class="personalprofile getFocus" cols="" rows=""></textarea></li>';
    div += '<li style="display:none"><input name="userType" id="userType-'+ids+'"  value="'+type+'" type="text"></li>';
    div +='</ul>';
    div +='</div>';
    div +='</div>';
    addDiv.before(div);
	$("#ahref-"+ids+"").attr("href","javascript:delInstructior("+ids+")");
	$("#username-"+ids+"").attr("placeholder",zLocale.firststep_jiangshimingcheng);
	$("#jobstatus-"+ids+"").attr("placeholder",zLocale.firststep_jiangshizhiwei);
	$("#decription-"+ids+"").attr("placeholder",zLocale.firststep_jiangshijianjie);
	ResizeTextarea(ids);
	loadAspUpload();
}


//======Add Instructor==== 增加教学团队 type 2 是课程主讲人，1 是助教=======//
function addInstructorData(type,data,className){
	var lastDiv = $(".information-divTitle").find(".information-div").last();
	var id = $(lastDiv).attr("id").split("-");
	var ids = id[2];
	++ids;
	var div =  '<div class="information-div" type="'+type+'" id="information-div-'+ids+'" floor="'+ids+'"> ';
	div += '<a id="ahref-'+ids+'" href="#"> ';
	if(type == 1){
		div += '<span class="informationdelete-ico"></span>';
	}
	div += '</a>';
	div += '<div class="information-l fl">';
	div += '<div class="manyPhoto">';
	
	
	if(data.img.length !=0){
		div += '<img id="firstStep_courseInstructorImg-'+ids+'" class="layerImageShow" src="'+data.img+'" />';
		div += '<div class="setedit_editico" id="courseInstructorImgsDiv-'+ids+'">';
		div += '<span  id="aspUploadImags-'+ids+'"></span>';
		div += '</div>';
	}else{
		div += '<img style="display:none;" id="firstStep_courseInstructorImg-'+ids+'"  src="" />';
		div += '<div class="uploadBtn_courseInstructor" id="courseInstructorImgsDiv-'+ids+'">';
		div += '<span  id="aspUploadImags-'+ids+'"></span>';
		div += '</div>';
	}
		
	div += '</div>';
	div += '</div>';	
	div += '<div class="information-r fl">';
    div += '<ul>';
    div +='<li style="display:none"><input name="id" id="id-'+ids+'"  value="'+data.id+'" type="text"></li>';
    div +='<li><input style= "overflow:hidden; resize:none;" name="username" maxlength="30" class="fullname getFocus" onblur="addUpdateCourseInstructor('+ids+')" id="username-'+ids+'" value="'+data.username+'" class="fullname getFocus"  type="text"/></li>';
    div +='<li><input style= "overflow:hidden; resize:none;" name="jobstatus" maxlength="30" class="title getFocus" onblur="addUpdateCourseInstructor('+ids+')"  id="jobstatus-'+ids+'" value="'+data.jobstatus+'" class="title getFocus"    type="text"/></li>';
    div +='<li><textarea style= "overflow:hidden; resize:none; " name="decription" class="personalprofile getFocus" onblur="addUpdateCourseInstructor('+ids+')" id="decription-'+ids+'" class="personalprofile getFocus" cols="" rows="">'+data.decription+'</textarea></li>';
    div += '<li style="display:none"><input name="userType" id="userType-'+ids+'"  value="'+type+'" type="text"></li>';
    div +='</ul>';
    div +='</div>';
    div +='</div>';
	$(lastDiv).after(div);

	$("#ahref-"+ids+"").attr("href","javascript:delInstructior("+ids+")");
	$("#username-"+ids+"").attr("placeholder",zLocale.firststep_jiangshimingcheng);
	$("#jobstatus-"+ids+"").attr("placeholder",zLocale.firststep_jiangshizhiwei);
	$("#decription-"+ids+"").attr("placeholder",zLocale.firststep_jiangshijianjie);
	ResizeTextarea(ids);
	
}


//计算 面对面课时数 和 视频课时数 的值
function addHourseFaceLectures(){
	var bool = false;
	var hours_video_lectures = $('#hours_video_lectures').val();
	var face_to_face_lectures = $('#face_to_face_lectures').val();
	var total_class_hours = Number(hours_video_lectures) + Number(face_to_face_lectures);
	if(hours_video_lectures != "" && hours_video_lectures != null 
		&& face_to_face_lectures != "" && face_to_face_lectures != null){
		if(hours_video_lectures == "00" || hours_video_lectures == "0"
			|| face_to_face_lectures == "00" || face_to_face_lectures == "0"){
				bool = false;
		} else {
			bool = true;
		}
			
	}
	$("#total_class_hours").html (zLocale.firstsetp_zongxueshi +":<span class='totalhours-span'>"+total_class_hours+"</span>");
	$("#totalhours-span-id").attr("class","totalhours-span");
	titPwarnBool(("#tit-p-keshishu"),bool);
	//将总学时添加到数据库
	updateCourse("period",total_class_hours);
}

function showInternationalization(){
	var value = $("#linkCourseId").val();
	if(value == ""){
		if(zLocale.z_language == 1 ){
			//$("#uploadPromoVideo").removeClass();
			$("#uploadPromoVideo").addClass("uploadBtn_promoVideo_zh");
		} else if (zLocale.z_language == 2){
			//$("#uploadPromoVideo").removeClass();
			$("#uploadPromoVideo").addClass("uploadBtn_promoVideo_en");
		}
	}
}


//textarea 高度自适应
//最小高度
var minRows = 2;
// 最大高度，超过则出现滚动条
var maxRows = 250;
function ResizeTextarea(index) {
	var t = document.getElementById('decription-'+index+'');
	if (t.scrollTop == 0)
		t.scrollTop = 1;
	while (t.scrollTop == 0) {
		if (t.rows > minRows)
			t.rows--;
		else
			break;
		t.scrollTop = 1;
		if (t.rows < maxRows)
			t.style.overflowY = "hidden";
		if (t.scrollTop > 0) {
			t.rows++;
			break;
		}
	}
	while (t.scrollTop > 0) {
		if (t.rows < maxRows) {
			t.rows++;
			if (t.scrollTop == 0)
				t.scrollTop = 1;
		} else {
			t.style.overflowY = "auto";
			break;
		}
	}
	if($("#decription-"+index+"").val() == "" || $("#decription-"+index+"").val() == null){
		$("#decription-"+index+"").attr("rows","");
	}
}
//当课程类别有值时，隐藏请选择课程类别
function judgeCateGory(){
	if($("#course_Category").val()!=null && $("#course_Category").val()!="" && $("#course_Category").val()!="null"){
		$("#course_Category_choose").remove();
	}
}
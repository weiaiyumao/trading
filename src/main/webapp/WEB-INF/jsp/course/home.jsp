<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
 <%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8"> 
<title><spring:message code='title_jiankeshouye'/></title>
<link href="${ctx}/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/home.css?version=${cssJsVersion}" rel="stylesheet" />
<script src="http://assets.zhihuishu.com/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/public/scrollbar.js"></script> 
<script src="${ctx}/assets/js/public/jquery.poshytip-min.js" type="text/javascript"></script>
</head>   
<body>

<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-firststep-div  createcoursehome-div createcoursehome-wrap" >
<div class="coursetit-input" id="home_btn">
<input type="hidden" id="courseId" name="courseId" value="${CURRENT_SELECT_COURSEID}"/>
<input type="hidden" id="courseName" name="name" value="${CURRENT_SELECT_COURSENAME}"/>
<p class="hometit-p"> 
<span class="course_hometite_span" title="${CURRENT_SELECT_COURSENAME}">${CURRENT_SELECT_COURSENAME}</span>
<a href="javascript:void(0);" class="editico" id="editico_id" style="line-height: 48px"></a></p>
<div  style="display:none;" class="text_title">
<input type="text" placeholder='<spring:message code="home_mingchengkaishi"/>'  id="getFocusId" class="getFocus" data-tags="<spring:message code="home_mingchengkaishi"/>" name="courseName" maxlength="120" ></div></div>
<div class="createcourse-home-div clearfix">
	<div class="createcourse-home-bg"></div>
    <div class="content-left fl" id="lf-location">  
    	<div class="progresstree_div">
        	<a class="progress-tree-wrap" href="javascript:void(0)" target="${CURRENT_SELECT_COURSEID}" id="intoHome">
        		<div class="progresstreediv  progresstree-${courseProgressDto.resultPercent}" id="addprogresstree"></div>
                <span  class="homepage-show" > 
                  <span class="viewcourse-ico"></span><spring:message code="home_chakankechengzhuye"/>
                </span> 
            	<span class="percentfont" id="percentfontId">
            	  <c:if test="${not empty courseProgressDto.error}"><spring:message code="home_error"/></c:if>
            	  <c:if test="${empty courseProgressDto.error}">${courseProgressDto.progressValue}%</c:if>
            	</span>
            	 <input type="hidden" id="percentage" value="${courseProgressDto.progressValue}">
            </a>
	            <span class="trees-btn">
		            <span class="treesbtn-span" id="treesbtnSlaw">
			            <span class="delete-tit" style="width:0px;"  id="delteimg"><spring:message code="home_shanchu"/>
			            </span>
		            </span>
	            </span>
        </div>
    </div>
    <div class="content-right fr" id="ulAll">
    	<ul id="li_index"> 
        	<li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_diyibujibenxinxi"/></a></li>
            <li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_dierbugaiyaosheji"/></a></li>
            <li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_disanbushipinjiaocheng"/></a></li>
            <li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_disibujianmkecheng"/></a></li>
            <li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_diwubukaohecelue"/></a></li>
            <li><a href="javascript:void(0);" class="graybg el bluebg"><spring:message code="home_diliubufabu"/></a></li> 
        </ul>
    </div>
  </div>
</div>
<%@ include file="/WEB-INF/jsp/common/footer.jsp"%>
<script>
	
	//头部下拉所用到的js  
	$(".course-list-wrap").hover(function(){
		if(!$(this).find(".course-list-drop").is(":animated")){
			$(this).find(".course-list-drop").slideDown(300);
			$(".nano").nanoScroller({alwaysVisible: true});
		}
	},function(){
		$(this).find(".course-list-drop").slideUp(300);	
	})
	$(".user-info-wrap").hover(function(){
		if(!$(this).find(".user-operate-list").is(":animated")){
			$(this).find(".user-operate-list").slideDown(300);
		}
	},function(){
		$(this).find(".user-operate-list").slideUp(300);	
	})
	
</script>
<script src="${ctx}/assets/js/course/home.js?version=${cssJsVersion}" type="text/javascript" ></script>
</body>
</html>

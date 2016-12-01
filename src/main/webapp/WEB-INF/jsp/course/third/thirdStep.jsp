<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<title><spring:message code='title_shipinjiaocheng'/></title>

<%--上传组件与播放器 css--%>
<%@include file="/WEB-INF/jsp/common/public-upload-css.jsp"%>
<%@include file="/WEB-INF/jsp/common/public-player-css.jsp"%>

<%--自定义--%>
<%--<link href="${ctx}/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet"/>--%>
<link href="${ctx}/assets/css/os_base_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet"/>
<%--<link href="${ctx}/assets/css/creatcourse/creatcourse-home.css?version=${cssJsVersion}" rel="stylesheet"/>--%>
<link href="${ctx}/assets/css/coursestep/coursestep1.css?version=${cssJsVersion}" rel="stylesheet"/>
<%--<link href="${ctx}/assets/css/coursestep/thirdStep.css?version=${cssJsVersion}" rel="stylesheet"/>--%>
<%--thirdStep_common存放UI定义公共css,若遇到中英环境下显示不同，需要抽出来在thirdStep_en和thirdStep_zh中分别定义--%>
<link href="${ctx}/assets/css/coursestep/thirdStep_common.css?version=${cssJsVersion}" rel="stylesheet"/>
<link href="${ctx}/assets/css/coursestep/thirdStep_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet"/>
<%--thirdStep_ext 额外的公共样式--%>
<link href="${ctx}/assets/css/coursestep/thirdStep_ext.css?version=${cssJsVersion}" rel="stylesheet"/>
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<%--ie9及以下hover失效问题--%>
<!--[if lte IE 9 ]>
    <link href="${ctx}/assets/css/coursestep/refer_ie_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet" />
<![endif]-->

<%--百度编辑器--%>

<!-- 视频设置引用 -->
<link href="${ctx}/assets/css/creatcourse/creatcourse-popup_${z_locale_code}.css" rel="stylesheet" />
<link href="${ctx}/assets/css/course/thirdStep-upload.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />


<%--上传组件 js 问题多多 必须放在这儿 不然导致其它js失效--%>
<%@include file="/WEB-INF/jsp/common/public-upload-js.jsp"%>
<%@include file="/WEB-INF/jsp/common/public-player-js.jsp"%>

<!-- 公共的上传样式 -->
<%--<%@include file="/WEB-INF/jsp/course/third/upload.jsp"%>--%>
</head>
<style>
/*input {*/
    /*color: black;*/
/*}*/
</style>
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<%--加上hidden防止刷新时一闪而过--%>
<%--<div class="hidden">--%>
<div id="toupdatapopup">
 <%@ include file="/WEB-INF/jsp/course/third/updata-popup.jsp"%> 
 </div>
  <%@ include file="/WEB-INF/jsp/course/third/testType.jsp"%> 
 <%@ include file="/WEB-INF/jsp/course/third/videopopup.jsp" %>
<%--</div>--%>
<input type="hidden" value="" id="up">
<div class="createcourse-div">
    <%--hidden area--%>
    <input id="courseId" type="hidden" value="${courseId}"/>
    <input id="initialHash" type="hidden" value="${hash}"/>
	<!-------createcourse-nav start-------->
	<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
    <!-------createcourse-nav end-------->

    <!-- 此处加公共头部 -->
    <%--出错提示 start--%>
    <%@include file="/WEB-INF/jsp/course/third/loadingerror.jsp"%>
    <%--出错提示 end--%>

    <div class="stepconter-div stepconter-third visible-none" style="visibility: hidden;">
        <div class="chapterContainer">
            <jsp:include page="proto/chapterPrototype.jsp">
                <jsp:param name="type" value="PLACEHOLDER" ></jsp:param>
            </jsp:include>
        </div>
        <%--占位显示-end--%>
        <div class="finalExamContainer">
            <%--占位显示start--%>
            <jsp:include page="proto/finalExamPrototype.jsp">
                <jsp:param name="type" value="PLACEHOLDER" ></jsp:param>
            </jsp:include>
            <%--占位显示-end--%>
         </div>
    </div>
<!--添加遮罩 -->
<div style=" z-index:10001;display: none;position: fixed;  top: 0px; left: 0px; right:0px;background-color: #777;  opacity: 0.6; "  id="bgDiv_zz"></div>
<!--添加遮罩 -->
    <%--footer start--%>
    <div class="nextbtn-div">
        <a href="${ctx}/course/secondStep?courseId=${courseId}" class="btn-Style bluebg mr10"><spring:message
                code="thirdstep_shangyibu"/></a>
        <a href="${ctx}/course/fourStep?courseId=${courseId}" class="btn-Style greenbg"><spring:message
                code="thirdstep_xiayibu"/> </a>
    </div>
    <%--footer end--%>

    <%@include file="/WEB-INF/jsp/common/footer.jsp"%>

    <%--right nav start--%>
    <%@include file="proto/rightNavTreePrototype.jsp" %>
    <%--right nav end--%>

    <div id="blankAreaForNav">
    </div>
</div>


</body>

<%--原型区域，用来clone--%>
<div class="hidden container">
    <%@include file="proto/chapterPrototype.jsp" %>
    <%@include file="proto/finalExamPrototype.jsp" %>

    <%--考试题目类型proto--%>
    <div class="hidden questions">
        <span class="question-item-type question-item-type-choice fl ellipsis-blur"><spring:message code='thirdstep_xuanzheti'/></span>
        <span class="question-item-type question-item-type-blank fl ellipsis-blur"><spring:message code='thirdstep_tiankongti'/></span>
        <span class="question-item-type question-item-type-true-fales fl ellipsis-blur"><spring:message code='thirdstep_panduanti'/></span>
        <span class="question-item-type question-item-type-essay fl ellipsis-blur"><spring:message code='thirdstep_wendati'/></span>
    </div>

    <%--百度编辑器使用--%>
    <div class="hidden" id="baiduEditor">
    </div>
</div>


<%--百度编辑器--%>
<%--<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.config.js"></script>--%>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.config.step3.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.all.min.js"> </script>
<%--<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.all.js"> </script>--%>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/lang/en/en.js"></script>



<%--排序--%>
<script src="${ctx}/assets/js/sort/jquery.sortable.binding.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/sort/Sortable.js?version=${cssJsVersion}" type="text/javascript"></script>
<%--<script src="${ctx}/assets/js/sort/SortableAll.js?version=${cssJsVersion}" type="text/javascript"></script>--%>
<script src="${ctx}/assets/js/course/jquery.crudArea.js?version=${cssJsVersion}" type="text/javascript"></script>



<%--引入各个模块 js--%>
<script src="${ctx}/assets/js/common/common.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/common.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/thirdStep.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/rightNavTree.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/thirdStep.js?version=${cssJsVersion}" type="text/javascript"></script>
<script id="thirdStep_quiz" src="${ctx}/assets/js/course/third/thirdStep_quiz.js?version=${cssJsVersion}"" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/chapterAndSections.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/examAndQuizzes.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/discussion.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/thirdStep-videoEdit.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/thirdStep-videoEdit-upload.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/third/addRefer.js?version=${cssJsVersion}" type="text/javascript"></script>


<script>
    if(!("console" in window)){
        window.console={
            log:function () {
            },
            error:function () {
            },
            warn:function () {
            }
        }
    }
    if(!("trim" in String.prototype)){
        String.prototype.trim=function () {
            return this.replace(/^\s*/,"").replace(/\s*$/,"");
        }
    }
</script>
<%
    String debug = request.getParameter("_debug");
    if(debug != null){
%>
<script>
   _debug=true;
    console.log('[mode]Debug enabled...');
</script>
<%
    }
%>
<script>
if(!_debug){
console.warn('[warn]当前没有开启debug模式，所有console.log打印将被忽略');
console.warn('[warn]请加上参数 &_debug 到url末尾，然后刷新');
window.console.log=function (msg) {
}
}
</script>
</html>

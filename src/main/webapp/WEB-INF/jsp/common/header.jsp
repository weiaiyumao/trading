<%@ page language="java" pageEncoding="UTF-8" %>
<script src="${ctx}/assets/js/public/scrollbar.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/common/header.js"></script>
<div class="treenity-header-wrap">
	<div class="treenity-header-container clearfix">
    	<a class="treenity-logo fl" href="${ctx}/course/home?courseId=${CURRENT_SELECT_COURSEID}" id="logo" title='<spring:message code="home_huidaoshouye"/>'><img src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201610/52f6ddb0879448bbbff2b73f4c485b39.png"></a>
        <div class="course-list-wrap fl">
        	<em class="progress-state-icon progress-state-icon-building fl"></em>
            <div class="course-list-title fl  text-ellipsis" id="header_first_title">${CURRENT_SELECT_COURSENAME}</div>
            <span class="course-list-arrow fr"></span>
            <div class="course-list-drop" style="display:none;">
            	<span class="course-list-drop-icon"></span>
                <div class="course-list-container nano">
                	<div class="content">
                        <ul id="header_ul_selected">
                        <!-- progress-state-icon-building    progress-state-icon-running-->
                        	<li style="text-align:center;"><img src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/560cbfcbb31e43e9a3f5ef4cc476489a.gif"/></li>
                           	
                        </ul>
                    </div>
                </div>
                <span class="new-course-btn" id="new-course-btn-11" ></span>
            </div>
        </div>
    	<div class="user-info-wrap fr">
        	<!-- <img src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/3a8d66ed3fe44e68bc2cf10a9d90012a.jpg" width="50" height="50" /> -->
        	<%-- <img src="${sessionScope.SESSION_LOGIN_USER.avatar }" width="50" height="50" /> --%>
        	<img src="${sessionScope.FtpUrlSuffixImg }" width="40" height="40" />
        	<%-- <img src="${sessionScope.WebConsts.SESSION_LOGIN_USER.avatar }" width="50" height="50" /> --%>
        	<!-- 显示未读信息的标示 -->
            <span class="message-sup-icon" style="display:none;" ></span>
            <ul class="user-operate-list" style="display:none;">
            	<li class="header-drop-arrow"></li>
            	<!-- <li class="operate-item"><a href="#" target="_blank">Account setting</a></li>
                <li class="operate-item"><a href="#" target="_blank">Details</a></li> -->
                <%-- <li class="operate-item"><a href="${ctx }/loginout" target="_blank">Sign out</a></li> --%>
                <li class="operate-item"><a href="${ctx }/logout" ><spring:message code="header_zhuxiao" /></a></li>
            </ul>
        </div>
        <div class="i18n-switch-btn fr">
        	<span class="i18n-switch-cur"><spring:message code="header_zhongwen"/></span>
            <ul class="i18n-switch-list">
            	<li class="i18n-switch-item-CHinse" v="1"><spring:message code="header_zhongwen"/></li>
                <li class="i18n-switch-item-English" v="2"><spring:message code="header_yingyu"/></li>
            </ul>
        </div>
    </div>
</div>
<script>
	
	//å¤´é¨ä¸ææç¨å°çjs  
	$(".course-list-wrap").hover(function(){
		if(!$(this).find(".course-list-drop").is(":animated")){
			$(this).find(".course-list-drop").slideDown();

			$(".nano").nanoScroller({alwaysVisible: true});
			$(".nano .content").css("height","auto");
		}
	},function(){
		$(this).find(".course-list-drop").slideUp(300);	
	});
	$(".user-info-wrap").hover(function(){
		if(!$(this).find(".user-operate-list").is(":animated")){
			$(this).find(".user-operate-list").slideDown(300);
		}
	},function(){
		$(this).find(".user-operate-list").slideUp(300);	
	})
	
</script>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
    String chapter_type = request.getParameter("type");
    if(chapter_type != null){
    }else{
        chapter_type="";
    }
%>

<%-- 章item开始 --%>
<div class="chapter">
    <%-- title --%>
    <div class="chapterTitle">
        <h2 class="catalog-chapter clearfix transition-all headline-1" id="C1">
            <a name="C1"></a>
            <span class="chapterIntegrity hintico"></span>
            <em class="chapter-icon fl"></em>
            <span class="chapter-number headline-content fl"><span class="titlePlainText"><spring:message code='thirdstep_chapter_title'/> </span><span class="chapterIdx">1</span> :</span>
            <div class="  chapterTitleInputState fl">
                <input autocomplete="off" class="chapterInputField ignoreSlide chapter-title-ipt fl" placeholder="<spring:message code='thirdstep_chapter_title_tip'/>" type="text" name="name"/>
                <span class="hidden chapterTitleLimit wordlimit">120</span>
            </div>
            <div class=" hidden chapterTitleDisplayState fl">
                <%--<span class="chapter-title-ipt fl">Enter a Title</span>--%>
                <span class="chapter-title-item side-title-name fl " >Operation Management</span>
            </div>
            <%--<span class="chapter-title-item side-title-name fl" style="display:none;">Operation Management</span>--%>
            <span class="catalog-btn-toggle fr" title="<spring:message code='thirdstep_fold'/>"></span><%-- 收起加class:blur --%>
            <span class="ignoreSlide deleteChapter catalog-btn-del fr" title="<spring:message code='thirdstep_delete'/>"></span>
            <span class="ignoreSlide chapter-handle catalog-btn-drag fr" title="<spring:message code='thirdstep_move'/>"></span>
            <span class="ignoreSlide editChapterTitle catalog-btn-edit fr" title="<spring:message code='thirdstep_edit'/>"></span>
        </h2>
    </div>

    <%-- content --%>
    <div class="chapterContent">
        <div class="catalog-container-wrap">
            <textarea name="description" cols="" class="chapterInputField chapter-description-ipt getFocus" placeholder="<spring:message code='thirdstep_chapter_desp'/>:" data-tags=""
                      id="textarea5" rows="1" style="height: 18px;"></textarea>
            <div class="plan-days-hours">
                <spring:message code='thirdstep_chapter_planday'/>:
                <input autocomplete="off" class="chapterInputField plan-days-hours-ipt" name="limitDayStr" placeholder="00" type="text" maxlength="2" onkeyup="numberOnly(this,2,false)" onpaste="return false"  />
                <spring:message code='thirdstep_chapter_minlearnhour'/>:
                <input autocomplete="off"
                    class="chapterInputField plan-days-hours-ipt" name="studyHourStr"  placeholder="00" type="text" maxlength="2" onkeyup="numberOnly(this,2,false)" onpaste="return false" /></div>


            <div class="sectionContainer ">
                <%--节item--%>
                <div class="section">
                    <%-- title --%>
                    <div class="sectionTitle">
                        <h3 class="catalog-section clearfix transition-all headline-2" id="S1">
                            <a name="S1"></a>
                            <span class="sectionIntegrity hintico"></span>
                            <em class="section-icon fl"></em>
                            <span class="section-number headline-content fl"><span class="titlePlainText"><spring:message code='thirdstep_section_title'/></span> <span class="sectionIdx">1</span>:</span>

                            <div class="sectionTitleInputState fl">
                                <input autocomplete="off" class="sectionInputField ignoreSlide section-title-ipt fl" placeholder="<spring:message code='thirdstep_section_title_tip'/>" type="text" name="name"/>
                                <span class="hidden sectionTitleLimit wordlimit">120</span>
                            </div>
                            <div class=" hidden sectionTitleDisplayState fl">
                                <%--<span class="chapter-title-ipt fl">Enter a Title</span>--%>
                                <span class="section-title-item side-title-name  fl" >Operation Management</span>
                            </div>



                            <%--<span class="section-title-item side-title-name fl" style="display:none;">Operation Management</span>--%>
                            <span class="catalog-btn-toggle fr" title="<spring:message code='thirdstep_fold'/>"></span><!-- 收起加class:blur -->
                            <span class="ignoreSlide deleteSection catalog-btn-del fr" title="<spring:message code='thirdstep_delete'/>"></span>
                            <span class="ignoreSlide section-handle catalog-btn-drag fr" title="<spring:message code='thirdstep_move'/>"></span>
                            <span class="ignoreSlide editSectionTitle catalog-btn-edit fr" title="<spring:message code='thirdstep_edit'/>"></span>
                        </h3>
                    </div>
                    <%-- content --%>
                    <div class="sectionContent">
                        <div class="section-container-wrap">
                            <textarea name="introduction" cols="" class="sectionInputField chapter-description-ipt getFocus"
                                      placeholder="<spring:message code='thirdstep_section_desp'/>:" data-tags="" id="textarea5" autoheight="true" rows="1"
                                      style="height: 18px;"></textarea>

                            <ul class="section-video-list clearfix">
                                <div class="sectionVideoContainer">
                                    <%
                                        if (!"PLACEHOLDER".equals(chapter_type)) {
                                    %>
                                    <li class="sectionVideo ">
                                        <div class="section-video-item transcoded">
                                            <%--<img class="sectionVideoImg" src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201610/5d29993b5e1140caa61f4a952b7a5631.jpg"--%>
                                                 <%--width="195" height="112">--%>
                                            <img class="sectionVideoImg"
                                                 width="195" height="112">
                                            <span class="section-video-overlay"></span>
                                            <span class="section-video-name">
                                                <span class="sectionVideoIdx"></span>
                                            </span>
                                            <span class="sectionVideoName video-transcoding-tip">An Introduction of Breast Cancer</span>
                                            <ul class="sortIgnore section-video-operate-item">
                                                <li class="section-video-edit" id="thirdStep-videoInfo-edit"></li>
                                                <li class="sectionVideoReplace section-video-modify"><span class="replaceSectionVideoSpan"></span></li>
                                                <li class="deleteSectionVideo section-video-del"></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li class="sectionVideo ">
                                        <div class="section-video-item notTranscoded">
                                            <img class="sectionVideoImg" src="http://image.zhihuishu.com/zhs_yanfa_150820/ablecommons/demo/201610/d17412cd6a42431ea7e7779c406269f5.jpg" width="195" height="112">
                                            <span class="section-video-overlay"></span>
                                            <span class="section-video-name">
                                                <span class="sectionVideoIdx"></span>
                                            </span>
                                            <span class="video-transcoding-tip"><spring:message code='thirdstep_zhuanmazhong'/>...</span>
                                            <ul class="sortIgnore section-video-operate-item">
                                                <li class="section-video-edit" id="thirdStep-videoInfo-edit"></li>
                                                <li class="sectionVideoReplace section-video-modify"><span class="replaceSectionVideoSpan"></span></li>
                                                <li class="deleteSectionVideo section-video-del"></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <%
                                        }
                                    %>

                                    <%
                                        if (!"PLACEHOLDER".equals(chapter_type)) {
                                    %>
                                    <li class="addSectionVideo">
                                    <%
                                        } else {
                                    %>
                                    <li class="upload-video-btn-tmp">
                                    <%
                                        }
                                    %>
                                        <!--<span class="upload-video-btn"></span>
                                        <span class="library-video-btn"></span>-->
                                        <span class="addSectionVideoSpan"></span>
                                    </li>
                                </div>
                            </ul>

                        </div>
                    </div>
                </div>

                <%--节add btn--%>
                <div class="addSection">
                    <div class=" section-add-btn"><em class="public-icon-bg"></em><spring:message code='thirdstep_section_add'/></div>
                </div>
            </div>

            <div class="quizContainer">
                <div class="quiz">
                    <%-- title --%>
                    <div class="quizTitle">
                        <h4 class="catalog-quiz clearfix transition-all headline-2" id="Quiz">
                            <a name="Quiz"></a>
                            <span class="quizIntegrity rightico"></span>
                            <em class="quiz-icon public-icon-bg fl"></em>
                            <span class="quiz-number fl"><span class="titlePlainText"><spring:message code='thirdstep_quiz_title'/></span></span>
                            <span class="catalog-btn-toggle fr" title="<spring:message code='thirdstep_fold'/>"></span><!-- 收起加class:blur -->
                            <%--<span class="catalog-btn-del fr" title="<spring:message code='thirdstep_delete'/>"></span>--%>
                        </h4>
                    </div>
                    <%-- content --%>
                    <div class="quizContent">
                        <div class="quiz-info-wrap clearfix"><span class="quiz-info-item fl"><spring:message code='thirdstep_zongfen'/>: <em class="fullMark">0</em> <spring:message code='thirdstep_fen'/></span><span
                                class="quiz-info-item fl"><spring:message code='thirdstep_zongtishu'/>: <em class="totalNumber">0</em></span></div>

                        <div class="quizQuestionContainer">
                            <%
                                if (!"PLACEHOLDER".equals(chapter_type)) {
                            %>
                            <%@include file="quizQuestionCommon.jsp"%>
                            <%
                                }
                            %>
                            <%@include file="quizQuestionAddBtn.jsp"%>
                        </div>
                    </div>
                </div>
            </div>

            <div class="discussionContainer ">
                <div class="discussion">
                    <%-- title --%>
                    <div class="discussionTitle">
                        <h4 class="catalog-discussion clearfix transition-all headline-2" id="Discussion-1">
                            <a name="Discussion-1"></a>
                            <span class="discussionIntegrity rightico"></span>
                            <em class="discussion-icon public-icon-bg fl"></em>
                            <span class="discussion-number fl"><span class="titlePlainText"><spring:message code='thirdstep_discussion'/></span> <span class="discussionIdx">1</span>:</span>

                            <div class="discussionTitleInputState fl">
                                <input autocomplete="off" class="ignoreSlide discussionInputField section-title-ipt fl" placeholder="<spring:message code='thirdstep_discussion_title_tip'/>" type="text" name="title">
                                <span class="hidden discussionTitleLimit wordlimit">120</span>
                            </div>
                            <div class=" hidden discussionTitleDisplayState fl">
                                <%--<span class="chapter-title-ipt fl">Enter a Title</span>--%>
                                <span class="discussion-title-item side-title-name  fl" ></span>
                            </div>




                            <%--<span class="discussion-title-item fl" style="display:none;">Operation Management</span>--%>
                            <span class="catalog-btn-toggle fr" title="<spring:message code='thirdstep_fold'/>"></span><!-- 收起加class:blur -->
                            <span class="ignoreSlide deleteDiscussion catalog-btn-del fr" title="<spring:message code='thirdstep_delete'/>"></span>
                            <%--<span class="catalog-btn-drag fr" title="<spring:message code='thirdstep_move'/>"></span>--%>
                            <span class="ignoreSlide editDiscussionTitle catalog-btn-edit fr" title="<spring:message code='thirdstep_edit'/>"></span>
                        </h4>
                    </div>

                    <div class="discussionContent">
                        <div class="discussionReferContainer">

                            <%
                                if (!"PLACEHOLDER".equals(chapter_type)) {
                            %>
                            <div class="discussionRefer">
                                <div class="discussion-refer-item clearfix">
                                    <em class="refer-icon public-icon-bg fl"></em>
                                    <span class="refer-title fl"><span class="refer_title_span">Learning pointer.xls</span> (<span class="refer_size_span">278kb</span>)</span>
                                    <span class="refer-del-btn deleteDiscussionRefer"><em class="public-icon-bg"></em></span>
                                </div>
                            </div>
                            <%
                                }
                            %>

                            <div class="addDiscussionRefer">
                                <div class="refer-add-btn">
                                    <%--<em class="public-icon-bg"></em>--%> 
                                    <span  class="add-btn-refer" ></span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="addDiscussion">
                    <div class="discussion-add-btn"><em class="public-icon-bg"></em><spring:message code='thirdstep_disscussion_add'/></div>
                </div>
            </div>

        </div>
    </div>
</div>

<%--add btn--%>
<div class="addChapter">
    <div class="chapter-add-btn transition-all"><em class="public-icon-bg"></em><spring:message code='thirdstep_chapter_add'/></div>
</div>
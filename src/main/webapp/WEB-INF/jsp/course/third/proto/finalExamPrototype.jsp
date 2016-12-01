<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
    String finalExam_type = request.getParameter("type");
    if(finalExam_type != null){
    }else{
        finalExam_type="";
    }
%>

<div class="final_exam">
    <div class="final_examTitle">
        <h2 class="catalog-exam clearfix transition-all headline-1" id="FinalExam">
            <a name="FinalExam"></a>
            <%--<span class="final_examIntegrity rightico"></span>--%>
            <span class="final_examIntegrity hintico"></span>
            <em class="exam-icon public-icon-bg fl"></em>
            <span class="exam-number headline-content fl"><span class="titlePlainText"><spring:message code='thirdstep_exam_title'/></span>:</span>


            <div class="finalExamTitleInputState fl">
                <input autocomplete="off" class="ignoreSlide finalExamInputField exam-title-ipt fl" placeholder="<spring:message code='thirdstep_exam_title_tip'/>" type="text"  name="title" id="finalExamTitle">
                <span class="hidden finalExamTitleLimit wordlimit">120</span>
            </div>
            <div class=" hidden finalExamTitleDisplayState fl">
                <%--<span class="chapter-title-ipt fl">Enter a Title</span>--%>
                <span class="exam-title-item  fl" >Operation Management</span>
            </div>

            <span class="exam-btn-toggle public-icon-bg fr" title="<spring:message code='thirdstep_fold'/>"></span><!-- 收起加class:blur -->
            <span class="ignoreSlide editFinalExamTitle catalog-btn-edit public-icon-bg fr" title="<spring:message code='thirdstep_edit'/>"></span>
        </h2>
    </div>


    <div class="final_examContent">
        <div class="exam-container-wrap">
            <textarea name="duration"  onkeyup = "scoreValidation(this,1)" cols="" class="finalExamInputField eaxm-duration-ipt getFocus" placeholder="<spring:message code='thirdstep_exam_place'/>" data-tags="" id="textarea5" rows="1"></textarea>
            <textarea name="description" cols="" class="finalExamInputField eaxm-description-ipt getFocus" placeholder="<spring:message code='thirdstep_exam_description'/>:" data-tags="" id="textarea5" rows="1"></textarea>
            <div class="exam-info-wrap clearfix"><span class="exam-info-item fl"><spring:message code='thirdstep_quiz_fullmark'/>: <em class="fullMark">0</em> <spring:message code='thirdstep_fen'/></span><span class="exam-info-item fl"><spring:message code='thirdstep_quiz_nums'/>: <em class="totalNumber">0</em></span></div>
            <div class="quizQuestionContainer">
                <div class="quizQuestionContainer">
                    <%
                        if (!"PLACEHOLDER".equals(finalExam_type)) {
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

</div>

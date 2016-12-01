//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.zhihuishu.treenity.dto;

import com.able.dto.ExamForOverseasDto;
import com.zhihuishu.micro.course.openapi.course.dto.BaseDto;

import java.util.List;

public class WebStep3Dto extends BaseDto {
    private static final long serialVersionUID = 1L;
    private List<WebChapterDto> chapterList;
    private ExamForOverseasDto finalExam;
    private List<StepCostTimeDto> costTimes;
    private Boolean chapterSuccess = false;
    private Boolean sectionSuccess = false;
    private Boolean examSuccess = false;
    private Boolean discussionSuccess = false;
    private Boolean finalExamSuccess = false;

    public WebStep3Dto() {
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public List<WebChapterDto> getChapterList() {
        return chapterList;
    }

    public void setChapterList(List<WebChapterDto> chapterList) {
        this.chapterList = chapterList;
    }

    public ExamForOverseasDto getFinalExam() {
        return finalExam;
    }

    public void setFinalExam(ExamForOverseasDto finalExam) {
        this.finalExam = finalExam;
    }

    public List<StepCostTimeDto> getCostTimes() {
        return costTimes;
    }

    public void setCostTimes(List<StepCostTimeDto> costTimes) {


        this.costTimes = costTimes;
    }

    public Boolean getChapterSuccess() {
        return chapterSuccess;
    }

    public void setChapterSuccess(Boolean chapterSuccess) {
        this.chapterSuccess = chapterSuccess;
    }

    public Boolean getSectionSuccess() {
        return sectionSuccess;
    }

    public void setSectionSuccess(Boolean sectionSuccess) {
        this.sectionSuccess = sectionSuccess;
    }

    public Boolean getExamSuccess() {
        return examSuccess;
    }

    public void setExamSuccess(Boolean examSuccess) {
        this.examSuccess = examSuccess;
    }

    public Boolean getDiscussionSuccess() {
        return discussionSuccess;
    }

    public void setDiscussionSuccess(Boolean discussionSuccess) {
        this.discussionSuccess = discussionSuccess;
    }

    public Boolean getFinalExamSuccess() {
        return finalExamSuccess;
    }

    public void setFinalExamSuccess(Boolean finalExamSuccess) {
        this.finalExamSuccess = finalExamSuccess;
    }
}

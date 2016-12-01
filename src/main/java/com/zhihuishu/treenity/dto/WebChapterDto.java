//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.zhihuishu.treenity.dto;

import com.able.dto.ExamForOverseasDto;
import com.zhihuishu.micro.course.openapi.course.dto.BaseDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseLessonDto;

import java.util.List;

public class WebChapterDto extends BaseDto {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private Long courseId;
    private String name;
    private Integer rank;
    private String description;
    private Integer limitDay;
    private Integer studyHour;
    private Integer isPass;
    private List<CourseLessonDto> lessonList;
    private ExamForOverseasDto exam;//章测试
    private List<WebDiscussionDto> discussionList;

    public WebChapterDto() {
    }

    public List<WebDiscussionDto> getDiscussionList() {
        return discussionList;
    }

    public void setDiscussionList(List<WebDiscussionDto> discussionList) {
        this.discussionList = discussionList;
    }

    public ExamForOverseasDto getExam() {
        return exam;
    }

    public void setExam(ExamForOverseasDto exam) {
        this.exam = exam;
    }

    public List<CourseLessonDto> getLessonList() {
        return this.lessonList;
    }

    public void setLessonList(List<CourseLessonDto> lessonList) {
        this.lessonList = lessonList;
    }

    public Integer getIsPass() {
        return this.isPass;
    }

    public void setIsPass(Integer isPass) {
        this.isPass = isPass;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public static long getSerialVersionUID() {
        return 1L;
    }

    public Long getCourseId() {
        return this.courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRank() {
        return this.rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLimitDay() {
        return this.limitDay;
    }

    public void setLimitDay(Integer limitDay) {
        this.limitDay = limitDay;
    }

    public Integer getStudyHour() {
        return this.studyHour;
    }

    public void setStudyHour(Integer studyHour) {
        this.studyHour = studyHour;
    }
}

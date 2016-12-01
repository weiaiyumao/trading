//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.zhihuishu.treenity.dto;

import com.zhihuishu.micro.course.openapi.course.dto.BaseDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;

import java.util.Date;
import java.util.List;
import java.util.Set;

public class WebDiscussionDto extends BaseDto {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private Integer courseId;
    private Integer chapterId;
    private String title;
    private String content;
    private Date createTime;
    private Long userId;
    private Set<Integer> dataIds;
    private List<CourseDataOpenDto> referList;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<Integer> getDataIds() {
        return dataIds;
    }

    public void setDataIds(Set<Integer> dataIds) {
        this.dataIds = dataIds;
    }

    public List<CourseDataOpenDto> getReferList() {
        return referList;
    }

    public void setReferList(List<CourseDataOpenDto> referList) {
        this.referList = referList;
    }
}

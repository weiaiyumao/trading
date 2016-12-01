package com.zhihuishu.treenity.dto;


public class CourseProgressDto  {

	private static final long serialVersionUID = 1L;
     
	 /**
	  * 进度百分比
	  */
	 private Integer progressValue;
	 /**
	  * 进度style
	  */
	 private String resultPercent;
	 
	
    private String name;
    
    
    private Long courseId;
	 
    
    private String error;
    
    

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public CourseProgressDto() {
		this.progressValue=0;
		this.resultPercent="0";
	}

	public Integer getProgressValue() {
		return progressValue;
	}

	public void setProgressValue(Integer progressValue) {
		this.progressValue = progressValue;
	}

	public String getResultPercent() {
		return resultPercent;
	}


	public void setResultPercent(String resultPercent) {
		this.resultPercent = resultPercent;
	}
	
}

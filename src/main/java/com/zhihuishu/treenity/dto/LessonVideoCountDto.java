package com.zhihuishu.treenity.dto;

import java.io.Serializable;

/**
 * 章，视频，时间统计
 * @date   2016年10月25日
 */
public class LessonVideoCountDto implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	//总章数
	private Integer chaptersCount;
	
	//总视频数
	private Integer videosCount;
	
	//总视频时间长度
	private Integer videosCountTime;
	
	

	public LessonVideoCountDto() {
		this.chaptersCount = 0;
		this.videosCount = 0;
		this.videosCountTime = 0;
	}

	public Integer getChaptersCount() {
		return chaptersCount;
	}

	public void setChaptersCount(Integer chaptersCount) {
		this.chaptersCount = chaptersCount;
	}

	public Integer getVideosCount() {
		return videosCount;
	}

	public void setVideosCount(Integer videosCount) {
		this.videosCount = videosCount;
	}

	public Integer getVideosCountTime() {
		return videosCountTime;
	}

	public void setVideosCountTime(Integer d) {
		this.videosCountTime = d;
	}
	
   
    

}


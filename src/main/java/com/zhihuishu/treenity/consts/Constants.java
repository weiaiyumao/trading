package com.zhihuishu.treenity.consts;

public class Constants {
	
	public static final String LOGIN_COOKIE_PATH = "/";
	public static final String LOGIN_COOKIE_DOMAIN = ".zhihuishu.com";
	
	public static final String SESSION_LOGIN_USER_ID="LoginUserId";
	public static final String SESSION_LOGIN_USER_KEY = "loginUser";
	
	public static final String FTP_URL_SUFFIX_IMG = "http://image.zhihuishu.com/";

	public static final String CURRENT_SELECT_COURSEID = "CURRENT_SELECT_COURSEID";

	public static final String CURRENT_SELECT_COURSENAME="CURRENT_SELECT_COURSENAME";
	/**
	 * 海外建课  与core项目中CourseTypeEnum.overSeasCourse.getCode() 一致
	 */
	public static final Integer overSeasCourse = 4;
	
	/**
	 * redis的有效时间
	 */
	public static final int DEFAULT_EXPIRE = 7200 * 12 ; 
	
	
	public static final String COURSE_PROMOVIDEO_IMG_PATH = "http://image.zhihuishu.com/screenshot/noimg_h.jpg";
}

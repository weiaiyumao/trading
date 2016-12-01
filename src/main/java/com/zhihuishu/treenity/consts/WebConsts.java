package com.zhihuishu.treenity.consts;

/**
 * 
 * @author huyue
 * @date 2016年8月9日 下午7:22:00
 */
public interface WebConsts {
	
	/** 登录用户信息 */
	String SESSION_LOGIN_USER = "SESSION_LOGIN_USER" ;
	/** 登录用户ID */
	String SESSION_LOGIN_USER_ID = "SESSION_LOGIN_USER_ID";
	/** 登录用户名称 */
	String SESSION_LOGIN_USERNAME="SESSION_LOGIN_USER_NAME";
	
	/** 未删除状态 */
	int NOT_DELETED = 0 ;
	/** 已删除状态 */
	int IS_DELETED = 1 ;
	
	/** 中文语言 */
	int LOCALE_ZH = 1 ;
	/** 英文语言 */
	int LOCALE_EN = 2 ;

	/** 成功状态码，用于接口返回值 */
	int CODE_SUCCESS = 1 ;
	/** 失败状态码，用于接口返回值 */
	int CODE_FAILURE = 0 ;
}

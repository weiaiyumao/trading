package com.zhihuishu.treenity.consts;

import java.util.Calendar;
import java.util.Date;

/**
 * 应用常量
 * @author	zhanglikun
 * @date	2016年4月6日 下午7:53:19
 */
public final class AppConsts {

	private static final Calendar CALENDAR = Calendar.getInstance() ;
	static {
		CALENDAR.set(2099, 11, 31 ,23 ,59 ,59);
	}
	/** 默认解锁时间 */
	public static final Date UNLOCKED_TIME = CALENDAR.getTime() ;
	public static final int UNLOCK = 0 ;
	public static final int IS_LOCK = 1 ;

	/** 默认密码 */
	public static final String DEFAULT_PWD = "123456" ;
	
	public static final int NOT_DELETED = 0 ;
	public static final int IS_DELETED = 1 ;
	
	
}

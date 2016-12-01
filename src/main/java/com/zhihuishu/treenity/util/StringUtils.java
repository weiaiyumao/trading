package com.zhihuishu.treenity.util;

/**
 *字符串处理
 * @author	周咤
 * @date	2016-9-19 下午2:54:04
 */
public class StringUtils {
	
	/**
	 * 判断字符串是否为空 为空返回： ""
	 * @param str
	 * @return ""
	 */
	public static String isNull(String str){
		if(str.equals(null) || str.equals("") ||str.equals("null") ||str.equals("undefined")){
			return "";
		}
		return str;
	}
	
	/**
	 * 判断String是否为空
	 * @param str
	 * @return true OR false
	 */
	public static Boolean isNotEntity(String str){
		if(str.equals(null) || str.equals("") ||str.equals("null") ||str.equals("undefined")){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断String是否为空
	 * @param obj
	 * @return true OR false
	 */
	public static Boolean isNotEntity(Object obj){
		if(null == obj || obj.equals("") || obj.equals("null")){
			return false;
		}
		return true;
	}
	
}

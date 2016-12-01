package com.zhihuishu.treenity.util;

import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

public class PropertiesUtils {

	private static Properties props ;
	
	/** 整数常量，表示从配置文件中未获取到值 */
	public static final int NONE_INT = -1 ;
	
	/**
	 * 初始化props实例(实际从Spring上下文中获取Properties对象)
	 * @see com.zhihuishu.myuni.util.spring.PropertyPlaceholderConfigurerWrapper
	 * @param props
	 */
	public static final void init(Properties props) {
		PropertiesUtils.props = props ; 
	}
	
	/**
	 * 读取配置项
	 * @author	by zhanglikun
	 * @date	2014年11月11日 下午1:31:33
	 * @param key
	 * @return
	 */
	public static final String get(String key) {
		return get(key ,null) ;
	}
	
	/**
	 * 读取配置项，如果不存在返回默认值
	 * @author	by zhanglikun
	 * @date	2014年11月11日 下午1:32:30
	 * @param key
	 * @param defaultValue
	 * @return
	 */
	public static final String get(String key ,String defaultValue) {
		if(props == null) return defaultValue ;
		return props.getProperty(key ,defaultValue) ;
	}
	
	public static final int getInt(String key) {
		return getInt(key ,NONE_INT) ;
	}
	
	/**
	 * 获取一个整数
	 * @param key
	 * @param defaultValue
	 * @return
	 */
	public static final int getInt(String key ,int defaultValue) {
		String v = get(key) ;
		if(StringUtils.isNotBlank(v) && StringUtils.isNumeric(v)) {
			return NumberUtils.toInt(v) ;
		} return defaultValue ;
	}

	public static final Properties getProps() {
		return props ;
	}
	
}

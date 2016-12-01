package com.zhihuishu.treenity.log;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import com.alibaba.dubbo.common.json.JSON;

public abstract class LogHandler {

	protected final String MDCKEY_METHOD = "method" ;
	protected final String MDCKEY_START = "start" ;
	protected final String MDCKEY_END = "end" ;
	protected final String MDCKEY_REQUEST_TIME = "request_time" ;
	
	/**
	 * 获取本机Host
	 * @return
	 */
	protected String getHost() {
		String host = null ;
		InetAddress addr;
		try {
			addr = InetAddress.getLocalHost();
			host = addr.getHostAddress();
			if(StringUtils.isBlank(host)) {
				host = addr.getHostName() ;
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		return host ;
	}
	
	/**
	 * 拼接参数列表，暂时不使用类型列表参数
	 * @param params	参数值列表
	 * @return
	 */
	protected String concatParams(Object [] params) {
		if(ArrayUtils.isEmpty(params)) return "" ;
		StringBuffer sb = new StringBuffer() ;
		for(Object obj : params) {
			String msg = null ;
			if(obj == null) msg = "null" ;
			else {
				try {
					msg = JSON.json(obj) ;
				} catch (IOException e) {
					msg = e.getMessage() ;
				}
			}
			if(msg == null) continue ;
//			if(StringUtils.contains(msg, "\"")) {
////				msg = StringUtils.replace(msg, "\"", "\\\"") ;
//				msg = StringUtils.replace(msg, "\"", "'") ;
//			}
			sb.append(msg + "、") ;
		}
		return sb.substring(0, sb.length() - 1) ;
	}
	
	/**
	 * 获取参数，使用默认Key
	 * @param params
	 * @param key
	 * @param defaultKey
	 * @return
	 */
	protected String getWithDefault(Map<String ,String> params ,String key ,String defaultKey) {
		if(params == null) return null ;
		String value = params.get(key) ;
		if(StringUtils.isBlank(value) && defaultKey != null)
			value = params.get(defaultKey) ;
		return value ;
	}

	/**
	 * 使用指定Key获取参数
	 * @param params
	 * @param key
	 * @return
	 */
	protected String get(Map<String ,String> params ,String key) {
		return getWithDefault(params, key, null) ;
	}
	
}

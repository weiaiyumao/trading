package com.zhihuishu.treenity.util;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

/**
 * 
 * @author Rain
 * @time 2016年9月28日-下午1:52:04
 *
 */
public class RequestUtil {
	/**
	 * 从请求中获取参数装换为JSONObject_str对象
	 */
	public static String fromRequestToJsonStr(HttpServletRequest request) {
		JSONObject jsonObject = new JSONObject();
		Enumeration<?> enu = request.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			String paraValue = request.getParameter(paraName) == null ? ""
					: (String) request.getParameter(paraName);
			paraValue = request.getParameter(paraName);
			jsonObject.put(paraName, paraValue);
		}
		return jsonObject.toString();
		
	}
	
}

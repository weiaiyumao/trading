package com.zhihuishu.treenity.web;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;

import ch.qos.logback.classic.ClassicConstants;

/**
 * 配置MDC参数，用于记录一次请求相关信息
 * @author	zhanglikun
 * @date	2016年5月5日 下午7:54:07
 * @see		ch.qos.logback.classic.helpers.MDCInsertingServletFilter
 */
public class MDCFilter implements Filter {

	public static final String REQUEST_SESSION_ID = "req.sessionId";
	public static final String REQUEST_PRINCIPAL = "req.principal" ;
	
	private String host ;
	
	@Override
	public void init(FilterConfig config) throws ServletException {
		try {
			InetAddress addr = InetAddress.getLocalHost();
			host = addr.getHostAddress();
			if(StringUtils.isBlank(host)) {
				host = addr.getHostName() ;
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
        try {
        	insertIntoMDC((HttpServletRequest) request);
            chain.doFilter(request, response);
        } finally {
            clearMDC() ;
        }
	}
	
    void insertIntoMDC(HttpServletRequest request) {
    	// 写入认证用户信息
		Principal principal = request.getUserPrincipal() ;
		if(principal != null) {
			MDC.put(REQUEST_PRINCIPAL, principal.getName());
		}
		MDC.put(REQUEST_SESSION_ID, request.getSession().getId());
		// 设置本机IP
		if(StringUtils.isNotBlank(host)) {
			MDC.put(ClassicConstants.REQUEST_REMOTE_HOST_MDC_KEY, host);
		}
		MDC.put(ClassicConstants.REQUEST_REQUEST_URI, request.getRequestURI());
		MDC.put(ClassicConstants.REQUEST_USER_AGENT_MDC_KEY, request.getHeader("User-Agent"));
		MDC.put(ClassicConstants.REQUEST_X_FORWARDED_FOR, request.getHeader("X-Forwarded-For"));
		MDC.put(ClassicConstants.REQUEST_QUERY_STRING, request.getQueryString());
		MDC.put(ClassicConstants.REQUEST_METHOD, request.getMethod());
    }

    void clearMDC() {
    	MDC.remove(REQUEST_PRINCIPAL);
    	MDC.remove(REQUEST_SESSION_ID);
        MDC.remove(ClassicConstants.REQUEST_REMOTE_HOST_MDC_KEY);
        MDC.remove(ClassicConstants.REQUEST_REQUEST_URI);
        MDC.remove(ClassicConstants.REQUEST_USER_AGENT_MDC_KEY);
        MDC.remove(ClassicConstants.REQUEST_X_FORWARDED_FOR);
        MDC.remove(ClassicConstants.REQUEST_QUERY_STRING);
        MDC.remove(ClassicConstants.REQUEST_METHOD);
    }

	@Override
	public void destroy() {
		
	}

}

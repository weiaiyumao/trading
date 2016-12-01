package com.zhihuishu.treenity.log;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.dubbo.common.Constants;
import com.alibaba.dubbo.common.URL;
import com.alibaba.dubbo.common.extension.Activate;
import com.alibaba.dubbo.rpc.Filter;
import com.alibaba.dubbo.rpc.Invocation;
import com.alibaba.dubbo.rpc.Invoker;
import com.alibaba.dubbo.rpc.Result;
import com.alibaba.dubbo.rpc.RpcException;
import com.zhihuishu.toolkit.log.LoggerTemplate;
import com.zhihuishu.toolkit.log.MDCInfoBuilder;
import com.zhihuishu.toolkit.log.MDCLogger;

import ch.qos.logback.classic.ClassicConstants;

/**
 * 日志扩展，用于打印服务端执行日志
 * @author	zhanglikun
 * @date	2016年5月4日 下午8:49:53
 * @see		com.alibaba.dubbo.monitor.support.MonitorFilter
 */
@Activate(group = {Constants.PROVIDER})
public class ProviderLogFilter extends LogHandler implements Filter {

	@Override
	public Result invoke(Invoker<?> invoker, Invocation invocation)
			throws RpcException {
		long start = System.currentTimeMillis();
		
		Result r = null ;
		Exception ex = null ;
		try {
			r = invoker.invoke(invocation) ;
		} catch (Exception e) {
			ex = e ;
		}
		long end = System.currentTimeMillis() ;
		
		// 记录日志
		Class<?> inter = invocation.getInvoker().getInterface() ;					// 接口类型
//		Logger log = LoggerFactory.getLogger("dubbo.provider." + inter.getName()) ;	// 日志实例
		LoggerTemplate log = LoggerTemplate.getInstance("dubbo.provider." + inter.getName());
		URL url = invocation.getInvoker().getUrl() ;
		String host = url.getIp() ;
		if(StringUtils.isBlank(host)) host = url.getHost() ;
		int port = url.getPort() ;
		final Map<String ,String> params = url.getParameters() ;
		String pid = get(params ,"pid") ; 
		String protocol = get(params ,"protocol") ;
		String timeout = getWithDefault(params ,"timeout" ,"default.timeout") ;
		String version = getWithDefault(params ,"version" ,"default.version") ;
		
		// 将参数列表拼装为字符串
		String parametes = concatParams(invocation.getArguments()) ;

		MDCInfoBuilder builder = MDCInfoBuilder.create()
				.setType("dubbo")
				.setTag("provider")
				.setMethodName(invocation.getMethodName())
				.setStartTime(start)
				.setEndTime(end)
				.setRequestTime(end - start)
				.put(ClassicConstants.REQUEST_REMOTE_HOST_MDC_KEY, getHost()) ;
//		MDCLogger mdcLogger = MDCLogger.proxy(log ,builder.build()) ;
		builder.build();
		if(ex != null) {
			log.error("接口执行失败，服务器信息：[serverHost:{}、port:{}、pid:{}、protocol:{}、timeout:{}、version:{}]，请求参数：{}，消息：{}" 
					,host ,port ,pid ,protocol ,timeout ,version ,parametes ,ex.getMessage());
			throw new RpcException(ex) ;
		}
		log.info("接口执行成功，服务器信息：[serverHost:{}、port:{}、pid:{}、protocol:{}、timeout:{}、version:{}]，请求参数：{}"
				,host ,port ,pid ,protocol ,timeout ,version ,parametes);

		return r ;
	}

}

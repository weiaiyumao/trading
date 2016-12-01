package com.zhihuishu.treenity.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zhihuishu.toolkit.log.LoggerTemplate;
import com.zhihuishu.toolkit.log.MDCInfoBuilder;
import com.zhihuishu.toolkit.log.MDCLogger;

import ch.qos.logback.classic.ClassicConstants;

/**
 * 程序运行计时日志切面
 * @author	zhanglikun
 * @date	2016年4月29日 下午3:42:16
 */
public class RunningTimerAspect extends LogHandler {
	
	/**
	 * 输出程序运行时长
	 * @param pjp
	 * @return
	 * @throws Throwable
	 */
	public Object around(ProceedingJoinPoint pjp) throws Throwable {
		long start = System.currentTimeMillis();
		
		// 记录日志
		
		Object retVal = null ;
		Throwable ex = null ;
		try {
			retVal = pjp.proceed();
		} catch (Throwable t) {
			ex = t ;
		}
		long end = System.currentTimeMillis() ;
		
		// 记录日志
		Signature signature = pjp.getSignature() ;
//		Logger log = LoggerFactory.getLogger(signature.getDeclaringType()) ;
		LoggerTemplate log = LoggerTemplate.getInstance(signature.getDeclaringType());
		// 将参数列表拼装为字符串
		String parametes = concatParams(pjp.getArgs()) ;

		MDCInfoBuilder builder = MDCInfoBuilder.create()
				.setType("dubbo")
				.setTag("aspect")
				.setMethodName(signature.getName())
				.setStartTime(start)
				.setEndTime(end)
				.setRequestTime(end - start)
				.put(ClassicConstants.REQUEST_REMOTE_HOST_MDC_KEY, getHost()) ;
//		MDCLogger mdcLogger = MDCLogger.proxy(log ,builder.build()) ;
//		log.trace(msg);
		builder.build(); 
		if(ex != null) {
			log.error(builder.build(),"[切面日志]方法执行出错，参数:{}，异常信息：{}" ,parametes ,ex.getMessage());
//			log.error("[切面日志]方法执行出错，参数：" + parametes + "!" ,ex);
			throw ex ;
		}
		log.info("[切面日志]接口执行成功，请求参数：{}" ,parametes);

		return retVal ;
		
	}

}

package com.zhihuishu.treenity;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zhihuishu.toolkit.log.MDCLogger;
import redis.clients.jedis.Jedis;

public class LoggerTestCase {

	private Logger log = LoggerFactory.getLogger(LoggerTestCase.class);
//	@Test
//	public void test() {
//		fail("Not yet implemented");
//	}

	 
	@Test
	public void logTest() throws InterruptedException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("userId","test");//用户
		map.put(MDCLogger.IS_WRITE_DB, "1");//入库
		map.put(MDCLogger.TABLE_NAME,"test_log");//入库的表名
		map.put(MDCLogger.MODULE_NAME, "less");//模块名
		StackTraceElement[] tmpElements=Thread.currentThread().getStackTrace();			
		map.put(MDCLogger.METHOD_NAME,tmpElements[1].getMethodName());//方法名
		MDCLogger mdcLogger = MDCLogger.proxy(log ,map) ;
		TimeUnit.SECONDS.sleep(3);
		mdcLogger.info("aaaaaa");
		System.out.println("dd");
	}
   
   @Test
   public void Test3(){
	      Jedis jedis = new Jedis("localhost");
	      System.out.println("Connection to server sucessfully");
	      //查看服务是否运行
	      System.out.println("Server is running: "+jedis.ping());
   }
}

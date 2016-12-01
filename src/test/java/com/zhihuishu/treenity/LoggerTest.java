package com.zhihuishu.treenity;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zhihuishu.toolkit.log.MDCLogger;

public class LoggerTest{

	private Logger log = LoggerFactory.getLogger(LoggerTest.class) ;
	
	@Test
	public void test() throws InterruptedException {
		
		log.info("Test logger output.");
	
		TimeUnit.SECONDS.sleep(1);
		
	}
	@Test @Ignore
	public void test1() throws InterruptedException {
		Map<String, String> map = new HashMap<String, String>();

		map.put("userId", "11111");// 用户
		map.put(MDCLogger.IS_WRITE_DB, "1");// 入库
		map.put(MDCLogger.TABLE_NAME,"测试表名");// 入库的表名
		map.put(MDCLogger.MODULE_NAME, "less");// 模块名
		/*StackTraceElement[] tmpElements = Thread.currentThread()
				.getStackTrace();*/
		map.put(MDCLogger.METHOD_NAME, "methodTest");// 方法名
		MDCLogger mdcLogger = MDCLogger.proxy(log, map);
		mdcLogger.info("日志测试");
		TimeUnit.SECONDS.sleep(1);
		System.out.println("12354654");
	}
	
	
	
	/**
	 * 测试一分钟写入日志量(同步写入)，注意修改日志配置
	 * 60.215秒、128字节		=> 10,120,200条、2.55G
	 * 60.109秒、512字节		=> 11,187,456条、6.82G
	 * 60.619秒、2048字节	=> 03,277,710条、6.68G
	 * 60.203秒、128KB		=> 00,044,853条、5.48G
	 */
	@Test @Ignore
	public void testOneMinute() {
		
		final Logger log = LoggerFactory.getLogger("test.log") ;
		
		final int bytes = 2048 ;
		final AtomicLong al = new AtomicLong() ;
		final long time = System.currentTimeMillis() ;
		
		// 两个线程，一个用于计时，一个循环写入日志，计算一分钟内写入日志条数和生成日志总量
		ExecutorService exec = Executors.newFixedThreadPool(2) ;
		
		// 注册一个结束回调钩子，用于输出计数信息
		Runtime.getRuntime().addShutdownHook(new Thread(){
			@Override
			public void run() {
				System.out.println("测试程序执行完成，耗时：" + (System.currentTimeMillis() - time) + "毫秒，输出日志条数：" + al.get() + "条");
			}
		});
		
		// 启动一个计时线程
		exec.execute(new Runnable() {
			@Override
			public void run() {
				try {
					TimeUnit.SECONDS.sleep(60);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				// 休眠线束，终止所有线程
				System.exit(0);
			}
		});

		// 启动一个写入日志线程
		exec.execute(new Runnable() {
			@Override
			public void run() {
				String msg = RandomStringUtils.randomAlphanumeric(bytes) ;
				while(true) {
					log.info(msg);
					al.incrementAndGet() ;
				}
			}
		});
		
		exec.shutdown();
		
		while(!exec.isTerminated()) ;
		
	}
	
}
package com.zhihuishu.treenity;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Ignore;
import org.junit.Test;

import com.zhihuishu.toolkit.log.LoggerTemplate;
import com.zhihuishu.toolkit.log.MDCInfoBuilder;

public class LoggerTest2{
	
	private LoggerTemplate log = LoggerTemplate.getInstance(LoggerTest2.class) ;
	
//	@SuppressWarnings("static-access") @Ignore
	@Test 
	public void test2(){
        log.info("Hello {}" ,"2222222222");
        MDCInfoBuilder mDCInfoBuilder = MDCInfoBuilder.create();
        mDCInfoBuilder.put("userId","124141"); //用户
		mDCInfoBuilder.put("courseId", "34363453"); //用户
		mDCInfoBuilder.setType("rain");
		mDCInfoBuilder.setTag("yumao");
		mDCInfoBuilder.setTableName("tableName");//入库的表名
		mDCInfoBuilder.setModuleName("moduleName");//模块名
		mDCInfoBuilder.setMethodName("methodName");//方法名
		 try {
				Thread.currentThread().sleep(5000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        log.info(mDCInfoBuilder.build(), "1531313er");
	}
	
	
}
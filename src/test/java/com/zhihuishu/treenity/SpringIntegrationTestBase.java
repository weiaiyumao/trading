package com.zhihuishu.treenity ;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/beans.xml")
//@TransactionConfiguration(defaultRollback = true)
//@Transactional
public class SpringIntegrationTestBase {

	protected Logger log = LoggerFactory.getLogger(getClass()) ;
	
	private long startTime ;
	
	@Before
	public void setup() {
		startTime = System.currentTimeMillis() ;
	}
	
	@After
	public void teardown() {
		log.info("方法执行了{}毫秒!" ,System.currentTimeMillis() - startTime) ;
	}
	
}

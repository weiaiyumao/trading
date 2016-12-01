package com.zhihuishu.treenity.restapi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import redis.clients.jedis.JedisPool;

/**
 * RESTful API 公共类
 * @author	zlikun
 * @date	2016年8月1日 下午5:31:02
 */
@Controller
public abstract class RestController {

	protected Logger log = LoggerFactory.getLogger(this.getClass()) ;
	
	@Autowired
	protected JedisPool jedisPool;
	
}

package com.zhihuishu.treenity.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.JedisPool;

public abstract class BaseService {

	protected Logger log = LoggerFactory.getLogger(this.getClass()) ;
	
	@Resource
	protected JedisPool jedisPool ;
	
	
	/** 默认Redis缓存过期时间，目前未与旧系统完全对接，固设置一个较短时间，以避免长时间数据不一致问题 */
	final int DEFAULT_EXPIRE = 6 * 3600 ;
	
}

package com.zhihuishu.treenity.helper;

import com.zhihuishu.toolkit.jedis.JedisHelper;

/**
 * RedisKeyHelper treenity项目 在核心core没做缓存的接口  在treenity项目单独的缓存处理
 * @author Rain
 * @time 2016年9月22日-下午1:38:08
 *
 */
public class RedisKeyHelper {

	
	/**
	 * 生成课程主键缓存Keys
	 * @param courseId
	 * @return
	 */
	public static final String getCourseIdKeys(long userId) {
		return JedisHelper.key("cc:coursekey" ,userId,"treenity") ;
	}
	
	/**
	 * 生成课程缓存key
	 * @param courseId
	 * @return
	 */
	public static final String getCourseKey(long courseId) {
		return JedisHelper.key("cc:course" ,courseId,"treenity") ;
	}
	
	
}

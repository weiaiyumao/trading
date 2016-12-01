package com.zhihuishu.treenity.helper;

import java.util.UUID;

public class UUIDHelper {

	/**
	 * 生成UUID字符串(32位)
	 * @return
	 */
    public static final String uuid(){   
        return UUID.randomUUID().toString().replaceAll("-", "");   
    }  
	
}

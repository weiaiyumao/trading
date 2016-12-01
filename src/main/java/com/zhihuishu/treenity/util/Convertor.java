package com.zhihuishu.treenity.util;

/**
 * 转换器接口，用于将一个类型转换为另一个类型
 * @author	张立坤
 * @date	2014年10月31日 上午9:07:38
 * @param <T>
 */
public interface Convertor<T> {

	T convert(Object obj) ;
	
}

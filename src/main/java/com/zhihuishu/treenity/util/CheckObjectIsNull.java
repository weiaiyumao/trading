package com.zhihuishu.treenity.util;

import java.util.Collection;
import java.util.Map;

/**
 * 非空验证
 * @author JinXing
 * @date 2016年10月25日 11：11
 * */
public class CheckObjectIsNull {

	@SuppressWarnings("rawtypes")
	public static Boolean isEmpty(Object obj){
		if (obj == null)  
	        return true; 
        if (obj instanceof CharSequence)  
            return ((CharSequence) obj).length() == 0;  
  
        if (obj instanceof Collection)  
            return ((Collection) obj).isEmpty();  
  
        if (obj instanceof Map)  
            return ((Map) obj).isEmpty();  
  
        if (obj instanceof Object[]) {  
            Object[] object = (Object[]) obj;  
            if (object.length == 0) {  
                return true;  
            }  
            boolean empty = true;  
            for (int i = 0; i < object.length; i++) {  
                if (!isEmpty(object[i])) {  
                    empty = false;  
                    break;  
                }  
            }  
            return empty;  
        }  
        return false;  
	}
}

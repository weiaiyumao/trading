package com.zhihuishu.treenity.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * html过滤
 * @author liushaowei
 * @date   2016年11月30日
 */
public class replaceHtml{
   
    public static String getReplace(String content){  
	              if(content!=null){
	            	//定义HTML标签的正则表达式   
	                   Pattern p_html = Pattern.compile( "<[^>]+>",Pattern.CASE_INSENSITIVE);   
	                   Matcher m_html = p_html.matcher(content);   
	                   content = m_html.replaceAll(" "); //过滤html标签   
	                   return content;
	              }
	              return "";
    }  
	
}

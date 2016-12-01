package com.zhihuishu.treenity.restapi;

/**
 * RESTful API 返回结果包装类
 * @author	zhanglikun
 * @date	2016年4月29日 下午6:53:43
 * @param <T>
 */
public class RestResultWrapper<T> {

	private T result ;			// 请求结果
	private int code ;			// 请求状态码，参考微信API状态码
	private String message ;	// 请求消息
	
	public RestResultWrapper() {
		
	}
	
	public RestResultWrapper(T result) {
		this.result = result ;
	}
	
	public RestResultWrapper(T result ,int code) {
		this.result = result ;
		this.code = code ;
	}
	
	public RestResultWrapper(int code ,String message) {
		this.code = code ;
		this.message = message ;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}

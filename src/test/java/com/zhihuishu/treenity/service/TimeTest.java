package com.zhihuishu.treenity.service;

import org.junit.Test;

import com.zhihuishu.treenity.SpringIntegrationTestBase;
import com.zhihuishu.treenity.util.DataFormatConversionTotal;

public class TimeTest extends SpringIntegrationTestBase{

	@Test
	public void print(){
		String temp=DataFormatConversionTotal.time_longToString(1256L);
		System.out.println(temp);
	}
}

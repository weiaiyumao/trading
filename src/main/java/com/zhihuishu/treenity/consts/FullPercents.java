package com.zhihuishu.treenity.consts;

/**
 * home首页进度
 * @date   2016年10月20日
 */
public class FullPercents{

	  private static final String PERCENT0="0";
	  private static final String PERCENT1_10="1-10";
	  private static final String PERCENT11_20="11-20";
	  private static final String PERCENT21_30="21-30";
	  private static final String PERCENT31_40="31-40";
	  private static final String PERCENT41_50="41-50";
	  private static final String PERCENT51_60="51-60";
	  private static final String PERCENT61_70="61-70";
	  private static final String PERCENT71_80="71-80";
	  private static final String PERCENT81_90="81-90";
	  private static final String PERCENT91_99="91-99";
	  private static final String PERCENT100="100";
	  
	  
	 /**
	  * 根据计算得到进度值进行判断
	  * @date 2016年10月20日 下午2:33:21
	  * @return
	  */
	 public static String getResultPercent(Integer value){
		   String percentValue = null;
		  if(value<1){
			  percentValue=FullPercents.PERCENT0;
		  }else if(value>0 && value<11){
			  percentValue=FullPercents.PERCENT1_10;
		  }else if(value>10 && value<21){
			  percentValue=FullPercents.PERCENT11_20;
		  }else if(value>20 && value<31){
			  percentValue=FullPercents.PERCENT21_30;
		  }else if(value>30 && value<41){
			  percentValue=FullPercents.PERCENT31_40;
		  }else if(value>40 && value<51){
			  percentValue=FullPercents.PERCENT41_50;
		  }else if(value>50 && value<61){
			  percentValue=FullPercents.PERCENT51_60;
		  }else if(value>60 && value<71){
			  percentValue=FullPercents.PERCENT61_70;
		  }else if(value>70 && value<81){
			  percentValue=FullPercents.PERCENT71_80;
		  }else if(value>80 && value<91){
			  percentValue=FullPercents.PERCENT81_90;
		  }else if(value>90 && value<99){
			  percentValue=FullPercents.PERCENT91_99;
		  }else if(value>99){
			  percentValue=FullPercents.PERCENT100;
		  }
		 return percentValue;
	 }

}



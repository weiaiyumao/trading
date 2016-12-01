package com.zhihuishu.treenity.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Data、String、Long三种日期类型之间的相互转换
 * @author JinXing
 * @date 2016年10月31日 15:37
 * formatType格式为yyyy-MM-dd HH:mm:ss//yyyy年MM月dd日 HH时mm分ss秒
 * */

public class DataFormatConversionTotal {
	
	/**
	 * data  yyyy-MM-dd HH:mm:ss日期格式转换
	 * */
	// date类型转换为String类型 	// formatType格式为yyyy-MM-dd HH:mm:ss//yyyy年MM月dd日 HH时mm分ss秒
 	// data Date类型的时间
 	public static String date_dateToString(Date data, String formatType) {
 		return new SimpleDateFormat(formatType).format(data);
 	}
 
 	// long类型转换为String类型
 	// currentTime要转换的long类型的时间
 	// formatType要转换的string类型的时间格式
 	public static String date_longToString(long currentTime, String formatType)
 			throws ParseException {
 		Date date = date_longToDate(currentTime, formatType); // long类型转成Date类型
 		String strTime = date_dateToString(date, formatType); // date类型转成String
 		return strTime;
 	}
 
 	// string类型转换为date类型
 	// strTime要转换的string类型的时间，formatType要转换的格式yyyy-MM-dd HH:mm:ss//yyyy年MM月dd日
 	// HH时mm分ss秒，
 	// strTime的时间格式必须要与formatType的时间格式相同
 	public static Date date_stringToDate(String strTime, String formatType)
 			throws ParseException {
 		SimpleDateFormat formatter = new SimpleDateFormat(formatType);
 		Date date = null;
 		date = formatter.parse(strTime);
 		return date;
 	}
 
 	// long转换为Date类型
 	// currentTime要转换的long类型的时间
 	// formatType要转换的时间格式yyyy-MM-dd HH:mm:ss//yyyy年MM月dd日 HH时mm分ss秒
 	public static Date date_longToDate(long currentTime, String formatType)
 			throws ParseException {
 		Date dateOld = new Date(currentTime); // 根据long类型的毫秒数生命一个date类型的时间
 		String sDateTime = date_dateToString(dateOld, formatType); // 把date类型的时间转换为string
 		Date date = date_stringToDate(sDateTime, formatType); // 把String类型转换为Date类型
 		return date;
 	}
 
 	// string类型转换为long类型
 	// strTime要转换的String类型的时间
 	// formatType时间格式
 	// strTime的时间格式和formatType的时间格式必须相同
 	public static long date_stringToLong(String strTime, String formatType)
 			throws ParseException {
 		Date date = date_stringToDate(strTime, formatType); // String类型转成date类型
 		if (date == null) {
 			return 0;
 		} else {
 			long currentTime = date_dateToLong(date); // date类型转成long类型
 			return currentTime;
 		}
 	}
 	// string类型转换为long类型
 	 // strTime要转换的String类型的时间
 	 // formatType时间格式
 	// strTime的时间格式和formatType的时间格式必须相同
 	public static Map<String,Long> date_stringToLongTwoParams(String startTime,String endTime, String formatType)
 			throws ParseException {
 		Map<String,Long>map=new HashMap<String,Long>();
 		Date date = date_stringToDate(startTime, formatType); // String类型转成date类型
 		Date date2 = date_stringToDate(endTime, formatType); // String类型转成date类型
 		if (date == null ||date2==null) {
 			return null;
 		} else {
 			long currentTime = date_dateToLong(date); // date类型转成long类型
 			long currentTime2 = date_dateToLong(date2); // date类型转成long类型
 			map.put("startTime", currentTime);
 			map.put("endTime", currentTime2);
 			return map;
 		}
 	}
 	// date类型转换为long类型
 	// date要转换的date类型的时间
 	public static long date_dateToLong(Date date) {
 		return date.getTime();
 	}
 	
 	/**
	 * time  HH:mm:ss时间转换
	 * */
 	//String类型转成Long类型
 	//time 00:10:00:00
 	//type 1、秒 2、毫秒
 	public static Long time_stringToLong(String time,Integer type) throws ParseException{
 		Long result=0L;
 		if(type ==1){
 			result=time_stringToLong_shortType(time);
 		}else if(type ==2){
 			result=time_stringToLong_LongType(time);
 		}
 		
 		return result;
 	}
 	//返回秒
 	@SuppressWarnings("unused")
	public static Long time_stringToLong_shortType(String time){
 		Long result=0L;
 		String [] array=time.split(":");
 		for (int i=0;i<array.length;i++) {
			Integer num=Integer.parseInt(array[i]);
			if(num ==null)num=0;
			if(i==0){//时
				result+=(num*60*60);
			}else if(i==1){
				result+=(num*60);
			}else if(i==2){
				result+=(num*1);
			}		
		}
 		return result;
 	}
 	//返回毫秒
	@SuppressWarnings("unused")
	public static Long time_stringToLong_LongType(String time){
		Long result=0L;
 		String [] array=time.split(":");
 		for (int i=0;i<array.length;i++) {
			Integer num=Integer.parseInt(array[i]);
			if(num ==null)num=0;
			if(i==0){//时
				result+=(num*60*60*1000);
			}else if(i==1){//分
				result+=(num*60*1000);
			}else if(i==2){//秒
				result+=(num*1*1000);
			}else if(i==3){//毫秒
				result+=(num*1);
			}	
		}
 		return result;
 	}
 	
	//long转成String类型
	public static String time_longToString(Long time){
		String hours = "", minute = "",second = "";
		Long h = 0L,m = 0L,s=0L;
		if(time >=3600)h=time/3600;
		if(time >=60)m=time%3600/60;
		s=time%3600%60;
		
		hours=h+"";minute=m+"";second=s+"";
		if(h <10)hours="0"+h;
		if(m <10)minute="0"+m;
		if(s <10)second="0"+s;
		return hours+":"+minute+":"+second;
	}
	
}

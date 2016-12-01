package com.zhihuishu.treenity.dto;

import java.io.Serializable;
import java.util.Date;

public class FormatModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Double money ;			// 金钱
	private Date date ; 			// 日期 
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}


}

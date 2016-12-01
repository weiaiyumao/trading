package com.zhihuishu.treenity.dto;

import com.zhihuishu.micro.course.openapi.course.dto.BaseDto;

/**
 * @author Jiangli
 * @date 2016/10/27 10:54
 */
public class StepCostTimeDto extends BaseDto {
   private String name;
    private Long cost;
   private String msg="ok";

    public StepCostTimeDto(String name, Long cost) {
        this.name = name;
        this.cost = cost;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public StepCostTimeDto(String name, Long cost, String msg) {
        this.name = name;
        this.cost = cost;
        this.msg = msg;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCost() {
        return cost;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }
}

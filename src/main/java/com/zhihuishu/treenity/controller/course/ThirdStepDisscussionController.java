package com.zhihuishu.treenity.controller.course;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.bbs.openapi.remote.RemoteException;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.BBSCourseService;
import com.zhihuishu.treenity.util.RequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 
 * @author shehuaiyang
 * @date 2016年10月28日 上午9:55:41
 * @modifyNote
 * @version 1.0
 */
@Controller
@RequestMapping("/course/thirdStep/disscussion")
public class ThirdStepDisscussionController extends BaseController {
	
	
	@Resource
	private BBSCourseService bbsCourseService;
		
     /**
	 * 查询章讨论列表
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月18日 下午3:33:15
	 * @modifyNote 
	 * @param courseId
	 * @param chapterId
	 * @return
	 */
    @Override
    protected LoggerCollectionEnum getCollectionEnum() {
        return LoggerCollectionEnum.disscussionCollection;
    }
	 /**
	 * 新增章模板
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月19日 下午4:43:21
	 * @modifyNote 
	 * @param onlinePostModelOpenDto
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/create")
	public String save(OnlinePostModelOpenDto onlinePostModelOpenDto) {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		onlinePostModelOpenDto.setUserId(getLoginUID());
	    Long courseId = onlinePostModelOpenDto.getCourseId().longValue();
		JSONObject jsonObject = new JSONObject();
		try {
			OnlinePostModelOpenDto   disscussion = bbsCourseService.saveModel(onlinePostModelOpenDto);
			saveLogger(String.format("保存帖子信息%s", message),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","save",courseId);
			jsonObject.put("result", disscussion);
		} catch (RemoteException e) {
			saveLogger(String.format("保存帖子信息，ID：%d，出现异常：%s",courseId ,e.getMessage()),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","save",courseId);
		}
		return jsonObject.toString();

	}
	/**
	 * 修改章模板
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月19日 下午4:43:11
	 * @modifyNote 
	 * @param onlinePostModelOpenDto
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/update",method={RequestMethod.GET,RequestMethod.POST})
	public String update(OnlinePostModelOpenDto onlinePostModelOpenDto) {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		onlinePostModelOpenDto.setUserId(getLoginUID());
		JSONObject jsonObject = new JSONObject();
		try {
			OnlinePostModelOpenDto   disscussion = bbsCourseService.updateModel(onlinePostModelOpenDto);
			saveLogger(String.format("修改帖子信息%s", message),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","update",null);
			jsonObject.put("disscussion", JSONArray.fromObject(disscussion));
		} catch (RemoteException e) {
			saveLogger(String.format("修改帖子信息，ID：%d，出现异常：%s",null ,e.getMessage()),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","update",null);
		}
		return jsonObject.toString();

	}
	/**
	 * 删除章讨论
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月28日 下午5:13:20
	 * @modifyNote 
	 * @param discussionId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public String delete(@RequestParam(value="discussionId",required=false)Integer discussionId) {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
	    try {
			boolean   b = this.bbsCourseService.deleteModelById(discussionId);
			this.saveLogger(String.format("删除帖子信息%s", message),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","delete",null);
			if(b){
				jsonObject.put("success","1");
			}else{
				jsonObject.put("success","0");
			}
		} catch (RemoteException e) {
			this.saveLogger(String.format("删除帖子信息，ID：%d，出现异常：%s",discussionId ,e.getMessage()),LoggerCollectionEnum.disscussionCollection.getTableName(),"treenity_discussion","delete",null);
		}
		return jsonObject.toString();

	}
	
}

package com.zhihuishu.treenity.controller.course;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.able.commons.dto.VideoSubtitleDto;
import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.MeetCourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.controller.BaseController.ResultRequestAndParser;
import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.BBSCourseService;
import com.zhihuishu.treenity.service.course.CourseDataService;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.service.course.CourseSpeakerService;
import com.zhihuishu.treenity.service.course.VideoSubtitleService;
import com.zhihuishu.treenity.util.RequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/***
 * @author User zhouzha
 *
 */
@Controller
@RequestMapping("/course")
public class ThirdStepController extends BaseController {
	
	@Resource
	private CourseService courseService;
	
	@Resource
	private BBSCourseService bbsCourseService;
	
	@Resource
	private CourseDataService courseDataService;
	@Resource
	private CourseSpeakerService courseSpeakerCourse;
	
	@Resource
	private VideoSubtitleService videoSubtitleService;
	
	@ResponseBody
	@RequestMapping("/thirdStep")
	public ModelAndView index(@RequestParam(value="courseId",required=false)Long courseId,@RequestParam(value="hash",required=false)String hash) throws com.zhihuishu.micro.bbs.openapi.remote.RemoteException {
		ModelAndView model = new ModelAndView();
		try {
			
			if(this.isLoginUserByCourseId(model, courseId, getRequest().getSession())){
				return model;
			}
			Integer coursId = courseId.intValue();
			List<OnlinePostModelOpenDto>  onlinePostModelOpenDtos= bbsCourseService.findDiscussListByCourseIdAndChapterId(coursId, 540);
			model.addObject("courseId", courseId);
			model.addObject("hash", hash);
			model.addObject("onlinePostModelOpenDtos", onlinePostModelOpenDtos);
		} catch (RemoteException e) {
			e.printStackTrace();
		}
		model.setViewName("/course/third/thirdStep");
		
		return model;
	}
     
	/**
	 * 添加视频字幕信息
	 * @param videoId 视频ID（必填）
	 * @param title 字幕标题（必填）
	 * @param path 字幕地址（必填）
	 * @param language 字幕语言（必填     0中文、1英文、2中文/英文）
	 * @param checksum 字幕文件校验和(MD5)，暂不使用 （非必填）
	 * @param userId 用户Id （非必填）
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/thirdStep/addVideoSubtitleInfo")
	public RemoteResult<Integer> addVideoSubtitleInfo(final VideoSubtitleDto videoSubtitleDto) {
		RemoteResult<Integer> result = new ResultRequestAndParser<Integer>("小节视频编辑-字幕", "treenity_step3_lessonVideoEdit_subTitle", "添加字幕", "addSutitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<Integer> rs = videoSubtitleService.addVideoSubtitleInfo(videoSubtitleDto);
                return rs;
            }
        }.get();
        
        return result;
	}
	
	/**
	 * 删除字幕信息
	 * @param id 必填
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/thirdStep/delVideoSubtitleInfo")
	public RemoteResult<Integer> delVideoSubtitleInfo(final Integer id){
		RemoteResult<Integer> result = new ResultRequestAndParser<Integer>("小节视频编辑-字幕", "treenity_step3_lessonVideoEdit_subTitle", "删除字幕", "deleteSutitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<Integer> rs = videoSubtitleService.delVideoSubtitleInfo(id);
                return rs;
            }
        }.get();
        
        return result;
	}
	
	/**
	 * 更新字幕信息
	 * @param id 字幕id（必填）
	 * @param videoId 视频ID（必填）
	 * @param title 字幕标题（必填）
	 * @param path 字幕地址（必填）
	 * @param language 字幕语言（必填     0中文、1英文、2中文/英文）
	 * @param checksum 字幕文件校验和(MD5)，暂不使用 （非必填）
	 * @param userId 用户Id （非必填）
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/thirdStep/updateVideoSubtitleInfo")
	public RemoteResult<Integer> updateVideoSubtitleInfo(final VideoSubtitleDto videoSubtitleDto){
		RemoteResult<Integer> result = new ResultRequestAndParser<Integer>("小节视频编辑-字幕", "treenity_step3_lessonVideoEdit_subTitle", "修改字幕", "updateSutitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<Integer> rs = videoSubtitleService.updateVideoSubtitleInfo(videoSubtitleDto);
                return rs;
            }
        }.get();
        
        return result;
	}
	
	/**
	 * 根据视频ID查询字幕信息
	 * @param videoId 视频ID （必填）
	 * @param language 语言（-1 全部,0中文,1英文,2中/英）
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/thirdStep/searchVideoSubtitleInfoByVideoId")
	public RemoteResult<List<VideoSubtitleDto>> searchVideoSubtitleInfoByVideoId(final Integer videoId,final Integer language){
		RemoteResult<List<VideoSubtitleDto>> result = new ResultRequestAndParser<List<VideoSubtitleDto>>("小节视频编辑-字幕", "treenity_step3_lessonVideoEdit_subTitle", "查询字幕列表", "getSutitleListInfo") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<List<VideoSubtitleDto>> rs = videoSubtitleService.listVideoSubtitleInfos(videoId, language);
                return rs;
            }
        }.get();
        
        return result;
	}
}

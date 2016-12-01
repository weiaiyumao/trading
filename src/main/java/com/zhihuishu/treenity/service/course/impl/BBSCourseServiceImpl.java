package com.zhihuishu.treenity.service.course.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhihuishu.micro.bbs.openapi.onlineschool.IBBSOpenServiceForOverseaCreateCourse;
import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.bbs.openapi.remote.RemoteException;
import com.zhihuishu.micro.bbs.openapi.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.BBSCourseService;
@Service("treenityMeetIBBSServiceForOverseaCreateCourse")
public class BBSCourseServiceImpl implements BBSCourseService {

	@Resource
	private IBBSOpenServiceForOverseaCreateCourse bbsCourseService;
	@Override
	public List<OnlinePostModelOpenDto> findDiscussListByCourseIdAndChapterId(Integer courseId, Integer chapterId)
			throws RemoteException {
		RemoteResult<List<OnlinePostModelOpenDto>> result = bbsCourseService.findDiscussListByCourseIdAndChapterId(courseId, chapterId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public OnlinePostModelOpenDto saveModel(OnlinePostModelOpenDto onlinePostModelOpenDto) throws RemoteException {
		RemoteResult<OnlinePostModelOpenDto> result = this.bbsCourseService.saveModel(onlinePostModelOpenDto);
		if(result.isSuccess()) return result.getResult();
		else return null;
	}

	@Override
	public boolean deleteModelById(int postId) throws RemoteException {
		RemoteResult<Void> result = this.bbsCourseService.deleteModelById(postId);
		if(result.isSuccess()){
			return true;
		}
		return false;
	}

	@Override
	public OnlinePostModelOpenDto findModelById(int postId) throws RemoteException {
		RemoteResult<OnlinePostModelOpenDto> result = this.bbsCourseService.findModelById(postId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public OnlinePostModelOpenDto updateModel(OnlinePostModelOpenDto onlinePostModelOpenDto) throws RemoteException {
		RemoteResult<OnlinePostModelOpenDto> result = this.bbsCourseService.updateModel(onlinePostModelOpenDto);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

}

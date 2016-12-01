package com.zhihuishu.treenity.service.course;

import java.util.List;

import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.bbs.openapi.remote.RemoteException;

public interface BBSCourseService {
/**
 * 根据课程id与章节id查询帖子列表
 * @Description
 * @author shehuaiyang
 * @date 2016年10月20日 下午1:33:58
 * @modifyNote 
 * @param courseId
 * @param chapterId
 * @return
 * @throws RemoteException
 */
public List<OnlinePostModelOpenDto> findDiscussListByCourseIdAndChapterId(
			Integer courseId, Integer chapterId) throws RemoteException;
/**
 * 保存帖子模板
 * @Description
 * @author shehuaiyang
 * @date 2016年10月20日 下午1:34:56
 * @modifyNote 
 * @param onlinePostModelOpenDto
 * @return
 * @throws RemoteException
 */
public OnlinePostModelOpenDto saveModel(
			OnlinePostModelOpenDto onlinePostModelOpenDto)
			throws RemoteException;
/**
 * 根据id删除帖子
 * @Description
 * @author shehuaiyang
 * @date 2016年10月20日 下午1:35:18
 * @modifyNote 
 * @param postId
 * @return
 * @throws RemoteException
 */
public boolean deleteModelById(int postId)
			throws RemoteException;

/**
 * 根据id查询帖子
 * @Description
 * @author shehuaiyang
 * @date 2016年10月20日 下午1:35:41
 * @modifyNote 
 * @param postId
 * @return
 * @throws RemoteException
 */
public OnlinePostModelOpenDto findModelById(int postId)
			throws RemoteException;
/**
 * 跟新模板帖子
 * @Description
 * @author shehuaiyang
 * @date 2016年10月20日 下午1:36:04
 * @modifyNote 
 * @param onlinePostModelOpenDto
 * @return
 * @throws RemoteException
 */
public  OnlinePostModelOpenDto updateModel(
			OnlinePostModelOpenDto onlinePostModelOpenDto)
			throws RemoteException;

}

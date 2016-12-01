package com.zhihuishu.treenity.service.course.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.able.commons.dto.VideoSubtitleDto;
import com.able.commons.httpinvoker.IVideoSubtitleInvoker;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.VideoSubtitleService;
import com.zhihuishu.treenity.service.impl.BaseService;
@Service("videoSubtitleService")
public class VideoSubtitleServiceImpl extends BaseService implements VideoSubtitleService{
	@Resource
	private IVideoSubtitleInvoker iVideoSubtitleInvoker;
	
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
	@Override
	public RemoteResult<Integer> addVideoSubtitleInfo(VideoSubtitleDto videoSubtitleDto)throws RemoteException{
		RemoteResult<Integer> result=new RemoteResult<Integer>();

		try {
			Integer temp=iVideoSubtitleInvoker.addVideoSubtitleInfo(videoSubtitleDto.getVideoId(), videoSubtitleDto.getTitle(), videoSubtitleDto.getPath(), videoSubtitleDto.getLanguage(), videoSubtitleDto.getChecksum(), videoSubtitleDto.getCreateUser()).intValue();
			result.setSuccess(true);
			result.setResult(temp);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
			result.setExceptionStack(e);
		}
		
		return result;
	}
	
	/**
	 * 更新字幕关联的视频
	 * @param id 必填
	 * @param videoId 视频ID（非必填）
	 * @param language 语言（非必填）
	 * @return 
	 */
	@Override
	public RemoteResult<Integer> updateVideoSubtitleInfoById(Integer id,Integer videoId,Integer language)throws RemoteException{
		RemoteResult<Integer> result=new RemoteResult<Integer>();
		
		try {
			Integer temp=iVideoSubtitleInvoker.updateVideoSubtitleInfo(id, videoId, language);
			result.setSuccess(true);
			result.setResult(temp);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
			result.setExceptionStack(e);
		}
		
		return result;
	}
	
	
	/**
	 * 更新字幕信息
	 * @param videoId 视频ID（必填）
	 * @param title 字幕标题（必填）
	 * @param path 字幕地址（必填）
	 * @param language 字幕语言（必填     0中文、1英文、2中文/英文）
	 * @param checksum 字幕文件校验和(MD5)，暂不使用 （非必填）
	 * @param userId 用户Id （非必填）
	 * @return
	 */
	@Override
	public RemoteResult<Integer> updateVideoSubtitleInfo(VideoSubtitleDto videoSubtitleDto)throws RemoteException{
		RemoteResult<Integer> result=new RemoteResult<Integer>();
		
		try {
			//先删除
			result=delVideoSubtitleInfo(videoSubtitleDto.getId().intValue());
			//后添加
			result=addVideoSubtitleInfo(videoSubtitleDto);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
			result.setExceptionStack(e);
		}
		
		return result;
	}
	
	/**
	 * 删除字幕信息
	 * @param id 必填
	 * @return
	 */
	@Override
	public RemoteResult<Integer> delVideoSubtitleInfo(Integer ... id)throws RemoteException{
		RemoteResult<Integer> result=new RemoteResult<Integer>();
		
		try {
			Integer temp=iVideoSubtitleInvoker.delVideoSubtitleInfo(id);
			result.setSuccess(true);
			result.setResult(temp);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
			result.setExceptionStack(e);
		}
		
		return result;
	}
	
	/**
	 * 根据视频ID查询字幕信息
	 * @param videoId 视频ID （必填）
	 * @param language 语言（-1 全部,0中文,1英文,2中/英）
	 * @return
	 */
	@Override
	public RemoteResult<List<VideoSubtitleDto>> listVideoSubtitleInfos(Integer videoId,Integer language)throws RemoteException{
		RemoteResult<List<VideoSubtitleDto>> result=new RemoteResult<List<VideoSubtitleDto>>();
		
		try {
			List<VideoSubtitleDto> list=iVideoSubtitleInvoker.listVideoSubtitleInfos(videoId, language);
			result.setSuccess(true);
			result.setResult(list);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
			result.setExceptionStack(e);
		}
		
		return result;
	}
	
	/**
	 * 替换视频ID
	 * @param videoId 原视频ID
	 * @param updateVideoId 替换的视频ID
	 * @return
	 */
	@Override
	public RemoteResult<Integer> updateVideoSubtitleInfo(Integer videoId,Integer updateVideoId)throws RemoteException{
		RemoteResult<Integer> result=new RemoteResult<Integer>();
		
		try {
			Integer temp= iVideoSubtitleInvoker.updateVideoSubtitleInfo(videoId, updateVideoId);
			result.setSuccess(true);
			result.setResult(temp);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(null);
		}
		
		return result;
	}
}	

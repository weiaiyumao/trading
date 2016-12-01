package com.zhihuishu.treenity.service.course;

import java.util.List;

import com.able.commons.dto.VideoSubtitleDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;

public interface VideoSubtitleService {
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
	public RemoteResult<Integer> addVideoSubtitleInfo(VideoSubtitleDto videoSubtitleDto)throws RemoteException;
	
	/**
	 * 更新字幕关联的视频
	 * @param id 必填
	 * @param videoId 视频ID（非必填）
	 * @param language 语言（非必填）
	 * @return 
	 */
	public RemoteResult<Integer> updateVideoSubtitleInfoById(Integer id,Integer videoId,Integer language)throws RemoteException;
	
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
	public RemoteResult<Integer> updateVideoSubtitleInfo(VideoSubtitleDto videoSubtitleDto)throws RemoteException;
	
	/**
	 * 删除字幕信息
	 * @param id 必填
	 * @return
	 */
	public RemoteResult<Integer> delVideoSubtitleInfo(Integer ... id)throws RemoteException;
	
	/**
	 * 根据视频ID查询字幕信息
	 * @param videoId 视频ID （必填）
	 * @param language 语言（-1 全部,0中文,1英文,2中/英）
	 * @return
	 */
	public RemoteResult<List<VideoSubtitleDto>> listVideoSubtitleInfos(Integer videoId,Integer language)throws RemoteException;
	
	/**
	 * 替换视频ID
	 * @param videoId 原视频ID
	 * @param updateVideoId 替换的视频ID
	 * @return
	 */
	public RemoteResult<Integer> updateVideoSubtitleInfo(Integer videoId,Integer updateVideoId)throws RemoteException;
}

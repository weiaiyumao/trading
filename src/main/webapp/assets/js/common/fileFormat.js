/***
 * @title 上传组件
 * @author jinxing
 * @date 2016年9月13日 下午13:18
 * */
/**
 * 定义上传的文件类型
 * */
//视频格式
 var limit_video_suffix = 'mp4';
//文件格式
 var limit_data_suffix = 'doc|docx|jpg|pdf|rar|txt|xlsx|xls|word|png|ppt|pptx|wps|pptx|zip|gif|jpeg';
//图片格式
 var limit_img_suffix = 'jpg|png|gif|jpeg';
//字幕格式
 var limit_subTitle_suffix = 'vtt';
 var limit_zip_suffx = 'zip|rar';
 
// --视频格式
 function isVideo(suffix) {
     if (isEmpty(suffix)) return false;
     if (limit_video_suffix.indexOf(suffix) != -1) return true;

     return false;
 }
// --文件格式
 function isFile(suffix) {
     if (isEmpty(suffix)) return false;
     if (limit_data_suffix.indexOf(suffix) != -1) return true;

     return false;
 }
//--图片格式
 function isImg(suffix) {
     if (isEmpty(suffix)) return false;
     if (limit_img_suffix.indexOf(suffix) != -1) return true;

     return false;
 }
//--压缩格式
 function isZip(suffix) {
     if (isEmpty(suffix)) return false;
     if (limit_zip_suffx.indexOf(suffix) != -1) return true;

     return false;
 }
 //--空判断
 function isEmpty(val) {
	var $val = $.trim(val);
	if(val==null)return true;
	if (val == undefined || val == 'undefined')
		return true;
	if (val == "")
		return true;
	if (val.length == 0)
		return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val))
		return true;
	return false;
}

 
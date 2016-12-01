var incompleteNumSymbol = 0;
var completeNumSymbol = 0;
//判断文本是否需要填写
/*id : 警告将会显示在此id标签前面
 * 调用 ：   warn("#id",str);
 * */
//判断课程完整度是否从无到有和从有到无，此时感叹号或者是勾号就会改变，调用清除缓存接口
//调用common.js
function warnSymbol(id,str){
	var html="";
	if(str==""||str=="null" || str==null ){
		html='<span class="hintico"></span>';
		incompleteNumSymbol++;
		var htm = html.substr(13,7);
	}else{
		html='<span class="rightico"></span>';
		completeNumSymbol++;
		var htm = html.substr(13,8);
	}
	var pre = $(id).prev().attr("class");
	$(id).prev().remove();
	$(id).before(html);
	if(pre !=undefined && pre!=htm){
		 var value= $("#courseId").val();
		 if(value != '' && value != undefined && value != null ){
			 cleanTreeRedis(value);
		 }
		 
	}
}
//判断课程完整度是否从无到有和从有到无，此时感叹号或者是勾号就会改变，调用清除缓存接口
//调用common.js
function warnboolSymbol(id,bool){
	var html="";
	if(bool!=true){
		html='<span class="hintico"></span>';
		incompleteNumSymbol++;
		var htm = html.substr(13,7);	
	}else{
		html='<span class="rightico"></span>';
		completeNumSymbol++;
		var htm = html.substr(13,8);
	}	
	var pre = $(id).prev().attr("class");
	$(id).prev().remove();
	$(id).before(html);
	if(pre !=undefined && pre!=htm){
		 var value= $("#courseId").val();
		 if(value != '' && value != undefined && value != null ){
			 cleanTreeRedis(value);
		 }
		 
	}
}
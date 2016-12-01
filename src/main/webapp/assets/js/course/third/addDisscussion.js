$(function(){
	init();
	
});
//页面加载完成后调用的方法
function init(){
	$(".discussion-add-btn").on("click",function(){
		var lastDiv = $(".data-discussion").find(".refer-add-btn.transition-all").last();
		var indexs = $(lastDiv).attr("name").split("-");
		var index = indexs[3];
		index++;
		var div='';
		div +='<h4 class="catalog-discussion clearfix transition-all" id="catalog-discussion-clearfix'+index+'">';
		div +='<span class="hintico" id="hintico'+index+'"></span>';	
	    div +='<em class="discussion-icon public-icon-bg fl"></em>';  	
	    div +='<span class="discussion-number fl">Discussion '+index+':</span>';
	    div +='<input name="id" id="id-'+index+'"  type="text" style="display:none;">';
	    div +='<input class="section-title-ipt fl" id="section-title-ipt-'+index+'" type="text" value="" placeholder="Enter a Title" style="display:none;" onblur="addDiscussionTitle('+index+')"/>';      
	    div +='<span class="discussion-title-item fl" id="discussion-title-item-'+index+'" onclick="discussionClick('+index+');">top</span>';      
	    div +='<span class="catalog-btn-edit fl" id="catalog-btn-edit-'+index+'"  title="eidt"></span>' ;  	
	    div +='<span class="catalog-btn-del fl" id="catalog-btn-del-'+index+'" title="delete" onclick="deleteClick('+index+');"></span>';   	
	    div +='<span class="catalog-btn-toggle fl" name="catalog-btn-toggle-'+index+'" title="deploy" onclick="deployClick('+null+','+index+');"></span>';
	    div +='</h4>';
	    div +='<div  name="discussion-refer-item'+index+'">';
	    div +='</div>'
	    div +='<div class="refer-add-btn transition-all" name="refer-add-btn-'+index+'">';
	    div +='<em class="public-icon-bg" >';
	    div +='</em>';
	    div +='Add Refer</div>';
	    lastDiv.after(div);
	})
	selectDiscussion();
}
//查询模板列表
function selectDiscussion(){
	 $.ajax({
		  type:"post",
		  url:basePath+"/course/thirdStep/disscussions",
	      data:{
	    	  "courseId":$("#courseId").val(),
	    	  "chapterId":540,
	      },
	      dataType:'json',
	      success:function(data){
	    	    if(data.discussions != null && data.discussions!=''){
                    $.each(data.discussions,function(index,element){
                    	  index++;
                    	  var div='';
            	          div +='<h4 class="catalog-discussion clearfix transition-all" id="catalog-discussion-clearfix'+index+'">';
            	          div +='<span class="rightico"></span>';	
            	          div +='<em class="discussion-icon public-icon-bg fl"></em>'; 	
            	          div +='<span class="discussion-number fl" id="discussion-number-'+index+'">Discussion '+index+':</span>';
            	          div +='<input name="id" id="id-'+index+'" value="'+element.id+'"  type="text" style="display:none;">';
            	          div +='<input class="section-title-ipt fl" id="section-title-ipt-'+index+'" type="text" value="'+element.title+'" onblur="addDiscussionTitle('+index+')"  style="display:none;" />';      
            	          div +='<span class="discussion-title-item fl" id="discussion-title-item-'+index+'"  >'+element.title+'</span>';      
            	          div +='<span class="catalog-btn-edit fl" id="catalog-btn-edit-'+index+'" title="eidt" onclick="eidtClick('+index+');"></span>' ;  	
            	          div +='<span class="catalog-btn-del fl" id="catalog-btn-del-'+index+'" title="delete" onclick="deleteClick('+index+');"></span>';  	
            	          div +='<span class="catalog-btn-toggle fl" name ="catalog-btn-toggle-'+index+'" id="catalog-btn-toggle-'+element.id+'" title="deploy" onclick="deployClick('+element.id+','+index+');"></span>';
            	          div +='</h4>';
            	          div +='<div  id="discussion-refer-item'+element.id+'" name="discussion-refer-item'+index+'">';  
/*            	          div +='<em class="refer-icon public-icon-bg fl" id="refer-icon'+element.id+'"></em>';  	
            	          div +='<span class="refer-title fl">Learning pointer.xls(278kb)</span>';     
            	          div +='<span class="refer-del-btn"><em class="public-icon-bg"></em></span>'; */     
            	          div +='</div>';   
            	          div +='<div class="refer-add-btn transition-all" name="refer-add-btn-'+index+'" id="refer-add-btn-'+element.id+'"><em class="public-icon-bg" id="'+element.id+'"></em>Add Refer</div>';
            	          if(index==1){
                          $(".data-discussion").append(div);
                          selectCourseData(element.id,index);

            	          }else{
            	          $(".data-discussion").find(".refer-add-btn.transition-all").last().after(div);
            	          selectCourseData(element.id,index);
           
            	          }
            	                     	         
            	         
                    });
                    initUploader();
	    	    }else{  
	    	    	    addDiscussion();
	    	    }
	      },
	      error:function(data){
	    
	    	  
	      }
	      
	 });
	 
}
//页面初始化的时候，如果没有章讨论，默认加载一个
function addDiscussion(){

	var index=1;
	var div='';
    div +='<h4 class="catalog-discussion clearfix transition-all" id="catalog-discussion-clearfix'+index+'">';
    div +='<span class="hintico" id="hintico'+index+'"></span>';	
    div +='<em class="discussion-icon public-icon-bg fl"></em>';  	
    div +='<span class="discussion-number fl">Discussion '+index+':</span>';
    div +='<input name="id" id="id-'+index+'"  type="text" style="display:none;">';
    div +='<input class="section-title-ipt fl" id="section-title-ipt-'+index+'" type="text" value="" placeholder="Enter a Title" style="display:none;" onblur="addDiscussionTitle('+index+')"/>';      
    div +='<span class="discussion-title-item fl" id="discussion-title-item-'+index+'" onclick="discussionClick('+index+');">top</span>';      
    div +='<span class="catalog-btn-edit fl" id="catalog-btn-edit-'+index+'" title="eidt" onclick="eidtClick('+index+');"></span>' ;  	
    div +='<span class="catalog-btn-del fl" id="catalog-btn-del-'+index+'" title="delete" onclick="deleteClick('+index+');"></span>';   	
    div +='<span class="catalog-btn-toggle fl" name="catalog-btn-toggle-'+index+'" title="deploy" onclick="deployClick('+null+','+index+');"></span>';
    div +='</h4>';  
    div +='<div id="discussion-refer-item" name="discussion-refer-item'+index+'">';      
    div +='</div>'   
    div +='<div class="refer-add-btn transition-all" name="refer-add-btn-'+index+'"><em class="public-icon-bg" ></em>Add Refer</div>';
    $(".data-discussion").html(div);
    initUploader();
}
function discussionClick(index){
	$("#discussion-title-item-"+index).css('display','none');
	$("#section-title-ipt-"+index).css('display','block');
}
//新增或者修改章标题
function addDiscussionTitle(index){
	 var id = $("#id-"+index).val();
	//章讨论的标题不能大于120（长度限制）
	 var value;
	 var $value = $("#section-title-ipt-"+index).val();
	      if($value.length >120){
	    	  value=$value.substr(0,120);
	      }else{
	    	  value = $value;
	      }
	  alert(value);
	  alert(id);
	 //value不为空做修改
	 if(id ==""){
		 alert("kkkk");
		 $.ajax({
			 type:"post",
			 url:basePath+"/course/thirdStep/saveDiscussion",
			 dataType:'json',
			 data:{
				  "title":value,
		    	  "courseId":$("#courseId").val(),
		    	  "chapterId":540,
			 },
			 beforeSend:function(){},
			 success:function(data){
				     if(data.disscussion !=null && data.disscussion !=''){
					  $("#discussion-title-item-"+index).css("display","block");
					  $("#section-title-ipt-"+index).css("display","none");
					  $("#discussion-title-item-"+index).text(data.disscussion.title);
					  $("#discussion-title-item-"+index).removeAttr("onclick");
					  $("#hintico"+index).removeClass().addClass("rightico");
					  $("[name='refer-add-btn-"+index+"']").find(".public-icon-bg").attr("id",""+data.disscussion.id);
					  $("[name='refer-add-btn-"+index+"']").attr("id","refer-add-btn-"+data.disscussion.id);
					  $("[name='catalog-btn-toggle-"+index+"']").attr("id","catalog-btn-toggle-"+data.disscussion.id);
					  $("[name='discussion-refer-item"+index+"']").attr("id","discussion-refer-item"+data.disscussion.id);
					  initUploader();
				  }
				 
			 },
			 error:function(data){}
			 
		 });
		
	 }else{
		 $.ajax({
			 type:"post",
			 url:basePath+"/course/thirdStep/updateDiscussion",
			 dataType:'json',
			 data:{
				  "title":value,
				  "id":id,
				  "content":value,
		    	  "courseId":$("#courseId").val(),
		    	  "chapterId":540,
			 },
			 beforeSend:function(){},
			 success:function(data){
				  $("#discussion-title-item-"+index).text(value);
				  $("#discussion-title-item-"+index).css("display","block");
				  $("#section-title-ipt-"+index).css("display","none");
				  $("#discussion-title-item-"+index).removeAttr("onclick");  
			 },
			 error:function(data){}
			 
		 }); 
	 }
		initUploader();
}
//删除帖子模板
function deleteClick(index){
	var  id= $("#id-"+index).val();
	layer.confirm(zLocale.public_message, {
		title:' ', 
	    skin: 'layui-layer-zhs',
	    icon:0,
	    shade:.6,
	    btn: [zLocale.public_confim,zLocale.public_cancel] //按钮
	 }, function(){
		 var value = $(".data-discussion").find(".refer-add-btn.transition-all").size();
			$("#catalog-discussion-clearfix"+index).remove();
			$("[name='refer-add-btn-"+index+"']").remove();
			$("[name='discussion-refer-item"+index+"']").remove();
			for(var i=index+1;i<=value;i++){
				$("#catalog-discussion-clearfix"+i).attr("id","catalog-discussion-clearfix"+(i-1));
				$("[name='refer-add-btn-"+i+"']").attr("name","refer-add-btn-"+(i-1));
				$("#discussion-number-"+i).attr("id","discussion-number-"+(i-1));
				$("#discussion-number-"+(i-1)).text("Discussion "+(i-1)+":");
				$("#id-"+i).attr("id","id-"+(i-1));
				$("#section-title-"+i).attr("id","section-title-"+(i-1));
				$("#discussion-title-item-"+i).attr("id","discussion-title-item-"+(i-1));
				$("#catalog-btn-edit-"+i).attr("id","catalog-btn-edit-"+(i-1));
				$("#catalog-btn-del-"+i).attr("id","catalog-btn-del-"+(i-1));
				$("[name='catalog-btn-toggle-"+i+"']").attr("name","catalog-btn-toggle-"+(i-1));
				$("#section-title-"+(i-1)).attr("onblur","addDiscussionTitle("+(i-1)+")");
				$("#discussion-title-item-"+(i-1)).attr("onclick","discussionClick("+(i-1)+")");
				$("#catalog-btn-edit-"+(i-1)).attr("onclick","eidtClick("+(i-1)+")");
				$("#catalog-btn-del-"+(i-1)).attr("onclick","deleteClick("+(i-1)+")");
				$("[name='catalog-btn-toggle-"+(i-1)+"']").attr("onclick","deployClick("+null+","+(i-1)+")");
				$("[name='discussion-refer-item"+i+"']").attr("name","discussion-refer-item"+(i-1));
			}
		 if(id !=null && id !='' && id!='undifine' && id !='null'){
			$.ajax({
				type:"post",
				url:basePath+"/course/thirdStep/removeDiscussion",
				dataType:'json',
				async:true,
				data:{"id":id},
				beforeSend:function(){},
				success:function(data){
					 if(data.success ==1){
			 			 layer.msg({
			 	    	     time: 1000, //1s后自动关闭
			 	    	   });
					 }				
				},
				error:function(data){}
				
			})
    		layer.msg({
	    	     time: 1000, //1s后自动关闭
	    	   });
		 }else{
	    		layer.msg({
		    	     time: 1000, //1s后自动关闭
		    });
		 }
	 }, function(){
		 // 取消不做操作
	 });

}
//展开或者是折叠模板
function deployClick(bbsId,index){
    if(bbsId !='null' && bbsId != null && bbsId !=undefined ){
	$("#catalog-btn-toggle-"+bbsId).toggleClass("blur");
	$blur = $("#catalog-btn-toggle-"+bbsId)
	    if($blur.hasClass("blur")){
		  $("#discussion-refer-item"+bbsId).hide();
		  $("#refer-add-btn-"+bbsId).hide();
	    }else{
		  $("#discussion-refer-item"+bbsId).show();
		  $("#refer-add-btn-"+bbsId).show();
	    }
    }else{
    	$("[name='catalog-btn-toggle-"+index+"']").toggleClass("blur");
    	var $blur = $("[name='catalog-btn-toggle-"+index+"']");
    	if($blur.hasClass("blur")){
    		$("[name='discussion-refer-item"+index+"']").hide();
    		$("[name='refer-add-btn-"+index+"']").hide();
    	}else{
    		$("[name='discussion-refer-item"+index+"']").show();
    		$("[name='refer-add-btn-"+index+"']").show();
    	}
    }
}
//编辑模板标题
function eidtClick(index){
	$("#catalog-btn-edit-"+index).on("click",function(){
		$("#discussion-title-item-"+index).css("display","none");
		$("#section-title-ipt-"+index).css("display","block");
		$("#section-title-ipt-"+index).focus();
		
	})
}
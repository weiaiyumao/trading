/***
 * 图片查看器
 * @author JinXing
 * @date 2019年11月24日 下午14:36
 */

//图片弹框绑定
var public_ImageShow=function(){
	
	$.each(".layerImageShow",function(){
		
		
		$(".layerImageShow").unbind("click").bind("click",function(){	
		
			var imgShow=$(this).attr("src");
			
			if(imgShow !=""){
				
				var _width=850;
				var _height=520;
				var image=getImageSize(imgShow);
				_width=image.width;
				_height=image.height;
				
				//if(_width >850)_width=850;
				//if(_height >520)_height=520;
				
				if(_width <100)_width=100;
				if(_height <100)_height=100;
				
				console.log(_width+"====="+_height);
				$("#layerImageShow img").attr("src",imgShow);
				$("#layerImageShow img").css("width",_width);
				$("#layerImageShow img").css("height",_height);
				
				layerImageShow(_width,_height);
			}
		});
		
	});
	
};

//获取Src图片的大小
function getImageSize(src){
	
	var image = new Image();
	image.src = src;
	image.onload = function(){
		//alert(image.width);
		//alert(image.height);

	}
	return image;
}


//图片弹框
var layerImageShow=function(_width,_height){
	
	//关闭之前的弹窗
	layer.closeAll();
	layer.open({
		  type:1,
		  shift:5,
		  shade: [0.5, '#393D49'],
		  title :" ",
		  area: [_width,_height],
		  fix: false, //不固定
		  move: false,
		  zIndex:9900,
		  content:$("#layerImageShow"),
		  end:function(){//关闭弹窗

		  }
	
		}); 
	
};

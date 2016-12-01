/**
	 * showText、hideText、displayText用于
	 * Course Introduction中隐藏显示的
	 * 
	 */
	/**
	 * 显示全部文本
	 */
	function showText(index){
		var divHide = $("#course-introd-cont-id"+index).html();
		var $divShow = $(".course-introd-cont").eq(index);
		var $p = $("div", $divShow).eq(0);
		$p.html(divHide+'<em class="introd-arrow-hover project-ico blur" onClick="hideText('+index+');"></em>');
		$divShow.css("height",$p.outerHeight()+"px");
		findDescendants();
	}


	


	/**
	 * 把文本全部显示，但是会把页面拉长
	 */
	function hideText(index){
		var $divShow = $(".course-introd-cont").eq(index);
		$divShow.css("height","58px");
	    var divH = $divShow.height();
	    var $p = $("div", $divShow).eq(0);
	    while($p.outerHeight() > divH) {
	        $p.html($p.text().replace(/([a-zA-Z0-9\\_]+|\W)(\.\.\.)?$/, '...<em class="introd-arrow-hover project-ico" onClick="showText('+index+');"></em>'));
	    };
	}


	
	/**
	 * 把文本全部显示，但是会把页面拉长
	 */
	function displayText(){
		$(".course-introd-cont").each(function(i){
		    var divH = $(this).height();
		    var $p = $("div", $(this));
		    console.log("cont:"+divH);
		    console.log("cont"+$p.outerHeight());
		     while($p.outerHeight() > divH) {
		       $p.html($p.text().replace(/(\s)*([a-zA-Z0-9\\_]+|\W)(\.\.\.)?$/, '...<em class="introd-arrow-hover project-ico" onclick="showText('+i+');"></em>'));
		     };
		});
	}
 
	
	
	/**
	 * Personal Profile
	 * Prerequisite
	 * 弹框显示的高度不同，需要写不同的
	 */
	function alertDivDisplayText(divClass,emClass){
		  
		$("."+divClass).each(function(i){
		    var divH = $("."+divClass).height();
		    var $p = $("div", $(this)).eq(i);
		    while($p.outerHeight() > divH){
		      $p.html($p.text().replace(/(\s)*([a-zA-Z0-9\\_]+|\W)(\.\.\.)?$/,'...<em class="'+emClass+' project-ico"></em>'));
		      
		    };
		});   
	}

	/**
	 * 绑定 td表单边框，去掉粗线
	 * @param divClass
	 */
	function findDescendants(){
		    var $td=$(".tableclass td");
			for(var j=0;j<$td.length;j++){
				$td.eq(j).css("border","1px solid ");
			}  
	}
	
	
	/**
	 * ASSESSMENT STRATEGY
	 */
$(function() {
	var $decimal = $(".ininum");
	var $colorFullmartk = $(".fullmark-ul li");
	var num, arr = [];
	$decimal.each(function(i) {
		num = parseFloat($decimal.eq(i).text())
		$decimal.eq(i).text(num);
	})
	// ===分数进度
	$colorFullmartk.each(function(i) {
		if ($colorFullmartk.eq(i).text() <= 0) {
			$colorFullmartk.eq(i).hide();
		} else {
			arr.push(i);
		}
	})
	$colorFullmartk.eq(arr[0]).addClass("leftradius");
	$colorFullmartk.eq(arr[arr.length - 1]).addClass("rightradius");
})


	/**
	 * CURSE SCHEDULE
	 * 
	 */
$(function() {
	var $teachindaytime_div = $(".teachindaytime-div");
	var divRight = "teachindaytime-div-right";
	var divLeft = "teachindaytime-div-left";
	for (var i = 0; i < $teachindaytime_div.length; i++) {
		if ((i & 1) == 0) {
			$teachindaytime_div.eq(i).addClass(divRight);
		} else {
			$teachindaytime_div.eq(i).addClass(divLeft);
		}
	}
});

	
    /**
	 * 小节视频弹框
	 */
$(function() {
	$("#video-ul li:gt(1)").click(function() {
		layer.open({
			title : ' ',
			icon : 0,
			content : zLocale.creatcoursehome_trial_watch,
			shade : .6,
			skin : 'layui-layer-zhs',
			btn : [ zLocale.public_confim ]
		// 按钮
		});
		$(".layui-layer-padding").css("padding-left", "95px");//
	})
	
	

	
})
	

	
   	/**
 * SYLLABUS
 * 
 */
$(function() {
	$(".chapterInfoClass span,table").css("color", "#959595");
	$(".chapterInfoClass td").css("border", "1px solid ");
})



/**
 * 空格处理
 */
$(function(){
	  var $str = $("#institution");
	  if ($str.text().indexOf(" ") >=0){
		  $str.addClass("breakword");
      }else{
    	  $str.addClass("bareakall");
      }
})

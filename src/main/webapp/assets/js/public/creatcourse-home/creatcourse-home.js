$(function(){
    alertDivDisplayText("lecturer-introd","arrow-hover");
	alertDivDisplayText("prequis-cont","pret-arrow-hover"); 
	toggleHideText($(".arrow-hover"),$(".show-wrap"));
	toggleHideText($(".pret-arrow-hover"), $('.preq-show-wrap'));
	function toggleHideText($elem,$target){
		$elem.click(function(event){
			$target.fadeIn(700);	
			$(".nano").nanoScroller({alwaysVisible: true});
			event.stopPropagation();
			var isOut = true;
			$target.mouseenter(function(){
				isOut = false;	
			});
			$target.mouseleave(function(){
				isOut = true;	
			})
			$(document).click(function (event) { 
				if(isOut){
					$target.fadeOut(700);
				}
			});
		})
	}
	$("#video-ul").scroll_left_right({
		srcoll_obj:$("#video-ul"),
		panel_elem: 4,
		arrow_left: "#sliderprev",
		arrow_right: "#slidernext",
		edge_scroll:false
	});
});


/*--left right click scroll plugin--*/
(function($){
	var page_cur=1;
	var $elem_move;
	var width_one;
	var elem_num;
	var page_total;
	var settings = {
			srcoll_obj:$("#video-ul"),
			panel_elem:4, 
			arrow_left:"#sliderprev",
			arrow_right:"#slidernext",
			edge_scroll:false,
			arrow_click:function($this){
				
			}
	};
	$.fn.scroll_left_right=function(options){
		$.extend(settings, options);
		$elem_move=$(settings.srcoll_obj);
		width_one=$elem_move.children(":visible").outerWidth()+parseInt($elem_move.children(":visible").css("margin-left"))+parseInt($elem_move.children(":visible").css("margin-right"));
	    elem_num=$elem_move.children(":visible").length;
	    page_total=Math.ceil(elem_num/settings.panel_elem);
		$elem_move.css({width:width_one*elem_num});
		$(settings.arrow_left).unbind("click").bind("click",
			function(){
				var j = 0;
				$(settings.srcoll_obj).find("li").each(function (i) {
					j++;
				});
				if (j <=settings.panel_elem) {
					return false;
				}
				if(!$elem_move.is(":animated")){
					if(page_cur > 1){
						page_cur--;
						$elem_move.animate({width:width_one*elem_num,marginLeft:"+="+width_one*settings.panel_elem},"slow");
					}else{
						if(settings.edge_scroll){
							$elem_move.animate({width:width_one*elem_num,marginLeft:-width_one*settings.panel_elem*(page_total-1)});
							page_cur=page_total;
						}
						
					}
				}
				
				settings.arrow_click($(settings.arrow_left),page_cur);
			}
			
		);
		$(settings.arrow_right).unbind("click").bind("click",
			function(){
				var j = 0;
				$(settings.srcoll_obj).find("li").each(function (i) {
					j++;
				});
				if (j <= settings.panel_elem) {
					return false;
				}
				if(!$elem_move.is(":animated")){
					if(page_cur < page_total){
						page_cur++;
						$elem_move.animate({width:width_one*elem_num,marginLeft:"-="+width_one*settings.panel_elem},"slow");
					}else{
						if(settings.edge_scroll){
							$elem_move.animate({width:width_one*elem_num,marginLeft:0});
							page_cur=1;
						}
						
					}
				}
				settings.arrow_click($(settings.arrow_right),page_cur);
			}
		);
		
		if($(settings.srcoll_obj).find("li").length<=settings.panel_elem){
			$(settings.arrow_left).hide("slow");
			$(settings.arrow_right).hide("slow");
		}
	};
	
})(jQuery);
  
//	$("#video-ul").scroll_left_right({
//		srcoll_obj:$("#video-ul"),
//		panel_elem: 4,
//		arrow_left: "#sliderprev",
//		arrow_right: "#slidernext",
//		edge_scroll:false
//	});


	
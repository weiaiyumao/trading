//光标放在最后 $("#文本框ID").textFocus();光标放在第二个字符后面 $("#文本框ID").textFocus(2);
(function($){
    $.fn.textFocus=function(v){
        var range,len,v=v===undefined?0:parseInt(v);
        this.each(function(){
            if($.browser.msie){
                range=this.createTextRange();
                v===0?range.collapse(false):range.move("character",v);
                range.select();
            }else{
                len=this.value.length;
                v===0?this.setSelectionRange(len,len):this.setSelectionRange(v,v);
            }
            this.focus();
        });
        return this;
    }
})(jQuery);
/**
 * Created by DELL-13 on 2016/10/9.
 */
(function () {
    var defaults = {};
    var innerOpt = {
        data_attr: "_crudArea_",
        group_attr: "_containerGroup_",//事件组名称
        groupId: 0
    };

    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    var userAgent = navigator.userAgent.toLowerCase();

    var isSafari=function () {
        var b =Sys.safari;
        if(b) {
            // alert('isSafari');
        }
        return b;
    }
    var commonSortableOpt = {
//            draggable: ".chapter",
//                dragoverBubble: true,
//                dropBubble: true,
        sort:true,
        scrollSensitivity: 50,
        scrollSpeed: 10,
        animation: 200,
        ghostClass: "ghost",
        // dragClass: "sortable-drag",
        //     forceFallback: $.browser.mozilla,
            forceFallback: !isSafari(),//只有safari为false
        // forceFallback: true,
        fallbackTolerance: 5,
        // fallbackClass: "sortable-fallback",
        fallbackOnBody: false,
        // delay: 10,
        // fallbackOnBody: !isSafari(),//只有safari为false
        chosenClass: "chosen",
        // dragoverBubble:false,
        dropBubble:false
    };


    var is_msie=/msie/.test( userAgent ) && !/opera/.test( userAgent );
    var ex_version=(userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1];
    var isLowerIE = function () {
        if(!is_msie){
            return false;
        }
        return  (ex_version == "8.0") ||(ex_version == "7.0") ||(ex_version == "6.0");
    }
    var isIELte9 = function () {
        if(!is_msie){
            return false;
        }
        return  (ex_version == "9.0") ||  (ex_version == "8.0") ||(ex_version == "7.0") ||(ex_version == "6.0");
    }

    //export
    $.isLowerIE = isLowerIE;
    $.isIELte9 = isIELte9();
    $.isIE = is_msie;
    $.isIE9 = is_msie&&ex_version == "9.0";
    $.isSafari = isSafari();

    var findItemWithParentCls = function ($curobj,parentCls) {
        var MAX_DEEP=5;
        var cur_deep=0;
        var curItem = $curobj.parent();
        while(curItem.parent(parentCls).size()==0&&(cur_deep++<MAX_DEEP)){
            curItem = curItem.parent();
        }
        return curItem;
    }

    function Plugin(element, options) {
        this.el = $(element);
        this.opt = $.extend({}, defaults, options);
        this.initProcess();
    }

    Plugin.prototype = {
        initProcess: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;

            // console.log(opt);
            var $component = opt.init.createComponent();
            this.com = $component;


            //初始化请求数据
            var _event = {mode: 'init'};
            if (opt.init.dataSrc) {
                $plgThis.drawProcess(_event, opt.init.dataSrc);
            } else if (opt.init.onInit) {
                opt.init.onInit.apply($plgThis, [_event]);
            } else {
                $plgThis.drawProcess(_event, []);
            }


            //此时已经经过
            //1.初始化请求数据
            //2.通过得到的数据获得一个jqueryObject,它是一个component(之后绑定了更新、删除、滑动事件)
            //3.排序初始化，绘制序号
            //4.绑定添加按钮事件
            //5.将component绘制到页面上，即this对应的container
            //6.初始化结束事件回调
        },
        drawProcess: function (_event, dataArr) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;
            var newCls = opt.draw.create().attr("class");
            $component.data(innerOpt.group_attr,""+new Date().getTime());
            $plgThis.newCls=newCls;
            var slideSpeed = 'normal';

            //委派 绑定滑动切换事件
            if (opt.slide && opt.slide.slideClass) {
                $component.delegate(opt.slide.slideClass,"click",function () {
                    var idx = $component.find(opt.slide.slideClass).index(this);
                    var toggleUp = $component.find(opt.slide.toggleContent).eq(idx).filter(":visible").length>0;

                    var $new = $component.find("."+newCls).eq(idx);
                    // console.log("toggled");
                    toggleUp?$new.trigger("slideUp"):$new.trigger("slideDown");

                    var contentHeight = $component.find(opt.slide.toggleContent).height();
                    // console.log(contentHeight);

                    var realSlideSpeed = slideSpeed;
                    if(contentHeight<100){
                        realSlideSpeed="fast"
                    }

                    $component.find(opt.slide.toggleContent).eq(idx).slideToggle(realSlideSpeed,function () {
                        if("repaintNavTree" in window){
                            window.repaintNavTree();
                        }
                    });

                });

                if (opt.slide.ignoreSlide) {
                    $component.delegate(opt.slide.ignoreSlide, "click", function (e) {
                        e.stopPropagation();
                    });
                }

                var assignTitle=false;
                $component.delegate("."+newCls,"slideUp",function (e) {
                    var $new = $(this);
                    var toggleMark = opt.slide.toggleMark;
                    toggleMark = toggleMark?toggleMark:".catalog-btn-toggle";

                    var $toggleMark = $new.find(opt.slide.slideClass).find(toggleMark);
                    $toggleMark.addClass("blur");

                    assignTitle?$toggleMark.attr("title",zLocale.thirdstep_deploy):$toggleMark.removeAttr("title");

                    if(opt.slide.toggleHeaderItem && opt.slide.addToggleHeaderCls){
                        $new.find(opt.slide.toggleHeaderItem).addClass(opt.slide.addToggleHeaderCls);
                    }
                    e.stopPropagation();
                });
                $component.delegate("."+newCls,"slideDown",function (e) {
                    var $new = $(this);
                    var toggleMark = opt.slide.toggleMark;
                    toggleMark = toggleMark?toggleMark:".catalog-btn-toggle";

                    var $toggleMark = $new.find(opt.slide.slideClass).find(toggleMark);
                    $toggleMark.removeClass("blur");

                    assignTitle?$toggleMark.attr("title",zLocale.thirdstep_fold):$toggleMark.removeAttr("title");

                    if(opt.slide.toggleHeaderItem && opt.slide.addToggleHeaderCls){
                        $new.find(opt.slide.toggleHeaderItem).removeClass(opt.slide.addToggleHeaderCls);
                    }
                    e.stopPropagation();
                });
            }

            //委派 绑定点击添加的事件
            if (opt.add && opt.add.btnClass) {
                var _event2 = {mode: 'add'};
                $component.delegate("." + opt.add.btnClass,"click",function (e) {
                    _event2.e = e;
                    _event2.src = $(this);

                    var newIdx=-1;
                    if (opt.add.containerClass ) {
                        newIdx = $component.find(opt.add.containerClass).children().size();
                    }

                    opt.add.onAdd.apply($plgThis, [_event2, $(this),newIdx]);

                    //重新绘制序号
                    $plgThis.drawIndex();
                });
            }

            //委派  绑定删除的事件
            if (opt.remove && opt.remove.btnClass) {
                var l_event = {mode: 'remove'};

                $component.delegate("." + opt.remove.btnClass,"click",function (e) {
                    var idx = $component.find("." + opt.remove.btnClass).index(this);
                    var $new = $component.find("."+newCls).eq(idx);
                    l_event.e = e;
                    l_event.src = $(this);


                    var jsonArr = [];
                    var curIdx=-1;
                    if (opt.remove.containerClass && opt.remove.sortPostGenerator) {
                        //计算受影响行 生成json array
                        var $container = $component.find(opt.remove.containerClass);

                        //需配置sortPostGenerator
                        if (opt.remove.sortPostGenerator) {
                            var curItem = findItemWithParentCls(l_event.src,opt.remove.containerClass);

                            if(curItem){
                                var startIdx = ( curIdx = curItem.index())+1;
                                var endIdx = $container.children().size()-1;

                                for (var i = startIdx; i <= endIdx; i++) {
                                    var jsonOne = opt.remove.sortPostGenerator($container.children().eq(i), i-1);
                                    jsonArr.push(jsonOne);
                                }
                            }
                        }
                    }

                    var realDeleteProcessor = function () {
                        opt.remove.onDelete.apply($plgThis, [l_event, $(this), $new,curIdx,jsonArr]);
                    }

                    if("layer" in window){
                        layer.confirm(zLocale.public_message, {
                            title:' ',
                            skin: 'layui-layer-zhs',
                            icon:0,
                            shade:.6,
                            btn: [zLocale.public_confim,zLocale.public_cancel] //按钮
                        }, function(index,layero ){
                            realDeleteProcessor();
                            layer.close(index) ;
                        });
                    } else {
                        realDeleteProcessor();
                    }


                    //初始绘制序号
                    $plgThis.drawIndex();
                });
            }

            //如果有handle 并且 配置了可滑动 所有的都收起
            if(opt.sort && opt.sort.handle && opt.slide){
                var handleClkY;
                var holderCls="preBlankForSort";
                var $itemsCon = $component.find(opt.sort.containerClass);

                $component.delegate(opt.sort.handle,"mousedown",function (e) {
                    // console.log(e);
                    handleClkY=e.clientY;
                    // handleClkY=e.screenY;

                    $itemsCon.children("."+holderCls).remove();
                    $itemsCon.prepend("<div class='"+holderCls+"'></div>");
                });

                $component.delegate(opt.sort.handle,"doSlideUp",function (e) {
                    var $handleThis = $(this);
                    var idx = $component.find(opt.sort.handle).index(this);
                    var $new = $component.find("."+newCls).eq(idx);
                    // console.log($new);
                    // console.log($new.position());
                    var isHidden=$component.find(opt.slide.toggleContent).filter(":visible").length==0;
                    var isPrevAllHidden=$component.find(opt.slide.toggleContent+":lt("+idx+")").filter(":visible").length==0;
                    // console.log(isPrevAllHidden);

                    if(isSafari()) {
                        $.sort_isPrevAllHidden = {value:isPrevAllHidden};
                    }

                    var _temp=0;
                    var _total=$component.find(opt.slide.toggleContent).size();


                    var cb = function () {
                        $component.find(opt.slide.slideClass).trigger("slideUp");

                        if(opt.sort.toTopBeforeSlide){
                            if(!isPrevAllHidden) {
                                $.scrollYSmoothly(0, 0);
                            }
                        }


                        $component.find(opt.slide.toggleContent).slideUp(slideSpeed,function () {

                            if(++_temp==_total) {
                                if(!isPrevAllHidden){
                                    // console.log("item top"+$new.find(opt.sort.handle).offset().top);
                                    // console.log("mouse top"+handleClkY);
                                    var relY = $new.find(opt.sort.handle).offset().top-handleClkY;
                                    if(relY>0){
                                        $.scrollYSmoothly(relY,300);
                                    }else{
                                        //补充空白
                                        //$itemsCon.children("."+holderCls).css("height",Math.abs(relY));
                                        $.scrollYSmoothly(0,300);
                                    }
                                }else {

                                    if(isSafari()){
                                        // // $.scrollYSmoothly(0,300);
                                        // $component.find(opt.sort.containerClass).trigger("dragover");
                                        // $component.find(opt.sort.containerClass).trigger("dragenter");
                                        // $component.find(opt.sort.containerClass).trigger("mousemove");
                                        // dragover

                                        // $handleThis.trigger("touchmove");
                                    }
                                }
                                // console.log(handleNew);
                            }
                        });
                    }

                    // if(isSafari() && isPrevAllHidden){
                    //
                    //     $component.find(opt.slide.toggleContent).slideDown(100,function () {
                    //         isPrevAllHidden=$component.find(opt.slide.toggleContent+":lt("+idx+")").filter(":visible").length==0;
                    //         cb();
                    //     });
                    //     return;
                    // } else {
                        cb();
                    // }

                });
            }

            //委派  根据是否为空执行input span切换的事件
            if (opt.title_state && opt.title_state.inputStateCls) {
                var inputSelector = "." + opt.title_state.inputStateCls+" input";
                //显示地变更状态
                if (opt.title_state.editCls){
                    var editSelector =  "." + opt.title_state.editCls;
                    $component.delegate(editSelector, "click", function (e) {
                        var idx = $component.find(editSelector).index(this);
                        var $new = $component.find("."+newCls).eq(idx);
                        $plgThis.changeToTitleInputState($new);

                        // $new.find(inputSelector).focus();
                        $new.find(inputSelector).textFocus().trigger("click");
                    });
                }

                //bind LimitCls show
                if (opt.title_state.inputLimitCls){
                    var limitSelector = "." + opt.title_state.inputLimitCls;
                    var hiddenCls =  opt.title_state.hiddenCls;

                    $component.delegate(inputSelector, "click", function (e) {
                        var idx = $component.find(inputSelector).index(this);
                        var $limit = $component.find(limitSelector).eq(idx);
                        $limit.removeClass(hiddenCls );
                    });
                    $component.delegate(inputSelector, "blur", function (e) {
                        var idx = $component.find(inputSelector).index(this);
                        var $limit = $component.find(limitSelector).eq(idx);
                        $limit.addClass(hiddenCls);
                    });
                    $component.delegate(inputSelector, "mouseover", function (e) {
                        var idx = $component.find(inputSelector).index(this);
                        var $limit = $component.find(limitSelector).eq(idx);
                        if(!$(this).is(":focus")){
                            $limit.removeClass(hiddenCls);
                        }
                    });
                    $component.delegate(inputSelector, "mouseout", function (e) {
                        var idx = $component.find(inputSelector).index(this);
                        var $limit = $component.find(limitSelector).eq(idx);
                        if(!$(this).is(":focus")){
                            $limit.addClass(hiddenCls);
                        }
                    });

                    //限制数量
                    if (opt.title_state.inputLimit){
                        $component.delegate(inputSelector, "keyup", function (e) {
                            var idx = $component.find(inputSelector).index(this);
                            var $new = $component.find("."+newCls).eq(idx);

                            $plgThis.setTitleLimitRestNum($new);
                        });

                    }
                }


                //bind input changed event
                $component.delegate(inputSelector, "blur", function (e) {
                    var idx = $component.find(inputSelector).index(this);
                    var $limit = $component.find(limitSelector).eq(idx);
                    var $new = $component.find("."+newCls).eq(idx);

                    $plgThis.titleInputStateCheck($new);
                });


            }

            //排序绑定
            //不支持IE8以下浏览器
            if (opt.sort && !isLowerIE()) {
                opt.sort.group = "_group" + innerOpt.groupId++;

                //aop 绘制序号
                if (opt.sort.sortPostUrl) {
                    opt.sort.onSortChange=function (evt) {
                        var oldIdx = $(evt.item).data('_sort_start');  // element's old index within parent
                        var newIdx = evt.newIndex;  // element's new index within parent


                        //无效拖动不请求
                        if(newIdx != undefined && oldIdx!=newIdx){
                            //计算受影响行 生成json array
                            var $container = $(evt.to);

                            //需配置sortPostGenerator
                            var jsonArr = [];
                            if(opt.sort.sortPostGenerator){
                                var startIdx = oldIdx<newIdx?oldIdx:newIdx;
                                var endIdx = oldIdx<newIdx?newIdx:oldIdx;
                                for(var i=startIdx;i<=endIdx;i++){
                                    var jsonOne = opt.sort.sortPostGenerator($container.children().eq(i),i);
                                    jsonArr.push(jsonOne);
                                }
                            }

                            $.ajax({
                                url: this.sortPostUrl,
                                type:"post",
                                data: this.sortPostData(oldIdx, newIdx, $(evt.item),evt,jsonArr)
                            });
                        }
                    };

                    opt.sort.onStart=function (/**Event*/evt) {
                        //save old index
                        $(evt.item).data('_sort_start', $(evt.item).index());
                        $(evt.item).data('_sort_moving', true);
                        if(opt.sort.onSortStart){
                            opt.sort.onSortStart(evt,$(evt.item));
                        }
                    };

                    opt.sort.onEnd = function (evt) {
                        var holderCls="preBlankForSort";
                        var $itemsCon = $component.find(opt.sort.containerClass);

                        if($itemsCon.children("."+holderCls).length>0) {
                            $itemsCon.children("."+holderCls).animate({"height":0},600,"swing",function () {
                            });
                        }


                        setTimeout(function () {
                            $(evt.item).data('_sort_moving', false);
                        }, 500);

                        opt.sort.onSortChange(evt);

                        //重新绘制序号
                        $plgThis.drawIndex();

                        if(opt.sort.onSortEnd){
                            opt.sort.onSortEnd(evt,$(evt.item));
                        }

                        if("repaintNavTree" in window){
                            // console.log("repaintNavTree");
                            window.repaintNavTree();
                        }


                    }
                }

                //绑定操作
                var realOpt = $.extend({}, commonSortableOpt, opt.sort);
                $component.find(opt.sort.containerClass).sortable(realOpt);


            } else {
                //for lower ie
                if(opt.sort){
                    var realLogic = function () {
                        if("layer" in window){
                            layer.confirm(zLocale.thirdstep_not_support_sort, {
                                title:' ',
                                skin: 'layui-layer-zhs',
                                icon:0,
                                shade:.6,
                                btn: [zLocale.public_confim] //按钮
                            }, function(index,layero ){
                                layer.close(index) ;
                            });
                        }
                    }


                    if(opt.sort.handle){
                        $component.delegate(opt.sort.handle,"mousedown",function (e) {
                            realLogic();
                        });
                            // draggable: ".chapter",
                    }else if(opt.sort.draggable){
                        var data = {};
                        if($(document).data("dragIE8")){
                            data = $(document).data("dragIE8");
                        }else {
                            data.dragging = false;
                            data.maybeDrag = false;
                            data.startX=0;
                            data.startY=0;
                            data.offsetX;
                            data.offsetY;
                            data.verdict=40;
                            data.mouseDownItem;
                        }

                        $component.delegate(opt.sort.draggable,"mousedown",function (e) {
                            // console.log("mousedown");
                            data.dragging=false;
                            data.maybeDrag=true;
                            data.startX = e.clientX;
                            data.startY = e.clientY;

                            var $item =$(this);
                            data.mouseDownItem = $item;
                        });

                        if(!$(document).data("dragIE8")){
                            $(document).on("mousemove",function (e) {
                                if(!data.maybeDrag){
                                    return;
                                }
                                data.offsetX = Math.abs(e.clientX-data.startX);
                                data.offsetY = Math.abs(e.clientY-data.startY);
                                // console.log(data.offsetX+' '+data.offsetY);
                                if(data.offsetX>data.verdict||data.offsetY>data.verdict){
                                    data.dragging=true;

                                    // console.log("dragging");
                                    data.mouseDownItem.data('_sort_moving', true);

                                    realLogic();
                                    setTimeout(function () {
                                        data.mouseDownItem.data('_sort_moving', false);
                                    }, 500);

                                    data.maybeDrag=false;
                                }
                            });

                            $(document).on("mouseup",function (e) {
                                // console.log("mouseup");
                                data.maybeDrag=false;
                            });

                            $(document).data("dragIE8",data);
                        }

                    }


                }
            }

            //绘制每一行
            // for (var i in dataArr) {
            for(var i=0;i<dataArr.length;i++){
                $plgThis.drawOneProcess(_event, dataArr[i]);
            }

            //重新绘制序号
            $plgThis.drawIndex();

            //放置component 至 container
            $plgThis.el.html($component);

            //afterAppend event
            if (opt.draw && opt.draw.afterAppend){
                // for (var idx in dataArr) {
                for(var idx=0;idx<dataArr.length;idx++){
                    var $new = $component.find("."+newCls).eq(idx);
                    opt.draw.afterAppend.apply($plgThis, [_event, $component, $new, dataArr[idx]]);
                }
            }

            //结束事件
            if (opt.init.onInitOver) {
                opt.init.onInitOver.apply($plgThis, [_event]);
            }

        },
        drawOneProcess: function (_event, data) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            //绘制步骤
            var $new = opt.draw.create.apply($plgThis, [_event, data]);
            $new.data("container",$plgThis);
            $new.data(innerOpt.group_attr,$component.data(innerOpt.group_attr));

            opt.draw.afterCreated.apply($plgThis, [_event, $new, data]);
            opt.draw.draw.apply($plgThis, [_event, $component, $new, data]);

            //绑定更新事件
            if (opt.update && opt.update.fields) {
                var upFunc = opt.update.onUpdate;
                for(var i in opt.update.fields) {
                    var fieldOne = opt.update.fields[i];
                    $new.find(fieldOne.selector).bind(fieldOne.trigger,function (e) {
                        var newVal = $(this).val();
                        var pn = fieldOne.paramName;
                        var lparam={};
                        lparam[pn]=newVal;
                        upFunc.apply($plgThis,[$new,$(this),lparam]);
                    });
                }
            }

            //
            opt.draw.afterDrawn.apply($plgThis, [_event, $component, $new, data]);
            // opt.draw.afterDrawn.apply($plgThis, [_event, $component, $new, data]);

            //afterAppend event
            if(_event.mode =='add'){
                if (opt.draw && opt.draw.afterAppend){
                    opt.draw.afterAppend.apply($plgThis, [_event, $component, $new, data]);
                }
            }

            //trigger title显示状态
            $plgThis.titleInputStateCheck($new);

            //该行完整度
            $new.on("childrenRowIntegrityChanged",function (e,param) {
                // console.log("childrenRowIntegrityChanged");
                // console.log(arguments);
                // console.log("this group:"+$new.data(innerOpt.group_attr));
                e.stopPropagation();

                // console.log($new);
                $plgThis.checkRowIntegrity($new);
            });

            //设置最大输入
            if (opt.title_state && opt.title_state.inputStateCls) {
                var inputSelector = "." + opt.title_state.inputStateCls + " input";
                if (opt.title_state.inputLimit) {
                    $new.find(inputSelector).attr("maxlength",opt.title_state.inputLimit);
                }
            }

            return $new;
        },
        drawIndex: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            //有才画序号
            if(opt.index && opt.index.draw){
                $component.find(opt.index.containerClass).children(opt.index.item).each(function (idx,dom) {
                    var rIdx =idx+1;
                    opt.index.draw.apply($plgThis,[$(dom),rIdx]);

                });
            }

            //触发事件
            $plgThis.el.trigger("drawIndex");
        },
        getIndex: function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            var idx = $component.find("."+$plgThis.newCls).index($new);
            return idx;
        },
        getItems: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            return $component.find("."+$plgThis.newCls);
        },
        getChildren: function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            if(opt.childrenContainer){
               return opt.childrenContainer.apply($plgThis,[$new]);
            }

            return [];
        },
        checkIntegrity: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            var items = $plgThis.getItems();
            // console.log(items);

            var ret = true;
            items.each(function (idx,ele) {
                var one = $(ele);
                if(!$plgThis.checkRowIntegrity(one)){
                    ret =false;
                }
            });

            return ret;
        },
        checkRowIntegrity: function ($row) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

            var childrenContainers = $plgThis.getChildren($row);

            var ret = true;
           for(var i =0;i<childrenContainers.length;i++){
           // for(var i in childrenContainers){
               var containerOne = childrenContainers[i];
               var crudOne =  containerOne.data(innerOpt.data_attr);
               if(crudOne && !crudOne.checkIntegrity.apply(crudOne)){
                   ret = false;
               }
           }

           var shouldFireChangeEvent = false;
            if(opt.integrity&&opt.integrity.checkRow){
                if(!opt.integrity.checkRow.apply($plgThis,[$row])){
                    ret = false;
                }

                var oldI = $row.data("oldIntegrity");
                if(oldI == undefined || oldI!=ret) {
                    opt.integrity.whenIntegrityChanged.apply($plgThis, [$row, oldI, ret])

                }

                shouldFireChangeEvent = oldI != undefined && oldI!=ret;
            }

            $row.data("oldIntegrity",ret);

            if(shouldFireChangeEvent) {
                //编辑表单导致完整度变化时 冒泡完整度改变事件
                $component.trigger("childrenRowIntegrityChanged",{group:$row.data(innerOpt.group_attr)});
            }

            return ret;

        },
        fireAddOne: function () {
            var $plgThis = this;

            var addBtn = $plgThis.getAddBtn();
            if(addBtn && addBtn.size() > 0){
                addBtn.trigger('click');
            }

        },
        getAddBtn:function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;
            if (opt.add && opt.add.btnClass) {
                return $component.find("." + opt.add.btnClass)
            }
            return null;
        },
        titleInputStateCheck:function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            if (opt.title_state && opt.title_state.inputStateCls) {
                var inputSelector = "." + opt.title_state.inputStateCls+" input";
                var curVal = $new.find(inputSelector).val();
                if(isEmpty(curVal)){
                    $plgThis.changeToTitleInputState($new);
                } else {
                    $plgThis.changeToTitleDisplayState($new);
                }
            }
        },
        syncTitleValue:function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            if (opt.title_state && opt.title_state.inputStateCls) {
                var inputSelector = "." + opt.title_state.inputStateCls+" input";
                var displaySelector = "." + opt.title_state.displayStateCls + " span";
                var curVal = $new.find(inputSelector).val();
                $new.find(displaySelector).text(curVal).attr("title",curVal);

                $plgThis.setTitleLimitRestNum($new);
            }
        },
        changeToTitleInputState:function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            $plgThis.syncTitleValue($new);
            if (opt.title_state && opt.title_state.inputStateCls) {
                var hiddenCls =  opt.title_state.hiddenCls;
                $new.find("." + opt.title_state.inputStateCls).removeClass(hiddenCls);
                $new.find("." + opt.title_state.displayStateCls).addClass(hiddenCls);
            }
        },
        changeToTitleDisplayState:function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;
            $plgThis.syncTitleValue($new);
            if (opt.title_state && opt.title_state.inputStateCls) {
                var hiddenCls =  opt.title_state.hiddenCls;
                $new.find("." + opt.title_state.inputStateCls).addClass(hiddenCls);
                $new.find("." + opt.title_state.displayStateCls).removeClass(hiddenCls);
            }
        },
        setTitleLimitRestNum:function ($new) {
            var $plgThis = this;
            var opt = $plgThis.opt;

            //refresh Limit num
            if (opt.title_state.inputLimitCls && opt.title_state.inputLimit) {
                var limitSelector = "." + opt.title_state.inputLimitCls;
                var inputSelector = "." + opt.title_state.inputStateCls+" input";

                var MAX_LENGTH = opt.title_state.inputLimit;
                var $curInput = $new.find(inputSelector);

                var cur_length = $curInput.val().length;

                var rest = MAX_LENGTH-cur_length;
                if(cur_length > MAX_LENGTH){
                    rest = 0
                    $curInput.val($curInput.val().substring(0,MAX_LENGTH));
                }

                var $limit = $new.find(limitSelector);
                $limit.text(rest);
            }

        },
        fireSizeChanged:function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $component = $plgThis.com;

        },
        fireIntegrityChanged:function () {

        }
    }

    $.fn.crudArea = function (params) {
        var lists = this,
            retval = this;
        var args = arguments;
        lists.each(function () {
            var plugin = $(this).data(innerOpt.data_attr);

            if (!plugin ) {
                if ( typeof params === 'object') {
                    var nPlg = new Plugin(this, params);
                    $(this).data(innerOpt.data_attr, nPlg);
                    retval = nPlg;
                }
            } else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    retval = plugin[params].apply(plugin, [].slice.call(args, 1));
                } else {
                    retval = plugin;
                }
            }
        });

        return retval || lists;
    }
})($);
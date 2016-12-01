(function () {
    var defaults = {
        step:50,
        integrityWarnClass:"hintico",
        integritySuccessClass:"rightico"
    };
    var innerOpt = {
        data_attr: "_treenityNavTree_",
    };


    $.scrollSmoothly = function ($target,t,cb) {
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({scrollTop: $target.offset().top}, t,"swing",cb);
    }
    $.scrollYSmoothly = function (y,t,cb) {
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({scrollTop: y}, t,"swing",cb);
    }

    var allEle;
    var headLen;
    var ddArr;
    var slideInnerHeight;
    var slideOutHeight;
    var enableTop;
    var step;

    function Plugin(element, options) {
        this.el = $(element);
        this.opt = $.extend({}, defaults, options);
        this.initProcess();
    }

    //导航的滚动，以及向上，向下按钮的显示隐藏
    function scrollSlide(that, index) {
        // console.log(index);
        if (index < 5) {
            $('#sideCatalog-catalog dl').stop().animate({'top': '0'}, 'fast');
        }
        // else if (index > 11) {
        //     // $('#sideCatalog-catalog dl').stop().animate({'top': -enableTop}, 'fast');
        //     $('#sideCatalog-down').removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
        //     $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
        // }
        else {
            var dlTop = parseInt($('#sideCatalog-catalog dl').css('top')) + slideOutHeight / 2 - (that.offset().top - $('#sideCatalog-catalog').offset().top);
            $('#sideCatalog-catalog dl').stop().animate({'top': dlTop}, 'fast');
        }


        if (index < 5) {
            $('#sideCatalog-up').removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
        }
        else {
            $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
        }

        if (index > headLen - 6) {
            $('#sideCatalog-down').removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
        } else {
            $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
        }
    }

    Plugin.prototype = {
        initProcess: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;
            var $obj = $plgThis.el;


            //
            $obj.delegate('#sideToolbar','mousewheel DOMMouseScroll', function (e) {
                e.preventDefault();
                e.stopPropagation();

            // $obj.bind('mousewheel', function (e) {
            //     console.log('asdasdsad');
                var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox

                var newStep = 60;
                var times=5;

                if (delta > 0) {
                    // 向上滚
                    $('#sideCatalog-up').trigger("doClick",newStep,times);
                } else if (delta < 0) {
                    // 向下滚
                    $('#sideCatalog-down').trigger("doClick",newStep,times);
                }
                return false;
            });

            //重写archor效果
            $obj.delegate('a','click', function (e) {
                e.preventDefault();

               var archor=$(this).attr("href");
                // console.log(archor);
                var $target = $("a[name='"+archor.substring(1)+"']");
                // console.log($target);



                var realLogic=function () {
                    // window.location.hash=archor;

                    $.scrollSmoothly($target,500);
                }

                var isHiddenChapter =$target.parents(".chapterContent:hidden");
                if(isHiddenChapter.length>0){
                    var $chapter=$target.parents(".chapter");

                    $.scrollSmoothly($chapter,300,function () {
                        setTimeout(function () {
                            isHiddenChapter.slideDown('middle',function () {
                                setTimeout(realLogic,100);
                            });
                        }, 300);
                    });
                } else{
                    realLogic();
                }

            });

            //refresh
            $plgThis.refreshCatalog();

            var downInterval;
            var upInterval;
            var intervalTime=80;
            $('#sideCatalog-down').bind('mousedown', function (e) {
                downInterval=setInterval(function () {
                    $('#sideCatalog-down').trigger("doClick");
                }, intervalTime);
            });
            $('#sideCatalog-up').bind('mousedown', function (e) {
                upInterval=setInterval(function () {
                    $('#sideCatalog-up').trigger("doClick");
                }, intervalTime);
            });

            $('body').bind('mouseup', function (e) {
                // console.log('mouseup');
                clearInterval(downInterval);
                clearInterval(upInterval);
            });

            //点击向上的按钮
            $('#sideCatalog-down').bind('doClick', function (e,argStep,times) {
                // console.log(arguments);
            // $('#sideCatalog-down').bind('click', function () {
                var realStep=argStep?argStep:step;

                if ($(this).hasClass('sideCatalog-down-enable')) {
                    $plgThis.reCalcOffset();

                    if ((enableTop - Math.abs(parseInt($('#sideCatalog-catalog dl').css('top')))) > realStep) {
                        $('#sideCatalog-catalog dl').stop().animate({'top': '-=' + realStep}, intervalTime,function () {
                        });
                        $('#sideCatalog-up').removeClass('sideCatalog-up-disable').addClass('sideCatalog-up-enable');
                    } else {
                        $('#sideCatalog-catalog dl').stop().animate({'top': -enableTop}, intervalTime);
                        $(this).removeClass('sideCatalog-down-enable').addClass('sideCatalog-down-disable');
                    }
                } else {
                    return false;
                }
            });

            //点击向下的按钮
            $('#sideCatalog-up').bind('doClick', function (e,argStep,times) {
                var realStep=argStep?argStep:step;

            // $('#sideCatalog-up').bind('click', function () {
                if ($(this).hasClass('sideCatalog-up-enable')) {
                    $plgThis.reCalcOffset();

                    if (Math.abs(parseInt($('#sideCatalog-catalog dl').css('top'))) > realStep) {
                        $('#sideCatalog-catalog dl').stop().animate({'top': '+=' + realStep}, intervalTime,function () {
                        });
                        $('#sideCatalog-down').removeClass('sideCatalog-down-disable').addClass('sideCatalog-down-enable');
                    } else {
                        $('#sideCatalog-catalog dl').stop().animate({'top': '0'}, intervalTime);
                        $(this).removeClass('sideCatalog-up-enable').addClass('sideCatalog-up-disable');
                    }
                } else {
                    return false;
                }
            });

            //绑定页面滚动条事件
            $(window).scroll(function () {
                if ($(window).scrollTop() > 255) {
                    $('.slide').show(300);

                    //设置导航的位置
                    var slideTop = ($(window).height() - $('#sideToolbar').height()) / 2;
                    $('#sideToolbar').css({'top': slideTop});

                    $plgThis.reLocateHighlight();

                } else {
                    $('.slide').hide(300);
                }

            });


        },
        reLocateHighlight: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;

            for (var i = headLen - 1; i >= 0; i--) {
                // console.log(allEle.eq(i).offset().top+"\t"+allEle.eq(i).height());
                if(allEle.eq(i).height() == 0){
                    continue;
                }
                if ($(window).scrollTop() >= allEle.eq(i).offset().top - allEle.eq(i).height()) {
                    var index = i;
                    // console.log(index);
                    // console.log(index+"\t"+$(window).scrollTop()+"\t"+allEle.eq(i).offset().top+"\t"+allEle.eq(i).height());
                    // console.log(allEle.eq(i));
                    $('#sideCatalog-catalog dl dd').eq(index).addClass('highlight').siblings('dd').removeClass('highlight');
                    scrollSlide($('#sideCatalog-catalog dl dd').eq(index), index);
                    return false;
                } else {
                    $('#sideCatalog-catalog dl dd').eq(0).addClass('highlight').siblings('dd').removeClass('highlight');
                }
            }
        },
        refreshCatalog: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;

            $plgThis.paintAndRefreshCache();

            $plgThis.reLocateHighlight();

        },
        getHtmlArray: function () {
            return ddArr;
        },
        reCalcOffset: function () {
            slideInnerHeight = $('#sideCatalog-catalog dl').height();
            slideOutHeight = $('#sideCatalog-catalog').height();
            enableTop = slideInnerHeight - slideOutHeight;
        },
        reCalcBlankHeight: function () {
            var calHeight=0;

            var windowHeight=$(window).height();
            // console.log(windowHeight);
            var lastHeight=$('.finalExamContainer').outerHeight(true);
            var nextprevHeight=$(".nextbtn-div").outerHeight(true);
            var footHeight=$(".copyright").outerHeight(true);

            calHeight = windowHeight-lastHeight-nextprevHeight-footHeight;
            calHeight = calHeight<0?0:calHeight;
            $('#blankAreaForNav').height(calHeight);
        },
        paintAndRefreshCache: function () {
            var $plgThis = this;
            var opt = $plgThis.opt;

            allEle =  $('.createcourse-div :header[class*="headline"]');
            headLen= allEle.length;
            ddArr = [];
            step =opt.step;

            var archorRec={c:0,s:0,q:0,d:0,e:0};

            //根据页面内容生成slide导航；
            allEle.each(function (i) {
                var sideIndex,//章节序号
                    sideName="",//章节名称
                    highlight = '',
                    ddClass;//样式名

                var $title = $(this);
                var prefix ;
                var curIdx="";
                var suffix="";
                var hintCls="";
                var archor;

                if ($title.hasClass('catalog-chapter')) {
                    // prefix="C";
                    prefix=$title.find(".titlePlainText").text();
                    prefix = prefix.substring(0, 1);
                    curIdx=$title.find(".chapterIdx").text();
                    suffix=":";
                    // sideName = $title.find(".side-title-name").text();
                    sideName = $title.find(".chapterTitleInputState input").val();
                    archor="chapter-"+(++archorRec.c);
                }else if ($title.hasClass('catalog-section')) {
                    // prefix="S";
                    prefix=$title.find(".titlePlainText").text();
                    prefix = prefix.substring(0, 1);
                    curIdx=$title.find(".sectionIdx").text();
                    suffix=":";
                    // sideName = $title.find(".side-title-name").text();
                    sideName = $title.find(".sectionTitleInputState  input").val();
                    archor="section-"+archorRec.c+"-"+(++archorRec.s);
                } else if ($title.hasClass('catalog-quiz')) {
                    prefix=$title.find(".titlePlainText").text();
                    archor="quiz-"+archorRec.c+"-"+(++archorRec.q);
                } else if ($title.hasClass('catalog-discussion')) {
                    prefix=$title.find(".titlePlainText").text()+"-";
                    curIdx=$title.find(".discussionIdx").text();
                    archor="discussion-"+archorRec.c+"-"+(++archorRec.d);
                }else if ($title.hasClass('catalog-exam')) {
                    prefix=$title.find(".titlePlainText").text();
                    archor="exam-"+(++archorRec.e);
                }
                sideIndex = prefix+curIdx+suffix;

                if ($title.hasClass('headline-1')) {
                    ddClass = 'sideCatalog-item1';
                } else {
                    ddClass = 'sideCatalog-item2';
                }

                if ($title.find("."+opt.integrityWarnClass).length>0){
                    hintCls=opt.integrityWarnClass;
                }
                if ($title.find("."+opt.integritySuccessClass).length>0){
                    hintCls=opt.integritySuccessClass;
                }

                $title.find("a[name]").attr("name",archor);

                if (i == 0) {
                    highlight = 'highlight';
                }

                var ddHtml = '<dd class="' + ddClass + ' ' + highlight + '">'
                    + '<a onclick="" href="#' + archor + '" title="' + sideIndex + sideName + '"  >' + sideIndex + sideName + '</a>'
                    + '<span class="sideCatalog-dot"></span>'
                    + '<span class="sideCatalog-'+hintCls+'"></span>'
                    + '</dd>';
                ddArr.push(ddHtml);
            });
            $('#sideCatalog-catalog dl').html(ddArr.join(''));

            $plgThis.reCalcOffset();

            $plgThis.reCalcBlankHeight();
        }
    }

    $.fn.treenityNavTree = function (params) {
        var lists = this,
            retval = this;
        var args = arguments;
        lists.each(function () {
            var plugin = $(this).data(innerOpt.data_attr);

            if (!plugin) {
                if (typeof params === 'object') {
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

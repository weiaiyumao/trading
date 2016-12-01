<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="os-reloading-wrap errorCat display-none" style="display: none"><img src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201611/879e9313ea47420a894eb1800c90989e.jpg" width="1000" height="446" alt="error tip">
    <div class="reloading-operate-wrap">
        <h2><spring:message code='thirdstep_loaderror'/></h2>
        <span class="reloading-operate-btn"><spring:message code='thirdstep_tryreload'/></span>
    </div>
</div>

<script>
    (function () {
        var defaults = {
        };
        var innerOpt = {
            data_attr: "_errorCat_",
        };

        function Plugin(element, options) {
            this.el = $(element);
            this.opt = $.extend({}, defaults, options);
            this.initProcess();
        }


        Plugin.prototype = {
            initProcess: function () {
                var $plgThis = this;
                var opt = $plgThis.opt;

                $plgThis.requestProcess();
            },
            requestProcess: function () {
                var $plgThis = this;
                var opt = $plgThis.opt;
                var $obj = $plgThis.el;

                var ajaxOpt = $plgThis.opt.ajax;

                var $reloadBtn = $obj.find(".reloading-operate-btn");

                var errorFunc = function (json) {
                    if(opt.whenError){
                        opt.whenError(json);
                    }
                    refreshReloadBtn();
                    $obj.show();
                }
                var refreshReloadBtn = function (json) {
                    $reloadBtn.removeClass("disable");

                    $reloadBtn.one("click",function () {
                        $reloadBtn.addClass("disable");
                        $plgThis.requestProcess();
                    });
                }
                ajaxOpt.success=function (json) {
//                    console.log("readyState:"+XMLHttpRequest.readyState);
                   if(opt.hasError){
                       if(!opt.hasError(json)&&opt.whenSuccess){
                           $obj.hide();
                           opt.whenSuccess(json);
                       }else {
                           errorFunc(json);
                       }
                   }
                };
                ajaxOpt.error=function (json) {
//                    console.log(arguments);
//                    console.log("readyState:"+XMLHttpRequest.readyState);
                    errorFunc(json);
                }

                $.ajax(ajaxOpt);
            }
        }

        $.fn.errorCat = function (params) {
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

</script>
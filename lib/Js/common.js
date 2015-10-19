/*
 * js通用类
 */
/* 获取url后的参数 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//时间格式化
//使用方法 
//var now = new Date();
//var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
////使用方法2: 
//var testDate = new Date();
//var testStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒");
//alert(testStr);
////示例： 
//alert(new Date().Format("yyyy年MM月dd日"));
//alert(new Date().Format("MM/dd/yyyy"));
//alert(new Date().Format("yyyyMMdd"));
//alert(new Date().Format("yyyy-MM-dd hh:mm:ss"));
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}



//日期控件时间格式化
var Dateformat = function (obj, fmt) {
    if (obj != undefined && obj != null && obj != '') {
        if (typeof obj == 'string')
            var dt1 = new Date(Date.parse(obj.replace(/-/g, "/")));
        else
            var dt1 = obj;
        var o = {
            "M+": dt1.getMonth() + 1, //月份 
            "d+": dt1.getDate(), //日 
            "H+": dt1.getHours(),
            "h+": dt1.getHours(), //小时 
            "m+": dt1.getMinutes(), //分 
            "s+": dt1.getSeconds(), //秒 
            "q+": Math.floor((dt1.getMonth() + 3) / 3), //季度 
            "S": dt1.getMilliseconds() //毫秒 
        };
        if (fmt == undefined || fmt == null || fmt == '')
            fmt = "yyyy-MM-dd";
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt1.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    } else {
        return '';
    }
}
//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
/*
* 清除$.load()的缓存
*/
$(function () {
    $.ajaxSetup({ cache: false });
})
/*
* div加载页面 
* @url            {string} 加载页面地址
*/
function divLoad(url) {
    window.location.href = url;
}
/*
* 写入缓存
* @name              {string} 名称
*/
function WriteCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 3600 * 1000);
    var cookie = name + "=" + value + ";path =/;expires = " + date;
    document.cookie = cookie;
}
/*
* 获取缓存
* @name              {string} 名称
*/
function ReadCookie(key) {
    var cookies = document.cookie.split(";");
    if (cookies) {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(key) == 0) {
                return cookie.substring(key.length + 1);
            }
        }
    }
    return '';
}
/*
* 清除缓存
* @name              {string} 名称
*/
function ClearCookie(name) {
    var dt = new Date();
    var value = ReadCookie(name);
    if (value != '') {
        dt.setTime(dt.getTime() - 2 * 24 * 3600 * 1000);
        var cookie2 = name + "= " + value + ";path=/;expires = " + dt;
        document.cookie = cookie2;
    }
}
/* Get请求
   参数：
   url: {string}'请求的链接'(ex:/api/Base/GetStaffDetail/id?param=111),
   json: {object} json格式
   callback:{function}回调函数
   isAsync:{boolean}是否异步，默认是异步
*/
function srJsonGet(url, json, callback, isAsync) {
    // 默认异步
    var isAsync = isAsync == undefined ? true : isAsync;
    if (url == '' || url == null || url == undefined) {
        //alert("无效的链接");
        return false;
    }
    else {
        if (typeof (json) == 'object') {
            json = JSON.stringify(json);
        }
        $.ajax({
            url: url,
            type: 'get',
            datatype: 'json',
            //data: json,
            contentType: 'application/json;charset=utf-8',
            async: isAsync,
            cache: false,
            success: function (msg) {
                if (callback != null) {
                    callback(msg);
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    }
}

/* Post请求
   参数：
   url: {string}'请求的链接'(ex:/api/Base/GetStaffDetail/id?param=111),
   json: {object} json格式
   callback:{function}回调函数
   isAsync:{boolean}是否异步，默认是异步
*/
function srJsonPost(url, json, callback, isAsync) {
    // 默认异步
    var isAsync = isAsync == undefined ? true : isAsync;
    if (url == '' || url == null || url == undefined) {
        //alert("无效的链接");
        return false;
    }
    else {
        if (typeof (json) == 'object') {
            json = JSON.stringify(json);
        }
        $.ajax({
            url: url,
            type: 'post',
            datatype: 'json',
            data: json,
            contentType: 'application/json;charset=utf-8',
            async: isAsync,
            cache: false,
            success: function (msg) {
                if (callback != null) {
                    callback(msg);
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    }
}

/* Put请求
   参数：
   url: {string}'请求的链接'(ex:/api/Base/GetStaffDetail/id?param=111),
   json: {object} json格式
   callback:{function}回调函数
   isAsync:{boolean}是否异步，默认是异步
*/
function srJsonPut(url, json, callback, isAsync) {
    // 默认异步
    var isAsync = isAsync == undefined ? true : isAsync;
    if (url == '' || url == null || url == undefined) {
        //alert("无效的链接");
        return false;
    }
    else {
        if (typeof (json) == 'object') {
            json = JSON.stringify(json);
        }
        $.ajax({
            url: url,
            type: 'put',
            datatype: 'json',
            data: json,
            contentType: 'application/json;charset=utf-8',
            async: isAsync,
            cache: false,
            success: function (msg) {
                if (callback != null) {
                    callback(msg);
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    }
}
/* Delete请求
   参数：
   url: {string}'请求的链接'(ex:/api/Base/GetStaffDetail/id?param=111),
   json: {object} json格式
   callback:{function}回调函数
   isAsync:{boolean}是否异步，默认是异步
*/
function srJsonDel(url, json, callback, isAsync) {
    // 默认异步
    var isAsync = isAsync == undefined ? true : isAsync;
    if (url == '' || url == null || url == undefined) {
        //alert("无效的链接");
        return false;
    }
    else {
        if (typeof (json) == 'object') {
            json = JSON.stringify(json);
        }
        $.ajax({
            url: url,
            type: 'delete',
            datatype: 'json',
            data: json,
            contentType: 'application/json;charset=utf-8',
            async: isAsync,
            cache: false,
            success: function (msg) {
                if (callback != null) {
                    callback(msg);
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    }
}
/*
*异步请求状态
*/
var sr_AjaxRuningStatus = false;
/*
* post方式请求.
* @url            {string} 请求地址(/aaaaaa.html?v=1&id=lllll)
* @data           {string} data参数（json格式）
* @callback       {string} 回调函数
* @myasync        {bool}  是否异步
*/
function srPost(url, data, callback, myasync) {
    if (sr_addajaxvali()) {
        return;
    };
    if (myasync == undefined) {
        myasync = true;
    }
    try {
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: myasync,
            data: data,
            success: callback,
            complete: function () {
                sr_removeajaxvali();
            },
            error: function (data) {
                sr_removeajaxvali();
            }
        });
    } catch (e) {
        sr_removeajaxvali();
    }
}

/*
* get方式请求.
* @url            {string} 请求地址(/aaaaaa.html?v=1&id=lllll)
* @data           {string} data参数（json格式）
* @callback       {string} 回调函数
* @myasync        {bool}  是否异步
*/
function srGet(url, data, callback, myasync) {
    if (sr_addajaxvali()) {
        return;
    };
    if (myasync == undefined) {
        myasync = true;
    }
    try {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            async: myasync,
            success: callback,
            complete: function () {
                sr_removeajaxvali();
            },
            error: function (data) {
                sr_removeajaxvali();
            }
        });
    } catch (e) {
        sr_removeajaxvali();
    }

}
//增加按钮验证,防止双击
function sr_addajaxvali() {
    //频繁点击
    if (sr_AjaxRuningStatus) {
        return true;
    }
    else {
        sr_AjaxRuningStatus = true;
        return false;
    }
}

//移除按钮阻止双击验证
function sr_removeajaxvali() {
    setTimeout(function () {
        sr_AjaxRuningStatus = false;
    }, 1000);
}

var $ui = {
    /*
     *日期控件
     *@wrapper        {string}    容器(id或者class或其他)
     *@options        {json}      常用配置项
     *@options.dateFmt{string}    时间格式：yyyy-MM-dd HH:mm:ss，默认日期：yyyy-MM-dd
     *@options.maxDate{string}      最大时间
     *@options.minDate{string}      最小时间 
     *@options.value{string}      初始化数据 
     *返回值 return.val()取值与赋值
     */
    datePicker: function (wrapper, options) {
        var $obj = $(wrapper);
        //初始化
        if (options != undefined) {
            $obj.css("cursor", "pointer");
            var dateJson = { dateFmt: "yyyy-MM-dd", skin: 'twoer' };
            if (options.dateFmt) {
                dateJson.dateFmt = options.dateFmt;
            }
            if (options.value != undefined) {
                var _value = "";
                if (typeof options.value == 'string') {
                    _value = options.value;
                }
                else {
                    _value = Dateformat(options.value, dateJson.dateFmt);
                }
                $obj.val(_value);
            }
            if (options.maxDate != undefined) {
                if (typeof options.maxDate == 'string') {
                    dateJson.maxDate = options.maxDate;
                }
                else {
                    dateJson.maxDate = Dateformat(options.maxDate, dateJson.dateFmt);
                }
            }
            if (options.minDate != undefined) {
                if (typeof options.minDate == 'string') {
                    dateJson.minDate = options.minDate;
                }
                else {
                    dateJson.minDate = Dateformat(options.minDate, dateJson.dateFmt);
                }
            }

            $obj.unbind("focus");
            $obj.bind("focus", function () {
                WdatePicker(dateJson);
            });
        }
        //取值与赋值
        this.val = function (value) {
            if (value != undefined) {
                if (typeof (value) == "string") {
                    return $obj.val(String.format(value, dateJson.dateFmt));
                }
                if (typeof (value) == "object") {
                    return $obj.val(Dateformat(value, dateJson.dateFmt));
                }
            }
            else {
                return $obj.val();
            }
        }
        return this;

    },
    /*
    *日期范围控件
    * @startId         {string} 起始日期容器ID，必须为id，不带#号的
    * @endId           {string} 结束日期容器ID
    * options        {json}      常用配置项
    * @options.dateFmt{string}    时间格式：yyyy-MM-dd HH:mm:ss，默认日期：yyyy-MM-dd
    * @options.maxDate{string}      范围最大时间
    * @options.minDate{string}      范围最小时间 
    * @options.interval{json}      时间间隔json格式 如：{M:3,d:2}，默认不填为无间隔
    * @options.values{array}      初始化数据,数组类型
    *返回值 return.val()取值与赋值
    */
    dateRange: function (startId, endId, options) {
        var startjson = { dateFmt: "yyyy-MM-dd", skin: 'twoer' };
        var endjson = { dateFmt: "yyyy-MM-dd", skin: 'twoer' };
        //startjson.dateFmt = options.dateFmt;
        //endjson.dateFmt = options.dateFmt;
        var _interval = { y: 0, M: 0, d: 0, H: 0, m: 0, s: 0 };//间隔时间
        var intstr = "";
        var intstr2 = "";
        var maxDate;
        var minDate;
        if (options.dateFmt != undefined) {
            startjson.dateFmt = options.dateFmt;
            endjson.dateFmt = options.dateFmt;
        }
        if (options.maxDate != undefined) {
            if (typeof (options.maxDate) == "string") {
                maxDate = options.maxDate;
            }
            else {
                maxDate = Dateformat(options.maxDate, endjson.dateFmt);
            }
            endjson.maxDate = maxDate;
        }
        if (options.minDate != undefined) {
            if (typeof (options.maxDate) == "string") {
                minDate = options.minDate;
            }
            else {
                minDate = Dateformat(options.minDate, startjson.dateFmt);
            }
            startjson.minDate = minDate;
        }
        if (options.interval) {
            _interval = options.interval;
            var y = (_interval.y != undefined) ? _interval.y : 0;
            var M = (_interval.M != undefined) ? _interval.M : 0;
            var d = (_interval.d != undefined) ? _interval.d : 0;
            var H = (_interval.H != undefined) ? _interval.H : 0;
            var m = (_interval.m != undefined) ? _interval.m : 0;
            var s = (_interval.s != undefined) ? _interval.s : 0;
            intstr = ',{y:' + y + ',M:' + M + ',d:' + d + ',H:' + H + ',m:' + m + ',s:' + s + '}';
            intstr2 = ',{y:' + y * -1 + ',M:' + M * -1 + ',d:' + d * -1 + ',H:' + H * -1 + ',m:' + m * -1 + ',s:' + s * -1 + '}';
        }
        if (options.values) {
            startjson.value = options.values[0];
            endjson.value = options.values[1];
        }

        startjson.maxDate = '#F{$dp.$D(\'' + endId + '\'' + intstr2 + ')}'
        endjson.minDate = '#F{$dp.$D(\'' + startId + '\'' + intstr + ')}';
        //<input type="text" class="Wdate" id="d4331" onFocus="WdatePicker({maxDate:'#F{$dp.$D(\'d4332\',{M:-3,d:-2})||$dp.$DV(\'2020-4-3\',{M:-3,d:-2})}'})"/>
        //2
        //<input type="text" class="Wdate" id="d4332" onFocus="WdatePicker({minDate:'#F{$dp.$D(\'d4331\',{M:3,d:2});}',maxDate:'2020-4-3'})"/>
        this.datePicker("#" + startId, startjson);
        this.datePicker("#" + endId, endjson);
    },
    /*
    * 单选下拉框
    * @wrapper             {string}    父容器名(id或者class或其他);#id,.class
    * @options             {json}      常用配置项
    * @options.deselect    {string}    是否可为空 true:可为空,false:不可为空(选中以后没有小叉叉),默认true
    * @options.threshold   {int}   搜索临界值,默认5
    * bindData             {fun}     绑定数据
    * changeVal            {fun}     更换选中值
    * chosenEmpty          {fun}   清除选中
    * disabled          {fun}   禁用
    * enabled           {fun}   启用
    */
    select: function (wrapper, options) {
        var $obj = $(wrapper);
        if (options != undefined) {
            var json = {
                allow_single_deselect: true,//true:可为空,false:不可为空(选中以后没有小叉叉)
                disable_search_threshold: 5//少于指定数值时隐藏搜索框
            }
            if (options.deselect != undefined) {
                json.allow_single_deselect = options.deselect;
                $(wrapper).attr("data-deselect", options.deselect);
            }
            if (options.threshold) {
                json.disable_search_threshold = options.threshold;
            }

            if (json.allow_single_deselect == true) {
                $obj.append("<option></option>");
            }

            $obj.chosen(json);
        }
        this.chosenEmpty = function () {//chosen控件清空
            $obj.empty().append("<option></option>").trigger("liszt:updated");
        };
        this.changeVal = function (val) {//chosen模拟框改变值
            $obj.val(val).trigger("liszt:updated");
        };
        this.disabled = function () {//chosen模拟框禁用
            $obj.attr('disabled', 'disabled').trigger("liszt:updated");
        };
        this.enabled = function () {//chosen模拟框启用
            $obj.removeAttr('disabled').trigger("liszt:updated");
        };
        this.appendObj = function (value, text) {//chosen添加option
            $obj.append("<option value='" + value + "' title='" + text + "'>" + text + "</option>").trigger("liszt:updated");
        };
        //绑定数据jsonData：数据，valueName：value元素名，textName：text元素名
        this.bindData = function (jsonData, valueName, textName, tagName) {
            $obj.empty();
            if ($obj.attr("data-deselect") == "true") {
                $obj.append("<option></option>");
            }
            $.each(jsonData, function (index, value) {
                var valval = "";
                var textval = "";
                var tagdata = "";
                if (valueName != undefined) {
                    valval = value[valueName];
                }
                else {
                    valval = value;
                }
                if (textName != undefined) {
                    textval = value[textName];
                }
                else {
                    textval = value;
                }

                if (tagName != undefined) {
                    tagdata = value[tagName];
                }
                else {
                    tagdata = "";
                }

                var opt = $('<option />', {
                    value: valval,
                    text: textval,
                    tagdata: tagdata
                });
                opt.appendTo($obj);

            });
            $obj.trigger("liszt:updated");
        };
        this.selectFirst = function () {//选中第一个value不为''的值
            var val = '';
            $obj.children().each(function () {
                if ($(this).val() != undefined && $(this).val() != null && $(this).val() != '') {
                    val = $(this).val();
                    return false;
                }
            })
            if (val != '') $obj.val(val).trigger("liszt:updated");
        };
        this.txt = function () {
            return $obj.find('option[value=' + $obj.val() + ']').text();
        };
        this.hideObj = function () {
            $obj.next().hide();
        };
        this.showObj = function () {
            $obj.next().show();
        };
        return this;
    },
    /*
     * 多选下拉框
     * @wrapper            {string}    父容器名(id或者class或其他);#id,.class
     * @options           {json}      常用配置项
     * @options.deselect   {string}    是否可为空 true:可为空,false:不可为空(选中以后没有小叉叉),默认true
     * @options.threshold   {int}   搜索临界值,默认5
     */
    multiselect: function (wrapper, options) { }
}
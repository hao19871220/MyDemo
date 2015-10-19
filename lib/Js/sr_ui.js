/*
 * pc端 web 控件库
 * 
 */



/*
*显示窗口
* jsonData:{ type: 'html', title: '测试汤', html: html, url: '', style: '', width: '', height: '' };
*/
function sc_ShowWin(jsonData, callbackfun) {
    var zwcobj;
    if (window.location.href != top.location.href) {
        zwcobj = $(window.parent.document);
        window.parent.document.sc_CloseWin = sc_CloseWin;
        window.parent.document.scwinCallback = callbackfun;
        //document.sc_CloseWin = sc_CloseWin;
    }
    else {
        zwcobj = $(document);
        document.sc_CloseWin = sc_CloseWin;
        document.scwinCallback = callbackfun;
    }

    var divwidth = '80%';
    var divheight = '500px';
    var divtop = "0";

    if (jsonData.width != undefined && jsonData.width != null && jsonData.width != '') {
        divwidth = jsonData.width;
    }
    if (jsonData.height != undefined && jsonData.height != null && jsonData.height != '') {
        divheight = jsonData.height;
    }

    var windowheight = $(window).height();
    var divheightnum = parseInt(divheight);
    if (divheightnum >= (windowheight - 100)) {
        divtop = "0"
        divheightnum = windowheight - 100;
        divheight = divheightnum + "px";
    }
    else {
        divtop = ((windowheight - divheightnum - 100) / 2) + "px";
    }
    jsonData.title = jsonData.title;

    var style = jsonData.style;
    var headerstyle = 'min-height: 16.43px;padding: 10px;border-bottom: 1px solid #e5e5e5;background-color: #fc4242;color:white;'
    if (style == undefined || style == null || style == '') {
        style = '';
    }

    var contentheight = (divheightnum - 50) + "px";

    var headhtml = '<div style="' + headerstyle + '">';
    //headhtml += '<h3 id="myModalLabel">新增账号信息</h3></div>';
    headhtml += '<a href="javascript:;" id="sc_Window_Close" onclick="document.sc_CloseWin();"';
    headhtml += 'style="padding: 0;cursor: pointer; background: transparent;border: 0;-webkit-appearance: none; width: 30px; height: 30px;display:block; float: right;line-height:30px; font-size: 16px; color: white; font-weight: 400; font-family: 黑体; display: block;">×</a>';
    headhtml += '<span id="myModalLabel" style="' + style + '">' + jsonData.title + '</span>';
    headhtml += '</div>';
    var html = '';

    html += '<div id="sc_Window_div" style="overflow: hidden; width: 100%; height: 100%; top: 0px; left: 0px; position: fixed; z-index: 100; display: none; border: none;';
    html += 'background: rgba(128, 128, 128,0.8) none repeat scroll 0 0 !important;">';
    html += '  <div id="sc_window_maindiv" style="width: ' + divwidth + '; height: ' + divheight + '; margin: ' + divtop + ' auto auto auto; background-color: #ffffff;overflow: hidden; ';
    html += '  outline: 0; -webkit-box-shadow: 10px 10px 25px #000; -moz-box-shadow: 10px 10px 25px #000; box-shadow: 10px 10px 25px #000;">';
    html += headhtml;
    html += '</div>';
    html += '</div>';
    var contentdiv = '';
    try {
        switch (jsonData.type) {
            case "html":
                {
                    var showtext = '<div id="sc_window_content" style="height: ' + contentheight + '; width: 100%;float: left;margin-top:0;padding-top:0; ">' + jsonData.html + '</div>';
                    contentdiv += showtext;
                }
                break;
            case "url":
                {
                    var showtext = '<div id="sc_window_content" style="height: ' + contentheight + '; width: 100%;float: left;margin-top:0;padding-top:0; "></div>';
                    contentdiv += showtext;
                }
                break;
            case "iframe":
                {
                    var iframebox = '<iframe id="sc_window_content" style="width:100%; border:0; height: ' + contentheight + ';margin-top:0x;padding-top:0;overflow: hidden;">'
                      + ' src="' + jsonData.url + '"></iframe>';
                    contentdiv += iframebox;
                }
                break;
            default:

        }
        contentdiv += '';

        zwcobj.find("body").append(html);
        zwcobj.find("#sc_Window_div").fadeIn("normal", function () {
            zwcobj.find("#sc_window_maindiv").append(contentdiv);
            if (jsonData == undefined || jsonData.type == undefined) {
                return;
            }
            switch (jsonData.type) {
                case "html":
                    {

                    }
                    break;
                case "url":
                    {
                        var aaa = zwcobj.find("#sc_window_content");
                        aaa.load(jsonData.url, function () {

                        });
                    }
                    break;
                case "iframe":
                    {
                        zwcobj.find("#sc_window_content").attr("src", jsonData.url);
                    }
                    break;
                default:
            }
            //zwcobj.find("#sc_Window_Close").on("clic", function (e) {

            //});           
        });
    } catch (e) {

    }
    zwcobj.on("keypress", function (e) {
        if (e.keyCode == 27) {
            sc_CloseWin();
        }
    });

}
//关闭窗口
function sc_CloseWin(iscallback, value) {
    try {
        var zwcobj;
        if (window.location.href != top.location.href) {
            zwcobj = $(window.parent.document);
            zwcobj.find("#sc_Window_div").fadeOut("normal", function () {
                var callback = window.parent.document.scwinCallback;
                if (iscallback != undefined && iscallback == true && window.parent.document.scwinCallback) {
                    callback(value);
                }
                window.parent.document.scwinCallback = null;
                zwcobj.find("#sc_Window_div").remove();
            });
        }
        else {
            zwcobj = $(document);
            zwcobj.find("#sc_Window_div").fadeOut("normal", function () {
                var callback = document.scwinCallback;
                zwcobj.find("#sc_Window_div").remove();
                if (iscallback != undefined && iscallback == true && document.scwinCallback) {
                    callback(value);
                }
                document.scwinCallback = null;
            });
        }
        zwcobj.off("keypress", sc_CloseWin);
    } catch (e) {

    }
}

//弹出框
function wa_alert(msg, callback) {
    var html = ' <div style="width:100%;height:100%;text-align:center;">';
    html += '<input type="button" onclick="sc_CloseWin(true);" value="确定" style="width:70px;height:30px;margin:20px 10px auto auto;background-color: #fc4242;color:white;"/>'
    html += '</div>';
    var style = 'text-align:center;';
    var json = { type: 'html', title: msg, html: html, style: style, width: '200px', height: '120px' };
    sc_ShowWin(json, callback);
}

//弹出确认框
function wa_confirm(msg, callback) {
    var html = ' <div style="width:100%;height:100%;text-align:center;">';
    html += '<input type="button" onclick="sc_CloseWin(true);" value="确定" style="width:70px;height:30px;margin:20px 10px auto auto;background-color: #fc4242;color:white;"/>'
    html += '<input type="button" onclick="sc_CloseWin(false);" value="取消" style="width:70px;height:30px;margin:20px auto auto auto;background-color: #fc4242;color:white;"/>'
    html += '</div>';

    var style = 'text-align:center;';
    var json = { type: 'html', title: msg, html: html, style: style, width: '200px', height: '120px' };
    sc_ShowWin(json, callback);
}

//弹出框输入内容
function wa_prompt(msg, callback) {
    var html = ' <div style="width:100%;height:100%;text-align:center;">';
    html += '<input type="text" style="width:200px;height:30px;margin:auto auto 10px auto;"/>'
    html += '</br>';
    html += '<input type="button" onclick="wa_prompt_getvalue(this);" value="确定" style="width:100px;height:30px;margin:auto 10px auto auto;"/>'
    html += '<input type="button" onclick="sc_CloseWin(false);" value="取消" style="width:100px;height:30px;margin:auto auto auto auto;"/>'
    html += '</div>';

    var style = 'text-align:center;';
    var json = { type: 'html', title: msg, html: html, style: style, width: '300px', height: '150px' };
    sc_ShowWin(json, callback);
}

//弹出确认后获取值
function wa_prompt_getvalue(obj) {
    var value = $(obj).parent().find("input[type=text]").val();
    sc_CloseWin(true, value);
}
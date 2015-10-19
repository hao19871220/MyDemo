/*基础配置配置*/
var wx_jssdk_srapi = baseconfig.srapi;

/*
 * SR获取微信相关数据接口
 */
var $srwx = {
    getticket_byaccount: function (wcid, callback) {
        var url = srbaseurl + "/api/weiapp/GetAccessToken";
        var json = { "wechatid": wcid };
        alert(url + ":" + wcid);
        $.ajax({
            type: "post",
            url: url,
            data: json,
            //contentType: "text/json",//"application/x-www-form-urlencoded",
            datatype: "json",
            async: true,
            success: function (data) {
                if (data != null && data.ResultCode == 1) {
                    if (callback != undefined) {
                        //alert("success:" + data.ResultValue);
                        callback(data.ResultValue);
                    }
                }
            },
            error: function (err, errinfo, ex) {
                alert("error:" + JSON.stringify(err));
            }
        });
    },
    /*
   * 获取摇周边的设备及用户信息
   */
    getshakeinfo: function (wcid, ticket, callback) {
        //alert(wcid);
        var url = srbaseurl + "/api/weiapp/GetBeaconInfoByTicket/" + ticket + "/" + wcid;
        $.get(url, null, function (data) {
            //alert(data);
            if (data != null) {
                if (callback != undefined) {
                    callback(data);
                }
            }
            //token
        });
    }
};
/*
 * 微信相关接口
 * 
 */
var $wx = {
    /*
     * 获取摇周边的设备及用户信息
     */
    getshakeinfo: function (ticket, token, callback) {
        //if (token==null) {
        //    $srwx.getticket_byaccount()
        //}
        var json = { ticket: ticket };
        var url = "https://api.weixin.qq.com/shakearound/user/getshakeinfo?access_token=" + token;
        $.post(url, json, function (data) {
            if (data != null) {
                if (callback != undefined) {
                    callback(data);
                }
            }
            //token
        });
    }
}

/*
 * 微信jscdk相关类
 */
$wx_jssdk = {
    /*
     * 获取配置信息
     * wcid   string  微信号
     * jsApiList string  需要开放的api列表 例["onMenuShareAppMessage","hideOptionMenu","showMenuItems"]
     */
    getConfig: function (wcid, jsApiList, callback) {
        var json = {
            WeChatID: wcid,
            Url: window.location.href
        };
        $.post(wx_jssdk_srapi + "/api/weiapp/GetJsJDKConfig", json, function (data) {
            if (data.ResultCode != 1) {
                callback(null);
                return;
            }
            //
            wx.config({
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false,
                // 必填，公众号的唯一标识
                appId: data.ResultValue.appid,
                // 必填，生成签名的时间戳
                timestamp: data.ResultValue.timestamp,
                // 必填，生成签名的随机串
                nonceStr: data.ResultValue.nonceStr,
                // 必填，签名，见附录1
                signature: data.ResultValue.signature,
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList: jsApiList
            });
            //
            wx.ready(function () {
                callback();
            });
        });
    },
    /*
     * 隐藏所有菜单
     */
    hideOptionMenu: function () {
        wx.hideOptionMenu();
    },
    /*
    * 隐藏菜单项
    * menuList 显示的菜单数组 例：["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite", "menuItem:share:facebook","menuItem:share:QZone"
    * ,"menuItem:copyUrl","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email","menuItem:share:brand"]
    */
    hideMenuItems: function (menuList) {
        wx.hideMenuItems({
            menuList: menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    },
    /*
     * 显示菜单项
     * menuList 显示的菜单数组 例：["menuItem:share:appMessage","menuItem:share:timeline",]
     */
    showMenuItems: function (menuList) {
        wx.showMenuItems({
            menuList: menuList // 要显示的菜单项，所有menu项见附录3
        });
    },
    /*
  * 分享到朋友圈
  * @title   string  分享标题
  * @desc   string  分享描述
  * @link   string  分享链接
  * @imgUrl   string  分享图标
  * @type   string  分享类型,music、video或link，不填默认为link
  * @dataUrl   string  如果type是music或video，则要提供数据链接，默认为空
  */
    onMenuShareAppMessage: function (title, desc, link, imgUrl, type, dataUrl) {
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type, // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    /*
    * 分享到朋友圈
    * @title   string  分享标题 
    * @link   string  分享链接
    * @imgUrl   string  分享图标 
    */
    onMenuShareTimeline: function (title, link, imgUrl) {
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
};
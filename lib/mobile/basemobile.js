/// <reference path="ai.js" />

/*全局变量，用于标识当前font-size的大小，可用于换算rem单位*/
var baseFontSize = 100;
screenAdapt();

/*
 * 自适应各个浏览器
 */
function screenAdapt() {
    var _fontSize = 100;
    var _min1 = Math.min(window.screen.width, window.screen.height);
    var _min2 = Math.min(window.innerWidth, window.innerHeight);
    //alert("window.screen.width: " + window.screen.width +
    //    "\r\n\window.screen.height: " + window.screen.height +
    //    "\r\n\window.innerWidth: " + window.innerWidth +
    //    "\r\n\window.innerHeight: " + innerHeight +
    //    "\r\n\window.devicePixelRatio: " + window.devicePixelRatio);

    //如果是移动设备，则需要重新赋值
    if (ai.getType() == ai.clientType.Mobile) {
        //默认情况下
        _fontSize = _min1 / 640 * 100;
        switch (true) {
            //Windows Phone
            case ai.ovb.windowPhone():
                //windows phone比较特殊，所得到的screen.width多几像素，所以需要取整
                _min1 = parseInt(_min1 / 10) * 10;
                _fontSize = _min1 / 640 * 100;
                //有些window phone设备存在devicePixelRatio，需要特殊处理
                if (window.devicePixelRatio && _min2 * window.devicePixelRatio <= _min1) {
                    _fontSize = _min1 / parseFloat(window.devicePixelRatio.toFixed(1)) / 640 * 100;
                }
                break;
            //Android
            case ai.ovb.android():
                if (window.devicePixelRatio && _min2 * window.devicePixelRatio <= _min1) {
                    _fontSize = _min1 / window.devicePixelRatio / 640 * 100;
                }
                break;
        }
    }
    baseFontSize = _fontSize;
    document.getElementsByTagName("html")[0].style["font-size"] = _fontSize + "px";
}



//var viewport = document.getElementById("viewport");
//var viewPortScale = 1 / window.devicePixelRatio;
//var screenwidth, screenhight;
//screenwidth = window.screen.width;
//screenhight = window.screen.height;

//var viewPortdpi = 640 / screenwidth * window.devicePixelRatio * 160;
//viewPortdpi = viewPortdpi.toFixed(0);
////判断是横屏还是竖屏(竖屏：true，横屏：false)
//var isVertical = true;

////先计算是横屏还是竖屏
//IsVertialOrHorizontal();

//// 自适应方法
//screenAdapt();

////横屏竖屏切换时触发
//window.onorientationchange = function() {
//	$('.blockPage').css('top', ($(window).height() - 300) / 2 + 'px');
//	$('.blockPage').css('left', ($(window).width() - 600) / 2 + 'px');
//}

////判断是横屏还是竖屏
//function IsVertialOrHorizontal() {
//	if (window.orientation == 0 || window.orientation == 180) {
//		isVertical = true;
//	} else {
//		isVertical = false;
//	}
//	return isVertical;
//}

////屏幕自适应
//function screenAdapt() {
//	//默认配置
//	if (window.screen.height < window.screen.width) {
//		screenwidth = window.screen.height;
//	}
//	if (screenwidth < 360) {
//		viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + viewPortScale + ",minimum-scale=" + viewPortScale + ",maximum-scale=" + viewPortScale + ",user-scalable=no";
//	} else {
//		var ratio = screenwidth / 640;
//		viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//	}
//	//alert(navigator.userAgent); 
//	//安卓设备
//	if (ai.ovb.android()) {
//		switch (true) {
//			case ai.ovb.qq(): //QQ
//				viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";
//				break;
//			case ai.ovb.uc(): //UC
//				var big = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
//				var small = window.screen.height < window.screen.width ? window.screen.height : window.screen.width;
//				var ratio = isVertical ? 1 : small / big;
//				viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//				break;
//			case ai.ovb.firefox(): //firefox
//				var ratio = screenwidth / 640;
//				viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//				document.head.innerHTML = document.head.innerHTML;
//				document.body.innerHTML = document.body.innerHTML;
//				break;
//			case ai.ovb.chrome(): //chrome
//				switch (true) {
//					case ai.ovb.coolpad(): //coolpad 
//					case ai.ovb.huawei(): //huawei 
//					case ai.ovb.htc(): //htc
//						var ratio = screenwidth / 640;
//						viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//						break;
//				}
//				break;
//			case ai.ovb.baidu(): //baidu
//				switch (true) {
//					case ai.ovb.lg():      //lg
//					case ai.ovb.samsung(): //samsung
//				    case ai.ovb.mi():      //小米手机
//				    case ai.ovb.huawei():  //华为手机
//				    case ai.ovb.htc():     //htc手机
//						viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";
//						break;
//				}
//				break;
//			case ai.ovb.opera(): //opera
//				switch (true) {
//					case ai.ovb.coolpad(): //coolpad 
//						viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";
//						break;
//				}
//				break;
//			case ai.ovb._360browser(): //360
//			    break;
//		    case ai.ovb.LBBROWSER():  //猎豹
//		        switch (true) {
//		            case ai.ovb.lg():  //LG手机
//                    case ai.ovb.coolpad(): //酷派手机
//		                viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";
//		                break;
//		        }
//		        break;
//			default:
//				switch (true) {
//					case ai.ovb.huawei(): //huawei
//						var ratio = screenwidth / 640;
//						viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//						break;
//					case ai.ovb.lg(): //lg
//						viewport.content = "width=device-width,user-scalable=no";
//						var big = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
//						var small = window.screen.height < window.screen.width ? window.screen.height : window.screen.width;
//						var ratio = small / big;
//						setInterval(function() {
//							document.body.style.zoom = ratio;
//						}, 50);
//						break;
//					case ai.ovb.samsung(): //samsung
//						var big = window.screen.height > window.screen.width ? window.screen.height : window.screen.width;
//						var small = window.screen.height < window.screen.width ? window.screen.height : window.screen.width;
//						var ratio = small / big;
//						viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//						break;
//					case ai.ovb.miui(): //miui
//					default:
//						if (window.screen.height < window.screen.width) {
//							screenwidth = window.screen.height;
//						}
//						viewport.content = "width=device-width,target-densitydpi=" + viewPortdpi + ",initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";
//						break;
//				}
//				break;
//		}
//	} else if (ai.ovb.windowPhone()) { //WindowPhone
//		var ratio = screenwidth / 640;
//		ratio = 0.5;
//		viewport.content = "width=640px,target-densitydpi=" + viewPortdpi + ",initial-scale=" + ratio + ",minimum-scale=" + ratio + ",maximum-scale=" + ratio + ",user-scalable=no";
//	}
//}
/**
* 与客户端浏览器相关的对象
*/
var ai = {
    touchClick: function (obj, fun) {
        /**
        * 该方法用于绑定点击事件，比一般的click事件反应速度快2倍。
        * @param {对象字面量} obj 要绑定的dom对象
        * @param {对象字面量} fun 事件触发的函数
        */
        var start_x = 0,
			start_y = 0;
        obj.addEventListener('touchstart', function (e) {
            start_x = e.touches[0].clientX;
            start_y = e.touches[0].clientY;
            document.addEventListener('touchend', touEnd, false);
        });
        function touEnd(e) {
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if (Math.abs(endX - start_x) < 5 && Math.abs(endY - start_y) < 5) {
                fun.call(obj, e);
            }
            document.removeEventListener('touchend', touEnd, false);
        };
    },
    ovb: {
        /**
        * 该对象用于判断系统，系统版本，浏览器，苹果设备等等功能。ovb是单词 Os Version Browser 的头字母缩写。
        */
        _version_value: false,
        _bversion_value: false,
        _ua: navigator.userAgent,
        android: function () {
            /**
            * 该方法用于判断是否为安卓平台，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/(Android)\s+([\d.]+)/);
            //如果是fierfox浏览器(不带android版本号)
            regular_result = this.firefox() ? this._ua.match(/(Android)/) : regular_result;
            var os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[2];
            }
            this.android = function () { return os_boolean; };
            return os_boolean;
        },
        ios: function () {
            /**
            * 该方法用于判断是否为iOS平台，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/.*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[1].replace(/_/g, '.');
            }
            this.ios = function () { return os_boolean; };
            return os_boolean;
        },
        ipod: function () {
            /**
            * 该方法用于判断是否为ipod设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/(iPod).*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[2].replace(/_/g, '.');
            }
            this.ipod = function () { return os_boolean; };
            return os_boolean;
        },
        ipad: function () {
            /**
            * 该方法用于判断是否为ipad设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/(iPad).*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[2].replace(/_/g, '.');
            }
            this.ipad = function () { return os_boolean; };
            return os_boolean;
        },
        iphone: function () {
            /**
            * 该方法用于判断是否为iphone设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/(iPhone);.*OS\s([\d_]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[2].replace(/_/g, '.');
            }
            this.iphone = function () { return os_boolean; };
            return os_boolean;
        },
        windowPhone: function () {
            /**
            * 该方法用于判断是否为windows phone设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('windows phone') > -1) {
                return true;
            } else {
                return false;
            }
        },
        kindle: function () {
            /**
            * 该方法用于判断是否为kindle设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/Kindle\/([\d.]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._version_value = regular_result[1];
            }
            this.kindle = function () { return os_boolean; };
            return os_boolean;
        },
        webkit: function () {
            /**
            * 该方法用于判断是否为webkit内核的浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/WebKit\/([\d.]+)/),
				os_boolean = !!regular_result;
            if (!this._version_value && os_boolean) {
                this._bversion_value = regular_result[1];
            }
            this.webkit = function () { return os_boolean; };
            return os_boolean;
        },
        uc: function () {
            /**
            * 该方法用于判断是否为UC内核的浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            * @tip    该函数只在安卓平台能正常判断，慎用！
            */
            var regular_result = this._ua.match(/UC/),
				os_boolean = !!regular_result;
            return os_boolean;
        },
        samsung: function () {
            /**
            * 该方法用于判断是否为三星设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('samsung') > -1 || navigator.userAgent.toLowerCase().indexOf('sm-') > -1 || navigator.userAgent.toLowerCase().indexOf('gt-') > -1 || navigator.userAgent.toLowerCase().indexOf('gt_') > -1 || navigator.userAgent.toLowerCase().indexOf('sch_') > -1 || navigator.userAgent.toLowerCase().indexOf('sc_') > -1 || navigator.userAgent.toLowerCase().indexOf('sph_') > -1 || navigator.userAgent.toLowerCase().indexOf('galaxy nexus') > -1) {
                return true;
            } else {
                return false;
            }
        },
        sony: function () {
            /**
            * 该方法用于判断是否为索尼设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('l50t') > -1 || navigator.userAgent.toLowerCase().indexOf('l35h') > -1 || navigator.userAgent.toLowerCase().indexOf('st25i') > -1 || navigator.userAgent.toLowerCase().indexOf('l36h') > -1 || navigator.userAgent.toLowerCase().indexOf('lt22i') > -1 || navigator.userAgent.toLowerCase().indexOf('walkman') > -1) {
                return true;
            } else {
                return false;
            }

        },
        kliton: function () {
            /**
            * 该方法用于判断是否为凯利通设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('kliton') > -1) {
                return true;
            } else {
                return false;
            }
        },
        vivo: function () {
            /**
            * 该方法用于判断是否为vivo设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('vivo') > -1) {
                return true;
            } else {
                return false;
            }
        },
        oppo: function () {
            /**
            * 该方法用于判断是否为oppo设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('r819t') > -1 || navigator.userAgent.toLowerCase().indexOf('r821t') > -1 || navigator.userAgent.toLowerCase().indexOf('x909') > -1 || navigator.userAgent.toLowerCase().indexOf('x9007') > -1 || navigator.userAgent.toLowerCase().indexOf('t29') > -1) {
                return true;
            } else {
                return false;
            }
        },
        Pantech: function () {
            /**
            * 该方法用于判断是否为泛泰设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('im-a') > -1) {
                return true;
            } else {
                return false;
            }
        },
        Amazon: function () {
            /**
            * 该方法用于判断是否为亚马逊设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('kfthwi') > -1) {
                return true;
            } else {
                return false;
            }
        },
        Hisense: function () {
            /**
            * 该方法用于判断是否为海信设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('hs-t958') > -1 || navigator.userAgent.toLowerCase().indexOf('e601m') > -1) {
                return true;
            } else {
                return false;
            }
        },
        GIONEE: function () {
            /**
            * 该方法用于判断是否为金立设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('gionee') > -1 || navigator.userAgent.toLowerCase().indexOf('gn') > -1 || navigator.userAgent.toLowerCase().indexOf('e6t') > -1) {
                return true;
            } else {
                return false;
            }
        },
        Haier: function () {
            /**
            * 该方法用于判断是否为海尔设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('Haier') > -1) {
                return true;
            } else {
                return false;
            }
        },
        lg: function () {
            /**
            * 该方法用于判断是否为LG设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('lg') > -1) {
                return true;
            } else {
                return false;
            }
        },
        TCL: function () {
            /**
            * 该方法用于判断是否为TCL设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('tcl') > -1) {
                return true;
            } else {
                return false;
            }
        },
        baidu: function () {
            /**
            * 该方法用于判断是否为baidu浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('baidu') > -1||navigator.userAgent.toLowerCase().indexOf('flyflow') > -1) {
                return true;
            } else {
                return false;
            }
        },
        opera: function () {
            /**
            * 该方法用于判断是否为opera设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('opera') > -1 || navigator.userAgent.toLowerCase().indexOf('opr') > -1 || navigator.userAgent.toLowerCase().indexOf('oupeng') > -1) {
                return true;
            } else {
                return false;
            }
        },
        _360browser: function () {
            /**
            * 该方法用于判断是否为360浏览器设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('360browser') > -1 || navigator.userAgent.toLowerCase().indexOf('360se') > -1) {
                return true;
            } else {
                return false;
            }
        },
        huawei: function () {
            /**
            * 该方法用于判断是否为华为设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('huawei') > -1 || navigator.userAgent.toLowerCase().indexOf('h60-l01') > -1 || navigator.userAgent.toLowerCase().indexOf('honor h30-l01') > -1) {
                return true;
            } else {
                return false;
            }
        },
        Chrome_mobile: function () {
            /**
            * 该方法用于判断是否为谷歌设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('Nexus') > -1) {
                return true;
            } else {
                return false;
            }
        },
        htc: function () {
            /**
            * 该方法用于判断是否为HTC设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('htc') > -1 || navigator.userAgent.toLocaleLowerCase().indexOf('htl21') > -1) {
                return true;
            } else {
                return false;
            }
        },
        moto: function () {
            /**
            * 该方法用于判断是否为摩托设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('mot-') > -1) {
                return true;
            } else {
                return false;
            }
        },
        firefox: function () {
            /**
            * 该方法用于判断是否为firefox浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/Firefox/),
				os_boolean = !!regular_result;
            return os_boolean;
        },
        qq: function () {
            /**
            * 该方法用于判断是否为qq浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('mqqbrowser') > -1) {
                return true;
            } else {
                return false;
            }
        },
        MSIE: function () {
            /**
            * 该方法用于判断是否为MSIE浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
                return true;
            } else {
                return false;
            }
        },
        LBBROWSER: function () {
            /**
            * 该方法用于判断是否为猎豹浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('lbbrowser') > -1 || navigator.userAgent.toLowerCase().indexOf('liebao') > -1) {
                return true;
            } else {
                return false;
            }
        },
        miui: function () {
            /**
            * 该方法用于判断是否为miui浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('miuibrowser') > -1) {
                return true;
            } else {
                return false;
            }
        },
        mi: function () {
            /**
            * 该方法用于判断是否为mi手机，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('mi') > -1 || navigator.userAgent.toLowerCase().indexOf('hm') > -1) {
                return true;
            } else {
                return false;
            }
        },
        nokia: function () {
            /**
            * 该方法用于判断是否为nokia设备，在联想设备上所有的浏览器都包含nokia，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('nokia') > -1) {
                return true;
            } else {
                return false;
            }
        },
        lenovo: function () {
            /**
            * 该方法用于判断是否为lenovo设备，在联想设备上所有的浏览器都包含lenovo，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('lenovo') > -1) {
                return true;
            } else {
                return false;
            }
        },
        chrome: function () {
            /**
            * 该方法用于判断是否为chrome浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                return true;
            } else {
                return false;
            }
        },
        coolpad: function () {
            /**
            * 该方法用于判断是否为酷派设备，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            if (navigator.userAgent.toLowerCase().indexOf('coolpad') > -1) {
                return true;
            } else {
                return false;
            }
        },
        safari: function () {
            /**
            * 该方法用于判断是否为safari浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            * @tip    该函数在一些不知名的浏览器如遨游之类上不能正常判断
            */
            var regular_result = this._ua.match(/Version.*Safari/), os_boolean = false;
            if (this.ios() || this.ipad() || this.iphone() || this.ipod())
                os_boolean = !!regular_result;
            this.safari = function () { return os_boolean; };
            return os_boolean;
        },
        silk: function () {
            /**
            * 该方法用于判断是否为silk浏览器，如果是返回ture 否 返回 false
            * @return ture或者false
            */
            var regular_result = this._ua.match(/Silk/),
				os_boolean = !!regular_result;
            this.silk = function () { return os_boolean; };
            return os_boolean;
        },
        version: function () {
            /**
            * 该方法返回系统的版本
            * @return 系统版本号例如 5.5.1
            */
            return this._version_value;
        },
        bVersion: function () {
            /**
            * 该方法返回webkit浏览器的版本
            * @return 系统版本号例如 5.5.1
            */
            return this._bversion_value;
        },

        getClientOsType: function () {
            /**
            * 根据系统类型返回客户设备类型。
            */
            var agent = navigator.userAgent.toLowerCase();
            var type = "other";
            if (agent.indexOf("nt 5.0") > -1) {
                type = "win2000";
            }
            else if (agent.indexOf("nt 5.1") > -1) {
                type = "winxp";
            }
            else if (agent.indexOf("nt 5.2") > -1) {
                type = "win2003";
            }
            else if (agent.indexOf("nt 6.0") > -1) {
                type = "vista";
            }
            else if (agent.indexOf("nt 6.1") > -1) {
                type = "win7";
            }
            else if (agent.indexOf("nt 6.2") > -1) {
                type = "win8";
            }
            else if (agent.indexOf("windows phone") != -1 || agent.indexOf("win32") != -1) {
                type = "windows phone";
            }
            else if ((agent.indexOf("iphone") > -1) || (agent.indexOf("ipod") > -1)) {
                type = "ios";
            }
            else if (agent.indexOf("android") != -1) {
                type = "android";
            }
            else if (agent.indexOf("nokia") != -1) {
                type = "nokia";
            }
            else if (agent.indexOf("macintosh") != -1 || agent.indexOf("mac os x") != -1) {
                type = "mac";
            }
            else if (agent.indexOf("linux") != -1) {
                type = "linux";
            }
            return type;
        },
        getOs: function () {
            /**
            * 该方法用于获取浏览器类型
            * 
            */
            var type = 'other';
            if (this.silk()) {
                type = 'silk';
            }
            else if (this._360browser()) {
                type = '360';
            }
            else if (this.LBBROWSER()) {
                type = 'liebao';
            }
            else if (this.baidu()) {
                type = 'baidu';
            }
            else if (this.uc()) {
                type = 'uc';
            }
            else if (this.opera()) {
                type = 'opera';
            }
            else if (this.qq()) {
                type = 'qq';
            }
            else if (this.firefox()) {
                type = 'firefox';
            }
            else if (this.miui()) {
                type = 'miui';
            }
            else if (this.chrome()) {
                type = 'chrome';
            }
            else if (this.safari()) {
                type = 'safari';
            } 
            else if (this.MSIE()) {
                type = 'IE';
            }
            return type;
        },
        getBrowserKernel: function () {
            /**
            * 该方法用于获取浏览器内核
            * 
            */
            var u = navigator.userAgent, type = 'other';
            if (u.indexOf('Trident') > -1) {//IE内核
                type = "trident";
            }
            else if (u.indexOf('Presto') > -1) {//opera内核
                type = "presto";
            }
            else if (u.indexOf('AppleWebKit') > -1) {//苹果、谷歌内核
                type = "webKit";
            }
            else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {//火狐内核
                type = "gecko";
            }
            return type;
        },
        getBrowserVersion: function () {
            /**
            * 该方法用于获取浏览器版本
            * 
            */
            var browser = this.getBrowserInfo();
            var verinfo = (browser + "").replace(/[^0-9.]/ig, "");
            return verinfo;
        },
        getMobileBrand: function () {
            /**
            * 该方法用于手机类型
            * 
            */
            var type = "other";
            if (this.samsung()) {
                type = "samsung";
            }
            else if (this.lg()) {
                type = "lg";
            }
            else if (this.huawei()) {
                type = "huawei";
            }
            else if (this.htc()) {
                type = "htc";
            }
            else if (this.lenovo()) {
                type = "lenovo";
            }
            else if (this.ipod()) {
                type = "ipod";
            }
            else if (this.ipad()) {
                type = "ipad";
            }
            else if (this.iphone()) {
                type = "iphone";
            }
            else if (this.coolpad()) {
                type = "coolpad";
            }
            else if (this.mi()) {
                type = "mi";
            }
            else if (this.nokia()) {
                type = "nokia";
            }
            else if (this.oppo()) {
                type = "oppp";
            }
            else if (this.sony()) {
                type = "sony";
            }
            else if (this.Pantech()) {
                type = "Pantech";
            }
            else if (this.kliton()) {
                type = "kliton";
            }
            else if (this.vivo()) {
                type = "vivo";
            }
            else if (this.Amazon()) {
                type = "Amazon";
            }
            else if (this.Hisense()) {
                type = "Hisense";
            }
            else if (this.GIONEE()) {
                type = "GIONEE";
            }
            else if (this.Haier()) {
                type = "Haier";
            }
            else if (this.Chrome_mobile()) {
                type = "Chrome";
            }
            else if (this.moto()) {
                type = "moto";
            }
            else if (this.TCL()) {
                type = "TCL";
            }
            return type;
        },
        getBrowserInfo: function () {
            /**
            * 获取浏览器版本信息
            * 
            */
            var agent = navigator.userAgent.toLowerCase();
            var retval = "";
            var regStr_ie = /msie [\d.]+;/gi;
            var regStr_ff = /firefox\/[\d.]+/gi
            var regStr_chrome = /chrome\/[\d.]+/gi;
            var regStr_saf = /safari\/[\d.]+/gi;
            var regStr_uc = /ucbrowser\/[\d.]+/gi;
            var regStr_miui = /miuibrowser\/[\d.]+/gi;
            var regStr_opr = /opr\/[\d.]+/gi;
            var regStr_mqq = /mqqbrowser\/[\d.]+/gi;
            //IE
            if (agent.indexOf("msie") > 0) {
                retval = agent.match(regStr_ie);
            }
                //uc
            else if (this.uc()) {
                retval = agent.match(regStr_uc);
            }
                //opr
            else if (this.opera()) {
                retval = agent.match(regStr_opr);
            }
                //miui
            else if (this.miui()) {
                retval = agent.match(regStr_miui);
            }
                //uc
            else if (this.qq()) {
                retval = agent.match(regStr_mqq);
            }
                //firefox
            else if (agent.indexOf("firefox") > 0) {
                retval = agent.match(regStr_ff);
            }
                //Chrome
            else if (agent.indexOf("chrome") > 0) {
                retval = agent.match(regStr_chrome);
            }
                //Safari 过滤andriod
            else if (this.safari() && agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                retval = agent.match(regStr_saf);
            }
            return retval;
        }
    },
    clientType: {
        /**
        * 客户设备类型
        */
        Mobile: "Mobile",
        Pc: "Pc"
    },
    getType: function () {
        /**
        * 根据系设备类型(Mobile,Pc)。
        */
        var type = ai.ovb.getClientOsType();
        if (type == "linux" || type == "android" || type == "ios" || type == "nokia" || ai.ovb.ipod() || ai.ovb.ipad() || ai.ovb.windowPhone()) {
            return ai.clientType.Mobile;
        }
        else {
            return ai.clientType.Pc;
        }
    }
}
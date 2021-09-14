const utils = new Utils();
window.$utils = utils;

function Utils() {
    // 获取CDNPATH
	this.CDNPATH = function () {
		let CDHPATH = $('head').attr('data-cdn-path') || "";
		return CDHPATH;
	}
	// 获取href参数
	this.getQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	}
    // 判断当前环境是否为Pc端
    this.isPcFunc = function () {
        const userAgentInfo = window.navigator.userAgent;
        const agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        let _flag = true;
        for (let v = 0; v < agents.length; v++) {
            if (userAgentInfo.indexOf(agents[v]) > 0) {
                _flag = false;
                break;
            }
        }
        return _flag;
    }
    // 获取文档高度
    this.getDocHeight = function () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    // 获取可是窗口高度
    this.getClientHeight = function () {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    // 获取滚动条高度
    this.getScrollHeight = function () {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    // 获取滚动条距离文档底部的距离，一般用来做滑动分页
    this.getScrollBottomDistance = function () {
        return this.getDocHeight() - this.getScrollHeight() - this.getClientHeight();
    }
    // 把URL参数解析为一个对象
    this.parseQueryString = function (urlStr) {
        // ?号后面的位置
        var pos = urlStr.indexOf('?') + 1;
        // 参数的字符串
        var paramsStr = urlStr.substring(pos);
        // console.log(paramsStr);

        // 声明对象
        var obj = {};
        // 把参数添加到对象中
        var paramsArr = paramsStr.split('&');

        // 数组循环
        paramsArr.forEach(function (element) {
            // element == key0=aaa
            var _arr = element.split('=');
            // 往对象里添加内容
            obj[_arr[0]] = _arr[1];
        });
        // 返回对象
        return obj;
    }
    /**
     * 展示信息，类似element-UI
     * 使用使须引入font-awesome
     * @param {string} msgType 
     * @param {string} msgContent 
     * @param {jqueryDom} targetDom 
     */
    this.showMessage = function (msgType, msgContent, targetDom) {
        let msgParentDom = $('body');
        let msgWraper = $('<div></div>');
        let iDom = $('<i></i>');
        let pDom = $('<p></p>');
        let timer = null;
        msgWraper.addClass('msg--wraper');
        msgWraper.addClass(msgType);
        iDom.addClass('fas');
        switch (msgType) {
            case 'success':
                iDom.addClass('fa-check-circle');
                break;
            case 'error':
                iDom.addClass('fa-times-circle');
                break;
            case 'warning':
                iDom.addClass('fa-exclamation-circle');
                break;
        }
        pDom.addClass('msg--content');
        pDom.html(msgContent);
        msgWraper.append(iDom);
        msgWraper.append(pDom);
        msgParentDom.append(msgWraper);
        window.getComputedStyle(msgWraper[0]).width;
        msgWraper.css({
            'transform': 'translateX(-50%) translateY(0px)',
            'opacity': '1',
        });
        timer = setTimeout(() => {
            msgWraper.css({
                'transform': 'translateX(-50%) translateY(-50px)',
                'opacity': '0',
            });
            clearTimeout(timer);
            msgWraper.on('transitionend', function () {
                $(this).remove();
            });
        }, 1500);
    }
    // 抖动
    this.debounce = function (fn, duration, immediate) {
        let timer;
        return function () {
            if (timer) clearTimeout(timer);
            if (immediate) {
                // 如果已经执行过，不再执行
                var callNow = !timer;
                timer = setTimeout(() => {
                    timer = null;
                }, duration)
                if (callNow) {
                    fn.apply(this, arguments)
                }
            } else {
                timer = setTimeout(() => {
                    fn.apply(this, arguments)
                }, duration);
            }
        }
    }
    // 节流
    this.throttling = function throttle(fn, duration) {
        let task = null;
        return function () {
            if(!task) {
                task = setTimeout(function () {
                    task = null;
                    fn.apply(this, arguments);
                }, duration);
            }
        }
    }
}
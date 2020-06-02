import Server from "./Server";
export default class WechatShare {
    constructor(shareData, debug = false) {

        this._isReady = false;
        this._shareData = shareData;
        this._debug = debug;
        this.initWX();

        // console.log(this._shareData)

    }

    initWX() {

        let wx = window.wx;

        if (!wx) return window.console.error('need wx javascript lib!');

        Server.getCallApi("/wechat/jssdk",{url: encodeURIComponent(window.location.href.replace(window.location.hash, ""))})
            .then(res => {
                // console.log(res)
                var json = res.data;
                wx.config({
                    debug: this._debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: json.appId, // 必填，公众号的唯一标识
                    timestamp: json.timestamp, // 必填，生成签名的时间戳
                    nonceStr: json.nonceStr, // 必填，生成签名的随机串
                    signature: json.signature,// 必填，签名，见附录1
                    jsApiList : ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu']
                });
            });

        wx.ready(() => {
            this._isReady = true;
            this.setShareData(this._shareData);
        });

        wx.error(function (res) {

        });
    }

    setShareData(shareData) {

        //alert(JSON.stringify(shareData));
        this._shareData = shareData;
        if (!this._isReady) {
            return;
        }

        window.wx.onMenuShareTimeline({
            title: shareData.timelineTitle, // 分享标题
            //desc: share_data.desc, // 分享描述
            link: shareData.link, // 分享链接
            imgUrl: shareData.timelineImgUrl, // 分享图标
            success: () => {
                // 用户确认分享后执行的回调函数
                this._shareSuccessCallback("Timeline");
            },
            cancel: () => {
                // 用户取消分享后执行的回调函数
            }
        });

        window.wx.onMenuShareAppMessage({
            title: shareData.messageTitle, // 分享标题
            desc: shareData.messageDesc, // 分享描述
            link: shareData.link, // 分享链接
            imgUrl: shareData.messageImgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: () => {
                // 用户确认分享后执行的回调函数
                this._shareSuccessCallback("Friends");
            },
            cancel: () => {
                // 用户取消分享后执行的回调函数
            }
        });

    }
}


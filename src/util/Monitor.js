/* eslint-disable no-console */
/**
 * 统计监测功能
 */
import URLHelper from "./URLUtil";

export default class Monitor {

    static trackEvent(name,type='btn',action='click') {

        let app_from = URLHelper.getQueryString('app_from');

        if (app_from) app_from = '_' + app_from;
        else app_from = '';

        name = name + app_from;

        // 百度统计
        if (window._hmt){
            window._hmt.push(['_trackEvent', 'page', 'enter', name])
            console.log(name)
        }

        // 谷歌统计
        // ga('send','event','ford',name,'enter')
        if (window._gsTracker) {
            // window._gsTracker.trackEvent('H5', name, '');
        }

        if (process.env.NODE_ENV === "development") console.log('百度统计 名称：' + name);

        return this;
    }
}

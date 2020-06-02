/** 
 * 浏览器判断
*/
export default class BrowserUtil {
  static isWechat() {
    return /MicroMessenger/i.test(navigator.userAgent)
  }

  static isMobile() {
    return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(
      navigator.userAgent
    )
  }

  static isPC() {
    return !BrowserUtil.isMobile()
  }

  static isIpad() {
    var u = navigator.userAgent
    return /iPad/i.test(navigator.userAgent)
  }
}

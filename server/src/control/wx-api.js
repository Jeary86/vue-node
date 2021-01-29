const request = require('request');
const { resFun , resSuc ,resErr} = require('../common/response');
const { WxUser , SelectWxUser , UpdateWxUser } = require('../server/wx-api')

const wxLogin = async function (req, res) {

    const APPID = "wx983c25737e22db05"; //小程序appid
    const SECRET = "806eec1b214dea48657e5a50a1cc4f29"; //小程序密钥
    const JSCODE = req.query.code; //微信登入生成 code
    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ APPID +'&secret='+ SECRET +'&js_code='+ JSCODE +'&grant_type=authorization_code'

    request(apiUrl,async function (err,data,req) {
        if(!err){

            let data = JSON.parse(req)

            let params = {
                openid: data.openid,
                session_key: data.session_key,
            }

            // let params = {
            //     openid: "asdasdasdasdsa1231312",
            //     session_key: "22222233333",
            // }
            //
            // let sql = 'gdfdgfdgfdg'

            let select = await SelectWxUser(params.openid)

            if (select[0] == null) {
                console.log('无相同openid')

                const r = await WxUser(params);
                if (r === 1) return resErr(req);
                return resSuc(res, r);

            }else {

                let selectId = {
                    id:select[0].id
                }

                Object.assign(selectId,params);

                console.log(selectId)

                const updateWxUser = await  UpdateWxUser(selectId)

                return resSuc(res, updateWxUser);
            }


        }else {
            return resSuc(res, err);
        }

    })


}

module.exports = {
    wxLogin
}
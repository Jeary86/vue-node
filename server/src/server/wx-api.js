const query = require('../../db/connect');

const WxUser = async function (params) {
    try {
        const r = await query(
            'INSERT INTO wx_user SET ?',params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}
// SELECT
const SelectWxUser = async function (params) {
    try {
        const r = await query(
            'SELECT * FROM wx_user WHERE openid=?',params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const UpdateWxUser = async function ({id,openid,session_key}) {
    try {
        const r = await query(
            'UPDATE wx_user SET openid = ?,session_key =? WHERE id = ?',[openid,session_key,id]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    WxUser,
    SelectWxUser,
    UpdateWxUser
};
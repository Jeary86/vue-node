const query = require('../../db/connect');

const Register = async function (params) {
    try {
        const r = await query(
            'INSERT INTO user set ?',params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const DelUser = async function (params) {
    try {
        const r = await query(
            'DELETE FROM user where user_id = ?',[params]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const UpdateUser = async function ({user_id,user_name,user_password}) {
    try {
        const r = await query(
            'UPDATE user SET user_name = ?,user_password = ? WHERE user_id = ?',[user_name,user_password,user_id]
            // `UPDATE user SET user_name = ${user_name},user_password = ${user_password} WHERE user_id = ?`,[user_id]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    Register,
    DelUser,
    UpdateUser
};